export interface WoodProduct {
  id: string;
  title: string;
  category: string;
  price: number;
  woodType: string;
  dimensions: string;
  finishType: string;
  inStock: boolean;
  featured: boolean;
  imageUrl: string;
  description: string;
  estimatedDeliveryDays?: number;
  createdAt: string;
}

export interface WoodCategory {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  description: string;
  itemCount?: number;
}

export interface WoodProject {
  id: string;
  title: string;
  category: string;
  thumbnailUrl: string;
  videoUrl: string;
  description: string;
  duration?: string;
  completedDate?: string;
}

export interface ClientReview {
  id: string;
  clientName: string;
  roleOrLocation: string;
  rating: number;
  comment: string;
  date?: string;
  serviceType?: string;
}

export interface CustomerInquiry {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  category: string;
  requirement: string;
  budget?: string;
  status: 'New' | 'In Progress' | 'Quoted' | 'Completed';
  createdAt: string;
}

export interface HeroSlide {
  id: number;
  headline: string;
  price: string;
  subtext: string;
  imageUrl: string;
  itemTitle: string;
  badge: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: string;
  url: string;
}

export interface SiteSettings {
  businessName: string;
  tagline: string;
  phone: string;
  whatsappNumber: string;
  email: string;
  address: string;
  locationName: string;
  yearsOfExperience: number;
  industryExperts: number;
  userRetention: number;
  globalClients: number;
  heroHeadline: string;
  heroStartingPrice: string;
  heroSubtext: string;
  heroSlides: HeroSlide[];
  aboutImage1: string;
  aboutImage2: string;
  aboutText1: string;
  aboutText2: string;
  aboutText3: string;
  ctaImage: string;
  showroomImage: string;
  logoUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  tiktokUrl?: string;
  youtubeUrl?: string;
}
