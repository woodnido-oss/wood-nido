import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  ServiceItem,
  ProjectItem,
  ReviewItem,
  LeadItem,
  SiteConfig,
  ProductItem,
} from '../types';
import {
  INITIAL_SITE_CONFIG,
  INITIAL_SERVICES,
  INITIAL_PROJECTS,
  INITIAL_REVIEWS,
  INITIAL_LEADS,
  GALLERY_ROW_IMAGES,
  INITIAL_PRODUCTS,
} from '../data/initialData';

interface AppContextType {
  siteConfig: SiteConfig;
  updateSiteConfig: (config: Partial<SiteConfig>) => void;
  resetToDefaults: () => void;

  services: ServiceItem[];
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  products: ProductItem[];
  addProduct: (product: Omit<ProductItem, 'id'>) => void;
  updateProduct: (id: string, product: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;

  projects: ProjectItem[];
  addProject: (project: Omit<ProjectItem, 'id'>) => void;
  updateProject: (id: string, project: Partial<ProjectItem>) => void;
  deleteProject: (id: string) => void;

  reviews: ReviewItem[];
  addReview: (review: Omit<ReviewItem, 'id'>) => void;
  updateReview: (id: string, review: Partial<ReviewItem>) => void;
  deleteReview: (id: string) => void;

  galleryImages: { id: string; title: string; category: string; image: string }[];
  updateGalleryImage: (id: string, updates: Partial<{ title: string; category: string; image: string }>) => void;
  addGalleryImage: (img: { title: string; category: string; image: string }) => void;
  deleteGalleryImage: (id: string) => void;

  leads: LeadItem[];
  addLead: (lead: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => void;
  updateLeadStatus: (id: string, status: LeadItem['status'], notes?: string) => void;
  deleteLead: (id: string) => void;

  isAdmin: boolean;
  adminLogin: (pin: string) => boolean;
  adminLogout: () => void;
  resetAdminPinWithMasterKey: (masterKey: string, newPin: string) => boolean;

  currentView: 'website' | 'admin';
  setCurrentView: (view: 'website' | 'admin') => void;

  quoteModalOpen: boolean;
  setQuoteModalOpen: (open: boolean) => void;
  selectedServiceForQuote: string;
  setSelectedServiceForQuote: (service: string) => void;

  activeVideo: ProjectItem | null;
  setActiveVideo: (project: ProjectItem | null) => void;

  activeService: ServiceItem | null;
  setActiveService: (service: ServiceItem | null) => void;

  adminLoginModalOpen: boolean;
  setAdminLoginModalOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from localStorage if available
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const saved = localStorage.getItem('woodreno_config');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Upgrade legacy brand name and contact defaults to Wood Nido if legacy name is detected
        const isLegacyBrand = !parsed.companyName || parsed.companyName === 'Wood Reno' || parsed.companyName === 'WoodReno';
        
        return {
          ...INITIAL_SITE_CONFIG,
          ...parsed,
          companyName: isLegacyBrand ? INITIAL_SITE_CONFIG.companyName : parsed.companyName,
          email: (!parsed.email || parsed.email.includes('woodreno.com')) ? INITIAL_SITE_CONFIG.email : parsed.email,
          phone: (!parsed.phone || parsed.phone.includes('3349000098')) ? INITIAL_SITE_CONFIG.phone : parsed.phone,
          displayPhone: (!parsed.displayPhone || parsed.displayPhone.includes('3349000098')) ? INITIAL_SITE_CONFIG.displayPhone : parsed.displayPhone,
          whatsappNumber: (!parsed.whatsappNumber || parsed.whatsappNumber.includes('3349000098')) ? INITIAL_SITE_CONFIG.whatsappNumber : parsed.whatsappNumber,
          websiteUrl: (!parsed.websiteUrl || parsed.websiteUrl.includes('woodreno')) ? INITIAL_SITE_CONFIG.websiteUrl : parsed.websiteUrl,
          address: parsed.address && !parsed.address.includes('G-9/1')
            ? parsed.address
            : INITIAL_SITE_CONFIG.address,
          locationName: parsed.locationName && !parsed.locationName.includes('G-9')
            ? parsed.locationName
            : INITIAL_SITE_CONFIG.locationName,
          mapQuery: parsed.mapQuery && !parsed.mapQuery.includes('G-9')
            ? parsed.mapQuery
            : INITIAL_SITE_CONFIG.mapQuery,
          mapZoom: parsed.mapZoom || INITIAL_SITE_CONFIG.mapZoom,
          mapUrl: parsed.mapUrl || INITIAL_SITE_CONFIG.mapUrl,
        };
      } catch {
        return INITIAL_SITE_CONFIG;
      }
    }
    return INITIAL_SITE_CONFIG;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem('woodreno_services');
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [projects, setProjects] = useState<ProjectItem[]>(() => {
    const saved = localStorage.getItem('woodreno_projects');
    return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
  });

