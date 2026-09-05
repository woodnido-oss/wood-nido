import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  WoodProduct,
  WoodCategory,
  WoodProject,
  ClientReview,
  CustomerInquiry,
  SiteSettings,
  GalleryPhoto,
  HeroSlide
} from '../types';
import {
  initialSiteSettings,
  initialCategories,
  initialProducts,
  initialProjects,
  initialReviews,
  initialInquiries,
  initialGalleryPhotos
} from '../data/initialData';
import { getYouTubeThumbnail, isValidYouTubeUrl } from '../utils/youtube';
import { db, handleFirestoreError, OperationType, testFirestoreConnection } from '../lib/firebase';
import { collection, doc, setDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

interface WoodStoreContextType {
  siteSettings: SiteSettings;
  categories: WoodCategory[];
  products: WoodProduct[];
  projects: WoodProject[];
  reviews: ClientReview[];
  inquiries: CustomerInquiry[];
  galleryPhotos: GalleryPhoto[];
  viewMode: 'customer' | 'admin';
  setViewMode: (mode: 'customer' | 'admin') => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  quickInquiryProduct: WoodProduct | null;
  setQuickInquiryProduct: (product: WoodProduct | null) => void;
  activeVideoProject: WoodProject | null;
  setActiveVideoProject: (project: WoodProject | null) => void;

  // Product CRUD
  addProduct: (product: Omit<WoodProduct, 'id' | 'createdAt'>) => void;
  updateProduct: (id: string, product: Partial<WoodProduct>) => void;
  deleteProduct: (id: string) => void;

  // Category CRUD
  addCategory: (category: Omit<WoodCategory, 'id'>) => void;
  updateCategory: (id: string, category: Partial<WoodCategory>) => void;
  deleteCategory: (id: string) => void;

  // Project (YouTube video) CRUD
  addProject: (project: Omit<WoodProject, 'id'>) => void;
  updateProject: (id: string, project: Partial<WoodProject>) => void;
  deleteProject: (id: string) => void;

  // Gallery Photos (Master Portfolio 8-grid) CRUD
  updateGalleryPhoto: (id: string, photo: Partial<GalleryPhoto>) => void;
  addGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  deleteGalleryPhoto: (id: string) => void;

  // Hero Slides Image & Content Editor (5 to 10 slides)
  updateHeroSlide: (slideId: number, slideData: Partial<HeroSlide>) => void;
  addHeroSlide: (slide: Omit<HeroSlide, 'id'>) => void;
  deleteHeroSlide: (slideId: number) => void;

  // Review CRUD
  addReview: (review: Omit<ClientReview, 'id'>) => void;
  deleteReview: (id: string) => void;

  // Inquiries
  submitInquiry: (inquiry: Omit<CustomerInquiry, 'id' | 'createdAt' | 'status'>) => void;
  updateInquiryStatus: (id: string, status: CustomerInquiry['status']) => void;
  deleteInquiry: (id: string) => void;

  // Site Settings & Global Image Customizer
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  updateSpecificImage: (type: 'aboutImage1' | 'aboutImage2' | 'ctaImage' | 'showroomImage' | 'logoUrl', url: string) => void;
  resetToDefaults: () => void;
}

const WoodStoreContext = createContext<WoodStoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  SETTINGS: 'woodnido_settings_v2',
  CATEGORIES: 'woodnido_categories_v2',
  PRODUCTS: 'woodnido_products_v2',
  PROJECTS: 'woodnido_projects_v2',
  REVIEWS: 'woodnido_reviews_v2',
  INQUIRIES: 'woodnido_inquiries_v2',
  GALLERY: 'woodnido_gallery_v2'
};

const LEGACY_STORAGE_KEYS = {
  SETTINGS: 'woodnest_settings_v2',
  CATEGORIES: 'woodnest_categories_v2',
  PRODUCTS: 'woodnest_products_v2',
  PROJECTS: 'woodnest_projects_v2',
  REVIEWS: 'woodnest_reviews_v2',
  INQUIRIES: 'woodnest_inquiries_v2',
  GALLERY: 'woodnest_gallery_v2'
};

