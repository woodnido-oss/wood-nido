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

  const [activeTab, setActiveTab] = useState<'overview' | 'leads' | 'products' | 'services' | 'projects' | 'photos' | 'reviews' | 'location' | 'settings'>('overview');
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
  const [editingReview, setEditingReview] = useState<ReviewItem | null>(null);
  const [isAddingReview, setIsAddingReview] = useState(false);

  // Quick settings form
  const [settingsForm, setSettingsForm] = useState({ ...siteConfig });
  const [settingsSaved, setSettingsSaved] = useState(false);
  const [locationSaved, setLocationSaved] = useState(false);

  // Sync settingsForm when siteConfig updates
  useEffect(() => {
    setSettingsForm({ ...siteConfig });
  }, [siteConfig]);

  const handleSaveLocation = (e: React.FormEvent) => {
    e.preventDefault();
    updateSiteConfig({
      locationName: settingsForm.locationName,
      address: settingsForm.address,
      mapQuery: settingsForm.mapQuery,
      mapZoom: settingsForm.mapZoom,
      mapUrl: settingsForm.mapUrl,
    });
    setLocationSaved(true);
    setTimeout(() => setLocationSaved(false), 3000);
  };

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
      <header className="bg-stone-900 text-white sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <WoodNidoLogo size="sm" variant="dark" />
              <span className="bg-[#c28c46] text-stone-950 text-[10px] font-black uppercase px-2 py-0.5 rounded-xs ml-1">
                Admin Panel
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentView('website')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Website</span>
            </button>

            <button
              onClick={adminLogout}
              className="px-3 py-1.5 rounded-lg bg-red-950/80 hover:bg-red-900 text-red-300 text-xs font-semibold transition-colors border border-red-800/50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1 flex flex-col md:flex-row gap-6">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-60 shrink-0 space-y-1 bg-white p-3 rounded-2xl border border-stone-200 shadow-xs h-fit">
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
            onClick={() => setActiveTab('reviews')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'reviews'
                ? 'bg-[#1f1e1d] text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Star className="w-4 h-4 text-[#c28c46]" />
              <span>Client Reviews</span>
            </div>
            <span className="text-[11px] text-stone-400">{reviews.length}</span>
          </button>

          <button
            onClick={() => setActiveTab('location')}
            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'location'
                ? 'bg-[#1f1e1d] text-white shadow-xs'
                : 'text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <MapPin className="w-4 h-4 text-[#c28c46]" />
              <span>Map & Location Settings</span>
            </div>
            <span className="px-1.5 py-0.5 rounded-md text-[10px] bg-amber-100 text-amber-900 font-bold">
              Map
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
        <main className="flex-1 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs min-h-[500px]">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-stone-900">Dashboard Overview</h2>
                <p className="text-xs text-stone-500">Live statistics and customer engagement summary.</p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 sm:gap-4">
                <div className="p-4 rounded-xl bg-amber-50/70 border border-amber-200">
                  <span className="text-xs font-semibold text-amber-900">New Inquiries</span>
                  <p className="text-2xl font-black text-amber-700 mt-1">
                    {leads.filter((l) => l.status === 'new').length}
                  </p>
                  <span className="text-[10px] text-amber-600">Pending review</span>
                </div>

                <div className="p-4 rounded-xl bg-blue-50/70 border border-blue-200">
                  <span className="text-xs font-semibold text-blue-900">Total Leads</span>
                  <p className="text-2xl font-black text-blue-700 mt-1">{leads.length}</p>
                  <span className="text-[10px] text-blue-600">From website forms</span>
                </div>

                <div className="p-4 rounded-xl bg-orange-50/70 border border-orange-200 cursor-pointer" onClick={() => setActiveTab('products')}>
                  <span className="text-xs font-semibold text-orange-900">Custom Products</span>
                  <p className="text-2xl font-black text-[#c28c46] mt-1">{products.length}</p>
                  <span className="text-[10px] text-orange-600">Homepage catalog (No price)</span>
                </div>

                <div className="p-4 rounded-xl bg-purple-50/70 border border-purple-200">
                  <span className="text-xs font-semibold text-purple-900">Active Services</span>
                  <p className="text-2xl font-black text-purple-700 mt-1">{services.length}</p>
                  <span className="text-[10px] text-purple-600">Displayed on site</span>
                </div>

                <div className="p-4 rounded-xl bg-green-50/70 border border-green-200">
                  <span className="text-xs font-semibold text-green-900">Video Projects</span>
                  <p className="text-2xl font-black text-green-700 mt-1">{projects.length}</p>
                  <span className="text-[10px] text-green-600">Showcase items</span>
                </div>
              </div>

              {/* Quick Location & Map Status Banner */}
              <div 
                onClick={() => setActiveTab('location')}
                className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 cursor-pointer hover:border-amber-400 hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#c28c46] text-white flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-stone-900">
                        {siteConfig.locationName || 'Wood Reno Workshop & Display'}
                      </span>
                      <span className="text-[10px] bg-amber-200/80 text-amber-900 font-semibold px-2 py-0.5 rounded-full">
                        Active Map Location
                      </span>
                    </div>
                    <p className="text-xs text-stone-600 mt-0.5 line-clamp-1">
                      {siteConfig.address}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-bold text-[#b57a2c] bg-white px-3 py-1.5 rounded-lg border border-amber-200 shadow-xs hover:bg-amber-50 flex items-center gap-1">
                    <span>Edit Map & Location</span>
                    <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                  </span>
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
                      category: 'Bedroom',
                      thumbnail: '',
                      youtubeId: 'dQw4w9WgXcQ',
                      duration: '04:30',
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

              {/* Add / Edit Project Form */}
              {(isAddingProject || editingProject) && (
                <div className="p-5 bg-gradient-to-br from-stone-50 to-amber-50/40 rounded-2xl border-2 border-amber-200/80 shadow-sm space-y-4">
                  <div className="flex items-center justify-between border-b border-amber-200/60 pb-2">
                    <h3 className="text-xs font-extrabold text-stone-900 uppercase flex items-center gap-2">
                      <Film className="w-4 h-4 text-red-600" />
                      <span>{editingProject ? 'Edit YouTube Video Card' : 'Add New YouTube Video Card'}</span>
                    </h3>
                    <span className="text-[11px] text-stone-500">
                      Changes update immediately on the main page
                    </span>
                  </div>

                  {/* YouTube Link / URL Input with Auto-extract */}
                  <div className="p-3.5 rounded-xl bg-white border border-stone-200 shadow-xs space-y-2">
                    <label className="block text-xs font-bold text-stone-800 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="bg-red-600 text-white rounded-xs px-1 text-[9px] font-black">▶</span>
                        YouTube Video URL or Video ID (یوٹیوب ویڈیو لنک یا آئی ڈی)
                      </span>
                      <span className="text-[10px] text-[#b57a2c] font-medium">
                        Paste full link (e.g. https://www.youtube.com/watch?v=... or youtu.be/...)
                      </span>
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={editingProject ? editingProject.youtubeId : projectForm.youtubeId}
                        onChange={(e) => {
                          const val = e.target.value;
                          const extracted = extractYouTubeId(val);
                          if (editingProject) {
                            setEditingProject({
                              ...editingProject,
                              youtubeId: extracted,
                              // If thumbnail is empty or default, suggest youtube maxresdefault
                              thumbnail: editingProject.thumbnail || `https://img.youtube.com/vi/${extracted}/hqdefault.jpg`,
                            });
                          } else {
                            setProjectForm({
                              ...projectForm,
                              youtubeId: extracted,
                              thumbnail: projectForm.thumbnail || `https://img.youtube.com/vi/${extracted}/hqdefault.jpg`,
                            });
                          }
                        }}
                        placeholder="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                        className="flex-1 px-3 py-2 text-xs border border-stone-300 rounded-lg outline-hidden bg-white focus:ring-2 focus:ring-[#c28c46] font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          const currentId = editingProject ? editingProject.youtubeId : projectForm.youtubeId;
                          const autoThumb = `https://img.youtube.com/vi/${currentId}/hqdefault.jpg`;
                          if (editingProject) {
                            setEditingProject({ ...editingProject, thumbnail: autoThumb });
                          } else {
                            setProjectForm({ ...projectForm, thumbnail: autoThumb });
                          }
                        }}
                        className="px-3 py-1.5 text-xs bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold rounded-lg border border-stone-300 transition-colors shrink-0"
                        title="Use YouTube auto thumbnail"
                      >
                        Auto Thumbnail
                      </button>
                    </div>
                    <p className="text-[10px] text-stone-500">
                      Clean YouTube ID: <strong className="text-stone-800 font-mono">{editingProject ? editingProject.youtubeId : projectForm.youtubeId}</strong>
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Video Title (عنوان)
                      </label>
                      <input
                        type="text"
                        value={editingProject ? editingProject.title : projectForm.title}
                        onChange={(e) =>
                          editingProject
                            ? setEditingProject({ ...editingProject, title: e.target.value })
                            : setProjectForm({ ...projectForm, title: e.target.value })
                        }
                        placeholder="e.g. Room Makeover Before & After"
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg outline-hidden bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Category (کیٹگری)
                      </label>
                      <input
                        type="text"
                        value={editingProject ? editingProject.category : projectForm.category}
                        onChange={(e) =>
                          editingProject
                            ? setEditingProject({ ...editingProject, category: e.target.value })
                            : setProjectForm({ ...projectForm, category: e.target.value })
                        }
                        placeholder="Bedroom / Kitchen / Bathrooms"
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg outline-hidden bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Thumbnail Image URL (تصویر کا لنک)
                      </label>
                      <input
                        type="url"
                        value={editingProject ? editingProject.thumbnail : projectForm.thumbnail}
                        onChange={(e) =>
                          editingProject
                            ? setEditingProject({ ...editingProject, thumbnail: e.target.value })
                            : setProjectForm({ ...projectForm, thumbnail: e.target.value })
                        }
                        placeholder="https://images.unsplash.com/... or https://img.youtube.com/..."
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg outline-hidden bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                        Duration (وقت)
                      </label>
                      <input
                        type="text"
                        value={editingProject ? editingProject.duration || '' : projectForm.duration}
                        onChange={(e) =>
                          editingProject
                            ? setEditingProject({ ...editingProject, duration: e.target.value })
                            : setProjectForm({ ...projectForm, duration: e.target.value })
                        }
                        placeholder="04:15"
                        className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg outline-hidden bg-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-stone-700 mb-1">
                      Short Description (مختصر تفصیل)
                    </label>
                    <textarea
                      rows={2}
                      value={editingProject ? editingProject.description || '' : projectForm.description}
                      onChange={(e) =>
                        editingProject
                          ? setEditingProject({ ...editingProject, description: e.target.value })
                          : setProjectForm({ ...projectForm, description: e.target.value })
                      }
                      placeholder="Brief summary of what was transformed in this video..."
                      className="w-full px-3 py-1.5 text-xs border border-stone-300 rounded-lg outline-hidden bg-white"
                    />
                  </div>

                  {/* Live Card Preview */}
                  <div className="p-3 bg-stone-100 rounded-xl border border-stone-300">
                    <p className="text-[10px] font-bold text-stone-600 mb-2 uppercase">Live Preview of YouTube Card:</p>
                    <div className="max-w-xs bg-stone-900 rounded-xl overflow-hidden shadow-md">
                      <div className="relative aspect-video w-full bg-stone-950">
                        <img
                          src={editingProject ? editingProject.thumbnail : projectForm.thumbnail || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80'}
                          alt="preview"
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80';
                          }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-10 h-7 bg-red-600 rounded-lg flex items-center justify-center shadow-lg">
                            <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5" />
                          </div>
                        </div>
                        <span className="absolute bottom-1 right-2 bg-black/80 text-white font-mono text-[9px] px-1 py-0.5 rounded-xs">
                          {editingProject ? editingProject.duration : projectForm.duration || '03:45'}
                        </span>
                      </div>
                      <div className="p-2.5 bg-stone-900 text-white">
                        <p className="text-xs font-semibold truncate">
                          {editingProject ? editingProject.title : projectForm.title || 'Sample Video Title'}
                        </p>
                        <p className="text-[10px] text-amber-400 mt-0.5">
                          {editingProject ? editingProject.category : projectForm.category || 'Category'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      onClick={() => {
                        if (editingProject) {
                          updateProject(editingProject.id, {
                            ...editingProject,
                            youtubeId: extractYouTubeId(editingProject.youtubeId),
                          });
                          setEditingProject(null);
                        } else {
                          if (!projectForm.title.trim()) {
                            alert('Video Title likhna zaroori hai.');
                            return;
                          }
                          const finalId = extractYouTubeId(projectForm.youtubeId);
                          addProject({
                            title: projectForm.title,
                            category: projectForm.category || 'Renovation',
                            thumbnail: projectForm.thumbnail || `https://img.youtube.com/vi/${finalId}/hqdefault.jpg`,
                            youtubeId: finalId || 'dQw4w9WgXcQ',
                            duration: projectForm.duration || '03:45',
                            description: projectForm.description,
                          });
                          setIsAddingProject(false);
                        }
                      }}
                      className="bg-green-700 hover:bg-green-800 text-white text-xs font-bold px-5 py-2.5 rounded-lg shadow-sm flex items-center gap-1.5 transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      Save YouTube Video to Main Page
                    </button>
                    <button
                      onClick={() => {
                        setEditingProject(null);
                        setIsAddingProject(false);
                      }}
                      className="bg-stone-200 hover:bg-stone-300 text-stone-800 text-xs font-bold px-4 py-2.5 rounded-lg transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}

              {/* Projects List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="p-3.5 rounded-xl border border-stone-200 bg-white hover:border-amber-400 hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-full aspect-video rounded-lg overflow-hidden mb-2 bg-black relative group">
                        <img
                          src={proj.thumbnail}
                          alt={proj.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${proj.youtubeId}/hqdefault.jpg`;
                          }}
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                          <div className="w-10 h-7 bg-red-600 rounded-lg flex items-center justify-center shadow-lg">
                            <Play className="w-3.5 h-3.5 fill-white text-white translate-x-0.5" />
                          </div>
                        </div>
                        <span className="absolute bottom-1 right-1 bg-black/85 text-white text-[10px] px-1.5 py-0.5 rounded-xs font-mono">
                          {proj.duration}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{proj.title}</h4>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-[10px] text-[#c28c46] font-semibold bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          {proj.category}
                        </span>
                        <span className="text-[10px] text-stone-400 font-mono">
                          ID: {proj.youtubeId}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-1.5 mt-3 pt-2 border-t border-stone-200">
                      <a
                        href={`https://www.youtube.com/watch?v=${proj.youtubeId}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[11px] text-[#b57a2c] font-semibold hover:underline flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" />
                        <span>Watch Video</span>
                      </a>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingProject(proj);
                            setIsAddingProject(false);
                          }}
                          className="p-1.5 text-stone-600 hover:text-stone-900 rounded-md hover:bg-stone-100"
                          title="Edit"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete ${proj.title}?`)) {
                              deleteProject(proj.id);
                            }
                          }}
                          className="p-1.5 text-stone-400 hover:text-red-600 rounded-md hover:bg-red-50"
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

          {/* TAB: LOCATION & MAP */}
          {activeTab === 'location' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-stone-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-[#c28c46] shrink-0 border border-amber-200">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-stone-900 flex items-center gap-2">
                      <span>Map & Location Settings</span>
                      <span className="text-xs font-normal text-stone-500 font-sans">(ورکشاپ لوکیشن اور نقشہ)</span>
                    </h2>
                    <p className="text-xs text-stone-500 mt-0.5">
                      Yahan se aap apni workshop ka display name, complete address, aur Google Map pin change karein. Jo address aap yahan dalenge, website ke map aur card par wahi show hoga.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setCurrentView('website');
                      setTimeout(() => {
                        const el = document.getElementById('location');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }, 100);
                    }}
                    className="px-3.5 py-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-bold flex items-center gap-1.5 transition-colors border border-stone-300"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                    <span>View on Website</span>
                  </button>
                </div>
              </div>

              {locationSaved && (
                <div className="p-3.5 bg-green-50 border border-green-200 text-green-800 text-xs rounded-xl flex items-center gap-2.5 shadow-xs animate-in fade-in duration-200">
                  <CheckCircle className="w-4 h-4 text-green-600 shrink-0" />
                  <span className="font-bold">
                    Location & Map updated successfully! Live website par naya address aur map show ho raha hai.
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Form controls & Presets */}
                <div className="lg:col-span-6 space-y-5">
                  <form onSubmit={handleSaveLocation} className="space-y-4">
                    
                    {/* 1. Address Display Name */}
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1.5">
                      <label className="block text-xs font-bold text-stone-900 flex items-center justify-between">
                        <span>1. Location / Shop Display Name (نام جو ایڈریس کارڈ پر شو ہوگا)</span>
                        <span className="text-[10px] text-amber-800 font-semibold bg-amber-100 px-2 py-0.5 rounded border border-amber-200">Card Title</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={settingsForm.locationName || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, locationName: e.target.value })}
                        placeholder="e.g. Wood Reno Workshop & Display"
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white outline-hidden focus:ring-2 focus:ring-[#c28c46] focus:border-transparent font-medium"
                      />
                      <p className="text-[11px] text-stone-500">
                        Yeh naam map ke upar floating card mein bold nazar aayega (e.g. Wood Reno Workshop & Display).
                      </p>
                    </div>

                    {/* 2. Full Physical Address */}
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1.5">
                      <label className="block text-xs font-bold text-stone-900 flex items-center justify-between">
                        <span>2. Full Physical Address (مکمل پتہ)</span>
                        <span className="text-[10px] text-blue-800 font-semibold bg-blue-100 px-2 py-0.5 rounded border border-blue-200">Main Address</span>
                      </label>
                      <textarea
                        rows={3}
                        required
                        value={settingsForm.address || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, address: e.target.value })}
                        placeholder="e.g. Shop #1. Plot #126. I&T center, G-9/1 Islamabad."
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white outline-hidden focus:ring-2 focus:ring-[#c28c46] focus:border-transparent font-medium"
                      />
                      <p className="text-[11px] text-stone-500">
                        Yeh mukammal address map card, footer aur contact us section mein show hota hai.
                      </p>
                    </div>

                    {/* 3. Google Maps Pin Query / Location Search */}
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1.5">
                      <label className="block text-xs font-bold text-stone-900 flex items-center justify-between">
                        <span>3. Google Map Search Query / Pin (گوگل میپ کی لوکیشن یا تلاش)</span>
                        <span className="text-[10px] text-green-800 font-semibold bg-green-100 px-2 py-0.5 rounded border border-green-200">Map Pin</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={settingsForm.mapQuery || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, mapQuery: e.target.value })}
                        placeholder="e.g. Faizi Plaza Soan Garden Block B Islamabad"
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white outline-hidden focus:ring-2 focus:ring-[#c28c46] focus:border-transparent font-medium"
                      />
                      <p className="text-[11px] text-stone-500">
                        Google Map is query/sector ke mutabiq pin point karega (e.g. "Faizi Plaza Soan Garden Block B Islamabad").
                      </p>
                    </div>

                    {/* 3b. Direct Google Maps URL (maps.app.goo.gl link) */}
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-1.5">
                      <label className="block text-xs font-bold text-stone-900 flex items-center justify-between">
                        <span>4. Google Maps Direct Share Link (گوگل میپس کا ڈائریکٹ لنک)</span>
                        <span className="text-[10px] text-purple-800 font-semibold bg-purple-100 px-2 py-0.5 rounded border border-purple-200">Open in Maps URL</span>
                      </label>
                      <input
                        type="url"
                        value={settingsForm.mapUrl || ''}
                        onChange={(e) => setSettingsForm({ ...settingsForm, mapUrl: e.target.value })}
                        placeholder="e.g. https://maps.app.goo.gl/USgkH71RQLEisrHg6?g_st=ac"
                        className="w-full px-3 py-2 text-xs border border-stone-300 rounded-lg bg-white outline-hidden focus:ring-2 focus:ring-[#c28c46] focus:border-transparent font-medium"
                      />
                      <p className="text-[11px] text-stone-500">
                        Jab user "Open in Maps" ya Direction icon par click karega to yeh direct link open hoga.
                      </p>
                    </div>

                    {/* 5. Map Zoom Slider */}
                    <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <label className="text-xs font-bold text-stone-900">
                          5. Map Zoom Level (نقشے کا زوم)
                        </label>
                        <span className="text-xs font-mono font-bold bg-[#c28c46] text-white px-2 py-0.5 rounded">
                          Level {settingsForm.mapZoom || 16}
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="18"
                        value={settingsForm.mapZoom || 16}
                        onChange={(e) => setSettingsForm({ ...settingsForm, mapZoom: Number(e.target.value) })}
                        className="w-full accent-[#c28c46] cursor-pointer"
                      />
                      <div className="flex justify-between text-[10px] text-stone-500">
                        <span>10 (City Overview)</span>
                        <span className="font-semibold text-stone-700">16 (Recommended Street/Plaza View)</span>
                        <span>18 (Exact Building Closeup)</span>
                      </div>
                    </div>

                    {/* Quick 1-Click Presets */}
                    <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200 space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-950 flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#c28c46]" />
                          Quick Presets (ایک کلک سے لوکیشن سلیکٹ کریں)
                        </span>
                        <span className="text-[10px] text-amber-800 font-semibold">Click to auto-fill</span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() =>
                            setSettingsForm({
                              ...settingsForm,
                              locationName: 'Wood Nido Workshop & Display - Soan Garden',
                              address: 'Plot 7/10, Faizi Plaza, Near Creative Furniture, Block B, Soan Garden, Islamabad',
                              mapQuery: 'Faizi Plaza Soan Garden Block B Islamabad',
                              mapZoom: 16,
                              mapUrl: 'https://maps.app.goo.gl/USgkH71RQLEisrHg6?g_st=ac',
                            })
                          }
                          className="text-left p-2.5 rounded-lg bg-amber-100/70 hover:bg-amber-200/80 border border-amber-300 transition-colors shadow-xs"
                        >
                          <div className="font-bold text-[11px] text-[#b57a2c]">📍 Soan Garden (Current)</div>
                          <div className="text-[10px] text-stone-600 truncate">Faizi Plaza, Block B</div>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setSettingsForm({
                              ...settingsForm,
                              locationName: 'Wood Nido Workshop & Display',
                              address: 'Shop #1. Plot #126. I&T center, G-9/1 Islamabad.',
                              mapQuery: 'I&T center G-9/1 Islamabad',
                              mapZoom: 14,
                              mapUrl: '',
                            })
                          }
                          className="text-left p-2.5 rounded-lg bg-white hover:bg-amber-100 border border-amber-200 transition-colors shadow-xs"
                        >
                          <div className="font-bold text-[11px] text-[#b57a2c]">📍 G-9/1 I&T Center</div>
                          <div className="text-[10px] text-stone-500 truncate">Islamabad</div>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setSettingsForm({
                              ...settingsForm,
                              locationName: 'Wood Reno Design Studio',
                              address: 'Office #12, 2nd Floor, Blue Area, Jinnah Avenue, Islamabad.',
                              mapQuery: 'Blue Area Islamabad',
                              mapZoom: 14,
                            })
                          }
                          className="text-left p-2.5 rounded-lg bg-white hover:bg-amber-100 border border-amber-200 transition-colors shadow-xs"
                        >
                          <div className="font-bold text-[11px] text-[#b57a2c]">📍 Blue Area</div>
                          <div className="text-[10px] text-stone-500 truncate">Islamabad</div>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setSettingsForm({
                              ...settingsForm,
                              locationName: 'Wood Reno F-10 Showroom',
                              address: 'Plaza 14, F-10 Markaz, Islamabad.',
                              mapQuery: 'F-10 Markaz Islamabad',
                              mapZoom: 15,
                            })
                          }
                          className="text-left p-2.5 rounded-lg bg-white hover:bg-amber-100 border border-amber-200 transition-colors shadow-xs"
                        >
                          <div className="font-bold text-[11px] text-[#b57a2c]">📍 F-10 Markaz</div>
                          <div className="text-[10px] text-stone-500 truncate">Islamabad</div>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setSettingsForm({
                              ...settingsForm,
                              locationName: 'Wood Reno Rawalpindi Branch',
                              address: 'Shop 4, Bank Road, Saddar, Rawalpindi.',
                              mapQuery: 'Saddar Rawalpindi',
                              mapZoom: 14,
                            })
                          }
                          className="text-left p-2.5 rounded-lg bg-white hover:bg-amber-100 border border-amber-200 transition-colors shadow-xs"
                        >
                          <div className="font-bold text-[11px] text-[#b57a2c]">📍 Saddar</div>
                          <div className="text-[10px] text-stone-500 truncate">Rawalpindi</div>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setSettingsForm({
                              ...settingsForm,
                              locationName: 'Wood Reno Bahria Studio',
                              address: 'Civic Center, Phase 4, Bahria Town, Rawalpindi.',
                              mapQuery: 'Bahria Town Phase 4 Rawalpindi',
                              mapZoom: 14,
                            })
                          }
                          className="text-left p-2.5 rounded-lg bg-white hover:bg-amber-100 border border-amber-200 transition-colors shadow-xs"
                        >
                          <div className="font-bold text-[11px] text-[#b57a2c]">📍 Bahria Town</div>
                          <div className="text-[10px] text-stone-500 truncate">Rawalpindi Phase 4/7</div>
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setSettingsForm({
                              ...settingsForm,
                              locationName: 'Wood Reno DHA Phase 2',
                              address: 'Sector E, Central Commercial, DHA Phase 2, Islamabad.',
                              mapQuery: 'DHA Phase 2 Islamabad',
                              mapZoom: 14,
                            })
                          }
                          className="text-left p-2.5 rounded-lg bg-white hover:bg-amber-100 border border-amber-200 transition-colors shadow-xs"
                        >
                          <div className="font-bold text-[11px] text-[#b57a2c]">📍 DHA Phase 2</div>
                          <div className="text-[10px] text-stone-500 truncate">Islamabad</div>
                        </button>
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-2 flex items-center gap-3">
                      <button
                        type="submit"
                        className="flex-1 bg-[#1f1e1d] hover:bg-black text-white text-xs font-bold py-3 px-6 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
                      >
                        <Save className="w-4 h-4 text-[#c28c46]" />
                        <span>Save Location Changes (لوکیشن محفوظ کریں)</span>
                      </button>
                    </div>

                  </form>
                </div>

                {/* Right Column: Live Map Preview */}
                <div className="lg:col-span-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
                      Live Real-Time Preview (لائیو پریویو)
                    </span>
                    <span className="text-[11px] text-stone-500">
                      As seen by website visitors
                    </span>
                  </div>

                  {/* Simulated Map Container matching the exact frontend */}
                  <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-stone-300 bg-[#e5e3df] aspect-[16/10] w-full min-h-[300px]">
                    <iframe
                      key={`preview-${settingsForm.mapQuery}-${settingsForm.mapZoom}`}
                      title="Preview Map"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(
                        settingsForm.mapQuery || settingsForm.address || 'I&T center G-9/1 Islamabad'
                      )}&t=&z=${settingsForm.mapZoom || 14}&ie=UTF8&iwloc=&output=embed`}
                      className="w-full h-full border-0 grayscale-[10%] contrast-[105%]"
                      loading="lazy"
                    />

                    {/* Floating Top-Left "Open in Maps" */}
                    <div className="absolute top-3 left-3 z-10">
                      <div className="bg-white/95 text-stone-800 text-[10px] font-semibold px-2.5 py-1 rounded-sm shadow-md border border-stone-200 flex items-center gap-1">
                        <span>Open in Maps</span>
                        <ExternalLink className="w-3 h-3 text-blue-600" />
                      </div>
                    </div>

                    {/* Floating Bottom Card with dynamic inputs */}
                    <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-xs z-10 bg-white/95 backdrop-blur-md p-3 rounded-xl shadow-lg border border-stone-200 flex items-center justify-between gap-3">
                      <div className="flex items-start gap-2">
                        <div className="w-7 h-7 rounded-full bg-[#c28c46] flex items-center justify-center shrink-0 mt-0.5 text-white">
                          <MapPin className="w-3.5 h-3.5" />
                        </div>
                        <div className="overflow-hidden">
                          <h4 className="text-[11px] font-bold text-stone-900 leading-tight truncate">
                            {settingsForm.locationName || 'Wood Nido Workshop & Display - Soan Garden'}
                          </h4>
                          <p className="text-[10px] text-stone-600 mt-0.5 line-clamp-2 leading-snug">
                            {settingsForm.address || 'Plot 7/10, Faizi Plaza, Near Creative Furniture, Block B, Soan Garden, Islamabad'}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 bg-stone-900 text-white p-1.5 rounded-lg">
                        <Navigation className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>

                  {/* Summary Box */}
                  <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-600 space-y-1">
                    <p className="font-semibold text-stone-800">
                      Current Settings Summary:
                    </p>
                    <p className="text-[11px]">
                      <strong>Display Name:</strong> {settingsForm.locationName || 'Wood Nido Workshop & Display - Soan Garden'}
                    </p>
                    <p className="text-[11px]">
                      <strong>Address:</strong> {settingsForm.address}
                    </p>
                    <p className="text-[11px]">
                      <strong>Map Pin Query:</strong> {settingsForm.mapQuery || 'Faizi Plaza Soan Garden Block B Islamabad'} (Zoom: {settingsForm.mapZoom || 16})
                    </p>
                  </div>
                </div>

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
    </div>
  );
};