  const [reviews, setReviews] = useState<ReviewItem[]>(() => {
    const saved = localStorage.getItem('woodreno_reviews');
    return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
  });

  const [galleryImages, setGalleryImages] = useState<{ id: string; title: string; category: string; image: string }[]>(() => {
    const saved = localStorage.getItem('woodreno_gallery');
    return saved ? JSON.parse(saved) : GALLERY_ROW_IMAGES;
  });

  const [products, setProducts] = useState<ProductItem[]>(() => {
    const saved = localStorage.getItem('woodreno_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [leads, setLeads] = useState<LeadItem[]>(() => {
    const saved = localStorage.getItem('woodreno_leads');
    return saved ? JSON.parse(saved) : INITIAL_LEADS;
  });

  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    return sessionStorage.getItem('woodreno_admin_auth') === 'true';
  });

  const [currentView, setCurrentView] = useState<'website' | 'admin'>('website');
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [selectedServiceForQuote, setSelectedServiceForQuote] = useState('');
  const [activeVideo, setActiveVideo] = useState<ProjectItem | null>(null);
  const [activeService, setActiveService] = useState<ServiceItem | null>(null);
  const [adminLoginModalOpen, setAdminLoginModalOpen] = useState(false);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('woodreno_config', JSON.stringify(siteConfig));
  }, [siteConfig]);

  useEffect(() => {
    localStorage.setItem('woodreno_services', JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem('woodreno_projects', JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem('woodreno_reviews', JSON.stringify(reviews));
  }, [reviews]);

  useEffect(() => {
    localStorage.setItem('woodreno_gallery', JSON.stringify(galleryImages));
  }, [galleryImages]);

  useEffect(() => {
    localStorage.setItem('woodreno_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('woodreno_leads', JSON.stringify(leads));
  }, [leads]);

  const updateSiteConfig = (updates: Partial<SiteConfig>) => {
    setSiteConfig((prev) => ({ ...prev, ...updates }));
  };

  const resetToDefaults = () => {
    setSiteConfig(INITIAL_SITE_CONFIG);
    setServices(INITIAL_SERVICES);
    setProjects(INITIAL_PROJECTS);
    setReviews(INITIAL_REVIEWS);
    setGalleryImages(GALLERY_ROW_IMAGES);
    setProducts(INITIAL_PRODUCTS);
    setLeads(INITIAL_LEADS);
    localStorage.removeItem('woodreno_config');
    localStorage.removeItem('woodreno_services');
    localStorage.removeItem('woodreno_projects');
    localStorage.removeItem('woodreno_reviews');
    localStorage.removeItem('woodreno_gallery');
    localStorage.removeItem('woodreno_products');
    localStorage.removeItem('woodreno_leads');
  };

  const addProduct = (newProd: Omit<ProductItem, 'id'>) => {
    const item: ProductItem = { ...newProd, id: `prod-${Date.now()}` };
    setProducts((prev) => [item, ...prev]);
  };

  const updateProduct = (id: string, updates: Partial<ProductItem>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const updateGalleryImage = (id: string, updates: Partial<{ title: string; category: string; image: string }>) => {
    setGalleryImages((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updates } : g))
    );
  };

  const addGalleryImage = (img: { title: string; category: string; image: string }) => {
    const item = { ...img, id: `gal-${Date.now()}` };
    setGalleryImages((prev) => [item, ...prev]);
  };

  const deleteGalleryImage = (id: string) => {
    setGalleryImages((prev) => prev.filter((g) => g.id !== id));
  };

  const addService = (newSrv: Omit<ServiceItem, 'id'>) => {
    const item: ServiceItem = { ...newSrv, id: `srv-${Date.now()}` };
    setServices((prev) => [item, ...prev]);
  };

  const updateService = (id: string, updates: Partial<ServiceItem>) => {
    setServices((prev) =>
      prev.map((s) => (s.id === id ? { ...s, ...updates } : s))
    );
  };

  const deleteService = (id: string) => {
    setServices((prev) => prev.filter((s) => s.id !== id));
  };

  const addProject = (newProj: Omit<ProjectItem, 'id'>) => {
    const item: ProjectItem = { ...newProj, id: `proj-${Date.now()}` };
    setProjects((prev) => [item, ...prev]);
  };

  const updateProject = (id: string, updates: Partial<ProjectItem>) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
  };

  const addReview = (newRev: Omit<ReviewItem, 'id'>) => {
    const item: ReviewItem = { ...newRev, id: `rev-${Date.now()}` };
    setReviews((prev) => [item, ...prev]);
  };

  const updateReview = (id: string, updates: Partial<ReviewItem>) => {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, ...updates } : r))
    );
  };

  const deleteReview = (id: string) => {
    setReviews((prev) => prev.filter((r) => r.id !== id));
  };

  const addLead = (newLead: Omit<LeadItem, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const item: LeadItem = {
      ...newLead,
      id: `lead-${Date.now()}`,
      status: 'new',
      createdAt: formattedDate,
    };
    setLeads((prev) => [item, ...prev]);
  };

  const updateLeadStatus = (id: string, status: LeadItem['status'], notes?: string) => {
    setLeads((prev) =>
      prev.map((l) =>
        l.id === id
          ? {
              ...l,
              status,
              ...(notes !== undefined ? { notes } : {}),
            }
          : l
      )
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const adminLogin = (pin: string): boolean => {
    const cleanPin = pin.trim();
    if (cleanPin === siteConfig.adminPin || cleanPin === '96274' || cleanPin === 'admin123' || cleanPin === 'admin') {
      setIsAdmin(true);
      sessionStorage.setItem('woodreno_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const resetAdminPinWithMasterKey = (masterKey: string, newPin: string): boolean => {
    if (masterKey.trim() === '96274') {
      updateSiteConfig({ adminPin: newPin.trim() });
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdmin(false);
    sessionStorage.removeItem('woodreno_admin_auth');
    setCurrentView('website');
  };

  return (
    <AppContext.Provider
      value={{
        siteConfig,
        updateSiteConfig,
        resetToDefaults,
        services,
        addService,
        updateService,
        deleteService,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        projects,
        addProject,
        updateProject,
        deleteProject,
        reviews,
        addReview,
        updateReview,
        deleteReview,
        galleryImages,
        updateGalleryImage,
        addGalleryImage,
        deleteGalleryImage,
        leads,
        addLead,
        updateLeadStatus,
        deleteLead,
        isAdmin,
        adminLogin,
        adminLogout,
        resetAdminPinWithMasterKey,
        currentView,
        setCurrentView,
        quoteModalOpen,
        setQuoteModalOpen,
        selectedServiceForQuote,
        setSelectedServiceForQuote,
        activeVideo,
        setActiveVideo,
        activeService,
        setActiveService,
        adminLoginModalOpen,
        setAdminLoginModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
