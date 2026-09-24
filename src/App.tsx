/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutUs } from './components/AboutUs';
import { ProductsSection } from './components/ProductsSection';
import { HomeRenoCategories } from './components/HomeRenoCategories';
import { RecentProjects } from './components/RecentProjects';
import { ClientReviews } from './components/ClientReviews';
import { InteriorShowcaseSlider } from './components/InteriorShowcaseSlider';
import { LocationMap } from './components/LocationMap';
import { TransformSection } from './components/TransformSection';
import { Footer } from './components/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { VideoModal } from './components/modals/VideoModal';
import { ServiceModal } from './components/modals/ServiceModal';
import { QuoteModal } from './components/modals/QuoteModal';
import { AdminLoginModal } from './components/modals/AdminLoginModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ShieldCheck, ArrowRight } from 'lucide-react';

const MainContent: React.FC = () => {
  const { currentView, isAdmin, setCurrentView } = useApp();

  if (currentView === 'admin' && isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-[#fbf8f3] text-[#2b1f17] flex flex-col selection:bg-[#c28c46] selection:text-white">
      {/* Top Admin Quick Switch Bar (if admin is logged in) */}
      {isAdmin && (
        <aside aria-label="Admin bar" className="bg-[#241912] text-amber-200 px-4 py-1.5 text-xs flex items-center justify-between border-b border-[#3d291e] z-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5 text-[#dca34f]" />
            <span className="font-semibold text-stone-200">You are logged in as Administrator</span>
          </div>
          <button
            onClick={() => setCurrentView('admin')}
            className="flex items-center gap-1 font-bold text-[#dca34f] hover:text-amber-100 transition-colors"
          >
            <span>Open Admin Dashboard</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </aside>
      )}

      {/* Header matching screenshot */}
      <Navbar />

      {/* Main Website Sections */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />

        {/* About Us Section */}
        <AboutUs />

        {/* Custom Wood Products Showcase (Dedicated Section without prices) */}
        <ProductsSection />

        {/* Our Home Reno - 9 Service Categories & Gallery Showcase */}
        <HomeRenoCategories />

        {/* Our Recent Projects - 14 YouTube Style Project Cards */}
        <RecentProjects />

        {/* What Our Client S| - Reviews & Ratings */}
        <ClientReviews />

        {/* 3-Panel Interior Split Slider */}
        <InteriorShowcaseSlider />

        {/* Islamabad G-9/1 Interactive Map */}
        <LocationMap />

        {/* Transform Your Space & Instant Booking / Quote Form */}
        <TransformSection />
      </main>

      {/* Dark Footer matching screenshot */}
      <Footer />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />

      {/* Interactive Modals */}
      <VideoModal />
      <ServiceModal />
      <QuoteModal />
      <AdminLoginModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
