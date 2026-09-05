import React, { useState } from 'react';
import { useWoodStore } from '../context/WoodStoreContext';
import { ArrowRight, Menu, X, Phone, Hammer, MapPin } from 'lucide-react';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const { siteSettings, inquiries } = useWoodStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  // Permanent Workshop Address Location
  const permanentAddress = "Soan Garden B Block Markaz Islamabad";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(permanentAddress)}`;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E8E2D9] transition-all shadow-xs">
      {/* Top Notification Bar with Shop Name & Location Link */}
      <div className="bg-[#1A1816] text-[#D8C7B0] text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer group"
            title="Click to open shop location on Google Maps"
          >
            <span className="inline-block w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
            <MapPin className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-white tracking-wide">Wood Nido Showroom & Workshop</span>
            <span className="text-zinc-400 hidden sm:inline">({permanentAddress})</span>
          </a>

          <div className="flex items-center gap-3">
            <a
              href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
              className="inline-flex items-center gap-1 hover:text-white transition-colors"
            >
              <Phone className="w-3 h-3 text-amber-500" />
              <span>{siteSettings.phone}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => handleNavClick('hero-section')}
          >
            <div className="w-11 h-11 rounded-lg bg-[#2A231C] border border-amber-600/40 flex items-center justify-center text-amber-400 shadow-xs group-hover:border-amber-500 transition-colors">
              <div className="relative flex flex-col items-center">
                <Hammer className="w-6 h-6 text-amber-500 transform -rotate-12" />
              </div>
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold tracking-tight text-[#1E1B18] font-serif">
                  Wood
                </span>
                <span className="text-2xl font-bold tracking-tight text-[#C08A3E] font-serif">
                  Nido
                </span>
              </div>
              <p className="text-[10px] tracking-wider uppercase text-[#736B63] font-medium -mt-0.5">
                Artisan Woodwork & Interiors
              </p>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => handleNavClick('hero-section')}
              className="text-sm font-medium text-[#C08A3E] hover:text-[#9A6B29] transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about-section')}
              className="text-sm font-medium text-[#4A453F] hover:text-[#C08A3E] transition-colors cursor-pointer"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('categories-section')}
              className="text-sm font-medium text-[#4A453F] hover:text-[#C08A3E] transition-colors cursor-pointer"
            >
              Services
            </button>
            <button
              onClick={() => handleNavClick('products-section')}
              className="text-sm font-medium text-[#4A453F] hover:text-[#C08A3E] transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>Catalog</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-semibold px-1.5 py-0.5 rounded-sm">
                Products
              </span>
            </button>
            <button
              onClick={() => handleNavClick('projects-section')}
              className="text-sm font-medium text-[#4A453F] hover:text-[#C08A3E] transition-colors cursor-pointer"
            >
              Projects
            </button>
            <button
              onClick={() => handleNavClick('reviews-section')}
              className="text-sm font-medium text-[#4A453F] hover:text-[#C08A3E] transition-colors cursor-pointer"
            >
              Reviews
            </button>
            <button
              onClick={() => handleNavClick('contact-section')}
              className="text-sm font-medium text-[#4A453F] hover:text-[#C08A3E] transition-colors cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Right Action: "Get in Touch" Button */}
          <div className="hidden md:flex items-center gap-4">
            <button
              id="header-get-in-touch-btn"
              onClick={() => handleNavClick('contact-section')}
              className="bg-[#121110] hover:bg-[#2B2724] text-white text-xs tracking-wider uppercase font-semibold px-6 py-3 rounded-none transition-all shadow-xs hover:shadow-md active:scale-98 flex items-center gap-2 cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2A231C] hover:text-[#C08A3E] focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-[#E8E2D9] px-4 pt-2 pb-6 space-y-3">
          <button
            onClick={() => handleNavClick('hero-section')}
            className="block w-full text-left py-2 text-base font-medium text-[#C08A3E]"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('about-section')}
            className="block w-full text-left py-2 text-base font-medium text-[#3A352F]"
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('categories-section')}
            className="block w-full text-left py-2 text-base font-medium text-[#3A352F]"
          >
            Services & Categories
          </button>
          <button
            onClick={() => handleNavClick('products-section')}
            className="block w-full text-left py-2 text-base font-medium text-[#3A352F]"
          >
            Wood Product Catalog
          </button>
          <button
            onClick={() => handleNavClick('projects-section')}
            className="block w-full text-left py-2 text-base font-medium text-[#3A352F]"
          >
            Projects
          </button>
          <button
            onClick={() => handleNavClick('reviews-section')}
            className="block w-full text-left py-2 text-base font-medium text-[#3A352F]"
          >
            Client Reviews
          </button>
          <button
            onClick={() => handleNavClick('contact-section')}
            className="block w-full text-left py-2 text-base font-medium text-[#3A352F]"
          >
            Contact
          </button>

          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('contact-section')}
              className="w-full py-3 bg-[#121110] text-white text-xs uppercase font-semibold tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Get in Touch</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
