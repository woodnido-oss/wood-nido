import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronDown, Menu, X, Phone } from 'lucide-react';
import { WoodNidoLogo } from './WoodNidoLogo';

export const Navbar: React.FC = () => {
  const { siteConfig, setQuoteModalOpen } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [projectsDropdown, setProjectsDropdown] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
    setProjectsDropdown(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-[#fcf9f4]/95 backdrop-blur-md border-b border-[#ebdcc7]/80 transition-all shadow-[0_2px_14px_rgba(65,35,10,0.03)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="cursor-pointer group py-1"
          >
            <WoodNidoLogo size="md" variant="light" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollTo('home')}
              className="text-[#2c1d14] hover:text-[#b87a2a] font-medium text-sm transition-colors py-2 relative group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-[#b87a2a] to-[#dca34f] scale-x-100 transition-transform"></span>
            </button>

            {/* Services Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setServicesDropdown(true)}
                onClick={() => {
                  setServicesDropdown(!servicesDropdown);
                  scrollTo('services');
                }}
                className="text-[#3a281c] hover:text-[#b87a2a] font-medium text-sm transition-colors py-2 flex items-center gap-1.5"
              >
                Services
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${servicesDropdown ? 'rotate-180 text-[#b87a2a]' : 'text-stone-500'}`} />
              </button>

              {servicesDropdown && (
                <div
                  onMouseEnter={() => setServicesDropdown(true)}
                  onMouseLeave={() => setServicesDropdown(false)}
                  className="absolute left-0 top-full mt-1 w-56 bg-white rounded-xl shadow-xl border border-[#ebdcc7] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  {[
                    { label: 'Cupboards & Closets', target: 'services' },
                    { label: 'Modular Kitchen', target: 'services' },
                    { label: 'Doors & Entryways', target: 'services' },
                    { label: 'Custom Furniture', target: 'services' },
                    { label: 'Office Workstations', target: 'services' },
                    { label: 'Wood Ramp & Decking', target: 'services' },
                    { label: 'Wood & Furniture Polish', target: 'services' },
                    { label: 'Home Painting', target: 'services' },
                  ].map((item, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        scrollTo(item.target);
                        setServicesDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs font-medium text-[#3a281c] hover:bg-[#fbf4e8] hover:text-[#b87a2a] transition-colors"
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Projects Dropdown */}
            <div className="relative">
              <button
                onMouseEnter={() => setProjectsDropdown(true)}
                onClick={() => {
                  setProjectsDropdown(!projectsDropdown);
                  scrollTo('projects');
                }}
                className="text-[#3a281c] hover:text-[#b87a2a] font-medium text-sm transition-colors py-2 flex items-center gap-1.5"
              >
                Projects
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${projectsDropdown ? 'rotate-180 text-[#b87a2a]' : 'text-stone-500'}`} />
              </button>

              {projectsDropdown && (
                <div
                  onMouseEnter={() => setProjectsDropdown(true)}
                  onMouseLeave={() => setProjectsDropdown(false)}
                  className="absolute left-0 top-full mt-1 w-52 bg-white rounded-xl shadow-xl border border-[#ebdcc7] py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <button
                    onClick={() => {
                      scrollTo('projects');
                      setProjectsDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-[#3a281c] hover:bg-[#fbf4e8] hover:text-[#b87a2a] transition-colors"
                  >
                    Video Transformations
                  </button>
                  <button
                    onClick={() => {
                      scrollTo('gallery');
                      setProjectsDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-[#3a281c] hover:bg-[#fbf4e8] hover:text-[#b87a2a] transition-colors"
                  >
                    Photo Gallery
                  </button>
                  <button
                    onClick={() => {
                      scrollTo('reviews');
                      setProjectsDropdown(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs font-medium text-[#3a281c] hover:bg-[#fbf4e8] hover:text-[#b87a2a] transition-colors"
                  >
                    Client Testimonials
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => scrollTo('about')}
              className="text-[#3a281c] hover:text-[#b87a2a] font-medium text-sm transition-colors py-2"
            >
              About Us
            </button>

            <button
              onClick={() => scrollTo('products')}
              className="text-[#3a281c] hover:text-[#b87a2a] font-medium text-sm transition-colors py-2"
            >
              Products
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="text-[#3a281c] hover:text-[#b87a2a] font-medium text-sm transition-colors py-2"
            >
              Contact
            </button>
          </nav>

          {/* Action Buttons: Phone & Get in Touch */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Phone quick call */}
            <a
              href={`tel:${siteConfig.phone}`}
              className="hidden lg:flex items-center gap-1.5 text-xs font-bold text-[#6d431a] hover:text-[#382315] bg-[#f8f1e5] hover:bg-[#f2e7d5] px-3 py-2 rounded-lg border border-[#e3d2be] transition-colors"
              title="Call Wood Nido Helpline"
            >
              <Phone className="w-3.5 h-3.5 text-[#b87a2a]" />
              <span>{siteConfig.displayPhone}</span>
            </a>

            <button
              onClick={() => setQuoteModalOpen(true)}
              className="bg-[#241710] hover:bg-[#382317] text-[#fdf8f0] text-sm font-semibold px-6 py-2.5 rounded-lg border border-[#d6a55e]/40 transition-all duration-200 shadow-md hover:shadow-lg active:scale-98 tracking-wide cursor-pointer"
            >
              Get in Touch
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-700 hover:bg-stone-200/50 focus:outline-hidden"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#fbf7f0] border-b border-[#ebdcc7] px-4 pt-3 pb-6 space-y-3">
          <button
            onClick={() => scrollTo('home')}
            className="block w-full text-left font-semibold text-[#2b1f17] py-2 border-b border-[#ebdcc7]/60"
          >
            Home
          </button>
          <button
            onClick={() => scrollTo('about')}
            className="block w-full text-left font-semibold text-[#2b1f17] py-2 border-b border-[#ebdcc7]/60"
          >
            About Us
          </button>
          <button
            onClick={() => scrollTo('products')}
            className="block w-full text-left font-semibold text-[#2b1f17] py-2 border-b border-[#ebdcc7]/60"
          >
            Products
          </button>
          <button
            onClick={() => scrollTo('services')}
            className="block w-full text-left font-semibold text-[#2b1f17] py-2 border-b border-[#ebdcc7]/60"
          >
            Our Services
          </button>
          <button
            onClick={() => scrollTo('projects')}
            className="block w-full text-left font-semibold text-[#2b1f17] py-2 border-b border-[#ebdcc7]/60"
          >
            Recent Projects
          </button>
          <button
            onClick={() => scrollTo('reviews')}
            className="block w-full text-left font-semibold text-[#2b1f17] py-2 border-b border-[#ebdcc7]/60"
          >
            Reviews & Testimonials
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="block w-full text-left font-semibold text-[#2b1f17] py-2 border-b border-[#ebdcc7]/60"
          >
            Contact & Location
          </button>

          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setQuoteModalOpen(true);
              }}
              className="w-full bg-[#241710] text-[#fdf8f0] py-3 rounded-lg font-semibold text-center text-sm shadow-md border border-[#d6a55e]/30 cursor-pointer"
            >
              Get in Touch
            </button>
            <a
              href={`tel:${siteConfig.phone}`}
              className="w-full flex items-center justify-center gap-2 border border-[#d8c2a5] bg-white text-[#382315] py-2.5 rounded-lg font-semibold text-sm shadow-xs"
            >
              <Phone className="w-4 h-4 text-[#b87a2a]" />
              Call {siteConfig.displayPhone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