function getStoredItem(key: string, legacyKey: string): string | null {
  try {
    const current = localStorage.getItem(key);
    if (current) return current;
    const legacy = localStorage.getItem(legacyKey);
    if (legacy) {
      // Migrate forward
      localStorage.setItem(key, legacy);
      return legacy;
    }
  } catch {
    // Ignore storage errors
  }
  return null;
}

export const WoodStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Check if current URL or hash indicates admin
  const isInitialAdmin = () => {
    if (typeof window === 'undefined') return false;
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    return path.includes('/admin') || hash.includes('admin');
  };

  const [viewMode, setViewModeState] = useState<'customer' | 'admin'>(isInitialAdmin() ? 'admin' : 'customer');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quickInquiryProduct, setQuickInquiryProduct] = useState<WoodProduct | null>(null);
  const [activeVideoProject, setActiveVideoProject] = useState<WoodProject | null>(null);

  // Sync with browser URL / history for separate page navigation
  const setViewMode = (mode: 'customer' | 'admin') => {
    setViewModeState(mode);
    if (typeof window !== 'undefined') {
      try {
        if (mode === 'admin') {
          if (!window.location.pathname.includes('/admin') && !window.location.hash.includes('admin')) {
            // Support both path and hash for preview iframes
            window.history.pushState({ mode: 'admin' }, '', '#/admin');
          }
        } else {
          if (window.location.hash.includes('admin')) {
            window.history.pushState({ mode: 'customer' }, '', '#/');
          }
        }
      } catch (err) {
        console.warn('History navigation sync fallback:', err);
      }
    }
  };

  // Listen for browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const isAdmin = isInitialAdmin();
      setViewModeState(isAdmin ? 'admin' : 'customer');
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
    };
  }, []);

  // Settings
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    try {
      const saved = getStoredItem(STORAGE_KEYS.SETTINGS, LEGACY_STORAGE_KEYS.SETTINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure all required new fields exist
        // Ensure at least 5 to 10 slides are present
        const validSlides = (parsed.heroSlides && parsed.heroSlides.length >= 5)
          ? parsed.heroSlides
          : initialSiteSettings.heroSlides;

        const merged = {
          ...initialSiteSettings,
          ...parsed,
          heroSlides: validSlides
        };

        // Upgrade legacy business name & email if previously saved as Wood Nest
        if (merged.businessName === 'Wood Nest') {
          merged.businessName = 'Wood Nido';
        }
        if (merged.email === 'info@woodnest.com') {
          merged.email = 'info@woodnido.com';
        }
        if (typeof merged.aboutText1 === 'string' && merged.aboutText1.includes('Wood Nest')) {
          merged.aboutText1 = merged.aboutText1.replace(/Wood Nest/g, 'Wood Nido');
        }
        if (typeof merged.aboutText2 === 'string' && merged.aboutText2.includes('Wood Nest')) {
          merged.aboutText2 = merged.aboutText2.replace(/Wood Nest/g, 'Wood Nido');
        }
        if (typeof merged.aboutText3 === 'string' && merged.aboutText3.includes('Wood Nest')) {
          merged.aboutText3 = merged.aboutText3.replace(/Wood Nest/g, 'Wood Nido');
        }

        return merged;
      }
      return initialSiteSettings;
    } catch {
      return initialSiteSettings;
    }
  });

  // Categories
  const [categories, setCategories] = useState<WoodCategory[]>(() => {
    try {
      const saved = getStoredItem(STORAGE_KEYS.CATEGORIES, LEGACY_STORAGE_KEYS.CATEGORIES);
      return saved ? JSON.parse(saved) : initialCategories;
    } catch {
      return initialCategories;
    }
  });

  // Products
  const [products, setProducts] = useState<WoodProduct[]>(() => {
    try {
      const saved = getStoredItem(STORAGE_KEYS.PRODUCTS, LEGACY_STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : initialProducts;
    } catch {
      return initialProducts;
    }
  });

  // Projects (YouTube videos)
  const [projects, setProjects] = useState<WoodProject[]>(() => {
    try {
      const saved = getStoredItem(STORAGE_KEYS.PROJECTS, LEGACY_STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  // Reviews
  const [reviews, setReviews] = useState<ClientReview[]>(() => {
    try {
      const saved = getStoredItem(STORAGE_KEYS.REVIEWS, LEGACY_STORAGE_KEYS.REVIEWS);
      return saved ? JSON.parse(saved) : initialReviews;
    } catch {
      return initialReviews;
    }
  });

  // Inquiries
  const [inquiries, setInquiries] = useState<CustomerInquiry[]>(() => {
    try {
      const saved = getStoredItem(STORAGE_KEYS.INQUIRIES, LEGACY_STORAGE_KEYS.INQUIRIES);
      return saved ? JSON.parse(saved) : initialInquiries;
    } catch {
      return initialInquiries;
    }
  });

  // Gallery Photos (Master Portfolio 8-grid)
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = getStoredItem(STORAGE_KEYS.GALLERY, LEGACY_STORAGE_KEYS.GALLERY);
      return saved ? JSON.parse(saved) : initialGalleryPhotos;
    } catch {
      return initialGalleryPhotos;
    }
  });

  // Sync to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(siteSettings));
    } catch (e) {
      console.error(e);
    }
  }, [siteSettings]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
    } catch (e) {
      console.error(e);
    }
  }, [projects]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(reviews));
    } catch (e) {
      console.error(e);
    }
  }, [reviews]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    } catch (e) {
      console.error(e);
    }
  }, [inquiries]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(galleryPhotos));
    } catch (e) {
      console.error(e);
    }
  }, [galleryPhotos]);

  // Firestore Real-Time Cloud Synchronization
  useEffect(() => {
    testFirestoreConnection();

    let unsubProducts: (() => void) | null = null;
    let unsubCategories: (() => void) | null = null;
    let unsubInquiries: (() => void) | null = null;

    try {
      unsubProducts = onSnapshot(
        collection(db, 'products'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: WoodProduct[] = [];
            snapshot.forEach((d) => {
              list.push(d.data() as WoodProduct);
            });
            if (list.length > 0) {
              setProducts(list);
            }
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, 'products');
        }
      );

      unsubCategories = onSnapshot(
        collection(db, 'categories'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: WoodCategory[] = [];
            snapshot.forEach((d) => {
              list.push(d.data() as WoodCategory);
            });
            if (list.length > 0) {
              setCategories(list);
            }
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, 'categories');
        }
      );

      unsubInquiries = onSnapshot(
        collection(db, 'inquiries'),
        (snapshot) => {
          if (!snapshot.empty) {
            const list: CustomerInquiry[] = [];
            snapshot.forEach((d) => {
              list.push(d.data() as CustomerInquiry);
            });
            if (list.length > 0) {
              setInquiries(list);
            }
          }
        },
        (error) => {
          handleFirestoreError(error, OperationType.GET, 'inquiries');
        }
      );
    } catch (err) {
      console.warn('Firestore real-time listeners initialization notice:', err);
    }

    return () => {
      unsubProducts?.();
      unsubCategories?.();
      unsubInquiries?.();
    };
  }, []);

  // Product CRUD
  const addProduct = (productData: Omit<WoodProduct, 'id' | 'createdAt'>) => {
    const newProduct: WoodProduct = {
      ...productData,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setProducts((prev) => [newProduct, ...prev]);
    setDoc(doc(db, 'products', newProduct.id), newProduct).catch((err) =>
      handleFirestoreError(err, OperationType.WRITE, 'products')
    );
  };

  const updateProduct = (id: string, updatedData: Partial<WoodProduct>) => {
    setProducts((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
    const existing = products.find((p) => p.id === id);
    if (existing) {
      setDoc(doc(db, 'products', id), { ...existing, ...updatedData }, { merge: true }).catch((err) =>
        handleFirestoreError(err, OperationType.UPDATE, 'products')
      );
    }
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((item) => item.id !== id));
    deleteDoc(doc(db, 'products', id)).catch((err) =>
      handleFirestoreError(err, OperationType.DELETE, 'products')
    );
  };

  // Category CRUD
  const addCategory = (catData: Omit<WoodCategory, 'id'>) => {
    const newCat: WoodCategory = {
      ...catData,
      id: `cat-${Date.now()}`
    };
    setCategories((prev) => [...prev, newCat]);
    setDoc(doc(db, 'categories', newCat.id), newCat).catch((err) =>
      handleFirestoreError(err, OperationType.WRITE, 'categories')
    );
  };

  const updateCategory = (id: string, updatedData: Partial<WoodCategory>) => {
    setCategories((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
    const existing = categories.find((c) => c.id === id);
    if (existing) {
      setDoc(doc(db, 'categories', id), { ...existing, ...updatedData }, { merge: true }).catch((err) =>
        handleFirestoreError(err, OperationType.UPDATE, 'categories')
      );
    }
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((item) => item.id !== id));
    deleteDoc(doc(db, 'categories', id)).catch((err) =>
      handleFirestoreError(err, OperationType.DELETE, 'categories')
    );
  };

  // Project (YouTube video) CRUD
  const addProject = (projData: Omit<WoodProject, 'id'>) => {
    // If thumbnail isn't provided but it's a YouTube link, automatically fetch high-res YouTube thumbnail
    let thumbnail = projData.thumbnailUrl;
    if ((!thumbnail || thumbnail.trim() === '') && isValidYouTubeUrl(projData.videoUrl)) {
      thumbnail = getYouTubeThumbnail(projData.videoUrl);
    }

    const newProj: WoodProject = {
      ...projData,
      thumbnailUrl: thumbnail || 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80',
      id: `proj-${Date.now()}`
    };
    setProjects((prev) => [newProj, ...prev]);
  };

  const updateProject = (id: string, updatedData: Partial<WoodProject>) => {
    setProjects((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, ...updatedData };
        // If videoUrl changed and thumbnail was default or empty, auto-refresh thumbnail
        if (updatedData.videoUrl && (!updatedData.thumbnailUrl || updatedData.thumbnailUrl === item.thumbnailUrl)) {
          if (isValidYouTubeUrl(updatedData.videoUrl)) {
            updated.thumbnailUrl = getYouTubeThumbnail(updatedData.videoUrl);
          }
        }
        return updated;
      })
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((item) => item.id !== id));
  };

  // Gallery Photos CRUD
  const updateGalleryPhoto = (id: string, photoData: Partial<GalleryPhoto>) => {
    setGalleryPhotos((prev) =>
      prev.map((photo) => (photo.id === id ? { ...photo, ...photoData } : photo))
    );
  };

  const addGalleryPhoto = (photoData: Omit<GalleryPhoto, 'id'>) => {
    const newPhoto: GalleryPhoto = {
      ...photoData,
      id: `gal-${Date.now()}`
    };
    setGalleryPhotos((prev) => [...prev, newPhoto]);
  };

  const deleteGalleryPhoto = (id: string) => {
    setGalleryPhotos((prev) => prev.filter((item) => item.id !== id));
  };

  // Hero Slides Editor (5 to 10 slides)
  const updateHeroSlide = (slideId: number, slideData: Partial<HeroSlide>) => {
    setSiteSettings((prev) => ({
      ...prev,
      heroSlides: (prev.heroSlides || initialSiteSettings.heroSlides).map((slide) =>
        slide.id === slideId ? { ...slide, ...slideData } : slide
      )
    }));
  };

  const addHeroSlide = (slideData: Omit<HeroSlide, 'id'>) => {
    setSiteSettings((prev) => {
      const slides = prev.heroSlides || initialSiteSettings.heroSlides;
      if (slides.length >= 10) return prev; // Maximum 10 slides
      const nextId = Math.max(0, ...slides.map((s) => s.id)) + 1;
      const newSlide: HeroSlide = { ...slideData, id: nextId };
      return {
        ...prev,
        heroSlides: [...slides, newSlide]
      };
    });
  };

  const deleteHeroSlide = (slideId: number) => {
    setSiteSettings((prev) => {
      const slides = prev.heroSlides || initialSiteSettings.heroSlides;
      if (slides.length <= 1) return prev;
      return {
        ...prev,
        heroSlides: slides.filter((s) => s.id !== slideId)
      };
    });
  };

  // Specific Site Images Editor
  const updateSpecificImage = (
    type: 'aboutImage1' | 'aboutImage2' | 'ctaImage' | 'showroomImage' | 'logoUrl',
    url: string
  ) => {
    setSiteSettings((prev) => ({
      ...prev,
      [type]: url
    }));
  };

  // Reviews CRUD
  const addReview = (reviewData: Omit<ClientReview, 'id'>) => {
    const newReview: ClientReview = {
      ...reviewData,
      id: `rev-${Date.now()}`
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((item) => item.id !== id));
  };

  // Inquiries
  const submitInquiry = (inquiryData: Omit<CustomerInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInquiry: CustomerInquiry = {
      ...inquiryData,
      id: `inq-${Date.now()}`,
      status: 'New',
      createdAt: new Date().toLocaleString()
    };
    setInquiries((prev) => [newInquiry, ...prev]);
    setDoc(doc(db, 'inquiries', newInquiry.id), newInquiry).catch((err) =>
      handleFirestoreError(err, OperationType.WRITE, 'inquiries')
    );
  };

  const updateInquiryStatus = (id: string, status: CustomerInquiry['status']) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    setDoc(doc(db, 'inquiries', id), { status }, { merge: true }).catch((err) =>
      handleFirestoreError(err, OperationType.UPDATE, 'inquiries')
    );
  };

  const deleteInquiry = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id));
    deleteDoc(doc(db, 'inquiries', id)).catch((err) =>
      handleFirestoreError(err, OperationType.DELETE, 'inquiries')
    );
  };

  // Site Settings
  const updateSiteSettings = (newSettings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetToDefaults = () => {
    setSiteSettings(initialSiteSettings);
    setCategories(initialCategories);
    setProducts(initialProducts);
    setProjects(initialProjects);
    setReviews(initialReviews);
    setInquiries(initialInquiries);
    setGalleryPhotos(initialGalleryPhotos);
  };

  return (
    <WoodStoreContext.Provider
      value={{
        siteSettings,
        categories,
        products,
        projects,
        reviews,
        inquiries,
        galleryPhotos,
        viewMode,
        setViewMode,
        selectedCategory,
        setSelectedCategory,
        quickInquiryProduct,
        setQuickInquiryProduct,
        activeVideoProject,
        setActiveVideoProject,
        addProduct,
        updateProduct,
        deleteProduct,
        addCategory,
        updateCategory,
        deleteCategory,
        addProject,
        updateProject,
        deleteProject,
        updateGalleryPhoto,
        addGalleryPhoto,
        deleteGalleryPhoto,
        updateHeroSlide,
        addHeroSlide,
        deleteHeroSlide,
        updateSpecificImage,
        addReview,
        deleteReview,
        submitInquiry,
        updateInquiryStatus,
        deleteInquiry,
        updateSiteSettings,
        resetToDefaults
      }}
    >
      {children}
    </WoodStoreContext.Provider>
  );
};

export const useWoodStore = () => {
  const context = useContext(WoodStoreContext);
  if (!context) {
    throw new Error('useWoodStore must be used within a WoodStoreProvider');
  }
  return context;
};
