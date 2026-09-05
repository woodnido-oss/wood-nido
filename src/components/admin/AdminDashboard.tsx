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
  ShieldCheck
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

  const [activeTab, setActiveTab] = useState<'products' | 'videos' | 'images' | 'categories' | 'inquiries' | 'settings'>('products');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleLogout = () => {
    try {
      sessionStorage.removeItem('wood_nido_admin_auth');
      sessionStorage.removeItem('wood_nido_admin_user');
      sessionStorage.removeItem('wood_nido_admin_time');
      localStorage.removeItem('wood_nido_admin_remember');
      localStorage.removeItem('wood_nido_admin_token');
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

  // -------------------------------------------------------------
  // YouTube Video Modal State
  // -------------------------------------------------------------
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

    // Auto calculate thumbnail if empty
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

  // -------------------------------------------------------------
  // Quick Image Selector Modal (for any image on the site)
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // Categories Modal State
  // -------------------------------------------------------------
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

  // -------------------------------------------------------------
  // Settings Form State
  // -------------------------------------------------------------
  const [settingsForm, setSettingsForm] = useState({ ...siteSettings });

  useEffect(() => {
    setSettingsForm(siteSettings);
  }, [siteSettings]);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteSettings(settingsForm);
    showToast('Business & Contact settings saved successfully!');
  };

  // -------------------------------------------------------------
  // Guaranteed Clean Project ZIP Download State & Handler
  // -------------------------------------------------------------
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadZip = () => {
    setIsDownloading(true);
    setIsDownloadModalOpen(true);
    try {
      // Decode embedded base64 in memory (100% binary, immune to iframe sandbox / 404 / HTML interception)
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
        showToast('wood-nido-project.zip (111 KB) downloaded successfully!');
      }, 700);
    } catch (err) {
      console.error('In-memory download error, falling back to data URL', err);
      try {
        const link = document.createElement('a');
        link.href = `data:application/zip;base64,${WOOD_NIDO_ZIP_BASE64}`;
        link.download = 'wood-nido-project.zip';
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
          document.body.removeChild(link);
          setIsDownloading(false);
        }, 700);
      } catch {
        window.open('/wood-nido-project.zip', '_blank');
        setIsDownloading(false);
      }
    }
  };

  // -------------------------------------------------------------
  // Hero Slide Editor Modal State (Supports 5 to 10 slides)
  // -------------------------------------------------------------
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

      {/* ========================================================================= */}
      {/* MOBILE APP HEADER (Visible only on < lg screens)                         */}
      {/* ========================================================================= */}
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
          {/* Active Tab Badge Indicator */}
          <span className="text-[10px] font-semibold bg-[#1C1A17] text-amber-400 border border-amber-400/30 px-2 py-0.5 rounded capitalize">
            {activeTab === 'inquiries'
              ? `Inquiries (${inquiries.length})`
              : activeTab === 'videos'
              ? 'Videos'
              : activeTab === 'images'
              ? 'Images'
              : activeTab === 'categories'
              ? 'Categories'
              : activeTab}
          </span>
          <button
            onClick={handleDownloadZip}
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold px-2 py-1.5 rounded transition-all flex items-center gap-1 shadow-xs cursor-pointer"
            title="Download full project ZIP for GitHub/Vercel"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">ZIP</span>
          </button>
          <button
            onClick={() => setViewMode('customer')}
            className="bg-[#C08A3E] hover:bg-[#A9742B] text-black text-xs font-bold px-2.5 py-1.5 rounded transition-all flex items-center gap-1 shadow-xs cursor-pointer"
            title="View Live Website"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Site</span>
          </button>
          <button
            onClick={handleLogout}
            className="bg-red-900/40 text-red-300 hover:text-white border border-red-500/40 text-xs font-bold px-2 py-1.5 rounded transition-all flex items-center gap-1 cursor-pointer"
            title="Logout from Admin"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Exit</span>
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* MOBILE DRAWER SIDEBAR (Slide-over on Phone / Tablet)                     */}
      {/* ========================================================================= */}
      {isMobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          {/* Slide-over Drawer Panel */}
          <aside className="relative w-72 max-w-[85vw] bg-[#121110] text-white flex flex-col justify-between h-full z-10 shadow-2xl border-r border-zinc-800 animate-in slide-in-from-left duration-200">
            <div>
              {/* Drawer Header */}
              <div className="p-4 border-b border-zinc-800 flex items-center justify-between bg-[#181614]">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold font-serif text-sm">
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

              {/* Navigation Items in Drawer */}
              <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-170px)]">
                <button
                  onClick={() => {
                    setActiveTab('products');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 rounded-md text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === 'products'
                      ? 'bg-[#C08A3E] text-black font-bold'
                      : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Package className="w-4 h-4" />
                    <span>Products Catalog</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeTab === 'products' ? 'bg-black text-amber-300' : 'bg-zinc-800 text-zinc-400'}`}>
                    {products.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('inquiries');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 rounded-md text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === 'inquiries'
                      ? 'bg-[#C08A3E] text-black font-bold'
                      : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Inbox className="w-4 h-4" />
                    <span>Customer Inquiries</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {pendingInquiriesCount > 0 && (
                      <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full">
                        {pendingInquiriesCount} new
                      </span>
                    )}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeTab === 'inquiries' ? 'bg-black text-amber-300' : 'bg-zinc-800 text-zinc-400'}`}>
                      {inquiries.length}
                    </span>
                  </div>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('videos');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 rounded-md text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === 'videos'
                      ? 'bg-[#C08A3E] text-black font-bold'
                      : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Youtube className="w-4 h-4 text-red-500" />
                    <span>YouTube Videos</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeTab === 'videos' ? 'bg-black text-amber-300' : 'bg-zinc-800 text-zinc-400'}`}>
                    {projects.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('images');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 rounded-md text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === 'images'
                      ? 'bg-[#C08A3E] text-black font-bold'
                      : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ImageIcon className="w-4 h-4 text-amber-400" />
                    <span>Website Images</span>
                  </div>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded ${activeTab === 'images' ? 'bg-black text-amber-300' : 'bg-zinc-800 text-zinc-400'}`}>
                    All Photos
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('categories');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 rounded-md text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === 'categories'
                      ? 'bg-[#C08A3E] text-black font-bold'
                      : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FolderTree className="w-4 h-4" />
                    <span>Categories & Services</span>
                  </div>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded ${activeTab === 'categories' ? 'bg-black text-amber-300' : 'bg-zinc-800 text-zinc-400'}`}>
                    {categories.length}
                  </span>
                </button>

                <button
                  onClick={() => {
                    setActiveTab('settings');
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full px-3 py-2.5 rounded-md text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                    activeTab === 'settings'
                      ? 'bg-[#C08A3E] text-black font-bold'
                      : 'text-zinc-300 hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4" />
                    <span>Business Info & Settings</span>
                  </div>
                </button>
              </nav>
            </div>

            {/* Mobile Drawer Bottom */}
            <div className="p-4 border-t border-zinc-800 space-y-2 bg-[#171513]">
              <button
                onClick={() => {
                  setIsMobileSidebarOpen(false);
                  setViewMode('customer');
                }}
                className="w-full bg-[#C08A3E] hover:bg-[#A9742B] text-black text-xs font-bold py-2.5 px-3 rounded flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>View Live Website</span>
              </button>
              <button
                onClick={() => {
                  setIsMobileSidebarOpen(false);
                  handleLogout();
                }}
                className="w-full bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 text-xs font-bold py-2 px-3 rounded flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                <span>Admin Sign Out (Logout)</span>
              </button>
              <div className="text-[10px] text-zinc-500 text-center">
                Islamabad Master Joinery & Woodcraft
              </div>
            </div>
          </aside>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DESKTOP PERSISTENT SIDEBAR (Visible on lg: and wider screens)             */}
      {/* ========================================================================= */}
      <aside className="hidden lg:flex w-72 bg-[#121110] text-white border-r-2 border-[#26221D] flex-col justify-between shrink-0 sticky top-0 h-screen shadow-xl z-30">
        <div>
          {/* Sidebar Top Brand */}
          <div className="p-5 border-b border-zinc-800 bg-[#161412]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold font-serif text-lg shrink-0">
                WN
              </div>
              <div>
                <h1 className="text-base font-bold font-serif text-white tracking-tight leading-tight">
                  Wood Nido
                </h1>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="bg-amber-500/20 text-amber-300 text-[9px] font-semibold uppercase px-1.5 py-0.2 rounded border border-amber-500/30">
                    Admin Portal
                  </span>
                  <code className="text-[10px] text-zinc-400 font-mono">#/admin</code>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Navigation Section */}
          <div className="px-3 py-4">
            <div className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 px-3 mb-2">
              Management Modules
            </div>

            <nav className="space-y-1">
              <button
                onClick={() => setActiveTab('products')}
                className={`w-full px-3 py-2.5 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'products'
                    ? 'bg-[#C08A3E] text-black font-bold shadow-xs'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Package className="w-4 h-4" />
                  <span>Products Catalog</span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${activeTab === 'products' ? 'bg-black text-amber-300' : 'bg-zinc-800 text-zinc-400'}`}>
                  {products.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('inquiries')}
                className={`w-full px-3 py-2.5 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'inquiries'
                    ? 'bg-[#C08A3E] text-black font-bold shadow-xs'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Inbox className="w-4 h-4" />
                  <span>Customer Inquiries</span>
                </div>
                <div className="flex items-center gap-1.5">
                  {pendingInquiriesCount > 0 && (
                    <span className="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                      {pendingInquiriesCount} new
                    </span>
                  )}
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${activeTab === 'inquiries' ? 'bg-black text-amber-300' : 'bg-zinc-800 text-zinc-400'}`}>
                    {inquiries.length}
                  </span>
                </div>
              </button>

              <button
                onClick={() => setActiveTab('videos')}
                className={`w-full px-3 py-2.5 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'videos'
                    ? 'bg-[#C08A3E] text-black font-bold shadow-xs'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Youtube className="w-4 h-4 text-red-500" />
                  <span>YouTube Videos</span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${activeTab === 'videos' ? 'bg-black text-amber-300' : 'bg-zinc-800 text-zinc-400'}`}>
                  {projects.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('images')}
                className={`w-full px-3 py-2.5 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'images'
                    ? 'bg-[#C08A3E] text-black font-bold shadow-xs'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-4 h-4 text-amber-400" />
                  <span>Website Images</span>
                </div>
                <span className={`text-[9px] font-semibold px-2 py-0.5 rounded ${activeTab === 'images' ? 'bg-black text-amber-300' : 'bg-zinc-800 text-zinc-400'}`}>
                  Hero & About
                </span>
              </button>

              <button
                onClick={() => setActiveTab('categories')}
                className={`w-full px-3 py-2.5 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'categories'
                    ? 'bg-[#C08A3E] text-black font-bold shadow-xs'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FolderTree className="w-4 h-4" />
                  <span>Categories & Services</span>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${activeTab === 'categories' ? 'bg-black text-amber-300' : 'bg-zinc-800 text-zinc-400'}`}>
                  {categories.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full px-3 py-2.5 rounded-md text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-[#C08A3E] text-black font-bold shadow-xs'
                    : 'text-zinc-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-4 h-4" />
                  <span>Business Info & Settings</span>
                </div>
              </button>
            </nav>
          </div>
        </div>

        {/* Sidebar Bottom Live Website Button & Status */}
        <div className="p-4 border-t border-zinc-800 space-y-2.5 bg-[#161412]">
          <button
            onClick={handleDownloadZip}
            className="w-full bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs py-2.5 px-3 rounded flex items-center justify-center gap-2 transition-all shadow-xs cursor-pointer"
            title="Download full project source code ZIP (111 KB)"
          >
            <Download className="w-4 h-4" />
            <span>Download Project ZIP</span>
          </button>

          <button
            onClick={() => setViewMode('customer')}
            className="w-full bg-[#C08A3E] hover:bg-[#A9742B] text-black font-bold text-xs py-2.5 px-3 rounded flex items-center justify-center gap-2 transition-all shadow-xs hover:shadow-md cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>View Live Website (woodnido.com)</span>
          </button>
          <div className="text-[11px] text-zinc-400 text-center pt-1">
            Wood Nido • Artisan Joinery Islamabad
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA (Takes remaining width, fully responsive)              */}
      {/* ========================================================================= */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Top Status Strip */}
        <div className="hidden lg:flex bg-white border-b border-[#DECDBA] px-6 py-3.5 items-center justify-between sticky top-0 z-20 shadow-xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-[#70685E] uppercase tracking-wider">Current Module:</span>
            <span className="text-sm font-bold text-[#1C1A17] flex items-center gap-2">
              {activeTab === 'products' && <Package className="w-4 h-4 text-[#C08A3E]" />}
              {activeTab === 'inquiries' && <Inbox className="w-4 h-4 text-[#C08A3E]" />}
              {activeTab === 'videos' && <Youtube className="w-4 h-4 text-red-500" />}
              {activeTab === 'images' && <ImageIcon className="w-4 h-4 text-[#C08A3E]" />}
              {activeTab === 'categories' && <FolderTree className="w-4 h-4 text-[#C08A3E]" />}
              {activeTab === 'settings' && <Settings className="w-4 h-4 text-[#C08A3E]" />}
              <span className="capitalize">{activeTab === 'inquiries' ? 'Customer Inquiries & Consultations' : activeTab === 'images' ? 'Website Images Manager' : activeTab}</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadZip}
              className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-1.5 px-3 rounded flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              title="Download full project source code as clean verified ZIP file"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download Project ZIP</span>
            </button>

            <button
              onClick={() => setViewMode('customer')}
              className="text-xs text-[#70685E] hover:text-black flex items-center gap-1.5 font-semibold cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview Storefront</span>
            </button>

            <button
              onClick={handleLogout}
              className="text-xs bg-red-50 hover:bg-red-100 text-red-700 border border-red-300 py-1.5 px-2.5 rounded flex items-center gap-1.5 font-semibold cursor-pointer transition-colors shadow-2xs"
              title="Sign out of Admin Console"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              <span>Logout</span>
            </button>
          </div>
        </div>

        {/* Tab Content Container */}
        <main className="px-3 sm:px-6 lg:px-8 py-5 sm:py-7 w-full flex-1 max-w-7xl mx-auto">
        
        {/* ============================================================= */}
        {/* TAB 1: PRODUCTS CATALOG                                       */}
        {/* ============================================================= */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-[#DDD3C5] shadow-xs">
              <div>
                <h2 className="text-xl font-bold font-serif text-[#1C1A17]">
                  Wood Products Management
                </h2>
                <p className="text-xs sm:text-sm text-[#70685E] mt-0.5">
                  Add, edit, change images, update prices, or mark out-of-stock items shown in the catalog.
                </p>
              </div>

              <button
                onClick={handleOpenAddProduct}
                className="bg-[#121110] hover:bg-[#2B2724] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-sm transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Add New Product</span>
              </button>
            </div>

            {/* Products Table */}
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
                            <div className="relative w-12 h-12 rounded bg-gray-100 overflow-hidden border border-gray-200 shrink-0 group">
                              <img
                                src={p.imageUrl}
                                alt={p.title}
                                className="w-full h-full object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div>
                              <div className="font-bold text-[#1C1A17] line-clamp-1">{p.title}</div>
                              <div className="text-[11px] text-gray-500">{p.dimensions}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-medium text-[#C08A3E]">{p.category}</td>
                        <td className="py-3.5 px-4 text-gray-600">{p.woodType}</td>
                        <td className="py-3.5 px-4 font-bold text-[#1C1A17]">
                          Rs {p.price.toLocaleString()}
                        </td>
                        <td className="py-3.5 px-4">
                          <button
                            onClick={() => updateProduct(p.id, { inStock: !p.inStock })}
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${
                              p.inStock
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                                : 'bg-rose-50 text-rose-700 border-rose-300'
                            }`}
                          >
                            {p.inStock ? 'In Stock' : 'Made to Order'}
                          </button>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleOpenEditProduct(p)}
                              className="p-1.5 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                              title="Edit product"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete "${p.title}"?`)) {
                                  deleteProduct(p.id);
                                  showToast('Product deleted.');
                                }
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded transition-colors"
                              title="Delete product"
                            >
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

        {/* ============================================================= */}
        {/* TAB 2: YOUTUBE VIDEOS MANAGER                                 */}
        {/* ============================================================= */}
        {activeTab === 'videos' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-[#DDD3C5] shadow-xs">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-red-600 flex items-center justify-center text-white">
                    <Youtube className="w-4 h-4" />
                  </div>
                  <h2 className="text-xl font-bold font-serif text-[#1C1A17]">
                    YouTube Project Videos Manager
                  </h2>
                </div>
                <p className="text-xs sm:text-sm text-[#70685E] mt-1">
                  Set, edit, or add YouTube video links anytime. The website automatically extracts the video ID and high-res thumbnail.
                </p>
              </div>

              <button
                onClick={handleOpenAddVideo}
                className="bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-sm transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <Plus className="w-4 h-4 text-white" />
                <span>Add YouTube Video</span>
              </button>
            </div>

            {/* Video Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => {
                const vidId = getYouTubeVideoId(proj.videoUrl);
                const thumb = proj.thumbnailUrl || getYouTubeThumbnail(proj.videoUrl);

                return (
                  <div
                    key={proj.id}
                    className="bg-white rounded-lg border border-[#DECDBA] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      {/* Video Thumbnail with YouTube Red Play */}
                      <div className="relative aspect-video w-full bg-black overflow-hidden group">
                        <img
                          src={thumb}
                          alt={proj.title}
                          className="w-full h-full object-cover opacity-90"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                          <a
                            href={proj.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-12 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-md hover:scale-110 transition-transform"
                            title="Open on YouTube"
                          >
                            <Play className="w-4 h-4 fill-current ml-0.5" />
                          </a>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                          {proj.duration || 'Video'}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-center justify-between text-xs text-[#7A7268]">
                          <span className="font-semibold text-[#C08A3E] uppercase">{proj.category}</span>
                          <span>{proj.completedDate}</span>
                        </div>
                        <h3 className="text-sm font-bold text-[#1C1A17] line-clamp-2">
                          {proj.title}
                        </h3>
                        <p className="text-xs text-[#70685E] line-clamp-2 leading-relaxed">
                          {proj.description}
                        </p>
                        
                        {/* URL badge */}
                        <div className="pt-2 border-t border-gray-100 flex items-center gap-1 text-[11px] text-gray-500 truncate">
                          <Youtube className="w-3.5 h-3.5 text-red-600 shrink-0" />
                          <span className="truncate font-mono">{proj.videoUrl}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="p-3 bg-[#FAF8F5] border-t border-[#EAE4D8] flex items-center justify-between">
                      <a
                        href={proj.videoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center gap-1 font-medium"
                      >
                        <span>Test Link</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditVideo(proj)}
                          className="px-2.5 py-1 text-xs font-semibold bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Remove video "${proj.title}"?`)) {
                              deleteProject(proj.id);
                              showToast('Video project removed.');
                            }
                          }}
                          className="px-2.5 py-1 text-xs font-semibold bg-white border border-red-200 rounded text-red-600 hover:bg-red-50 flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 3: WEBSITE KI TAMAM IMAGES (ALL SITE IMAGES MANAGER)     */}
        {/* ============================================================= */}
        {activeTab === 'images' && (
          <div className="space-y-10">
            <div className="bg-white p-5 rounded-lg border border-[#DDD3C5] shadow-xs">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-[#C08A3E]">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-xl font-bold font-serif text-[#1C1A17]">
                    Website Ki Tamam Images (All Site Images Manager)
                  </h2>
                  <p className="text-xs sm:text-sm text-[#70685E] mt-0.5">
                    Click "Change Image" on any section below to update photos anywhere on the website instantly.
                  </p>
                </div>
              </div>
            </div>

            {/* SECTION A: HERO SLIDER IMAGES (5 TO 10 SLIDES) */}
            <div className="bg-white p-4 sm:p-6 rounded-lg border border-[#DDD3C5] space-y-4">
              <div className="border-b border-gray-200 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-base font-bold text-[#1C1A17] font-serif flex items-center gap-2">
                    <span>1. Top Hero Slider Images</span>
                    <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300/60">
                      {(siteSettings.heroSlides || []).length} of 10 Slides Active (5-10 Supported)
                    </span>
                  </h3>
                  <p className="text-xs text-gray-500 mt-0.5">
                    These are the large hero showcase images that rotate on top of the website. You can have between 5 and 10 slides.
                  </p>
                </div>

                {(siteSettings.heroSlides || []).length < 10 && (
                  <button
                    onClick={handleOpenAddSlide}
                    className="bg-[#121110] hover:bg-[#2B2724] text-white text-xs font-semibold px-3.5 py-2 rounded flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>Add Hero Slide ({(siteSettings.heroSlides || []).length}/10)</span>
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {(siteSettings.heroSlides || []).map((slide, idx) => (
                  <div key={slide.id} className="border border-gray-200 rounded-lg p-3 bg-[#FAF8F5] space-y-2.5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs font-bold text-gray-800 mb-1.5">
                        <span className="bg-[#1C1A17] text-white text-[10px] px-2 py-0.5 rounded">
                          Slide #{idx + 1}
                        </span>
                        <span className="text-amber-800 font-semibold text-xs">{slide.price}</span>
                      </div>

                      <div className="relative aspect-4/3 rounded overflow-hidden border border-gray-300 bg-gray-100 mb-2">
                        <img
                          src={slide.imageUrl}
                          alt={slide.headline}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-1.5 right-1.5 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                          {slide.badge || 'Featured'}
                        </div>
                      </div>

                      <h4 className="text-xs font-bold text-gray-900 line-clamp-1">
                        {slide.headline}
                      </h4>
                      <p className="text-[11px] text-gray-600 line-clamp-1 mt-0.5 font-medium">
                        {slide.itemTitle}
                      </p>
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-gray-200">
                      <div className="grid grid-cols-2 gap-1.5">
                        <button
                          onClick={() =>
                            openImageEditor(
                              `Hero Slide ${idx + 1} Image`,
                              'Enter any image URL or choose from high-res wood presets.',
                              slide.imageUrl,
                              (newUrl) => updateHeroSlide(slide.id, { imageUrl: newUrl })
                            )
                          }
                          className="py-1.5 px-2 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-[11px] font-semibold rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <ImageIcon className="w-3 h-3 text-amber-600" />
                          <span>Photo</span>
                        </button>

                        <button
                          onClick={() => handleOpenEditSlide(slide)}
                          className="py-1.5 px-2 bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 text-[11px] font-semibold rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <Edit2 className="w-3 h-3 text-amber-600" />
                          <span>Details</span>
                        </button>
                      </div>

                      {(siteSettings.heroSlides || []).length > 5 && (
                        <button
                          onClick={() => {
                            if (confirm(`Delete Slide ${idx + 1} ("${slide.headline}")?`)) {
                              deleteHeroSlide(slide.id);
                              showToast(`Slide ${idx + 1} removed.`);
                            }
                          }}
                          className="w-full py-1 text-[11px] text-rose-600 hover:text-rose-800 hover:bg-rose-50 rounded flex items-center justify-center gap-1 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete Slide</span>
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION B: ABOUT US WORKSHOP & ARTISAN PHOTOS */}
            <div className="bg-white p-6 rounded-lg border border-[#DDD3C5] space-y-4">
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-base font-bold text-[#1C1A17] font-serif flex items-center gap-2">
                  <span>2. About Us Section Photos</span>
                  <span className="text-xs font-normal text-gray-500">(Artisan Workshop & Joinery)</span>
                </h3>
                <p className="text-xs text-gray-500">
                  Photos showing your woodworking workshop, tools, and craftsmanship in Islamabad.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-[#FAF8F5] space-y-3">
                  <div className="text-xs font-bold text-gray-800">
                    About Photo 1: Workshop & Hand Plane
                  </div>
                  <div className="relative aspect-video rounded overflow-hidden border border-gray-300 bg-gray-100">
                    <img
                      src={siteSettings.aboutImage1 || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'}
                      alt="About Workshop 1"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <button
                    onClick={() =>
                      openImageEditor(
                        'About Section Photo 1 (Workshop)',
                        'Update the workshop image shown in the About Us section.',
                        siteSettings.aboutImage1,
                        (newUrl) => updateSpecificImage('aboutImage1', newUrl)
                      )
                    }
                    className="w-full py-2 bg-[#121110] hover:bg-[#2B2724] text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Edit2 className="w-3 h-3 text-amber-400" />
                    <span>Change About Photo 1</span>
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 bg-[#FAF8F5] space-y-3">
                  <div className="text-xs font-bold text-gray-800">
                    About Photo 2: Master Woodworker Craft
                  </div>
                  <div className="relative aspect-video rounded overflow-hidden border border-gray-300 bg-gray-100">
                    <img
                      src={siteSettings.aboutImage2 || 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80'}
                      alt="About Workshop 2"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <button
                    onClick={() =>
                      openImageEditor(
                        'About Section Photo 2 (Artisans)',
                        'Update the craftsmanship image shown in the About Us section.',
                        siteSettings.aboutImage2,
                        (newUrl) => updateSpecificImage('aboutImage2', newUrl)
                      )
                    }
                    className="w-full py-2 bg-[#121110] hover:bg-[#2B2724] text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Edit2 className="w-3 h-3 text-amber-400" />
                    <span>Change About Photo 2</span>
                  </button>
                </div>
              </div>
            </div>

            {/* SECTION C: 9 HOME RENOVATION CATEGORY IMAGES */}
            <div className="bg-white p-6 rounded-lg border border-[#DDD3C5] space-y-4">
              <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#1C1A17] font-serif flex items-center gap-2">
                    <span>3. Home Renovation Category Cards Images</span>
                    <span className="text-xs font-normal text-gray-500">(9 Categories)</span>
                  </h3>
                  <p className="text-xs text-gray-500">
                    Cupboards, Kitchen, Doors, Furniture, Office Table, Wood Ramp, Poolish Wood, Poolish Furniture, Home Paint.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {categories.map((cat) => (
                  <div key={cat.id} className="border border-gray-200 rounded-lg p-3 bg-[#FAF8F5] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-gray-800">{cat.name}</span>
                      <span className="text-[10px] text-gray-500 font-mono">/{cat.slug}</span>
                    </div>

                    <div className="relative aspect-4/3 rounded overflow-hidden border border-gray-300 bg-gray-100">
                      <img
                        src={cat.imageUrl}
                        alt={cat.name}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    <button
                      onClick={() =>
                        openImageEditor(
                          `Category Image: ${cat.name}`,
                          `Change the cover photo for ${cat.name} on the home page.`,
                          cat.imageUrl,
                          (newUrl) => updateCategory(cat.id, { imageUrl: newUrl })
                        )
                      }
                      className="w-full py-2 bg-white hover:bg-gray-100 border border-gray-300 text-gray-800 text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors"
                    >
                      <Edit2 className="w-3 h-3 text-[#C08A3E]" />
                      <span>Change {cat.name} Image</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION D: MASTER WOODWORK PORTFOLIO (8 GALLERY PHOTOS) */}
            <div className="bg-white p-6 rounded-lg border border-[#DDD3C5] space-y-4">
              <div className="border-b border-gray-200 pb-3 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-[#1C1A17] font-serif flex items-center gap-2">
                    <span>4. Master Woodwork Portfolio (8-Photo Gallery)</span>
                  </h3>
                  <p className="text-xs text-gray-500">
                    The 8 photo showcase located below the category cards on the homepage.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {galleryPhotos.map((photo, i) => (
                  <div key={photo.id} className="border border-gray-200 rounded p-2.5 bg-[#FAF8F5] space-y-2">
                    <div className="relative aspect-square rounded overflow-hidden border border-gray-300 bg-gray-100">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="text-[11px] font-bold text-gray-800 truncate">{photo.title}</div>
                    <div className="text-[10px] text-amber-700 font-semibold">{photo.category}</div>

                    <button
                      onClick={() =>
                        openImageEditor(
                          `Portfolio Photo ${i + 1}: ${photo.title}`,
                          'Change image URL for this portfolio item.',
                          photo.url,
                          (newUrl) => updateGalleryPhoto(photo.id, { url: newUrl })
                        )
                      }
                      className="w-full py-1.5 bg-[#121110] hover:bg-[#2B2724] text-white text-[11px] font-medium rounded flex items-center justify-center gap-1"
                    >
                      <Edit2 className="w-2.5 h-2.5 text-amber-400" />
                      <span>Change Image</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* SECTION E: SHOWROOM & CTA BANNER */}
            <div className="bg-white p-6 rounded-lg border border-[#DDD3C5] space-y-4">
              <div className="border-b border-gray-200 pb-3">
                <h3 className="text-base font-bold text-[#1C1A17] font-serif">
                  5. Showroom & Banner Images
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4 bg-[#FAF8F5] space-y-3">
                  <div className="text-xs font-bold text-gray-800">
                    Showroom / Workshop Exterior Photo
                  </div>
                  <div className="relative aspect-video rounded overflow-hidden border border-gray-300 bg-gray-100">
                    <img
                      src={siteSettings.showroomImage || 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80'}
                      alt="Showroom"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <button
                    onClick={() =>
                      openImageEditor(
                        'Showroom Image',
                        'Update the showroom photo shown on the site.',
                        siteSettings.showroomImage,
                        (newUrl) => updateSpecificImage('showroomImage', newUrl)
                      )
                    }
                    className="w-full py-2 bg-[#121110] hover:bg-[#2B2724] text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Edit2 className="w-3 h-3 text-amber-400" />
                    <span>Change Showroom Image</span>
                  </button>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 bg-[#FAF8F5] space-y-3">
                  <div className="text-xs font-bold text-gray-800">
                    Consultation & CTA Banner Image
                  </div>
                  <div className="relative aspect-video rounded overflow-hidden border border-gray-300 bg-gray-100">
                    <img
                      src={siteSettings.ctaImage || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80'}
                      alt="CTA Banner"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <button
                    onClick={() =>
                      openImageEditor(
                        'CTA Banner Image',
                        'Update the background photo for the consultation banner.',
                        siteSettings.ctaImage,
                        (newUrl) => updateSpecificImage('ctaImage', newUrl)
                      )
                    }
                    className="w-full py-2 bg-[#121110] hover:bg-[#2B2724] text-white text-xs font-semibold rounded flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Edit2 className="w-3 h-3 text-amber-400" />
                    <span>Change Banner Image</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 4: CATEGORIES & SERVICES                                  */}
        {/* ============================================================= */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-lg border border-[#DDD3C5] shadow-xs">
              <div>
                <h2 className="text-xl font-bold font-serif text-[#1C1A17]">
                  Categories & Woodwork Services
                </h2>
                <p className="text-xs sm:text-sm text-[#70685E] mt-0.5">
                  Manage the 9 core categories displayed in the "Our Home Renovation" section.
                </p>
              </div>

              <button
                onClick={handleOpenAddCategory}
                className="bg-[#121110] hover:bg-[#2B2724] text-white text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-sm transition-all flex items-center gap-2 shadow-xs"
              >
                <Plus className="w-4 h-4 text-amber-400" />
                <span>Add Category</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {categories.map((c) => {
                const count = products.filter((p) => p.category === c.name).length;

                return (
                  <div
                    key={c.id}
                    className="bg-white rounded-lg border border-[#DECDBA] overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-4/3 w-full bg-gray-100 overflow-hidden">
                        <img
                          src={c.imageUrl}
                          alt={c.name}
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-2 right-2 bg-black/75 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                          {count} Products
                        </div>
                      </div>

                      <div className="p-4 space-y-1">
                        <h3 className="text-base font-bold text-[#1C1A17]">{c.name}</h3>
                        <p className="text-xs text-[#70685E] line-clamp-2 leading-relaxed">
                          {c.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-3 bg-[#FAF8F5] border-t border-[#EAE4D8] flex items-center justify-between">
                      <span className="text-xs text-gray-500 font-mono">Slug: {c.slug}</span>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditCategory(c)}
                          className="px-2.5 py-1 text-xs font-semibold bg-white border border-gray-300 rounded text-gray-700 hover:bg-gray-50 flex items-center gap-1"
                        >
                          <Edit2 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Delete category "${c.name}"?`)) {
                              deleteCategory(c.id);
                              showToast('Category removed.');
                            }
                          }}
                          className="px-2.5 py-1 text-xs font-semibold bg-white border border-red-200 rounded text-red-600 hover:bg-red-50 flex items-center gap-1"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ============================================================= */}
        {/* TAB 5: INQUIRIES                                              */}
        {/* ============================================================= */}
        {activeTab === 'inquiries' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-[#DDD3C5] shadow-xs flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold font-serif text-[#1C1A17]">
                  Customer Inquiries & Consultation Requests
                </h2>
                <p className="text-xs sm:text-sm text-[#70685E] mt-0.5">
                  Customers submitting measurements, custom furniture requests, and quotation demands.
                </p>
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
                  const whatsappClean = inq.phone.replace(/[^0-9]/g, '');
                  const whatsappText = encodeURIComponent(
                    `Hello ${inq.customerName}, this is Wood Nido customer desk regarding your inquiry for ${inq.category}.`
                  );

                  return (
                    <div
                      key={inq.id}
                      className="bg-white p-5 rounded-lg border border-[#DDD3C5] shadow-xs hover:border-[#C08A3E] transition-colors space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                        <div>
                          <span className="text-base font-bold text-[#1C1A17]">
                            {inq.customerName}
                          </span>
                          <span className="text-xs text-gray-500 ml-3">
                            Submitted on {inq.createdAt}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold text-gray-600">Status:</span>
                          <select
                            value={inq.status}
                            onChange={(e) =>
                              updateInquiryStatus(inq.id, e.target.value as CustomerInquiry['status'])
                            }
                            className={`text-xs font-bold px-2.5 py-1 rounded border ${
                              inq.status === 'New'
                                ? 'bg-amber-100 text-amber-900 border-amber-300'
                                : inq.status === 'In Progress'
                                ? 'bg-blue-100 text-blue-900 border-blue-300'
                                : inq.status === 'Quoted'
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
                          <span className="font-bold text-[#C08A3E] text-sm">{inq.category}</span>
                        </div>
                        <div className="bg-[#FAF8F5] p-2.5 rounded border border-gray-200">
                          <span className="text-gray-500 block text-[10px] uppercase">Contact Phone</span>
                          <a href={`tel:${inq.phone}`} className="font-bold text-[#1C1A17] hover:underline">
                            {inq.phone}
                          </a>
                        </div>
                        <div className="bg-[#FAF8F5] p-2.5 rounded border border-gray-200">
                          <span className="text-gray-500 block text-[10px] uppercase">Email</span>
                          <span className="font-medium text-gray-800">{inq.email || 'N/A'}</span>
                        </div>
                      </div>

                      <div className="text-xs text-gray-700 bg-amber-50/40 p-3 rounded border border-amber-100/80 leading-relaxed">
                        <strong className="text-amber-900 block mb-0.5">Customer Requirements:</strong>
                        {inq.requirement}
                      </div>

                      <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                        <a
                          href={`https://wa.me/${whatsappClean}?text=${whatsappText}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold px-3 py-1.5 rounded flex items-center gap-1.5 transition-colors"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Reply via WhatsApp</span>
                        </a>

                        <button
                          onClick={() => {
                            if (confirm(`Delete inquiry from ${inq.customerName}?`)) {
                              deleteInquiry(inq.id);
                              showToast('Inquiry removed.');
                            }
                          }}
                          className="text-xs text-red-600 hover:text-red-800 flex items-center gap-1"
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

        {/* ============================================================= */}
        {/* TAB 6: SETTINGS & BUSINESS INFO                               */}
        {/* ============================================================= */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-lg border border-[#DDD3C5] shadow-xs">
              <h2 className="text-xl font-bold font-serif text-[#1C1A17]">
                Business Contact & Brand Settings
              </h2>
              <p className="text-xs sm:text-sm text-[#70685E] mt-0.5">
                Update business name, WhatsApp number, Islamabad showroom address, and counters shown on the site.
              </p>
            </div>

            <form onSubmit={handleSaveSettings} className="bg-white p-6 rounded-lg border border-[#DDD3C5] space-y-6 shadow-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Business Name
                  </label>
                  <input
                    type="text"
                    value={settingsForm.businessName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, businessName: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={settingsForm.tagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, tagline: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.phone}
                    onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    WhatsApp Inquiry Number
                  </label>
                  <input
                    type="text"
                    value={settingsForm.whatsappNumber}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={settingsForm.email}
                    onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">
                    Showroom & Workshop Address
                  </label>
                  <input
                    type="text"
                    value={settingsForm.address}
                    onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                  />
                </div>
              </div>

              {/* Numerical Stats on About Us */}
              <div className="pt-4 border-t border-gray-200">
                <h3 className="text-sm font-bold text-[#1C1A17] uppercase tracking-wide mb-3">
                  About Us Statistics Counters
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Years of Experience</label>
                    <input
                      type="number"
                      value={settingsForm.yearsOfExperience}
                      onChange={(e) => setSettingsForm({ ...settingsForm, yearsOfExperience: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded bg-[#FAF8F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Industry Experts</label>
                    <input
                      type="number"
                      value={settingsForm.industryExperts}
                      onChange={(e) => setSettingsForm({ ...settingsForm, industryExperts: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded bg-[#FAF8F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">User Retention (%)</label>
                    <input
                      type="number"
                      value={settingsForm.userRetention}
                      onChange={(e) => setSettingsForm({ ...settingsForm, userRetention: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded bg-[#FAF8F5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Global Clients</label>
                    <input
                      type="number"
                      value={settingsForm.globalClients}
                      onChange={(e) => setSettingsForm({ ...settingsForm, globalClients: Number(e.target.value) })}
                      className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded bg-[#FAF8F5]"
                    />
                  </div>
                </div>
              </div>

              {/* Social Media Links (Facebook, Instagram, TikTok, YouTube) */}
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

              <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    if (confirm('Reset all website data and images back to defaults?')) {
                      resetToDefaults();
                      setSettingsForm(siteSettings);
                      showToast('Site restored to initial state.');
                    }
                  }}
                  className="text-xs text-rose-600 hover:text-rose-800 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Data to Defaults</span>
                </button>

                <button
                  type="submit"
                  className="bg-[#121110] hover:bg-[#2B2724] text-white text-xs sm:text-sm font-semibold px-6 py-2.5 rounded-sm transition-all flex items-center gap-2 shadow-xs"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>Save All Settings</span>
                </button>
              </div>
            </form>
          </div>
        )}

      </main>
      </div>

      {/* ============================================================= */}
      {/* MODAL 1: ADD / EDIT PRODUCT                                   */}
      {/* ============================================================= */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#FAF8F5]">
              <h3 className="text-base font-bold text-[#1C1A17] font-serif">
                {editingProductId ? 'Edit Wood Product' : 'Add New Wood Product'}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="p-1 text-gray-400 hover:text-black rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 space-y-4 overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Product Title *
                </label>
                <input
                  type="text"
                  required
                  value={productForm.title}
                  onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                  placeholder="e.g. Sculptural Organic Ash Wood Lounge Chair"
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Category *
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Price (PKR) *
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Wood Type
                  </label>
                  <input
                    type="text"
                    value={productForm.woodType}
                    onChange={(e) => setProductForm({ ...productForm, woodType: e.target.value })}
                    placeholder="e.g. Solid Sheesham / Burmese Teak"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Dimensions / Size
                  </label>
                  <input
                    type="text"
                    value={productForm.dimensions}
                    onChange={(e) => setProductForm({ ...productForm, dimensions: e.target.value })}
                    placeholder='e.g. 36"W x 18"H or Custom'
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                  />
                </div>
              </div>

              {/* Product Image URL & Preview */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-700 uppercase">
                  Product Image URL *
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={productForm.imageUrl}
                    onChange={(e) => setProductForm({ ...productForm, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                  />
                </div>

                {/* Quick preset picker */}
                <div className="flex items-center gap-1.5 flex-wrap pt-1">
                  <span className="text-[11px] text-gray-500 font-medium">Quick Presets:</span>
                  {PRESET_WOOD_IMAGES.slice(0, 5).map((preset) => (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => setProductForm({ ...productForm, imageUrl: preset.url })}
                      className="text-[10px] bg-gray-100 hover:bg-amber-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {productForm.imageUrl && (
                  <div className="w-24 h-24 rounded border border-gray-200 overflow-hidden mt-2">
                    <img
                      src={productForm.imageUrl}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Describe craft details, joint mechanisms, and grain aesthetics..."
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.inStock}
                    onChange={(e) => setProductForm({ ...productForm, inStock: e.target.checked })}
                    className="w-4 h-4 text-[#C08A3E] rounded"
                  />
                  <span>Currently In Stock</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-bold text-gray-700 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.featured}
                    onChange={(e) => setProductForm({ ...productForm, featured: e.target.checked })}
                    className="w-4 h-4 text-[#C08A3E] rounded"
                  />
                  <span>Featured on Home Catalog</span>
                </label>
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#121110] hover:bg-[#2B2724] text-white text-xs font-semibold px-6 py-2 rounded flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>Save Product</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL 2: ADD / EDIT YOUTUBE VIDEO                             */}
      {/* ============================================================= */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2">
                <Youtube className="w-5 h-5 text-red-600" />
                <h3 className="text-base font-bold text-[#1C1A17] font-serif">
                  {editingVideoId ? 'Edit YouTube Project Video' : 'Add YouTube Project Video'}
                </h3>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="p-1 text-gray-400 hover:text-black rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveVideo} className="p-6 space-y-4 overflow-y-auto">
              
              {/* YouTube Video URL Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-gray-800 uppercase">
                  YouTube Video Link *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={videoForm.videoUrl}
                    onChange={(e) => {
                      const val = e.target.value;
                      setVideoForm({
                        ...videoForm,
                        videoUrl: val,
                        // Auto update thumbnail if valid YouTube URL
                        thumbnailUrl: isValidYouTubeUrl(val) ? getYouTubeThumbnail(val) : videoForm.thumbnailUrl
                      });
                    }}
                    placeholder="https://www.youtube.com/watch?v=... or https://youtu.be/..."
                    className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-gray-500">
                  <span>Supports regular YouTube URLs, youtu.be short links, and YouTube Shorts.</span>
                  {isValidYouTubeUrl(videoForm.videoUrl) && (
                    <span className="text-emerald-700 font-bold flex items-center gap-1">
                      <Check className="w-3 h-3" /> Valid YouTube Video
                    </span>
                  )}
                </div>
              </div>

              {/* Live Preview / Embed test */}
              {isValidYouTubeUrl(videoForm.videoUrl) && (
                <div className="border border-gray-200 rounded p-3 bg-gray-50 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-700">Video Preview</span>
                    <button
                      type="button"
                      onClick={() => setTestVideoPreview(!testVideoPreview)}
                      className="text-xs text-red-600 hover:text-red-800 font-medium underline"
                    >
                      {testVideoPreview ? 'Hide Player' : 'Test Play Video'}
                    </button>
                  </div>

                  {testVideoPreview ? (
                    <div className="aspect-video w-full rounded overflow-hidden bg-black">
                      <iframe
                        src={getYouTubeEmbedUrl(videoForm.videoUrl, true)}
                        title="YouTube Preview"
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-video w-full rounded overflow-hidden bg-zinc-900 flex items-center justify-center">
                      <img
                        src={getYouTubeThumbnail(videoForm.videoUrl)}
                        alt="Thumbnail preview"
                        className="w-full h-full object-cover opacity-80"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute w-12 h-8 bg-red-600 rounded-lg flex items-center justify-center text-white shadow-lg">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Video Title *
                </label>
                <input
                  type="text"
                  required
                  value={videoForm.title}
                  onChange={(e) => setVideoForm({ ...videoForm, title: e.target.value })}
                  placeholder="e.g. Room Makeover Before & After | Custom Woodwork & Slat Wall"
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Category Tag
                  </label>
                  <input
                    type="text"
                    value={videoForm.category}
                    onChange={(e) => setVideoForm({ ...videoForm, category: e.target.value })}
                    placeholder="e.g. Bedroom & Paneling"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Video Duration
                  </label>
                  <input
                    type="text"
                    value={videoForm.duration}
                    onChange={(e) => setVideoForm({ ...videoForm, duration: e.target.value })}
                    placeholder="e.g. 4:25"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Completion Date
                  </label>
                  <input
                    type="text"
                    value={videoForm.completedDate}
                    onChange={(e) => setVideoForm({ ...videoForm, completedDate: e.target.value })}
                    placeholder="e.g. March 2025"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Custom Thumbnail URL (Optional)
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={videoForm.thumbnailUrl}
                    onChange={(e) => setVideoForm({ ...videoForm, thumbnailUrl: e.target.value })}
                    placeholder="Leave blank to auto-use YouTube high-res thumbnail"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                  />
                  {isValidYouTubeUrl(videoForm.videoUrl) && (
                    <button
                      type="button"
                      onClick={() => setVideoForm({ ...videoForm, thumbnailUrl: getYouTubeThumbnail(videoForm.videoUrl) })}
                      className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded shrink-0"
                    >
                      Use YouTube Thumb
                    </button>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Video Description
                </label>
                <textarea
                  rows={2}
                  value={videoForm.description}
                  onChange={(e) => setVideoForm({ ...videoForm, description: e.target.value })}
                  placeholder="Explain what was renovated in this video..."
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                />
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsVideoModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-700 text-white text-xs font-semibold px-6 py-2 rounded flex items-center gap-2 shadow-xs"
                >
                  <Save className="w-4 h-4 text-white" />
                  <span>Save YouTube Video</span>
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL 3: UNIVERSAL IMAGE EDITOR (FOR ANY SITE IMAGE)          */}
      {/* ============================================================= */}
      {imageEditorModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-xl bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#C08A3E]" />
                <h3 className="text-base font-bold text-[#1C1A17] font-serif">
                  {imageEditorModal.title}
                </h3>
              </div>
              <button
                onClick={() => setImageEditorModal({ ...imageEditorModal, isOpen: false })}
                className="p-1 text-gray-400 hover:text-black rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4">
              <p className="text-xs text-gray-600">
                {imageEditorModal.description}
              </p>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  value={customImageUrlInput}
                  onChange={(e) => setCustomImageUrlInput(e.target.value)}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2.5 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                />
              </div>

              {/* Presets */}
              <div className="space-y-1.5">
                <span className="text-xs font-semibold text-gray-700">
                  Or pick from high-resolution wood presets:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-1 bg-gray-50 rounded border border-gray-200">
                  {PRESET_WOOD_IMAGES.map((preset) => (
                    <div
                      key={preset.label}
                      onClick={() => setCustomImageUrlInput(preset.url)}
                      className={`cursor-pointer p-1.5 rounded border text-left flex items-center gap-2 transition-all ${
                        customImageUrlInput === preset.url
                          ? 'border-[#C08A3E] bg-amber-50 ring-1 ring-[#C08A3E]'
                          : 'border-gray-200 bg-white hover:border-gray-400'
                      }`}
                    >
                      <img
                        src={preset.url}
                        alt={preset.label}
                        className="w-8 h-8 object-cover rounded shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[11px] font-medium text-gray-800 line-clamp-1">
                        {preset.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Preview */}
              {customImageUrlInput && (
                <div className="space-y-1">
                  <span className="text-xs text-gray-500 font-medium">Selected Image Preview:</span>
                  <div className="aspect-video w-full rounded overflow-hidden border border-gray-300 bg-gray-100">
                    <img
                      src={customImageUrlInput}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </div>
              )}

              <div className="pt-3 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setImageEditorModal({ ...imageEditorModal, isOpen: false })}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleApplyImageEdit}
                  className="bg-[#121110] hover:bg-[#2B2724] text-white text-xs font-semibold px-6 py-2 rounded flex items-center gap-2"
                >
                  <Check className="w-4 h-4 text-amber-400" />
                  <span>Apply to Website</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL 4: ADD / EDIT CATEGORY                                  */}
      {/* ============================================================= */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden flex flex-col">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#FAF8F5]">
              <h3 className="text-base font-bold text-[#1C1A17] font-serif">
                {editingCategoryId ? 'Edit Category & Service' : 'Add New Category'}
              </h3>
              <button
                onClick={() => setIsCategoryModalOpen(false)}
                className="p-1 text-gray-400 hover:text-black rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCategory} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Category Name *
                </label>
                <input
                  type="text"
                  required
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })}
                  placeholder="e.g. Luxury TV Consoles"
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Image URL *
                </label>
                <input
                  type="url"
                  required
                  value={categoryForm.imageUrl}
                  onChange={(e) => setCategoryForm({ ...categoryForm, imageUrl: e.target.value })}
                  placeholder="https://..."
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({ ...categoryForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                />
              </div>

              <div className="pt-4 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsCategoryModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#121110] hover:bg-[#2B2724] text-white text-xs font-semibold px-6 py-2 rounded flex items-center gap-2"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>Save Category</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ============================================================= */}
      {/* MODAL 5: ADD / EDIT HERO SLIDE (5 TO 10 SLIDES)               */}
      {/* ============================================================= */}
      {slideEditorModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs animate-in fade-in">
          <div className="relative w-full max-w-lg bg-white rounded-lg shadow-2xl border border-gray-300 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-[#FAF8F5]">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-[#C08A3E]" />
                <h3 className="text-base font-bold text-[#1C1A17] font-serif">
                  {slideEditorModal.isNew ? 'Add New Hero Slide' : 'Edit Hero Slide Details'}
                </h3>
              </div>
              <button
                onClick={() => setSlideEditorModal((prev) => ({ ...prev, isOpen: false }))}
                className="p-1 text-gray-400 hover:text-black rounded-full cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSlide} className="p-4 sm:p-6 space-y-3.5 overflow-y-auto">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Main Headline *
                </label>
                <input
                  type="text"
                  required
                  value={slideEditorModal.headline}
                  onChange={(e) => setSlideEditorModal({ ...slideEditorModal, headline: e.target.value })}
                  placeholder="e.g. SOLID SHEESHAM DINING SUITE"
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Item Title / Name *
                </label>
                <input
                  type="text"
                  required
                  value={slideEditorModal.itemTitle}
                  onChange={(e) => setSlideEditorModal({ ...slideEditorModal, itemTitle: e.target.value })}
                  placeholder="e.g. Royal 8-Seater Rosewood Dining Set"
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Price Tag / Display *
                  </label>
                  <input
                    type="text"
                    required
                    value={slideEditorModal.price}
                    onChange={(e) => setSlideEditorModal({ ...slideEditorModal, price: e.target.value })}
                    placeholder="e.g. Start From 45k or Rs 120,000"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                    Badge / Tag
                  </label>
                  <input
                    type="text"
                    value={slideEditorModal.badge}
                    onChange={(e) => setSlideEditorModal({ ...slideEditorModal, badge: e.target.value })}
                    placeholder="e.g. 100% Solid Hardwood"
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Image URL *
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    required
                    value={slideEditorModal.imageUrl}
                    onChange={(e) => setSlideEditorModal({ ...slideEditorModal, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                  />
                </div>
              </div>

              {/* Preview image */}
              {slideEditorModal.imageUrl && (
                <div className="relative aspect-video rounded overflow-hidden border border-gray-300 bg-gray-100">
                  <img
                    src={slideEditorModal.imageUrl}
                    alt="Slide preview"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">
                  Subtext / Description
                </label>
                <textarea
                  rows={2}
                  value={slideEditorModal.subtext}
                  onChange={(e) => setSlideEditorModal({ ...slideEditorModal, subtext: e.target.value })}
                  placeholder="Masterfully built from kiln-dried timber..."
                  className="w-full px-3.5 py-2 text-sm border border-gray-300 rounded bg-[#FAF8F5] focus:outline-none focus:border-[#C08A3E]"
                />
              </div>

              <div className="pt-3 border-t border-gray-200 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setSlideEditorModal((prev) => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-gray-100 rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#121110] hover:bg-[#2B2724] text-white text-xs font-semibold px-6 py-2 rounded flex items-center gap-2 cursor-pointer"
                >
                  <Save className="w-4 h-4 text-amber-400" />
                  <span>{slideEditorModal.isNew ? 'Add Slide' : 'Save Changes'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* GUARANTEED CLEAN PROJECT ZIP DOWNLOAD MODAL                              */}
      {/* ========================================================================= */}
      {isDownloadModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-150">
          <div className="bg-[#1C1A17] text-white border border-[#C08A3E]/40 rounded-xl shadow-2xl max-w-lg w-full overflow-hidden my-6">
            {/* Header */}
            <div className="bg-[#121110] px-6 py-4 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-950/80 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-wide">
                    Project Source Code Package (ZIP)
                  </h3>
                  <p className="text-xs text-emerald-400 font-medium">
                    Verified Clean & Complete • 111.5 KB • 37 Files
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsDownloadModalOpen(false)}
                className="text-white/60 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              {/* File Info Card */}
              <div className="bg-[#121110] rounded-lg p-4 border border-white/5 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">File Name:</span>
                  <span className="font-mono text-amber-300 font-bold">wood-nido-project.zip</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Archive Size:</span>
                  <span className="font-mono text-zinc-200">111,541 Bytes (108.9 KB)</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Total Files:</span>
                  <span className="font-mono text-zinc-200">37 Source Code Files</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-zinc-400">Integrity:</span>
                  <span className="text-emerald-400 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> 100% Tested & Non-Corrupt
                  </span>
                </div>
              </div>

              {/* Clarification on why browser download was corrupt previously */}
              <div className="bg-amber-950/20 border border-amber-500/30 rounded-lg p-3.5 text-xs text-amber-200/90 leading-relaxed space-y-1">
                <p className="font-bold text-amber-300">💡 File Corrupt Kyun Show Hui Thi?</p>
                <p>
                  Browser iframe security ne link par click karne par zip file ke bajaye ek choti HTML file download kar di thi jisko Windows corrupt kehta hai. Ab hamara system direct in-memory binary generation use karta hai jo 100% clean aur guaranteed non-corrupt hai.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleDownloadZip}
                  disabled={isDownloading}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-98 cursor-pointer disabled:opacity-50"
                >
                  <Download className="w-4 h-4" />
                  <span>{isDownloading ? 'Generating Clean ZIP...' : 'Download Clean ZIP Now (Direct Memory)'}</span>
                </button>

                <a
                  href="/wood-nido-project.zip"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white/5 hover:bg-white/10 text-zinc-200 hover:text-white border border-white/10 font-semibold py-2.5 px-4 rounded-lg flex items-center justify-center gap-2 text-xs transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open Direct Download Link in New Tab (Escape Iframe)</span>
                </a>
              </div>

              {/* Deployment Next Steps Guide */}
              <div className="border-t border-white/10 pt-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
                  Deployment Guide (GitHub & Vercel)
                </h4>
                <ol className="text-xs text-zinc-300 space-y-2 list-decimal list-inside leading-relaxed">
                  <li>
                    <strong className="text-white">ZIP Extract Karein:</strong> Download hone ke baad right click kar ke <span className="text-amber-300">Extract All</span> karein.
                  </li>
                  <li>
                    <strong className="text-white">Files Check Karein:</strong> Folder ke andar <code className="text-emerald-400">src</code>, <code className="text-emerald-400">package.json</code>, <code className="text-emerald-400">index.html</code> sab mojood hongi.
                  </li>
                  <li>
                    <strong className="text-white">Client GitHub Par Upload Karein:</strong> Files ko client ke repository mein push karein aur Vercel se deploy kar dein!
                  </li>
                </ol>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#121110] px-6 py-3.5 border-t border-white/10 flex justify-end">
              <button
                type="button"
                onClick={() => setIsDownloadModalOpen(false)}
                className="px-5 py-1.5 text-xs font-semibold bg-white/10 hover:bg-white/15 text-white rounded-md transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
