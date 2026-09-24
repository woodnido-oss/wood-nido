import React from 'react';
import { useApp } from '../context/AppContext';
import { GALLERY_ROW_IMAGES } from '../data/initialData';
import { ServiceItem } from '../types';
import { Sparkles } from 'lucide-react';

export const HomeRenoCategories: React.FC = () => {
  const { services, galleryImages, setActiveService, setQuoteModalOpen, setSelectedServiceForQuote } = useApp();

  const handleCardClick = (service: ServiceItem) => {
    setActiveService(service);
  };

  const handleQuickQuote = (e: React.MouseEvent, title: string) => {
    e.stopPropagation();
    setSelectedServiceForQuote(title);
    setQuoteModalOpen(true);
  };

  // Additional 8 gallery items displayed in the screenshot
  const lowerGalleryItems = [
    {
      title: 'Walk-in Closet with Organizers',
      image: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=600&q=80',
      category: 'Cupboards',
    },
    {
      title: 'Modern Black Quartz Kitchen',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=600&q=80',
      category: 'Kitchen',
    },
    {
      title: 'Sliding Glass & Wooden Partitions',
      image: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?auto=format&fit=crop&w=600&q=80',
      category: 'Doors',
    },
    {
      title: 'Royal Blue Velvet Living Room',
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
      category: 'Furniture',
    },
    {
      title: 'Minimalist Study & Library Workstation',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80',
      category: 'Office Table',
    },
    {
      title: 'Treated Exterior Timber Ramp & Deck',
      image: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=600&q=80',
      category: 'Wood Ramp',
    },
    {
      title: 'High Sheen Polish Dining Set',
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=600&q=80',
      category: 'Poolish Furniture',
    },
    {
      title: 'Modern Exterior Texture & Paint',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      category: 'Home Paint',
    },
  ];

  return (
    <section id="services" className="py-16 sm:py-24 bg-gradient-to-b from-[#f7f2e7] via-[#fbf8f3] to-[#f5efe4] relative border-b border-[#ebdcc7]/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title matching screenshot: Our Home Reno| */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#a86c22]">
            Turnkey Services & Solutions
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#241710] tracking-tight mt-1 inline-flex items-center">
            Our Home Reno<span className="text-[#b87a2a] animate-pulse">|</span>
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-2 max-w-xl mx-auto">
            Comprehensive carpentry, bespoke woodwork, and interior renovation solutions tailored for homes and workspaces.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#b87a2a] to-transparent mx-auto mt-3" />
        </div>

        {/* 9 Main Category Cards (3 columns x 3 rows) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
          {services.map((service) => (
            <div
              key={service.id}
              onClick={() => handleCardClick(service)}
              className="group cursor-pointer flex flex-col items-center"
            >
              {/* Card Container with golden border matching screenshot */}
              <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden p-1.5 border border-[#dfbe88] group-hover:border-[#b87a2a] bg-white shadow-[0_4px_20px_rgba(67,34,12,0.05)] group-hover:shadow-[0_16px_36px_rgba(67,34,12,0.12)] transition-all duration-300 relative">
                <div className="w-full h-full rounded-xl overflow-hidden relative">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                    loading="lazy"
                  />
                  {/* Subtle hover overlay with quick quote button */}
                  <div className="absolute inset-0 bg-[#241710]/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                    <button
                      onClick={(e) => handleQuickQuote(e, service.title)}
                      className="bg-[#fdfaf5] text-[#241710] text-xs font-bold py-2.5 px-5 rounded-lg shadow-md hover:bg-[#b87a2a] hover:text-white transition-colors border border-[#d6a55e]/40 cursor-pointer"
                    >
                      Get Quote
                    </button>
                  </div>
                </div>

                {service.priceStart && (
                  <span className="absolute top-3.5 right-3.5 bg-[#241710]/90 backdrop-blur-xs text-amber-200 text-[10px] font-semibold px-2.5 py-0.5 rounded-md border border-[#d6a55e]/30 shadow-xs">
                    {service.priceStart}
                  </span>
                )}
              </div>

              {/* Title label */}
              <h3 className="mt-3 text-sm sm:text-base font-bold text-[#241710] group-hover:text-[#b87a2a] transition-colors tracking-wide text-center">
                {service.title}
              </h3>
            </div>
          ))}
        </div>

        {/* 4-Column Interior Photo Showcase Row matching screenshot */}
        <div id="gallery" className="mt-8 mb-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 rounded-2xl overflow-hidden p-2 bg-stone-200/50 shadow-inner">
            {(galleryImages && galleryImages.length > 0 ? galleryImages : GALLERY_ROW_IMAGES).map((item) => (
              <div
                key={item.id}
                className="relative aspect-[3/4] overflow-hidden group rounded-lg"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3">
                  <span className="text-[11px] font-medium text-amber-200">
                    {item.category}
                  </span>
                  <span className="text-xs font-semibold text-white truncate">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Additional 8 Detailed Grid Showcase matching screenshot */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
          {lowerGalleryItems.map((item, idx) => (
            <div
              key={idx}
              className="relative aspect-square overflow-hidden rounded-xl group border border-[#ebdcc7] shadow-xs hover:shadow-lg transition-all"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center">
                <span className="text-white text-xs font-medium drop-shadow-md">
                  {item.title}
                </span>
              </div>
              <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] px-2 py-0.5 rounded-sm">
                {item.category}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
