import React, { useState } from 'react';
import { WoodStoreProvider, useWoodStore } from './context/WoodStoreContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { HomeRenovationCategories } from './components/HomeRenovationCategories';
import { ProductCatalog } from './components/ProductCatalog';
import { RecentProjects } from './components/RecentProjects';
import { ClientReviews } from './components/ClientReviews';
import { LocationMap } from './components/LocationMap';
import { TransformSpaceCTA } from './components/TransformSpaceCTA';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { ProductModal } from './components/ProductModal';
import { VideoModal } from './components/VideoModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AdminLogin } from './components/admin/AdminLogin';
import { WoodProduct, WoodProject } from './types';

const MainAppContent: React.FC = () => {
  const { viewMode, setViewMode, setSelectedCategory } = useWoodStore();
  const [activeModalProduct, setActiveModalProduct] = useState<WoodProduct | null>(null);
  const [activeModalProject, setActiveModalProject] = useState<WoodProject | null>(null);

  // Check if admin is currently authenticated via session or remember token
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const sessionAuth = sessionStorage.getItem('wood_nido_admin_auth') === 'true';
      const rememberAuth = localStorage.getItem('wood_nido_admin_remember') === 'true';
      return sessionAuth || rememberAuth;
    } catch {
      return false;
    }
  });

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategory = (catName: string) => {
    scrollToSection('products-section');
  };

  // If owner is in Admin mode, require secure Admin Login credentials
  if (viewMode === 'admin') {
    if (!isAdminAuthenticated) {
      return (
        <AdminLogin
          onLoginSuccess={() => setIsAdminAuthenticated(true)}
          onCancel={() => setViewMode('customer')}
        />
      );
    }
    return (
      <AdminDashboard
        onLogout={() => {
          setIsAdminAuthenticated(false);
          setViewMode('customer');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FCFAF6] text-[#1E1B18] flex flex-col font-sans selection:bg-amber-200 selection:text-amber-950">
      {/* 1. Header Navigation matching screenshot */}
      <Header onNavigate={scrollToSection} />

      {/* 2. Hero Slider matching screenshot */}
      <Hero
        onExploreClick={() => scrollToSection('products-section')}
        onContactClick={() => scrollToSection('contact-section')}
      />

      {/* 3. About Us with stats matching screenshot */}
      <AboutUs />

      {/* 4. Home Renovation 9-Category Grid & Gallery matching screenshot */}
      <HomeRenovationCategories onSelectCategory={handleSelectCategory} />

      {/* 5. Handcrafted Wood Product Listings & Catalog */}
      <ProductCatalog
        onProductClick={(product) => setActiveModalProduct(product)}
        onOpenAdminAdd={() => setViewMode('admin')}
      />

      {/* 6. Our Recent Projects (YouTube video style) matching screenshot */}
      <RecentProjects
        onProjectClick={(project) => setActiveModalProject(project)}
      />

      {/* 7. What Our Clients Say & Carousel Slider matching screenshot */}
      <ClientReviews />

      {/* 8. Showroom & Workshop Location Map matching screenshot */}
      <LocationMap />

      {/* 9. Transform Your Space CTA & Consultation Booking Form */}
      <TransformSpaceCTA />

      {/* 10. Footer matching screenshot */}
      <Footer onNavigate={scrollToSection} />

      {/* 11. Floating WhatsApp Chat Icon matching screenshot */}
      <FloatingWhatsApp />

      {/* Modals */}
      <ProductModal
        product={activeModalProduct}
        onClose={() => setActiveModalProduct(null)}
      />

      <VideoModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
};

export default function App() {
  return (
    <WoodStoreProvider>
      <MainAppContent />
    </WoodStoreProvider>
  );
}
