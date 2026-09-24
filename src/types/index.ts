export interface ServiceItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  priceStart?: string;
  featured?: boolean;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  youtubeId: string;
  duration?: string;
  date?: string;
  description?: string;
  beforeImage?: string;
  afterImage?: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  rating: number;
  comment: string;
  role?: string;
  service?: string;
  date?: string;
}

export interface GalleryImageItem {
  id: string;
  title: string;
  category: string;
  image: string;
}

export interface ProductItem {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
  material?: string;
  dimensions?: string;
  inStock?: boolean;
}

export interface LeadItem {
  id: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  message: string;
  status: 'new' | 'contacted' | 'quoted' | 'in_progress' | 'completed' | 'cancelled';
  createdAt: string;
  budget?: string;
  notes?: string;
}

export interface SiteConfig {
  companyName: string;
  tagline: string;
  phone: string;
  displayPhone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  locationName: string;
  mapQuery: string;
  mapZoom: number;
  mapUrl?: string;
  websiteUrl: string;
  heroHeadline1: string;
  heroHeadline2: string;
  heroStartingPrice: string;
  heroSubtext: string;
  heroImage?: string;
  aboutImage?: string;
  yearsExperience: string;
  industryExperts: string;
  userRetention: string;
  globalClients: string;
  aboutText1: string;
  aboutText2: string;
  aboutText3: string;
  adminPin: string;
}
