import React, { useState, useEffect } from 'react';
import { useWoodStore } from '../../context/WoodStoreContext';
import { WoodProduct, WoodCategory, WoodProject, CustomerInquiry, GalleryPhoto, HeroSlide } from '../../types';
import {
  Package,
  Inbox,
  FolderTree,
  Video,
  Settings,
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  MessageSquare,
  Phone,
  Eye,
  Search,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Save,
  X,
  Image as ImageIcon,
  Youtube,
  Play,
  ArrowLeft,
  Store,
  Layers,
  Check,
  UploadCloud,
  HelpCircle,
  Menu,
  Download,
  LogOut,
  FileCode,
  ShieldCheck,
  LayoutDashboard,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { getYouTubeThumbnail, getYouTubeVideoId, isValidYouTubeUrl, getYouTubeEmbedUrl } from '../../utils/youtube';
import { PRESET_WOOD_IMAGES } from '../../data/initialData';
import { WOOD_NIDO_ZIP_BASE64 } from '../../utils/projectZipBase64';

interface AdminDashboardProps {
  onLogout?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout }) => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    inquiries,
    updateInquiryStatus,
    deleteInquiry,
    projects,
    addProject,
    updateProject,
    deleteProject,
    galleryPhotos,
    updateGalleryPhoto,
    addGalleryPhoto,
    deleteGalleryPhoto,
    siteSettings,
    updateSiteSettings,
    updateHeroSlide,
    addHeroSlide,
    deleteHeroSlide,
    updateSpecificImage,
    resetToDefaults,
    setViewMode
  } = useWoodStore();

  // Always start at 'overview' on fresh load/refresh, but remember during active session navigation
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'videos' | 'images' | 'categories' | 'inquiries' | 'settings'>(() => {
    if (typeof window !== 'undefined') {
      const sessionActive = sessionStorage.getItem('wood_nido_admin_session_active');
      if (sessionActive) {
        const savedTab = localStorage.getItem('wood_nido_admin_active_tab');
        if (savedTab && ['overview', 'products', 'videos', 'images', 'categories', 'inquiries', 'settings'].includes(savedTab)) {
          return savedTab as any;
        }
      }
    }
    return 'overview';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('wood_nido_admin_session_active', 'true');
      localStorage.setItem('wood_nido_admin_active_tab', activeTab);
    }
  }, [activeTab]);

  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('wood_nido_admin_auth');
      sessionStorage.removeItem('wood_nido_admin_user');
      sessionStorage.removeItem('wood_nido_admin_time');
      sessionStorage.removeItem('wood_nido_admin_session_active');
      localStorage.removeItem('wood_nido_admin_remember');
      localStorage.removeItem('wood_nido_admin_token');
      localStorage.removeItem('wood_nido_admin_active_tab');
    } catch {}
    if (onLogout) {
      onLogout();
    } else {
      setViewMode('customer');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
  };

  // Product Modal State
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [productForm, setProductForm] = useState({
    title: '',
    category: 'Furniture',
    price: 25000,
    woodType: 'Solid Ash Wood',
    dimensions: '30"W x 30"D x 30"H',
    finishType: 'Matte Lacquer Finish',
    inStock: true,
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    description: '',
    estimatedDeliveryDays: 7
  });

  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      title: '',
      category: categories[0]?.name || 'Furniture',
      price: 25000,
      woodType: 'Solid Sheesham',
      dimensions: 'Custom Specifications',
      finishType: 'Natural Hand Polish',
      inStock: true,
      featured: false,
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
      description: 'Handcrafted solid hardwood construction with durable protective finish.',
      estimatedDeliveryDays: 7
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod: WoodProduct) => {
    setEditingProductId(prod.id);
    setProductForm({
      title: prod.title,
      category: prod.category,
      price: prod.price,
      woodType: prod.woodType,
      dimensions: prod.dimensions,
      finishType: prod.finishType,
      inStock: prod.inStock,
      featured: prod.featured,
      imageUrl: prod.imageUrl,
      description: prod.description,
      estimatedDeliveryDays: prod.estimatedDeliveryDays || 7
    });
    setIsProductModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.title || !productForm.imageUrl) return;

    if (editingProductId) {
      updateProduct(editingProductId, productForm);
      showToast(`Product "${productForm.title}" updated successfully!`);
    } else {
      addProduct(productForm);
      showToast(`New product "${productForm.title}" added to catalog!`);
    }
    setIsProductModalOpen(false);
  };

  // YouTube Video Modal State
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);
  const [testVideoPreview, setTestVideoPreview] = useState(false);
  const [videoForm, setVideoForm] = useState({
    title: '',
    category: 'Bedroom & Paneling',
    videoUrl: 'https://www.youtube.com/watch?v=kYJvP4vB5pI',
    thumbnailUrl: '',
    description: '',
    duration: '4:20',
    completedDate: 'March 2025'
  });

  const handleOpenAddVideo = () => {
    setEditingVideoId(null);
    setTestVideoPreview(false);
    setVideoForm({
      title: '',
      category: 'Living Room',
      videoUrl: 'https://www.youtube.com/watch?v=kYJvP4vB5pI',
      thumbnailUrl: '',
      description: 'Before & After renovation footage filmed at Wood Nido Islamabad workshop.',
      duration: '4:30',
      completedDate: 'March 2025'
    });
    setIsVideoModalOpen(true);
  };

  const handleOpenEditVideo = (proj: WoodProject) => {
    setEditingVideoId(proj.id);
    setTestVideoPreview(false);
    setVideoForm({
      title: proj.title,
      category: proj.category,
      videoUrl: proj.videoUrl,
      thumbnailUrl: proj.thumbnailUrl,
      description: proj.description,
      duration: proj.duration || '4:00',
      completedDate: proj.completedDate || 'Recent'
    });
    setIsVideoModalOpen(true);
  };

  const handleSaveVideo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!videoForm.title || !videoForm.videoUrl) return;

    let thumb = videoForm.thumbnailUrl;
    if (!thumb && isValidYouTubeUrl(videoForm.videoUrl)) {
      thumb = getYouTubeThumbnail(videoForm.videoUrl);
    }

    const payload = {
      ...videoForm,
      thumbnailUrl: thumb || 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=700&q=80'
    };

    if (editingVideoId) {
      updateProject(editingVideoId, payload);
      showToast(`YouTube video "${videoForm.title}" updated!`);
    } else {
      addProject(payload);
      showToast(`New YouTube video project added!`);
    }
    setIsVideoModalOpen(false);
  };

  // Quick Image Selector Modal
  const [imageEditorModal, setImageEditorModal] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    currentUrl: string;
    onSave: (newUrl: string) => void;
  }>({
    isOpen: false,
    title: '',
    description: '',
    currentUrl: '',
    onSave: () => {}
  });

  const [customImageUrlInput, setCustomImageUrlInput] = useState('');

  const openImageEditor = (title: string, description: string, currentUrl: string, onSave: (newUrl: string) => void) => {
    setCustomImageUrlInput(currentUrl);
    setImageEditorModal({
      isOpen: true,
      title,
      description,
      currentUrl,
      onSave
    });
  };

  const handleApplyImageEdit = () => {
    if (customImageUrlInput.trim()) {
      imageEditorModal.onSave(customImageUrlInput.trim());
      showToast(`${imageEditorModal.title} updated successfully!`);
      setImageEditorModal({ ...imageEditorModal, isOpen: false });
    }
  };

  // Categories Modal State
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [categoryForm, setCategoryForm] = useState({
    name: '',
    slug: '',
    imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
    description: ''
  });

  const handleOpenAddCategory = () => {
    setEditingCategoryId(null);
    setCategoryForm({
      name: '',
      slug: '',
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      description: 'Custom architectural carpentry and premium finishing.'
    });
    setIsCategoryModalOpen(true);
  };

  const handleOpenEditCategory = (cat: WoodCategory) => {
    setEditingCategoryId(cat.id);
    setCategoryForm({
      name: cat.name,
      slug: cat.slug,
      imageUrl: cat.imageUrl,
      description: cat.description
    });
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!categoryForm.name) return;

    const slug = categoryForm.slug || categoryForm.name.toLowerCase().replace(/\s+/g, '-');
    const payload = { ...categoryForm, slug };

    if (editingCategoryId) {
      updateCategory(editingCategoryId, payload);
      showToast(`Category "${categoryForm.name}" updated!`);
    } else {
      addCategory(payload);
      showToast(`New Category "${categoryForm.name}" created!`);
    }
    setIsCategoryModalOpen(false);
  };

  // Settings Form State
  const [settingsForm, setSettingsForm] = useState({ ...siteSettings });

  useEffect(() => {
    setSettingsForm(siteSettings);
  }, [siteSettings]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
    showToast('Business & Contact settings saved successfully!');
  };

  // ZIP Download State
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadZip = () => {
    setIsDownloading(true);
    setIsDownloadModalOpen(true);
    try {
      const byteCharacters = atob(WOOD_NIDO_ZIP_BASE64);
      const byteNumbers = new Uint8Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const blob = new Blob([byteNumbers], { type: 'application/zip' });
      const blobUrl = URL.createObjectURL(blob);

      const downloadLink = document.createElement('a');
      downloadLink.style.display = 'none';
      downloadLink.href = blobUrl;
      downloadLink.download = 'wood-nido-project.zip';
      document.body.appendChild(downloadLink);
      downloadLink.click();

      setTimeout(() => {
        document.body.removeChild(downloadLink);
        URL.revokeObjectURL(blobUrl);
        setIsDownloading(false);
        showToast('wood-nido-project.zip downloaded successfully!');
      }, 700);
    } catch (err) {
      console.error('Download error', err);
      setIsDownloading(false);
    }
  };

  // Hero Slide Editor Modal State
  const [slideEditorModal, setSlideEditorModal] = useState<{
    isOpen: boolean;
    isNew: boolean;
    slideId?: number;
    headline: string;
    itemTitle: string;
    price: string;
    subtext: string;
    imageUrl: string;
    badge: string;
  }>({
    isOpen: false,
    isNew: false,
    headline: '',
    itemTitle: '',
    price: '',
    subtext: '',
    imageUrl: '',
    badge: '100% Solid Hardwood'
  });

  const handleOpenAddSlide = () => {
    setSlideEditorModal({
      isOpen: true,
      isNew: true,
      headline: 'NEW HANDCRAFTED DESIGN',
      itemTitle: 'Artisan Solid Hardwood Furniture',
      price: 'Start From 25k',
      subtext: 'Masterfully built from sustainably harvested kiln-dried timber with precision joinery.',
      imageUrl: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=85',
      badge: 'Custom Made'
    });
  };

  const handleOpenEditSlide = (slide: HeroSlide) => {
    setSlideEditorModal({
      isOpen: true,
      isNew: false,
      slideId: slide.id,
      headline: slide.headline,
      itemTitle: slide.itemTitle,
      price: slide.price,
      subtext: slide.subtext,
      imageUrl: slide.imageUrl,
      badge: slide.badge
    });
  };

  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (slideEditorModal.isNew) {
      addHeroSlide({
        headline: slideEditorModal.headline,
        itemTitle: slideEditorModal.itemTitle,
        price: slideEditorModal.price,
        subtext: slideEditorModal.subtext,
        imageUrl: slideEditorModal.imageUrl,
        badge: slideEditorModal.badge
      });
      showToast('New Hero Slide added successfully!');
    } else if (slideEditorModal.slideId !== undefined) {
      updateHeroSlide(slideEditorModal.slideId, {
        headline: slideEditorModal.headline,
        itemTitle: slideEditorModal.itemTitle,
        price: slideEditorModal.price,
        subtext: slideEditorModal.subtext,
        imageUrl: slideEditorModal.imageUrl,
        badge: slideEditorModal.badge
      });
      showToast('Hero Slide details updated!');
    }
    setSlideEditorModal((prev) => ({ ...prev, isOpen: false }));
  };

  const pendingInquiriesCount = inquiries.filter((i) => i.status === 'New').length;

  return (
    <div className="min-h-screen bg-[#F5F2EC] text-[#1E1B18] flex flex-col lg:flex-row font-sans">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-[#161412] text-white px-5 py-3 rounded-lg border border-amber-500/50 shadow-2xl flex items-center gap-3 animate-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs sm:text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* MOBILE APP HEADER */}
      <header className="lg:hidden bg-[#121110] text-white border-b-2 border-[#C08A3E] sticky top-0 z-40 px-3.5 py-2.5 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 rounded bg-zinc-800/80 text-amber-400 hover:bg-zinc-700 active:scale-95 transition-all cursor-pointer"
            aria-label="Open Admin Menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold font-serif text-xs">
              WN
            </div>
            <div>
              <h1 className="text-xs sm:text-sm font-bold font-serif text-white tracking-tight leading-none">
                Wood Nido
              </h1>
              <span className="text-[10px] text-zinc-400">Admin Panel</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-semibold bg-[#1C1A17] text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded capitalize">
            {activeTab === 'overview' ? 'Overview' : activeTab === 'inquiries' ? `Inquiries (${inquiries.length})` : activeTab}
          </span>
          <button
            onClick={() => setViewMode('customer')}
            className="bg-[#C08A3E] hover:bg-[#A9742B] text-black text-xs font-bold px-2.5 py-1.5 rounded transition-all flex items-center gap-1 shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Site</span>
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-900/40 text-red-300 hover:text-white border border-red-500/40 text-xs font-bold px-2 py-1.5 rounded transition-all flex items-center gap-1 cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </header>

      {/* MOBILE DRAWER SIDEBAR */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <aside className="relative w-72 max-w-[85vw] bg-[#121110] text-white flex flex-col justify-between h-full z-10 shadow-2xl border-r border-zinc-800">
            <div>
              <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-[#181614]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/25 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold font-serif text-sm">
                    WN
                  </div>
                  <div>
                    <h2 className="text-sm font-bold font-serif text-white">Wood Nido Admin</h2>
                    <span className="text-[10px] text-zinc-400 font-mono">#/admin</span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1.5 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-170px)]">
                <button
                  onClick={() => { setActiveTab('overview'); setIsMobileSidebarOpen(false); }}
                  className={`w-full px-3 py-2.5 rounded-md text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === 'overview' ? 'bg-[#C08A3E] text-black font-bold' : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5"><LayoutDashboard className="w-4 h-4" /><span>Dashboard Home</span></div>
                </button>

                <button
                  onClick={() => { setActiveTab('products'); setIsMobileSidebarOpen(false); }}
                  className={`w-full px-3 py-2.5 rounded-md text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === 'products' ? 'bg-[#C08A3E] text-black font-bold' : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5"><Package className="w-4 h-4" /><span>Products Catalog</span></div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">{products.length}</span>
                </button>

                <button
                  onClick={() => { setActiveTab('inquiries'); setIsMobileSidebarOpen(false); }}
                  className={`w-full px-3 py-2.5 rounded-md text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === 'inquiries' ? 'bg-[#C08A3E] text-black font-bold' : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5"><Inbox className="w-4 h-4" /><span>Customer Inquiries</span></div>
                  <div className="flex items-center gap-1">
                    {pendingInquiriesCount > 0 && (
                      <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">{pendingInquiriesCount} new</span>
                    )}
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">{inquiries.length}</span>
                  </div>
                </button>

                <button
                  onClick={() => { setActiveTab('videos'); setIsMobileSidebarOpen(false); }}
                  className={`w-full px-3 py-2.5 rounded-md text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === 'videos' ? 'bg-[#C08A3E] text-black font-bold' : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5"><Youtube className="w-4 h-4 text-red-500" /><span>YouTube Videos</span></div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">{projects.length}</span>
                </button>

                <button
                  onClick={() => { setActiveTab('images'); setIsMobileSidebarOpen(false); }}
                  className={`w-full px-3 py-2.5 rounded-md text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === 'images' ? 'bg-[#C08A3E] text-black font-bold' : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5"><ImageIcon className="w-4 h-4 text-amber-400" /><span>Website Images</span></div>
                </button>

                <button
                  onClick={() => { setActiveTab('categories'); setIsMobileSidebarOpen(false); }}
                  className={`w-full px-3 py-2.5 rounded-md text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === 'categories' ? 'bg-[#C08A3E] text-black font-bold' : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5"><FolderTree className="w-4 h-4" /><span>Categories & Services</span></div>
                </button>

                <button
                  onClick={() => { setActiveTab('settings'); setIsMobileSidebarOpen(false); }}
                  className={`w-full px-3 py-2.5 rounded-md text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === 'settings' ? 'bg-[#C08A3E] text-black font-bold' : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5"><Settings className="w-4 h-4" /><span>Business Info & Settings</span></div>
                </button>
              </nav>
            </div>

            <div className="p-4 border-t border-zinc-800 space-y-2 bg-[#171513]">
              <button
                onClick={() => { setIsMobileSidebarOpen(false); setViewMode('customer'); }}
                className="w-full bg-[#C08A3E] hover:bg-[#A9742B] text-black text-xs font-bold py-2.5 px-3 rounded flex items-center justify-center gap-2 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" /><span>View Live Website</span>
              </button>
              <button
                onClick={() => { setIsMobileSidebarOpen(false); handleLogout(); }}
                className="w-full bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-xs font-bold py-2 px-3 rounded flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogOut className="w-4 h-4" /><span>Admin Sign Out</span>
              </button>
            </div>
          </aside>
        </div>
      )}

      {/* DESKTOP PERSISTENT SIDEBAR */}
      <aside className="hidden lg:flex w-72 bg-[#121110] text-white border-r-2 border-[#26221D] flex-col justify-between shrink-0 sticky top-0 h-screen shadow-xl z-30">
        <div>
          <div className="p-5 border-b border-zinc-800 bg-[#161412]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/25 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold font-serif text-lg shrink-0">
                WN
              </div>
              <div>
                <h1 className="text-base font-bold font-serif text-white tracking-tight leading-tight">
                  Wood Nido
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="bg-amber-500/25 text-amber-300 text-[9px] font-semibold uppercase px-1.5 py-0.2 rounded border border-amber-500/30">
                    Admin Portal
                  </span>
                  <code className="text-[10px] text-zinc-400 font-mono">#/admin</code>
                </div>
              </div>
            </div>
          </div>

          <div className="px-3 py-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-3 mb-2">
              Management Modules
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full px-3 py-2.5 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'overview' ? 'bg-[#C08A3E] text-black font-bold shadow-xs' : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3"><LayoutDashboard className="w-4 h-4" /><span>Dashboard Home</span></div>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`w-full px-3 py-2.5 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'products' ? 'bg-[#C08A3E] text-black font-bold shadow-xs' : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3"><Package className="w-4 h-4" /><span>Products Catalog</span></div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">{products.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('inquiries')}
                className={`w-full px-3 py-2.5 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'inquiries' ? 'bg-[#C08A3E] text-black font-bold shadow-xs' : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3"><Inbox className="w-4 h-4" /><span>Customer Inquiries</span></div>
                <div className="flex items-center gap-1.5">
                  {pendingInquiriesCount > 0 && (
                    <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">{pendingInquiriesCount} new</span>
                  )}
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">{inquiries.length}</span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('videos')}
                className={`w-full px-3 py-2.5 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'videos' ? 'bg-[#C08A3E] text-black font-bold shadow-xs' : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3"><Youtube className="w-4 h-4 text-red-500" /><span>YouTube Videos</span></div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">{projects.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('images')}
                className={`w-full px-3 py-2.5 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'images' ? 'bg-[#C08A3E] text-black font-bold shadow-xs' : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3"><ImageIcon className="w-4 h-4 text-amber-400" /><span>Website Images</span></div>
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className={`w-full px-3 py-2.5 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'categories' ? 'bg-[#C08A3E] text-black font-bold shadow-xs' : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3"><FolderTree className="w-4 h-4" /><span>Categories & Services</span></div>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full px-3 py-2.5 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'settings' ? 'bg-[#C08A3E] text-black font-bold shadow-xs' : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3"><Settings className="w-4 h-4" /><span>Business Info & Settings</span></div>
              </button>
            </nav>
          </div>
        </div>

        <div className="p-4 border-t border-zinc-800 space-y-2.5 bg-[#161412]">
          <button
            onClick={handleDownloadZip}
            className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 px-3 rounded flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <Download className="w-4 h-4" /><span>Download Project ZIP</span>
          </button>

          <button
            onClick={() => setViewMode('customer')}
            className="w-full bg-[#C08A3E] hover:bg-[#A9742B] text-black font-bold text-xs py-2.5 px-3 rounded flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /><span>View Live Website</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0">
        <div className="hidden lg:flex bg-white border-b border-[#DECDBA] px-6 py-3.5 items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#70685E] uppercase tracking-wider">Current Module:</span>
            <span className="text-sm font-bold text-[#1C1A17] flex items-center gap-2">
              <span className="capitalize">{activeTab === 'overview' ? 'Dashboard Home Overview' : activeTab === 'inquiries' ? 'Customer Inquiries & Consultations' : activeTab === 'images' ? 'Website Images Manager' : activeTab}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadZip}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-1.5 px-3 rounded flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" /><span>Download Project ZIP</span>
            </button>
            <button
              onClick={handleLogout}
              className="text-xs bg-red-50 hover:bg-red-100 text-red-700 border border-red-300 py-1.5 px-2.5 rounded flex items-center gap-1.5 font-semibold cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" /><span>Logout</span>
            </button>
          </div>
        </div>

        <main className="px-3 sm:px-6 lg:px-8 py-5 sm:py-7 w-full flex-1 max-w-7xl mx-auto">
        
          {/* TAB 0: DASHBOARD OVERVIEW HOME */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Welcome Banner */}
              <div className="bg-gradient-to-r from-[#1E1B18] to-[#2D2823] text-white p-6 sm:p-8 rounded-xl shadow-lg border border-amber-500/20 relative overflow-hidden">
                <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-radial from-amber-500/10 to-transparent pointer-events-none"></div>
                <div className="relative z-10 space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold border border-amber-500/30">
                    <Sparkles className="w-3.5 h-3.5" /> Welcome back, Master Artisan
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif">Wood Nido Admin Control Center</h2>
                  <p className="text-sm text-zinc-300 max-w-2xl leading-relaxed">
                    Your workshop management system is live and synchronized with Firebase Firestore. Manage your products, view customer consultation inquiries, update gallery photos, and customize your storefront instantly.
                  </p>
                  <div className="pt-3 flex flex-wrap gap-3">
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="bg-[#C08A3E] hover:bg-[#A9742B] text-black font-bold text-xs px-4 py-2.5 rounded transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Inbox className="w-4 h-4" />
                      <span>Check Inquiries ({pendingInquiriesCount} New)</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('products')}
                      className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-4 py-2.5 rounded transition-all flex items-center gap-2 cursor-pointer"
                    >
                      <Package className="w-4 h-4 text-amber-400" />
                      <span>Manage Products ({products.length})</span>
                    </button>
                    <button
                      onClick={() => setViewMode('customer')}
                      className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-xs px-4 py-2.5 rounded transition-all flex items-center gap-2 cursor-pointer border border-zinc-700"
                    >
                      <ExternalLink className="w-4 h-4 text-emerald-400" />
                      <span>View Live Storefront</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div 
                  onClick={() => setActiveTab('products')}
                  className="bg-white p-5 rounded-lg border border-[#DDD3C5] shadow-xs hover:border-[#C08A3E] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Total Products</span>
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-[#C08A3E] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Package className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-2xl font-bold font-serif text-[#1C1A17]">{products.length}</span>
                    <span className="text-xs text-emerald-600 font-medium flex items-center">Active catalog <ArrowUpRight className="w-3 h-3 ml-0.5" /></span>
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('inquiries')}
                  className="bg-white p-5 rounded-lg border border-[#DDD3C5] shadow-xs hover:border-[#C08A3E] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Customer Inquiries</span>
                    <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Inbox className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-2xl font-bold font-serif text-[#1C1A17]">{inquiries.length}</span>
                    {pendingInquiriesCount > 0 ? (
                      <span className="text-xs text-red-600 font-bold bg-red-50 px-2 py-0.5 rounded">{pendingInquiriesCount} New</span>
                    ) : (
                      <span className="text-xs text-gray-500 font-medium">All caught up</span>
                    )}
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('videos')}
                  className="bg-white p-5 rounded-lg border border-[#DDD3C5] shadow-xs hover:border-[#C08A3E] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">YouTube Projects</span>
                    <div className="w-9 h-9 rounded-lg bg-red-50 text-red-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Youtube className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-2xl font-bold font-serif text-[#1C1A17]">{projects.length}</span>
                    <span className="text-xs text-gray-600 font-medium">Videos embedded</span>
                  </div>
                </div>

                <div 
                  onClick={() => setActiveTab('categories')}
                  className="bg-white p-5 rounded-lg border border-[#DDD3C5] shadow-xs hover:border-[#C08A3E] transition-all cursor-pointer group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Renovation Services</span>
                    <div className="w-9 h-9 rounded-lg bg-amber-50 text-[#C08A3E] flex items-center justify-center group-hover:scale-110 transition-transform">
                      <FolderTree className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-baseline justify-between">
                    <span className="text-2xl font-bold font-serif text-[#1C1A17]">{categories.length}</span>
                    <span className="text-xs text-gray-600 font-medium">Core categories</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions & Recent Inquiries Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left 2 Cols: Recent Inquiries Preview */}
                <div className="lg:col-span-2 bg-white p-6 rounded-lg border border-[#DDD3C5] shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                    <h3 className="text-base font-bold font-serif text-[#1C1A17] flex items-center gap-2">
                      <Inbox className="w-4 h-4 text-[#C08A3E]" /> Recent Consultation Inquiries
                    </h3>
                    <button
                      onClick={() => setActiveTab('inquiries')}
                      className="text-xs font-semibold text-[#C08A3E] hover:underline"
                    >
                      View All ({inquiries.length}) →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {inquiries.length === 0 ? (
                      <p className="text-xs text-gray-500 py-6 text-center">No inquiries received yet.</p>
                    ) : (
                      inquiries.slice(0, 3).map((inq) => (
                        <div key={inq.id} className="p-3.5 bg-[#FAF8F5] rounded border border-gray-200 flex items-center justify-between gap-4">
                          <div className="space-y-0.5 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-xs text-[#1C1A17]">{inq.customerName}</span>
                              <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${inq.status === 'New' ? 'bg-amber-100 text-amber-900' : 'bg-emerald-100 text-emerald-900'}`}>
                                {inq.status}
                              </span>
                            </div>
                            <p className="text-xs text-[#C08A3E] font-medium">{inq.category}</p>
                            <p className="text-[11px] text-gray-600 truncate">{inq.requirement}</p>
                          </div>
                          <button
                            onClick={() => setActiveTab('inquiries')}
                            className="shrink-0 px-3 py-1.5 bg-[#121110] text-white text-xs rounded hover:bg-[#2B2724]"
                          >
                            Open
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Right Col: Quick Shortcuts */}
                <div className="bg-white p-6 rounded-lg border border-[#DDD3C5] shadow-xs space-y-4">
                  <h3 className="text-base font-bold font-serif text-[#1C1A17] border-b border-gray-100 pb-3">
                    ⚡ Quick Management
                  </h3>
                  <div className="space-y-2.5">
                    <button
                      onClick={() => { setActiveTab('products'); handleOpenAddProduct(); }}
                      className="w-full text-left p-3 rounded bg-[#FAF8F5] hover:bg-amber-50/60 border border-gray-200 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Plus className="w-4 h-4 text-[#C08A3E]" />
                        <span className="text-xs font-bold text-gray-800">Add New Wood Product</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
                    </button>

                    <button
                      onClick={() => setActiveTab('images')}
                      className="w-full text-left p-3 rounded bg-[#FAF8F5] hover:bg-amber-50/60 border border-gray-200 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <ImageIcon className="w-4 h-4 text-amber-500" />
                        <span className="text-xs font-bold text-gray-800">Update Hero / About Photos</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
                    </button>

                    <button
                      onClick={() => setActiveTab('videos')}
                      className="w-full text-left p-3 rounded bg-[#FAF8F5] hover:bg-amber-50/60 border border-gray-200 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Youtube className="w-4 h-4 text-red-600" />
                        <span className="text-xs font-bold text-gray-800">Manage YouTube Videos</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
                    </button>

                    <button
                      onClick={() => setActiveTab('settings')}
                      className="w-full text-left p-3 rounded bg-[#FAF8F5] hover:bg-amber-50/60 border border-gray-200 flex items-center justify-between transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5">
                        <Settings className="w-4 h-4 text-zinc-700" />
                        <span className="text-xs font-bold text-gray-800">Business & Social Links</span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 1: PRODUCTS */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-[#DDD3C5] shadow-xs">
                <div>
                  <h2 className="text-xl font-bold font-serif text-[#1C1A17]">Wood Products Management</h2>
                  <p className="text-xs sm:text-sm text-[#70685E] mt-0.5">Add, edit, change images, update prices, or mark out-of-stock items.</p>
                </div>
                <button
                  onClick={handleOpenAddProduct}
                  className="bg-[#121110] hover:bg-[#2B2724] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-sm transition-all flex items-center gap-2 shadow-xs cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-amber-400" /><span>Add New Product</span>
                </button>
              </div>

              <div className="bg-white rounded-lg border border-[#DDD3C5] shadow-xs overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm text-[#3E3831]">
                    <thead className="bg-[#FAF7F2] border-b border-[#E3DBD0] text-[11px] uppercase tracking-wider text-gray-600 font-semibold">
                      <tr>
                        <th className="py-3 px-4">Product & Image</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Wood Type</th>
                        <th className="py-3 px-4">Price (PKR)</th>
                        <th className="py-3 px-4">Stock Status</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#EFE8DD]">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-[#FAF8F5] transition-colors">
                          <td className="py-3.5 px-4">
                            <div className="flex items-center gap-3">
                              <div className="relative w-12 h-12 rounded bg-gray-100 overflow-hidden border border-gray-200 shrink-0">
                                <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                              </div>
                              <div>
                                <div className="font-bold text-[#1C1A17] line-clamp-1">{p.title}</div>
                                <div className="text-[11px] text-gray-500">{p.dimensions}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-3.5 px-4 font-medium text-[#C08A3E]">{p.category}</td>
                          <td className="py-3.5 px-4 text-gray-600">{p.woodType}</td>
                          <td className="py-3.5 px-4 font-bold text-[#1C1A17]">Rs {p.price.toLocaleString()}</td>
                          <td className="py-3.5 px-4">
                            <button
                              onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                              className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                                p.inStock ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-rose-50 text-rose-700 border-rose-300'
                              }`}
                            >
                              {p.inStock ? 'In Stock' : 'Made to Order'}
                            </button>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button onClick={() => handleOpenEditProduct(p)} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors" title="Edit">
                                <Edit2 className="w-4 h-4" />
                              </button>
                              <button onClick={() => { if (confirm(`Delete "${p.title}"?`)) deleteProduct(p.id); }} className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors" title="Delete">
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: VIDEOS */}
          {activeTab === 'videos' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-[#DDD3C5] shadow-xs">
                <div>
                  <h2 className="text-xl font-bold font-serif text-[#1C1A17]">YouTube Project Videos Manager</h2>
                  <p className="text-xs sm:text-sm text-[#70685E] mt-1">Set, edit, or add YouTube video links anytime.</p>
                </div>
                <button
                  onClick={handleOpenAddVideo}
                  className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4 text-white" /><span>Add YouTube Video</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((proj) => {
                  const thumb = proj.thumbnailUrl || getYouTubeThumbnail(proj.videoUrl);
                  return (
                    <div key={proj.id} className="bg-white rounded-lg border border-[#DECDBA] overflow-hidden shadow-xs flex flex-col justify-between">
                      <div>
                        <div className="relative aspect-video w-full bg-black overflow-hidden">
                          <img src={thumb} alt={proj.title} className="w-full h-full object-cover opacity-90" referrerPolicy="no-referrer" />
                          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                            <a href={proj.videoUrl} target="_blank" rel="noopener noreferrer" className="w-12 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white">
                              <Play className="w-4 h-4 fill-current ml-0.5" />
                            </a>
                          </div>
                        </div>
                        <div className="p-4 space-y-2">
                          <span className="font-semibold text-[#C08A3E] text-xs uppercase">{proj.category}</span>
                          <h3 className="text-sm font-bold text-[#1C1A17] line-clamp-2">{proj.title}</h3>
                          <p className="text-xs text-[#70685E] line-clamp-2">{proj.description}</p>
                        </div>
                      </div>
                      <div className="p-3 bg-[#FAF8F5] border-t border-[#EAE4D8] flex items-center justify-between">
                        <button onClick={() => handleOpenEditVideo(proj)} className="px-2.5 py-1 text-xs font-semibold bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 flex items-center gap-1">
                          <Edit2 className="w-3 h-3" /><span>Edit</span>
                        </button>
                        <button onClick={() => deleteProject(proj.id)} className="px-2.5 py-1 text-xs font-semibold bg-white border border-red-200 rounded text-red-600 hover:bg-red-50 flex items-center gap-1">
                          <Trash2 className="w-3 h-3" /><span>Delete</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: IMAGES (FIXED HERO SLIDER DETAILS BUTTON CLICK) */}
          {activeTab === 'images' && (
            <div className="space-y-10">
              <div className="bg-white p-5 rounded-lg border border-[#DDD3C5] shadow-xs">
                <h2 className="text-xl font-bold font-serif text-[#1C1A17]">Website Images Manager</h2>
                <p className="text-xs sm:text-sm text-[#70685E] mt-0.5">Click "Photo" to update images, or "Details" to edit headlines and price texts.</p>
              </div>

              {/* Hero Slider Images */}
              <div className="bg-white p-4 sm:p-6 rounded-lg border border-[#DDD3C5] space-y-4">
                <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <h3 className="text-base font-bold text-[#1C1A17] font-serif">1. Top Hero Slider Images</h3>
                  {(siteSettings.heroSlides || []).length < 10 && (
                    <button onClick={handleOpenAddSlide} className="bg-[#121110] text-white text-xs font-semibold px-3.5 py-2 rounded flex items-center gap-1.5 cursor-pointer">
                      <Plus className="w-3.5 h-3.5 text-amber-400" /><span>Add Hero Slide</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {(siteSettings.heroSlides || []).map((slide, idx) => (
                    <div key={slide.id} className="border border-gray-200 rounded-lg p-3 bg-[#FAF8F5] space-y-2.5 flex flex-col justify-between">
                      <div>
                        <div className="relative aspect-4/3 rounded overflow-hidden border border-gray-300 bg-gray-100 mb-2">
                          <img src={slide.imageUrl} alt={slide.headline} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{slide.headline}</h4>
                        <p className="text-[11px] text-gray-500 line-clamp-1">{slide.itemTitle}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-gray-200">
                        <button
                          onClick={() => openImageEditor(`Hero Slide ${idx + 1} Image`, 'Enter any image URL.', slide.imageUrl, (newUrl) => updateHeroSlide(slide.id, { imageUrl: newUrl }))}
                          className="py-1.5 px-2 bg-white text-gray-800 border text-[11px] font-semibold rounded flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <ImageIcon className="w-3 h-3 text-amber-600" /><span>Photo</span>
                        </button>
                        <button 
                          onClick={() => handleOpenEditSlide(slide)} 
                          className="py-1.5 px-2 bg-white hover:bg-amber-50 text-gray-800 border border-gray-300 text-[11px] font-semibold rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3 text-amber-600" /><span>Details</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-[#DDD3C5] shadow-xs">
                <h2 className="text-xl font-bold font-serif text-[#1C1A17]">Categories & Woodwork Services</h2>
                <button onClick={handleOpenAddCategory} className="bg-[#121110] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-sm flex items-center gap-2 cursor-pointer">
                  <Plus className="w-4 h-4 text-amber-400" /><span>Add Category</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((c) => (
                  <div key={c.id} className="bg-white rounded-lg border border-[#DECDBA] overflow-hidden shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden">
                        <img src={c.imageUrl} alt={c.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="p-4 space-y-1">
                        <h3 className="text-base font-bold text-[#1C1A17]">{c.name}</h3>
                        <p className="text-xs text-[#70685E] line-clamp-2">{c.description}</p>
                      </div>
                    </div>
                    <div className="p-3 bg-[#FAF8F5] border-t border-[#EAE4D8] flex items-center justify-between">
                      <button onClick={() => handleOpenEditCategory(c)} className="px-2.5 py-1 text-xs font-semibold bg-white border rounded text-gray-700 flex items-center gap-1">
                        <Edit2 className="w-3 h-3" /><span>Edit</span>
                      </button>
                      <button onClick={() => deleteCategory(c.id)} className="px-2.5 py-1 text-xs font-semibold bg-white border border-red-200 rounded text-red-600 flex items-center gap-1">
                        <Trash2 className="w-3 h-3" /><span>Delete</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: INQUIRIES */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-lg border border-[#DDD3C5] shadow-xs flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold font-serif text-[#1C1A17]">Customer Inquiries & Consultation Requests</h2>
                  <p className="text-xs sm:text-sm text-[#70685E] mt-0.5">Customers submitting measurements and quotation demands.</p>
                </div>
                <div className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-3 py-1.5 rounded font-medium">
                  Total Inquiries: {inquiries.length}
                </div>
              </div>

              <div className="space-y-4">
                {inquiries.length === 0 ? (
                  <div className="bg-white p-12 text-center text-gray-500 rounded border border-gray-200">
                    No consultation inquiries received yet.
                  </div>
                ) : (
                  inquiries.map((inq) => {
                    const phoneVal = inq?.phone || '';
                    const whatsappClean = phoneVal.replace(/[^0-9]/g, '');
                    const customerName = inq?.customerName || 'Valued Customer';
                    const categoryName = inq?.category || 'Custom Woodwork';
                    const requirementText = inq?.requirement || 'No specific requirements provided.';
                    const createdAtTime = inq?.createdAt || 'Recent';
                    const inquiryId = inq?.id || Math.random().toString();
                    const inquiryStatus = inq?.status || 'New';

                    const whatsappText = encodeURIComponent(
                      `Hello ${customerName}, this is Wood Nido customer desk regarding your inquiry for ${categoryName}.`
                    );

                    return (
                      <div
                        key={inquiryId}
                        className="bg-white p-5 rounded-lg border border-[#DDD3C5] shadow-xs hover:border-[#C08A3E] transition-colors space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                          <div>
                            <span className="text-base font-bold text-[#1C1A17]">
                              {customerName}
                            </span>
                            <span className="text-xs text-gray-500 ml-3">
                              Submitted on {createdAtTime}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-gray-600">Status:</span>
                            <select
                              value={inquiryStatus}
                              onChange={(e) =>
                                updateInquiryStatus(inquiryId, e.target.value as CustomerInquiry['status'])
                              }
                              className={`text-xs font-bold px-2.5 py-1 rounded border ${
                                inquiryStatus === 'New'
                                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                                  : inquiryStatus === 'In Progress'
                                  ? 'bg-blue-100 text-blue-900 border-blue-300'
                                  : inquiryStatus === 'Quoted'
                                  ? 'bg-purple-100 text-purple-900 border-purple-300'
                                  : 'bg-emerald-100 text-emerald-900 border-emerald-300'
                              }`}
                            >
                              <option value="New">New</option>
                              <option value="In Progress">In Progress</option>
                              <option value="Quoted">Quoted</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                          <div className="bg-[#FAF8F5] p-2.5 rounded border border-gray-200">
                            <span className="text-gray-500 block text-[10px] uppercase">Service Requested</span>
                            <span className="font-bold text-[#C08A3E] text-sm">{categoryName}</span>
                          </div>
                          <div className="bg-[#FAF8F5] p-2.5 rounded border border-gray-200">
                            <span className="text-gray-500 block text-[10px] uppercase">Contact Phone</span>
                            <a href={`tel:${phoneVal}`} className="font-bold text-[#1C1A17] hover:underline">
                              {phoneVal || 'N/A'}
                            </a>
                          </div>
                          <div className="bg-[#FAF8F5] p-2.5 rounded border border-gray-200">
                            <span className="text-gray-500 block text-[10px] uppercase">Email</span>
                            <span className="font-medium text-gray-800">{inq?.email || 'N/A'}</span>
                          </div>
                        </div>

                        <div className="text-xs text-gray-700 bg-amber-50/40 p-3 rounded border border-amber-100/80 leading-relaxed">
                          <strong className="text-amber-900 block mb-0.5">Customer Requirements:</strong>
                          {requirementText}
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                          {whatsappClean ? (
                            <a
                              href={`https://wa.me/${whatsappClean}?text=${whatsappText}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors"
                            >
                              <MessageSquare className="w-3.5 h-3.5" />
                              <span>Reply via WhatsApp</span>
                            </a>
                          ) : (
                            <span className="text-xs text-gray-400">No WhatsApp available</span>
                          )}

                          <button
                            onClick={() => {
                              if (confirm(`Delete inquiry from ${customerName}?`)) {
                                deleteInquiry(inquiryId);
                                showToast('Inquiry removed.');
                              }
                            }}
                            className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1 cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div className="bg-white p-5 rounded-lg border border-[#DDD3C5] shadow-xs">
                <h2 className="text-xl font-bold font-serif text-[#1C1A17]">Business Contact & Brand Settings</h2>
                <p className="text-xs sm:text-sm text-[#70685E] mt-0.5">Update business name, WhatsApp number, Islamabad showroom address, and social media links.</p>
              </div>

              <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-lg border border-[#DDD3C5] space-y-6 shadow-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Business Name</label>
                    <input
                      type="text"
                      value={settingsForm.businessName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, businessName: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Tagline</label>
                    <input
                      type="text"
                      value={settingsForm.tagline}
                      onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Phone Number</label>
                    <input
                      type="text"
                      value={settingsForm.phone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">WhatsApp Inquiry Number</label>
                    <input
                      type="text"
                      value={settingsForm.whatsappNumber}
                      onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Email Address</label>
                    <input
                      type="email"
                      value={settingsForm.email}
                      onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Showroom & Workshop Address</label>
                    <input
                      type="text"
                      value={settingsForm.address}
                      onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                      className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5]"
                    />
                  </div>
                </div>

                {/* SOCIAL MEDIA PROFILES SECTION */}
                <div className="pt-5 border-t border-gray-200">
                  <div className="mb-3">
                    <h3 className="text-sm font-bold text-[#1C1A17] uppercase tracking-wide">
                      Social Media Profiles & Links
                    </h3>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Manage the links for Facebook, Instagram, TikTok, and YouTube displayed across the footer.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-600"></span>
                        Facebook Page URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://facebook.com/woodnido"
                        value={settingsForm.facebookUrl || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, facebookUrl: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-pink-600"></span>
                        Instagram Profile URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://instagram.com/woodnido"
                        value={settingsForm.instagramUrl || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, instagramUrl: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-black"></span>
                        TikTok Account URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://tiktok.com/@woodnido"
                        value={settingsForm.tiktokUrl || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, tiktokUrl: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-600"></span>
                        YouTube Channel URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://youtube.com/@woodnido"
                        value={settingsForm.youtubeUrl || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, youtubeUrl: e.target.value })}
                        className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200 flex justify-end">
                  <button type="submit" className="bg-[#121110] hover:bg-[#2B2724] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-sm flex items-center gap-2 cursor-pointer">
                    <Save className="w-4 h-4 text-amber-400" /><span>Save All Settings</span>
                  </button>
                </div>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* UNIVERSAL IMAGE EDITOR MODAL */}
      {imageEditorModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative w-full max-w-xl bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#FAF8F5]">
              <h3 className="text-base font-bold text-[#1C1A17] font-serif">{imageEditorModal.title}</h3>
              <button onClick={() => setImageEditorModal({ ...imageEditorModal, isOpen: false })} className="p-1 text-gray-400 hover:text-black rounded-full cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-xs text-gray-600">{imageEditorModal.description}</p>
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Image URL</label>
                <input
                  type="url"
                  value={customImageUrlInput}
                  onChange={(e) => setCustomImageUrlInput(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded bg-[#FAF8F5]"
                />
              </div>
              <div className="pt-3 border-t border-gray-200 flex justify-end gap-3">
                <button type="button" onClick={() => setImageEditorModal({ ...imageEditorModal, isOpen: false })} className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded rounded-md cursor-pointer">
                  Cancel
                </button>
                <button type="button" onClick={handleApplyImageEdit} className="bg-[#121110] text-white text-xs font-semibold px-6 py-2 rounded flex items-center gap-2 cursor-pointer">
                  <Check className="w-4 h-4 text-amber-400" /><span>Apply to Website</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HERO SLIDE EDIT DETAILS MODAL */}
      {slideEditorModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
          <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#FAF8F5]">
              <h3 className="text-base font-bold text-[#1C1A17] font-serif">
                {slideEditorModal.isNew ? 'Add New Hero Slide' : 'Edit Slide Headings & Price'}
              </h3>
              <button onClick={() => setSlideEditorModal(prev => ({ ...prev, isOpen: false }))} className="p-1 text-gray-400 hover:text-black rounded-full cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSlide} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Headline</label>
                <input
                  type="text"
                  required
                  value={slideEditorModal.headline}
                  onChange={(e) => setSlideEditorModal({ ...slideEditorModal, headline: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Item Title / Subheading</label>
                <input
                  type="text"
                  required
                  value={slideEditorModal.itemTitle}
                  onChange={(e) => setSlideEditorModal({ ...slideEditorModal, itemTitle: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Price Tag</label>
                  <input
                    type="text"
                    required
                    value={slideEditorModal.price}
                    onChange={(e) => setSlideEditorModal({ ...slideEditorModal, price: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Badge</label>
                  <input
                    type="text"
                    value={slideEditorModal.badge}
                    onChange={(e) => setSlideEditorModal({ ...slideEditorModal, badge: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Image URL</label>
                <input
                  type="url"
                  required
                  value={slideEditorModal.imageUrl}
                  onChange={(e) => setSlideEditorModal({ ...slideEditorModal, imageUrl: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Description / Subtext</label>
                <textarea
                  rows={2}
                  value={slideEditorModal.subtext}
                  onChange={(e) => setSlideEditorModal({ ...slideEditorModal, subtext: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5]"
                />
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-end gap-3">
                <button type="button" onClick={() => setSlideEditorModal(prev => ({ ...prev, isOpen: false }))} className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="bg-[#121110] text-white text-xs font-semibold px-6 py-2 rounded flex items-center gap-2 cursor-pointer">
                  <Save className="w-4 h-4 text-amber-400" /><span>Save Slide Details</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
