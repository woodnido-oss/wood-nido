import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { WoodNidoLogo } from '../WoodNidoLogo';
import {
  Users,
  Briefcase,
  Layers,
  Star,
  Settings,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  MessageCircle,
  Phone,
  CheckCircle,
  Clock,
  RotateCcw,
  ArrowLeft,
  Search,
  Filter,
  Save,
  DollarSign,
  TrendingUp,
  MapPin,
  Navigation,
  Image as ImageIcon,
  Film,
  Play,
  ImagePlus,
  Package,
  X,
  Menu,
  ChevronRight,
} from 'lucide-react';
import { ServiceItem, ProjectItem, ReviewItem, LeadItem, ProductItem } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
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
    updateLeadStatus,
    deleteLead,
    adminLogout,
    setCurrentView,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'products' | 'services' | 'projects' | 'photos' | 'reviews' | 'settings'>('overview');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('all');

  // Form states for modals/editors
  const [editingProduct, setEditingProduct] = useState<ProductItem | null>(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [productForm, setProductForm] = useState({
    title: '',
    category: 'Living Room',
    image: '',
    description: '',
    material: '',
    dimensions: '',
  });

  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [isAddingService, setIsAddingService] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [projectUrlInputs, setProjectUrlInputs] = useState<Record<string, string>>({});
  const [projectSavedBadge, setProjectSavedBadge] = useState<Record<string, boolean>>({});
  const [previewVideoItem, setPreviewVideoItem] = useState<ProjectItem | null>(null);

  const handleQuickSaveProjectUrl = (project: ProjectItem) => {
    const inputVal = projectUrlInputs[project.id] !== undefined ? projectUrlInputs[project.id] : project.youtubeId;
    if (!inputVal || !inputVal.trim()) return;

    const cleanId = extractYouTubeId(inputVal);
    const autoThumb = `https://img.youtube.com/vi/${cleanId}/hqdefault.jpg`;

    updateProject(project.id, {
      youtubeId: cleanId,
      thumbnail: autoThumb,
    });

    setProjectSavedBadge((prev) => ({ ...prev, [project.id]: true }));
    setTimeout(() => {
      setProjectSavedBadge((prev) => ({ ...prev, [project.id]: false }));
    }, 2500);
  };
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);
  const [isAddingReview, setIsAddingReview] = useState(false);

  // Quick settings form
  const [settingsForm, setSettingsForm] = useState({ ...siteConfig });
  const [settingsSaved, setSettingsSaved] = useState(false);

  // Sync settingsForm when siteConfig updates
  useEffect(() => {
    setSettingsForm({ ...siteConfig });
  }, [siteConfig]);

  // New service form state
  const [serviceForm, setServiceForm] = useState({
    title: '',
    category: '',
    image: '',
    description: '',
    priceStart: '',
  });

  // New project form state
  const [projectForm, setProjectForm] = useState({
    title: '',
    category: '',
    thumbnail: '',
    youtubeId: 'dQw4w9WgXcQ',
    duration: '04:30',
    description: '',
  });

  // Helper to extract YouTube video ID from any full URL or short URL or clean ID
  const extractYouTubeId = (input: string): string => {
    if (!input) return 'dQw4w9WgXcQ';
    const trimmed = input.trim();
    // Check if it's already an 11-char ID
    if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
      return trimmed;
    }
    // youtu.be/ID
    const shortMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (shortMatch && shortMatch[1]) return shortMatch[1];
    // youtube.com/watch?v=ID
    const longMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (longMatch && longMatch[1]) return longMatch[1];
    // youtube.com/embed/ID or /shorts/ID
    const embedMatch = trimmed.match(/(?:embed|shorts)\/([a-zA-Z0-9_-]{11})/);
    if (embedMatch && embedMatch[1]) return embedMatch[1];
    return trimmed;
  };

  // Gallery item form state
  const [editingGalleryItem, setEditingGalleryItem] = useState<{ id: string; title: string; category: string; image: string } | null>(null);
  const [isAddingGalleryItem, setIsAddingGalleryItem] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: '',
    image: '',
  });

  // Filtered leads
  const filteredLeads = leads.filter((lead) => {
    const matchesSearch =
      lead.name.toLowerCase().includes(leadSearch.toLowerCase()) ||
      lead.phone.includes(leadSearch) ||
      lead.service.toLowerCase().includes(leadSearch.toLowerCase());
    const matchesStatus = leadStatusFilter === 'all' || lead.status === leadStatusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    // Normalize phone number if needed
    const cleanPhone = settingsForm.displayPhone || settingsForm.phone;
    const cleanWhatsapp = settingsForm.whatsappNumber.replace(/[^0-9]/g, '');
    updateSiteConfig({
      ...settingsForm,
      phone: cleanPhone,
      displayPhone: cleanPhone,
      whatsappNumber: cleanWhatsapp,
    });
    setSettingsSaved(true);
    setTimeout(() => setSettingsSaved(false), 2500);
  };

  const getStatusBadge = (status: LeadItem['status']) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">New</span>;
      case 'contacted':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800">Contacted</span>;
      case 'quoted':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800">Quoted</span>;
      case 'in_progress':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-indigo-100 text-indigo-800">In Progress</span>;
      case 'completed':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-green-100 text-green-800">Completed</span>;
      case 'cancelled':
        return <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-800">Cancelled</span>;
    }
  };

  return (
    <div className="min-h-screen bg-stone-100 text-stone-900 flex flex-col font-sans">
      
      {/* Top Header */}
      <header className="bg-stone-900 text-white sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Mobile Sidebar Hamburger Toggle */}
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 -ml-1 rounded-xl bg-stone-800 hover:bg-stone-700 text-[#e5be7d] border border-stone-700/80 transition-all cursor-pointer flex items-center justify-center"
              aria-label="Open Admin Menu"
              title="Open Navigation Menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <WoodNidoLogo size="sm" variant="dark" />
              <span className="bg-[#c28c46] text-stone-950 text-[9px] sm:text-[10px] font-black uppercase px-1.5 py-0.5 rounded-xs">
                Admin
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setCurrentView('website')}
              className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden xs:inline">Back to Website</span>
              <span className="xs:hidden">Site</span>
            </button>

            <button
              onClick={adminLogout}
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 text-xs font-semibold transition-colors border border-red-800/50 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Sidebar Drawer (Fetures Side Baar) */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileSidebarOpen(false)}
          />

          {/* Drawer Menu Panel */}
          <div className="relative w-[85%] max-w-xs bg-[#1a1614] text-white h-full shadow-2xl flex flex-col z-10 border-r border-[#3a281c] animate-in slide-in-from-left duration-250">
            {/* Drawer Header */}
            <div className="p-4 border-b border-stone-800 flex items-center justify-between bg-[#14100e]">
              <div className="flex items-center gap-2">
                <WoodNidoLogo size="sm" variant="dark" />
                <span className="bg-[#c28c46] text-stone-950 text-[9px] font-black uppercase px-1.5 py-0.5 rounded-xs">
                  Menu
                </span>
              </div>
              <button
                onClick={() => setMobileSidebarOpen(false)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
                aria-label="Close Sidebar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Subtitle */}
            <div className="px-4 py-2.5 bg-stone-900/60 border-b border-stone-800/80">
              <span className="text-[11px] font-bold text-[#c28c46] tracking-wider uppercase">
                Admin Panel Features
              </span>
            </div>

            {/* Navigation List inside Sidebar Drawer */}
            <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto">
              {[
                { id: 'overview', label: 'Overview', icon: TrendingUp, count: null, desc: 'Stats, Quick Actions & Performance' },
                { id: 'leads', label: 'Inquiries & Leads', icon: Users, count: leads.length, desc: 'Customer requests & contact forms' },
                { id: 'products', label: 'Products (پروڈکٹس)', icon: Package, count: products.length, desc: 'Living room, kitchen, bedroom catalogue' },
                { id: 'services', label: 'Services (9 Categories)', icon: Layers, count: services.length, desc: 'Woodwork, renovation, cabinetry services' },
                { id: 'projects', label: 'YouTube Video Box', icon: Film, count: projects.length, desc: 'YouTube video links & work showcase' },
                { id: 'photos', label: 'Photos & Showcase', icon: ImageIcon, count: galleryImages.length, desc: 'Gallery photos & portfolio images' },
                { id: 'settings', label: 'Site & Contact Settings', icon: Settings, count: null, desc: 'Phone, WhatsApp, address & timing' },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id as any);
                      setMobileSidebarOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded-xl text-left transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#c28c46] text-stone-950 font-bold shadow-md ring-1 ring-amber-300'
                        : 'bg-stone-900/70 text-stone-200 hover:bg-stone-800 hover:text-white border border-stone-800/80'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
                        isActive ? 'bg-stone-950 text-[#e5be7d]' : 'bg-stone-800 text-[#c28c46]'
                      }`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="truncate">
                        <div className="text-xs font-bold truncate">{item.label}</div>
                        <div className={`text-[10px] truncate ${isActive ? 'text-stone-800 font-semibold' : 'text-stone-400'}`}>
                          {item.desc}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0 ml-2">
                      {item.count !== null && (
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          isActive ? 'bg-stone-950 text-[#c28c46]' : 'bg-stone-800 text-stone-300'
                        }`}>
                          {item.count}
                        </span>
                      )}
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-stone-950' : 'text-stone-500'}`} />
                    </div>
                  </button>
                );
              })}
            </nav>

            {/* Drawer Footer Actions */}
            <div className="p-3 border-t border-stone-800 bg-[#14100e] space-y-2">
              <button
                onClick={() => {
                  setMobileSidebarOpen(false);
                  setCurrentView('website');
                }}
                className="w-full py-2.5 px-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 text-[#c28c46]" />
                Back to Website
              </button>

              <button
                onClick={() => {
                  setMobileSidebarOpen(false);
                  if (window.confirm('Reset all site data, services, reviews, and config back to default?')) {
                    resetToDefaults();
                    alert('Reset successfully!');
                  }
                }}
                className="w-full py-2 px-3 text-[11px] text-red-400 hover:bg-red-950/40 rounded-lg flex items-center justify-center gap-1.5 transition-colors font-medium cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Reset All to Defaults
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-3 sm:py-8 w-full flex-1 flex flex-col md:flex-row gap-4 sm:gap-6 pb-20 md:pb-8">
        
        {/* Mobile Active Section Bar (Clean & Static - No Left/Right Scroll) */}
        <div className="md:hidden flex items-center justify-between bg-white px-3.5 py-2.5 rounded-xl border border-stone-200/90 shadow-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="text-[10px] font-black uppercase tracking-wider text-stone-400 shrink-0">Section:</span>
            <span className="text-xs font-black text-stone-900 truncate">
              {activeTab === 'overview' && '📊 Overview & Stats'}
              {activeTab === 'leads' && `👥 Customer Inquiries (${leads.length})`}
              {activeTab === 'products' && `📦 Products Catalog (${products.length})`}
              {activeTab === 'services' && `🛠️ Services (${services.length})`}
              {activeTab === 'projects' && `🎬 YouTube Videos (${projects.length})`}
              {activeTab === 'photos' && `🖼️ Photos Gallery (${galleryImages.length})`}
              {activeTab === 'settings' && '⚙️ Site & Contact Settings'}
            </span>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="flex items-center gap-1.5 text-xs font-extrabold text-stone-950 px-3 py-1.5 rounded-lg bg-[#c28c46] hover:bg-[#b07d3b] shrink-0 cursor-pointer shadow-xs transition-all active:scale-95"
            title="Open Sidebar"
          >
            <Menu className="w-3.5 h-3.5" />
            <span>Side Bar</span>
          </button>
        </div>

        {/* Sidebar Nav (Desktop Only) */}
        <aside className="hidden md:block md:w-60 shrink-0 space-y-1 bg-white p-3 rounded-2xl border border-stone-200 shadow-xs h-fit sticky top-20">
          <button
            onClick={() => setActiveTab('overview')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'overview'
                ? 'bg-[#1f1e1d] text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <TrendingUp className="w-4 h-4 text-[#c28c46]" />
              <span>Overview</span>
            </div>
          </button>

          <button
            onClick={() => setActiveTab('leads')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'leads'
                ? 'bg-[#1f1e1d] text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Users className="w-4 h-4 text-[#c28c46]" />
              <span>Inquiries & Leads</span>
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-[#c28c46] text-white font-bold">
              {leads.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'products'
                ? 'bg-[#1f1e1d] text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Package className="w-4 h-4 text-[#c28c46]" />
              <span>Products (پروڈکٹس)</span>
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-900 font-bold">
              {products.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'services'
                ? 'bg-[#1f1e1d] text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Layers className="w-4 h-4 text-[#c28c46]" />
              <span>Services (9 Categories)</span>
            </div>
            <span className="text-[11px] text-stone-400">{services.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'projects'
                ? 'bg-[#1f1e1d] text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Film className="w-4 h-4 text-[#c28c46]" />
              <span>YouTube Video Box</span>
            </div>
            <span className="text-[11px] text-stone-400">{projects.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('photos')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'photos'
                ? 'bg-[#1f1e1d] text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <ImageIcon className="w-4 h-4 text-[#c28c46]" />
              <span>Photos & Showcase</span>
            </div>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-100 text-amber-900 font-bold">
              {galleryImages.length}
            </span>
          </button>

          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'settings'
                ? 'bg-[#1f1e1d] text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Settings className="w-4 h-4 text-[#c28c46]" />
              <span>Site & Contact Settings</span>
            </div>
          </button>

          <div className="pt-4 mt-4 border-t border-stone-200">
            <button
              onClick={() => {
                if (window.confirm('Reset all site data, services, reviews, and config back to default?')) {
                  resetToDefaults();
                  alert('Reset successfully!');
                }
              }}
              className="w-full text-left px-3 py-2 text-[11px] text-red-600 hover:bg-red-50 rounded-lg flex items-center gap-2 transition-colors font-medium"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset All to Defaults
            </button>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 bg-white p-3.5 sm:p-6 rounded-2xl border border-stone-200 shadow-xs min-h-[500px]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-lg sm:text-xl font-bold text-stone-900">Dashboard Overview</h2>
                <p className="text-[11px] sm:text-xs text-stone-500">Live statistics and customer engagement summary.</p>
              </div>

              {/* KPI Stat Cards (2-by-2 on Mobile, Compact & Sleek) */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3">
                {/* 1. New Inquiries */}
                <div
                  onClick={() => setActiveTab('leads')}
                  className="p-2.5 sm:p-3 rounded-xl bg-amber-50/80 hover:bg-amber-100/90 border border-amber-200/80 transition-all cursor-pointer shadow-2xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-amber-950 truncate">New Leads</span>
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-amber-800 my-0.5">
                    {leads.filter((l) => l.status === 'new').length}
                  </p>
                  <span className="text-[9px] text-amber-700 font-medium truncate">Pending review</span>
                </div>

                {/* 2. Total Leads */}
                <div
                  onClick={() => setActiveTab('leads')}
                  className="p-2.5 sm:p-3 rounded-xl bg-blue-50/80 hover:bg-blue-100/90 border border-blue-200/80 transition-all cursor-pointer shadow-2xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-blue-950 truncate">Total Leads</span>
                    <Users className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-blue-800 my-0.5">
                    {leads.length}
                  </p>
                  <span className="text-[9px] text-blue-700 font-medium truncate">From website</span>
                </div>

                {/* 3. Custom Products */}
                <div
                  onClick={() => setActiveTab('products')}
                  className="p-2.5 sm:p-3 rounded-xl bg-orange-50/80 hover:bg-orange-100/90 border border-orange-200/80 transition-all cursor-pointer shadow-2xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-orange-950 truncate">Products</span>
                    <Package className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-orange-800 my-0.5">
                    {products.length}
                  </p>
                  <span className="text-[9px] text-orange-700 font-medium truncate">In catalog</span>
                </div>

                {/* 4. Active Services */}
                <div
                  onClick={() => setActiveTab('services')}
                  className="p-2.5 sm:p-3 rounded-xl bg-purple-50/80 hover:bg-purple-100/90 border border-purple-200/80 transition-all cursor-pointer shadow-2xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-purple-950 truncate">Services</span>
                    <Layers className="w-3.5 h-3.5 text-purple-500 shrink-0" />
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-purple-800 my-0.5">
                    {services.length}
                  </p>
                  <span className="text-[9px] text-purple-700 font-medium truncate">9 categories</span>
                </div>

                {/* 5. Video Projects */}
                <div
                  onClick={() => setActiveTab('projects')}
                  className="p-2.5 sm:p-3 rounded-xl bg-red-50/80 hover:bg-red-100/90 border border-red-200/80 transition-all cursor-pointer shadow-2xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-red-950 truncate">Videos</span>
                    <Film className="w-3.5 h-3.5 text-red-500 shrink-0" />
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-red-800 my-0.5">
                    {projects.length}
                  </p>
                  <span className="text-[9px] text-red-700 font-medium truncate">YouTube boxes</span>
                </div>

                {/* 6. Gallery Photos */}
                <div
                  onClick={() => setActiveTab('photos')}
                  className="p-2.5 sm:p-3 rounded-xl bg-emerald-50/80 hover:bg-emerald-100/90 border border-emerald-200/80 transition-all cursor-pointer shadow-2xs flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-emerald-950 truncate">Photos</span>
                    <ImageIcon className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </div>
                  <p className="text-xl sm:text-2xl font-black text-emerald-800 my-0.5">
                    {galleryImages.length}
                  </p>
                  <span className="text-[9px] text-emerald-700 font-medium truncate">Showcase gallery</span>
                </div>
              </div>

              {/* Recent Leads Preview */}
              <div className="border border-stone-200 rounded-xl overflow-hidden">
                <div className="bg-stone-50 px-4 py-3 border-b border-stone-200 flex items-center justify-between">
                  <h3 className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                    Recent Customer Inquiries
                  </h3>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs text-[#c28c46] hover:underline font-bold"
                  >
                    View All Leads →
                  </button>
                </div>
                <div className="divide-y divide-stone-100">
                  {leads.slice(0, 4).map((lead) => (
                    <div key={lead.id} className="p-4 flex items-center justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-stone-900">{lead.name}</span>
                          {getStatusBadge(lead.status)}
                        </div>
                        <p className="text-xs text-stone-500 mt-0.5">
                          {lead.service} • {lead.phone} • {lead.createdAt}
                        </p>
                        <p className="text-xs text-stone-700 mt-1 line-clamp-1 italic">
                          "{lead.message}"
                        </p>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Hi ${lead.name}, thank you for contacting Wood Reno regarding ${lead.service}.`)}`}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
                          title="Reply on WhatsApp"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LEADS & INQUIRIES */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-stone-900">Customer Leads & Inquiries</h2>
                  <p className="text-xs text-stone-500">
                    Track consultation requests and project quotation submissions.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-stone-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={leadSearch}
                      onChange={(e) => setLeadSearch(e.target.value)}
                      placeholder="Search name, phone, service..."
                      className="pl-8 pr-3 py-1.5 text-xs border border-stone-300 rounded-lg outline-hidden focus:border-[#c28c46] w-48 sm:w-60"
                    />
                  </div>

                  <select
                    value={leadStatusFilter}
                    onChange={(e) => setLeadStatusFilter(e.target.value)}
                    className="px-2.5 py-1.5 text-xs border border-stone-300 rounded-lg outline-hidden bg-white text-stone-700"
                  >
                    <option value="all">All Statuses</option>
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="quoted">Quoted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {filteredLeads.length === 0 ? (
                <div className="text-center py-12 bg-stone-50 rounded-xl border border-stone-200">
                  <p className="text-stone-500 text-xs">No inquiries found matching your filters.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredLeads.map((lead) => (
                    <div
                      key={lead.id}
                      className="p-4 rounded-xl border border-stone-200 bg-white hover:border-[#c28c46] transition-colors shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-sm text-stone-900">{lead.name}</span>
                            {getStatusBadge(lead.status)}
                            <span className="text-[11px] font-mono text-stone-400">
                              {lead.createdAt}
                            </span>
                          </div>

                          <div className="flex items-center gap-4 text-xs text-stone-600 flex-wrap pt-0.5">
                            <span className="font-semibold text-stone-900">
                              Service: <span className="text-[#b57a2c]">{lead.service}</span>
                            </span>
                            <span>Phone: <strong>{lead.phone}</strong></span>
                            {lead.email && <span>Email: {lead.email}</span>}
                            {lead.budget && <span>Budget: <strong className="text-stone-800">{lead.budget}</strong></span>}
                          </div>

                          <p className="text-xs text-stone-700 mt-2 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                            {lead.message || 'No additional message provided.'}
                          </p>

                          {lead.notes && (
                            <p className="text-[11px] text-amber-800 bg-amber-50/60 p-2 rounded-md border border-amber-200/60 mt-1">
                              <strong>Note:</strong> {lead.notes}
                            </p>
                          )}
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 sm:self-start shrink-0">
                          {/* Status dropdown */}
                          <select
                            value={lead.status}
                            onChange={(e) => updateLeadStatus(lead.id, e.target.value as LeadItem['status'])}
                            className="text-xs border border-stone-300 rounded-lg px-2 py-1 bg-white outline-hidden font-medium"
                          >
                            <option value="new">New</option>
                            <option value="contacted">Contacted</option>
                            <option value="quoted">Quoted</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>

                          {/* Quick WhatsApp reply */}
                          <a
                            href={`https://wa.me/${lead.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(`Assalam-o-Alaikum ${lead.name}, this is Wood Reno regarding your inquiry for ${lead.service}.`)}`}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 rounded-lg bg-green-500 hover:bg-green-600 text-white transition-colors"
                            title="Open WhatsApp Chat"
                          >
                            <MessageCircle className="w-4 h-4" />
                          </a>

                          {/* Call */}
                          <a
                            href={`tel:${lead.phone}`}
                            className="p-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                            title="Call Phone"
                          >
                            <Phone className="w-4 h-4" />
                          </a>

                          {/* Delete */}
                          <button
                            onClick={() => {
                              if (window.confirm('Delete this inquiry?')) {
                                deleteLead(lead.id);
                              }
                            }}
                            className="p-1.5 rounded-lg text-stone-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB: PRODUCTS (پروڈکٹس مینیجر - قیمتوں کے بغیر) */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#c28c46]" />
                    <span>Custom Wood Products Manager</span>
                  </h2>
                  <p className="text-xs text-stone-500">
                    Manage ready-made handcrafted furniture, cupboards, and doors displayed on the homepage. Note: Prices are hidden as requested.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setProductForm({
                      title: '',
                      category: 'Living Room',
                      image: '',
                      description: '',
                      material: 'Solid Teak Wood',
                      dimensions: 'Standard Custom Sizes',
                    });
                    setIsAddingProduct(true);
                    setEditingProduct(null);
                  }}
                  className="bg-[#1f1e1d] hover:bg-black text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4 text-[#c28c46]" />
                  Add New Product
                </button>
              </div>

              {/* Add / Edit Product Form Modal */}
              {(isAddingProduct || editingProduct) && (
                <div className="p-5 bg-stone-50 rounded-2xl border border-stone-300 space-y-4 shadow-sm animate-in fade-in duration-200">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                    <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                      <Package className="w-4 h-4 text-[#c28c46]" />
                      <span>{editingProduct ? 'Edit Product' : 'Add New Product (نئی پروڈکٹ)'}</span>
                    </h3>
                    <button
                      onClick={() => {
                        setIsAddingProduct(false);
                        setEditingProduct(null);
                      }}
                      className="text-stone-400 hover:text-stone-700 text-xs font-semibold"
                    >
                      Cancel
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!productForm.title || !productForm.image) {
                        alert('Please provide at least Title and Image URL');
                        return;
                      }

                      if (editingProduct) {
                        updateProduct(editingProduct.id, {
                          title: productForm.title,
                          category: productForm.category,
                          image: productForm.image,
                          description: productForm.description,
                          material: productForm.material,
                          dimensions: productForm.dimensions,
                        });
                      } else {
                        addProduct({
                          title: productForm.title,
                          category: productForm.category,
                          image: productForm.image,
                          description: productForm.description,
                          material: productForm.material,
                          dimensions: productForm.dimensions,
                          inStock: true,
                        });
                      }

                      setIsAddingProduct(false);
                      setEditingProduct(null);
                    }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs"
                  >
                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Product Title / Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Royal Chesterfield Solid Teak Sofa"
                        value={productForm.title}
                        onChange={(e) => setProductForm({ ...productForm, title: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Category *</label>
                      <select
                        value={productForm.category}
                        onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
                      >
                        <option value="Living Room">Living Room</option>
                        <option value="Media & Wall Units">Media & Wall Units</option>
                        <option value="Wardrobes & Closets">Wardrobes & Closets</option>
                        <option value="Modular Kitchens">Modular Kitchens</option>
                        <option value="Commercial & Office">Commercial & Office</option>
                        <option value="Doors">Doors</option>
                        <option value="Dining & Living">Dining & Living</option>
                        <option value="Bedroom Furniture">Bedroom Furniture</option>
                        <option value="Bespoke Woodwork">Bespoke Woodwork</option>
                      </select>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-semibold text-stone-700 mb-1">Product Image URL *</label>
                      <input
                        type="url"
                        required
                        placeholder="https://images.unsplash.com/... or direct image link"
                        value={productForm.image}
                        onChange={(e) => setProductForm({ ...productForm, image: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
                      />
                      {productForm.image && (
                        <div className="mt-2 w-32 h-20 rounded-lg overflow-hidden border border-stone-200 bg-stone-100">
                          <img src={productForm.image} alt="Preview" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Wood Material / Finish</label>
                      <input
                        type="text"
                        placeholder="e.g. Seasoned Solid Teak & Walnut Polish"
                        value={productForm.material}
                        onChange={(e) => setProductForm({ ...productForm, material: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-stone-700 mb-1">Standard Dimensions / Setup</label>
                      <input
                        type="text"
                        placeholder="e.g. 7ft x 3.5ft / Custom Sizes"
                        value={productForm.dimensions}
                        onChange={(e) => setProductForm({ ...productForm, dimensions: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block font-semibold text-stone-700 mb-1">Product Description</label>
                      <textarea
                        rows={2}
                        placeholder="Brief overview of the product, craftsmanship, and fittings..."
                        value={productForm.description}
                        onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                        className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white"
                      />
                    </div>

                    <div className="md:col-span-2 flex items-center justify-between pt-2">
                      <p className="text-[11px] text-stone-500 italic">
                        * Note: Per your preference, no prices are shown to clients. Clients will inquire via Quote or WhatsApp.
                      </p>
                      <button
                        type="submit"
                        className="bg-[#1f1e1d] hover:bg-black text-white px-5 py-2 rounded-lg font-bold shadow-sm"
                      >
                        {editingProduct ? 'Update Product' : 'Save Product'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Products List Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                  <div
                    key={product.id}
                    className="bg-white rounded-xl border border-stone-200 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative aspect-video bg-stone-100 overflow-hidden">
                        <img src={product.image} alt={product.title} className="w-full h-full object-cover" />
                        <span className="absolute top-2 left-2 bg-white/90 backdrop-blur-xs text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                          {product.category}
                        </span>
                      </div>
                      <div className="p-3.5 space-y-1">
                        <h4 className="font-bold text-stone-900 text-sm line-clamp-1">{product.title}</h4>
                        <p className="text-stone-500 text-xs line-clamp-2">{product.description}</p>
                        {product.material && (
                          <p className="text-[11px] text-stone-600 font-medium truncate pt-1">
                            🪵 <strong>Material:</strong> {product.material}
                          </p>
                        )}
                        {product.dimensions && (
                          <p className="text-[11px] text-stone-600 font-medium truncate">
                            📐 <strong>Size:</strong> {product.dimensions}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="p-3 border-t border-stone-100 bg-stone-50 flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-sm">
                        No Price Shown (Private)
                      </span>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingProduct(product);
                            setProductForm({
                              title: product.title,
                              category: product.category,
                              image: product.image,
                              description: product.description,
                              material: product.material || '',
                              dimensions: product.dimensions || '',
                            });
                            setIsAddingProduct(false);
                          }}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-200 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${product.title}?`)) {
                              deleteProduct(product.id);
                            }
                          }}
                          className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SERVICES */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-stone-900">Manage Services</h2>
                  <p className="text-xs text-stone-500">
                    Edit the 9 category cards displayed on the homepage (Cupboards, Kitchen, Doors, etc.).
                  </p>
                </div>

                <button
                  onClick={() => {
                    setServiceForm({
                      title: '',
                      category: '',
                      image: '',
                      description: '',
                      priceStart: '',
                    });
                    setIsAddingService(true);
                  }}
                  className="bg-[#1f1e1d] hover:bg-black text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  Add New Service
                </button>
              </div>

              {/* Add / Edit Service Form Modal */}
              {(isAddingService || editingService) && (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-300 space-y-3">
                  <h3 className="text-xs font-bold text-stone-800 uppercase">
                    {editingService ? 'Edit Service' : 'Add New Service Card'}
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Title (e.g. Cupboards, Kitchen, Wood Ramp)
                      </label>
                      <input
                        type="text"
                        value={editingService ? editingService.title : serviceForm.title}
                        onChange={(e) =>
                          editingService
                            ? setEditingService({ ...editingService, title: e.target.value })
                            : setServiceForm({ ...serviceForm, title: e.target.value })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-md outline-hidden bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Category Tag
                      </label>
                      <input
                        type="text"
                        value={editingService ? editingService.category : serviceForm.category}
                        onChange={(e) =>
                          editingService
                            ? setEditingService({ ...editingService, category: e.target.value })
                            : setServiceForm({ ...serviceForm, category: e.target.value })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-md outline-hidden bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Image URL
                      </label>
                      <input
                        type="url"
                        value={editingService ? editingService.image : serviceForm.image}
                        onChange={(e) =>
                          editingService
                            ? setEditingService({ ...editingService, image: e.target.value })
                            : setServiceForm({ ...serviceForm, image: e.target.value })
                        }
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-md outline-hidden bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Starting Price / Rate
                      </label>
                      <input
                        type="text"
                        value={editingService ? editingService.priceStart || '' : serviceForm.priceStart}
                        onChange={(e) =>
                          editingService
                            ? setEditingService({ ...editingService, priceStart: e.target.value })
                            : setServiceForm({ ...serviceForm, priceStart: e.target.value })
                        }
                        placeholder="e.g. PKR 1,800 / sq.ft"
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-md outline-hidden bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Description
                    </label>
                    <textarea
                      rows={2}
                      value={editingService ? editingService.description : serviceForm.description}
                      onChange={(e) =>
                        editingService
                          ? setEditingService({ ...editingService, description: e.target.value })
                          : setServiceForm({ ...serviceForm, description: e.target.value })
                      }
                      className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-md outline-hidden bg-white"
                    />
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => {
                        if (editingService) {
                          updateService(editingService.id, editingService);
                          setEditingService(null);
                        } else {
                          if (!serviceForm.title.trim()) return;
                          addService({
                            title: serviceForm.title,
                            category: serviceForm.category || 'Carpentry',
                            image: serviceForm.image || 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
                            description: serviceForm.description || 'Custom crafted woodwork solution.',
                            priceStart: serviceForm.priceStart,
                          });
                          setIsAddingService(false);
                        }
                      }}
                      className="bg-green-700 hover:bg-green-800 text-white text-xs font-bold px-4 py-2 rounded-lg"
                    >
                      Save Service
                    </button>
                    <button
                      onClick={() => {
                        setEditingService(null);
                        setIsAddingService(false);
                      }}
                      className="bg-stone-300 hover:bg-stone-400 text-stone-800 text-xs font-bold px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Service Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="p-3 rounded-xl border border-stone-200 bg-stone-50 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-full aspect-[4/3] rounded-lg overflow-hidden mb-2 bg-stone-200">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold text-stone-900">{service.title}</h4>
                        <span className="text-[10px] font-bold text-[#b57a2c]">
                          {service.priceStart}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1 line-clamp-2">
                        {service.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-1.5 mt-3 pt-2 border-t border-stone-200">
                      <button
                        onClick={() => setEditingService(service)}
                        className="p-1.5 text-stone-600 hover:text-stone-900 rounded-md hover:bg-stone-200"
                        title="Edit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete ${service.title}?`)) {
                            deleteService(service.id);
                          }
                        }}
                        className="p-1.5 text-stone-400 hover:text-red-600 rounded-md hover:bg-red-50"
                        title="Delete"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS (YOUTUBE VIDEO BOX) */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                    <Film className="w-5 h-5 text-[#c28c46]" />
                    <span>YouTube Video Box Manager</span>
                  </h2>
                  <p className="text-xs text-stone-500">
                    Add or edit YouTube video links, thumbnails, and project walkthroughs that appear on the homepage.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setProjectForm({
                      title: '',
                      category: 'Showcase',
                      thumbnail: '',
                      youtubeId: '',
                      duration: 'Video',
                      description: '',
                    });
                    setIsAddingProject(true);
                    setEditingProject(null);
                  }}
                  className="bg-[#1f1e1d] hover:bg-black text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4 text-[#c28c46]" />
                  Add YouTube Video
                </button>
              </div>

              {/* Add / Edit Project Form - ONLY YouTube Link Required */}
              {(isAddingProject || editingProject) && (
                <div className="p-4 sm:p-5 bg-gradient-to-br from-stone-50 to-amber-50/50 rounded-2xl border-2 border-amber-300 shadow-md space-y-3.5">
                  <div className="flex items-center justify-between border-b border-amber-200/60 pb-2">
                    <h3 className="text-xs sm:text-sm font-extrabold text-stone-900 uppercase flex items-center gap-2">
                      <Film className="w-4 h-4 text-red-600" />
                      <span>{editingProject ? 'Edit YouTube Video Link' : 'Add New YouTube Video'}</span>
                    </h3>
                    <span className="text-[10px] sm:text-xs text-stone-500 font-medium">
                      Sirf YouTube link dalein, video foran add ho jayegi
                    </span>
                  </div>

                  {/* YouTube Link / URL Input - ONLY FIELD REQUIRED */}
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-2xs space-y-2">
                    <label className="block text-xs font-bold text-stone-900 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="bg-red-600 text-white rounded-xs px-1 text-[9px] font-black">▶</span>
                        YouTube Video Link (یوٹیوب ویڈیو کا لنک)
                      </span>
                    </label>

                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="text"
                        value={editingProject ? editingProject.youtubeId : projectForm.youtubeId}
                        onChange={(e) => {
                          const val = e.target.value;
                          const extracted = extractYouTubeId(val);
                          if (editingProject) {
                            setEditingProject({
                              ...editingProject,
                              youtubeId: val,
                              thumbnail: `https://img.youtube.com/vi/${extracted}/hqdefault.jpg`,
                            });
                          } else {
                            setProjectForm({
                              ...projectForm,
                              youtubeId: val,
                              thumbnail: `https://img.youtube.com/vi/${extracted}/hqdefault.jpg`,
                            });
                          }
                        }}
                        placeholder="https://www.youtube.com/watch?v=... ya https://youtu.be/..."
                        className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-lg outline-hidden bg-white focus:ring-2 focus:ring-[#c28c46] font-mono"
                        autoFocus
                      />
                    </div>

                    <p className="text-[10px] text-stone-500">
                      YouTube Video ID: <strong className="text-stone-900 font-mono">{extractYouTubeId(editingProject ? editingProject.youtubeId : projectForm.youtubeId)}</strong>
                    </p>
                  </div>

                  {/* Live Video Preview thumbnail */}
                  {(() => {
                    const currentId = extractYouTubeId(editingProject ? editingProject.youtubeId : projectForm.youtubeId);
                    return (
                      <div className="p-3 bg-white rounded-xl border border-stone-200 flex items-center gap-3">
                        <div className="w-28 sm:w-36 aspect-video bg-black rounded-lg overflow-hidden relative shrink-0">
                          <img
                            src={`https://img.youtube.com/vi/${currentId}/hqdefault.jpg`}
                            alt="preview"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80';
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-7 h-5 bg-red-600 rounded flex items-center justify-center shadow">
                              <Play className="w-2.5 h-2.5 fill-white text-white translate-x-0.5" />
                            </div>
                          </div>
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            Auto-detected Thumbnail ✓
                          </span>
                          <p className="text-xs font-bold text-stone-900 mt-1 truncate">
                            {editingProject ? editingProject.title : `WoodNido Video Box #${projects.length + 1}`}
                          </p>
                          <p className="text-[10px] text-stone-500 truncate font-mono">
                            ID: {currentId}
                          </p>
                        </div>
                      </div>
                    );
                  })()}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      onClick={() => {
                        const rawInput = editingProject ? editingProject.youtubeId : projectForm.youtubeId;
                        const finalId = extractYouTubeId(rawInput);
                        if (!finalId || (finalId === 'dQw4w9WgXcQ' && !rawInput.trim())) {
                          alert('YouTube video link dalna zaroori hai.');
                          return;
                        }

                        if (editingProject) {
                          updateProject(editingProject.id, {
                            ...editingProject,
                            youtubeId: finalId,
                            thumbnail: `https://img.youtube.com/vi/${finalId}/hqdefault.jpg`,
                          });
                          setEditingProject(null);
                        } else {
                          addProject({
                            title: `WoodNido Video #${projects.length + 1}`,
                            category: 'Showcase',
                            thumbnail: `https://img.youtube.com/vi/${finalId}/hqdefault.jpg`,
                            youtubeId: finalId,
                            duration: 'Video',
                            description: 'WoodNido furniture and woodwork video walkthrough.',
                          });
                          setIsAddingProject(false);
                          setProjectForm({
                            title: '',
                            category: 'Showcase',
                            thumbnail: '',
                            youtubeId: '',
                            duration: 'Video',
                            description: '',
                          });
                        }
                      }}
                      className="bg-green-700 hover:bg-green-800 text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>{editingProject ? 'Update Video' : 'Add Video to Main Page'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setEditingProject(null);
                        setIsAddingProject(false);
                      }}
                      className="bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Projects List with Direct YouTube URL Boxes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3">
                {projects.map((proj, idx) => {
                  const currentInputVal =
                    projectUrlInputs[proj.id] !== undefined
                      ? projectUrlInputs[proj.id]
                      : proj.youtubeId.startsWith('http')
                      ? proj.youtubeId
                      : `https://www.youtube.com/watch?v=${proj.youtubeId}`;

                  return (
                    <div
                      key={proj.id}
                      className="p-2.5 sm:p-3 rounded-xl border border-stone-200 bg-white hover:border-amber-400 hover:shadow-xs transition-all flex flex-col justify-between"
                    >
                      <div>
                        {/* Video Thumbnail with Click to Preview */}
                        <div
                          onClick={() => setPreviewVideoItem(proj)}
                          className="w-full aspect-video rounded-lg overflow-hidden mb-2 bg-black relative group cursor-pointer"
                          title="Click to preview video"
                        >
                          <img
                            src={proj.thumbnail}
                            alt={proj.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${extractYouTubeId(proj.youtubeId)}/hqdefault.jpg`;
                            }}
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                            <div className="w-8 h-5.5 sm:w-9 sm:h-6 bg-red-600 rounded-md flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                              <Play className="w-3 h-3 fill-white text-white translate-x-0.5" />
                            </div>
                          </div>
                          <span className="absolute bottom-1 right-1 bg-black/85 text-white text-[9px] px-1 py-0.5 rounded-xs font-mono">
                            {proj.duration || 'Video'}
                          </span>
                          <span className="absolute top-1 left-1 bg-[#c28c46] text-stone-950 text-[9px] font-black px-1.5 py-0.2 rounded-2xs shadow-2xs">
                            Box #{idx + 1}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-1 mb-1">
                          <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{proj.title}</h4>
                          <span className="text-[9px] text-[#c28c46] font-semibold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200 shrink-0">
                            {proj.category}
                          </span>
                        </div>

                        {/* Dedicated YouTube URL Input Box with 1-click Save */}
                        <div className="mt-1.5 p-1.5 rounded-lg bg-stone-50 border border-stone-200 space-y-1">
                          <div className="flex items-center justify-between text-[9px] font-bold text-stone-700">
                            <span className="flex items-center gap-1">
                              <span className="bg-red-600 text-white rounded-2xs px-0.5 text-[7px] font-black">▶</span>
                              YouTube URL
                            </span>
                            {projectSavedBadge[proj.id] && (
                              <span className="text-green-700 font-bold bg-green-100 px-1 py-0.2 rounded border border-green-300 animate-pulse text-[8px]">
                                Live ✓
                              </span>
                            )}
                          </div>

                          <div className="flex gap-1">
                            <input
                              type="text"
                              value={currentInputVal}
                              onChange={(e) => {
                                const val = e.target.value;
                                setProjectUrlInputs((prev) => ({ ...prev, [proj.id]: val }));
                              }}
                              placeholder="YouTube link..."
                              className="flex-1 px-2 py-1 text-xs border border-stone-300 rounded-md outline-hidden bg-white focus:ring-1 focus:ring-[#c28c46] font-mono"
                            />
                            <button
                              type="button"
                              onClick={() => handleQuickSaveProjectUrl(proj)}
                              className="px-2 py-1 bg-[#1f1e1d] hover:bg-black text-[#fdf8f0] text-xs font-bold rounded-md transition-colors shrink-0 shadow-2xs cursor-pointer flex items-center gap-0.5"
                              title="Save this video link"
                            >
                              <Save className="w-2.5 h-2.5 text-[#c28c46]" />
                              <span>Save</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer Actions */}
                      <div className="flex items-center justify-between gap-1.5 mt-3 pt-2 border-t border-stone-200 text-xs">
                        <button
                          type="button"
                          onClick={() => setPreviewVideoItem(proj)}
                          className="text-[11px] text-[#b57a2c] font-semibold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <Play className="w-3 h-3 text-red-600 fill-red-600" />
                          <span>Test Play</span>
                        </button>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setEditingProject(proj);
                              setIsAddingProject(false);
                            }}
                            className="p-1.5 text-stone-600 hover:text-stone-900 rounded-md hover:bg-stone-100 cursor-pointer"
                            title="Edit Title / Details"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (window.confirm(`Delete ${proj.title}?`)) {
                                deleteProject(proj.id);
                              }
                            }}
                            className="p-1.5 text-stone-400 hover:text-red-600 rounded-md hover:bg-red-50 cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Video Player Preview Modal inside Admin */}
              {previewVideoItem && (
                <div
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in duration-150"
                  onClick={() => setPreviewVideoItem(null)}
                >
                  <div
                    className="relative w-full max-w-2xl bg-black rounded-2xl overflow-hidden border border-stone-800 shadow-2xl"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="p-3 bg-stone-900 flex items-center justify-between text-white border-b border-stone-800">
                      <span className="text-xs font-bold truncate max-w-md">{previewVideoItem.title}</span>
                      <button
                        onClick={() => setPreviewVideoItem(null)}
                        className="p-1 text-stone-400 hover:text-white cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="aspect-video w-full bg-black">
                      <iframe
                        src={`https://www.youtube.com/embed/${extractYouTubeId(previewVideoItem.youtubeId)}?autoplay=1&rel=0`}
                        title={previewVideoItem.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB: PHOTOS & SHOWCASE MANAGER */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#c28c46]" />
                    <span>Photos & Image Gallery Manager (تمام فوٹوز کا انتظام)</span>
                  </h2>
                  <p className="text-xs text-stone-500">
                    Update hero photo, gallery photos, and category photos. Any change here immediately reflects on the main page.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setGalleryForm({
                      title: '',
                      category: 'Interior',
                      image: '',
                    });
                    setIsAddingGalleryItem(true);
                    setEditingGalleryItem(null);
                  }}
                  className="bg-[#1f1e1d] hover:bg-black text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4 text-[#c28c46]" />
                  Add New Photo
                </button>
              </div>

              {/* Main Page Top Hero Photo Quick Edit */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 flex flex-col md:flex-row items-center gap-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#c28c46] shrink-0 bg-stone-200">
                  <img
                    src={settingsForm.heroImage || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80'}
                    alt="Hero banner"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 space-y-2 w-full">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900 uppercase">
                      ⭐ Main Homepage Hero Banner Image (مرکزی ہیرو تصویر)
                    </span>
                    <span className="text-[10px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-semibold">
                      First Visual
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={settingsForm.heroImage || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroImage: e.target.value })}
                      placeholder="Enter Image URL for main top banner"
                      className="flex-1 px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white outline-hidden focus:ring-2 focus:ring-[#c28c46]"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        updateSiteConfig({ heroImage: settingsForm.heroImage });
                        alert('Hero Photo updated successfully on the main page!');
                      }}
                      className="bg-[#1f1e1d] hover:bg-black text-white text-xs font-bold px-4 py-1.5 rounded-lg shrink-0 transition-colors"
                    >
                      Update Hero Photo
                    </button>
                  </div>
                  <p className="text-[10px] text-stone-500">
                    This photo displays in the prominent circular cutout on the homepage hero section.
                  </p>
                </div>
              </div>

              {/* Add / Edit Gallery Photo Form */}
              {(isAddingGalleryItem || editingGalleryItem) && (
                <div className="p-4 bg-stone-50 rounded-xl border border-stone-300 space-y-3">
                  <h3 className="text-xs font-bold text-stone-800 uppercase flex items-center gap-1.5">
                    <ImagePlus className="w-4 h-4 text-[#c28c46]" />
                    <span>{editingGalleryItem ? 'Edit Gallery Photo' : 'Add New Gallery Photo'}</span>
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Photo Title
                      </label>
                      <input
                        type="text"
                        value={editingGalleryItem ? editingGalleryItem.title : galleryForm.title}
                        onChange={(e) =>
                          editingGalleryItem
                            ? setEditingGalleryItem({ ...editingGalleryItem, title: e.target.value })
                            : setGalleryForm({ ...galleryForm, title: e.target.value })
                        }
                        placeholder="e.g. Modern Minimalist Kitchen"
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg outline-hidden bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Category Tag
                      </label>
                      <input
                        type="text"
                        value={editingGalleryItem ? editingGalleryItem.category : galleryForm.category}
                        onChange={(e) =>
                          editingGalleryItem
                            ? setEditingGalleryItem({ ...editingGalleryItem, category: e.target.value })
                            : setGalleryForm({ ...galleryForm, category: e.target.value })
                        }
                        placeholder="Cupboards / Kitchen / Living Room"
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg outline-hidden bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Image URL (تصویر کا مکمل لنک)
                      </label>
                      <input
                        type="url"
                        value={editingGalleryItem ? editingGalleryItem.image : galleryForm.image}
                        onChange={(e) =>
                          editingGalleryItem
                            ? setEditingGalleryItem({ ...editingGalleryItem, image: e.target.value })
                            : setGalleryForm({ ...galleryForm, image: e.target.value })
                        }
                        placeholder="https://images.unsplash.com/..."
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg outline-hidden bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => {
                        if (editingGalleryItem) {
                          updateGalleryImage(editingGalleryItem.id, editingGalleryItem);
                          setEditingGalleryItem(null);
                        } else {
                          if (!galleryForm.title.trim() || !galleryForm.image.trim()) {
                            alert('Title aur Image URL zaroori hain.');
                            return;
                          }
                          addGalleryImage(galleryForm);
                          setIsAddingGalleryItem(false);
                        }
                      }}
                      className="bg-green-700 hover:bg-green-800 text-white text-xs font-bold px-4 py-2 rounded-lg"
                    >
                      Save Photo
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingGalleryItem(null);
                        setIsAddingGalleryItem(false);
                      }}
                      className="bg-stone-300 hover:bg-stone-400 text-stone-800 text-xs font-bold px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Gallery Photos Grid */}
              <div>
                <h3 className="text-xs font-bold text-stone-800 uppercase mb-3">
                  Interior Photo Showcase Items (مین پیج پر شو ہونے والی تصاویر)
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {galleryImages.map((img) => (
                    <div
                      key={img.id}
                      className="p-2.5 rounded-xl border border-stone-200 bg-white hover:shadow-md transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="aspect-[3/4] rounded-lg overflow-hidden bg-stone-100 mb-2">
                          <img
                            src={img.image}
                            alt={img.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <h4 className="text-xs font-bold text-stone-900 truncate">{img.title}</h4>
                        <span className="text-[10px] text-[#c28c46] font-medium">{img.category}</span>
                      </div>

                      <div className="flex items-center justify-end gap-1 mt-2 pt-2 border-t border-stone-100">
                        <button
                          onClick={() => {
                            setEditingGalleryItem(img);
                            setIsAddingGalleryItem(false);
                          }}
                          className="p-1 text-stone-600 hover:text-stone-900 rounded hover:bg-stone-100"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${img.title}?`)) {
                              deleteGalleryImage(img.id);
                            }
                          }}
                          className="p-1 text-stone-400 hover:text-red-600 rounded hover:bg-red-50"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick links to Services photos */}
              <div className="p-4 bg-stone-50 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-stone-900">Services & Category Photos (9 کیٹگریز کی تصاویر)</h4>
                  <p className="text-[11px] text-stone-500">
                    To edit images for Cupboards, Kitchen, Doors, Furniture, etc., visit the Services tab.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setActiveTab('services')}
                  className="text-xs font-bold text-[#b57a2c] bg-white px-3 py-1.5 rounded-lg border border-amber-200 hover:bg-amber-50"
                >
                  Manage Service Photos →
                </button>
              </div>
            </div>
          )}

          {/* TAB 5: REVIEWS */}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-stone-900">Client Reviews & Testimonials</h2>
                  <p className="text-xs text-stone-500">
                    Manage testimonials displayed in the "What Our Client S|" section.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingReview(null);
                    setIsAddingReview(true);
                  }}
                  className="bg-[#1f1e1d] hover:bg-black text-white text-xs font-bold px-3.5 py-2 rounded-lg flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  <Plus className="w-4 h-4" />
                  Add New Review
                </button>
              </div>

              <div className="space-y-4">
                {reviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="p-4 rounded-xl border border-stone-200 bg-white space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-stone-900">{rev.name}</span>
                        <div className="flex items-center">
                          {Array.from({ length: rev.rating }).map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-[#e67e22] text-[#e67e22]" />
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete review from ${rev.name}?`)) {
                              deleteReview(rev.id);
                            }
                          }}
                          className="p-1 text-stone-400 hover:text-red-600 rounded-md hover:bg-red-50"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-stone-600 italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900">Site & Contact Settings</h2>
                <p className="text-xs text-stone-500">
                  Update business phone numbers, Islamabad workshop address, hero titles & stats.
                </p>
              </div>

              {settingsSaved && (
                <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-lg flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Settings saved successfully!
                </div>
              )}

              <form onSubmit={handleSaveSettings} className="space-y-5 max-w-2xl">
                
                {/* Contact info */}
                <div className="space-y-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <h3 className="text-xs font-bold text-stone-800 uppercase">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Phone Number (Display)
                      </label>
                      <input
                        type="text"
                        value={settingsForm.displayPhone}
                        onChange={(e) => setSettingsForm({ ...settingsForm, displayPhone: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        WhatsApp Number (Digits only with country code e.g. 923349000098)
                      </label>
                      <input
                        type="text"
                        value={settingsForm.whatsappNumber}
                        onChange={(e) => setSettingsForm({ ...settingsForm, whatsappNumber: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={settingsForm.email}
                        onChange={(e) => setSettingsForm({ ...settingsForm, email: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Website URL
                      </label>
                      <input
                        type="text"
                        value={settingsForm.websiteUrl}
                        onChange={(e) => setSettingsForm({ ...settingsForm, websiteUrl: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Physical Address
                      </label>
                      <input
                        type="text"
                        value={settingsForm.address}
                        onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Shop / Location Display Name
                      </label>
                      <input
                        type="text"
                        value={settingsForm.locationName || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, locationName: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div className="pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveTab('location')}
                      className="text-xs text-[#b57a2c] font-bold hover:underline flex items-center gap-1.5 p-2 rounded-lg bg-amber-50/80 border border-amber-200/80"
                    >
                      <MapPin className="w-4 h-4 text-[#c28c46]" />
                      <span>Open Full Map & Location Manager with Live Preview & Presets →</span>
                    </button>
                  </div>
                </div>

                {/* Hero Section Texts */}
                <div className="space-y-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <h3 className="text-xs font-bold text-stone-800 uppercase">Hero Banner Texts</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Line 1 (Black)
                      </label>
                      <input
                        type="text"
                        value={settingsForm.heroHeadline1}
                        onChange={(e) => setSettingsForm({ ...settingsForm, heroHeadline1: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Line 2 (Cyan)
                      </label>
                      <input
                        type="text"
                        value={settingsForm.heroHeadline2}
                        onChange={(e) => setSettingsForm({ ...settingsForm, heroHeadline2: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Starting Price
                      </label>
                      <input
                        type="text"
                        value={settingsForm.heroStartingPrice}
                        onChange={(e) => setSettingsForm({ ...settingsForm, heroStartingPrice: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Hero Subtext
                    </label>
                    <textarea
                      rows={2}
                      value={settingsForm.heroSubtext}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroSubtext: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Hero Main Round Banner Image URL (ہیرو بینر تصویر)
                    </label>
                    <input
                      type="url"
                      value={settingsForm.heroImage || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroImage: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?..."
                      className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                    />
                  </div>
                </div>

                {/* About Section Customization */}
                <div className="space-y-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <h3 className="text-xs font-bold text-stone-800 uppercase">About Us Photo & Story</h3>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      About Us Workshop / Craftsmanship Image URL
                    </label>
                    <input
                      type="url"
                      value={settingsForm.aboutImage || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, aboutImage: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-1540518614846-7ede433c4550?..."
                      className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      About Story Paragraph 1
                    </label>
                    <textarea
                      rows={2}
                      value={settingsForm.aboutText1 || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, aboutText1: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      About Story Paragraph 2
                    </label>
                    <textarea
                      rows={2}
                      value={settingsForm.aboutText2 || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, aboutText2: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      About Story Paragraph 3
                    </label>
                    <textarea
                      rows={2}
                      value={settingsForm.aboutText3 || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, aboutText3: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                    />
                  </div>
                </div>

                {/* About Stats */}
                <div className="space-y-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <h3 className="text-xs font-bold text-stone-800 uppercase">About Us Statistics</h3>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Experience
                      </label>
                      <input
                        type="text"
                        value={settingsForm.yearsExperience}
                        onChange={(e) => setSettingsForm({ ...settingsForm, yearsExperience: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Experts
                      </label>
                      <input
                        type="text"
                        value={settingsForm.industryExperts}
                        onChange={(e) => setSettingsForm({ ...settingsForm, industryExperts: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Retention
                      </label>
                      <input
                        type="text"
                        value={settingsForm.userRetention}
                        onChange={(e) => setSettingsForm({ ...settingsForm, userRetention: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Clients
                      </label>
                      <input
                        type="text"
                        value={settingsForm.globalClients}
                        onChange={(e) => setSettingsForm({ ...settingsForm, globalClients: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white"
                      />
                    </div>
                  </div>
                </div>

                {/* Admin Password */}
                <div className="space-y-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
                  <h3 className="text-xs font-bold text-stone-800 uppercase">Security</h3>
                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Admin Password / PIN
                    </label>
                    <input
                      type="text"
                      value={settingsForm.adminPin}
                      onChange={(e) => setSettingsForm({ ...settingsForm, adminPin: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg bg-white max-w-xs"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-[#1f1e1d] hover:bg-black text-white text-xs font-bold px-6 py-2.5 rounded-lg flex items-center gap-2 shadow-md"
                >
                  <Save className="w-3.5 h-3.5 text-[#c28c46]" />
                  Save Site Settings
                </button>
              </form>
            </div>
          )}

        </main>
      </div>

      {/* Mobile Fixed Bottom Navigation Bar (5 Options with Icons & Names) */}
      <nav 
        aria-label="Mobile Admin Navigation"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#161210]/95 backdrop-blur-md border-t border-[#35261c] shadow-[0_-4px_20px_rgba(0,0,0,0.35)] px-2 py-1.5 safe-area-pb"
      >
        <div className="grid grid-cols-5 items-center max-w-md mx-auto">
          {/* 1. Overview */}
          <button
            onClick={() => setActiveTab('overview')}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer relative ${
              activeTab === 'overview'
                ? 'text-[#e5be7d]'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className={`p-1 rounded-lg transition-transform ${activeTab === 'overview' ? 'scale-110 bg-[#c28c46]/20' : ''}`}>
              <TrendingUp className="w-4.5 h-4.5" />
            </div>
            <span className={`text-[10px] mt-0.5 tracking-tight ${activeTab === 'overview' ? 'font-black text-[#e5be7d]' : 'font-semibold'}`}>
              Overview
            </span>
          </button>

          {/* 2. Inquiries / Leads */}
          <button
            onClick={() => setActiveTab('leads')}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer relative ${
              activeTab === 'leads'
                ? 'text-[#e5be7d]'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className={`p-1 rounded-lg transition-transform relative ${activeTab === 'leads' ? 'scale-110 bg-[#c28c46]/20' : ''}`}>
              <Users className="w-4.5 h-4.5" />
              {leads.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#c28c46] text-stone-950 text-[9px] font-black px-1.5 py-0.2 rounded-full leading-tight">
                  {leads.length}
                </span>
              )}
            </div>
            <span className={`text-[10px] mt-0.5 tracking-tight ${activeTab === 'leads' ? 'font-black text-[#e5be7d]' : 'font-semibold'}`}>
              Inquiries
            </span>
          </button>

          {/* 3. Products */}
          <button
            onClick={() => setActiveTab('products')}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer relative ${
              activeTab === 'products'
                ? 'text-[#e5be7d]'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className={`p-1 rounded-lg transition-transform relative ${activeTab === 'products' ? 'scale-110 bg-[#c28c46]/20' : ''}`}>
              <Package className="w-4.5 h-4.5" />
              {products.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-stone-700 text-stone-200 text-[9px] font-black px-1.5 py-0.2 rounded-full leading-tight">
                  {products.length}
                </span>
              )}
            </div>
            <span className={`text-[10px] mt-0.5 tracking-tight ${activeTab === 'products' ? 'font-black text-[#e5be7d]' : 'font-semibold'}`}>
              Products
            </span>
          </button>

          {/* 4. Videos */}
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer relative ${
              activeTab === 'projects'
                ? 'text-[#e5be7d]'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className={`p-1 rounded-lg transition-transform relative ${activeTab === 'projects' ? 'scale-110 bg-[#c28c46]/20' : ''}`}>
              <Film className="w-4.5 h-4.5" />
            </div>
            <span className={`text-[10px] mt-0.5 tracking-tight ${activeTab === 'projects' ? 'font-black text-[#e5be7d]' : 'font-semibold'}`}>
              Videos
            </span>
          </button>

          {/* 5. Side Bar / Menu */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className={`flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all cursor-pointer relative ${
              mobileSidebarOpen || activeTab === 'services' || activeTab === 'photos' || activeTab === 'settings'
                ? 'text-[#e5be7d]'
                : 'text-stone-400 hover:text-stone-200'
            }`}
          >
            <div className={`p-1 rounded-lg transition-transform relative ${
              mobileSidebarOpen || activeTab === 'services' || activeTab === 'photos' || activeTab === 'settings'
                ? 'scale-110 bg-[#c28c46]/20'
                : ''
            }`}>
              <Menu className="w-4.5 h-4.5" />
              {(activeTab === 'services' || activeTab === 'photos' || activeTab === 'settings') && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#c28c46] animate-pulse" />
              )}
            </div>
            <span className={`text-[10px] mt-0.5 tracking-tight ${
              mobileSidebarOpen || activeTab === 'services' || activeTab === 'photos' || activeTab === 'settings'
                ? 'font-black text-[#e5be7d]'
                : 'font-semibold'
            }`}>
              Side Bar
            </span>
          </button>
        </div>
      </nav>
    </div>
  );
};
