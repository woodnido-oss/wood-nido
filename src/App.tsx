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

const MainContent: React.FC = () => {
  const { currentView, isAdmin } = useApp();

  if (currentView === 'admin' && isAdmin) {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen bg-[#fbf8f3] text-[#2b1f17] flex flex-col selection:bg-[#c28c46] selection:text-white">
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
