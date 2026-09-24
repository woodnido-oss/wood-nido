import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const Hero: React.FC = () => {
  const { siteConfig, setQuoteModalOpen } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title1: siteConfig.heroHeadline1 || 'MODERN',
      title2: siteConfig.heroHeadline2 || 'FURNITURE',
      price: siteConfig.heroStartingPrice || 'Start From 15k',
      subtext: siteConfig.heroSubtext || 'possession of my entire soul, like these sweet mornings of spring which I enjoy with my whole heart',
      image: siteConfig.heroImage || 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1000&q=80',
      badge: 'Bespoke Solid Wood',
    },
    {
      title1: 'MODULAR',
      title2: 'KITCHEN',
      price: 'Start From 95k',
      subtext: 'Transform your cooking experience with precision engineered cabinetry, soft-close hardware, and scratch-resistant finishes.',
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
      badge: 'Acrylic & UV Finish',
    },
    {
      title1: 'LUXURY',
      title2: 'WARDROBES',
      price: 'Start From 45k',
      subtext: 'Tailored sliding and walk-in closets with integrated LED profile lighting, custom shoe racks, and vanity dressers.',
      image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1000&q=80',
      badge: 'Fitted Master Closets',
    },
  ];

  const slide = slides[currentSlide];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="home" className="relative bg-gradient-to-b from-[#fdfbf8] via-[#faf6ef] to-[#f6f0e4] overflow-hidden py-10 lg:py-20 border-b border-[#ebdcc7]/80">
      {/* Subtle organic warm ambiance */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[650px] h-[650px] rounded-full bg-[#f3e7d5]/50 -z-0 blur-3xl pointer-events-none" />
      <div className="absolute -top-24 left-10 w-96 h-96 rounded-full bg-[#faefe0]/60 -z-0 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Typography & Controls */}
          <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
            
            {/* Title */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-[#241710] uppercase leading-[0.95]" style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}>
                {slide.title1}
              </h1>
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight bg-gradient-to-r from-[#b97a29] via-[#dca34f] to-[#9e631b] bg-clip-text text-transparent uppercase leading-[0.95]" style={{ fontFamily: "'Cinzel', 'Playfair Display', Georgia, serif" }}>
                {slide.title2}
              </h1>
            </div>

            {/* Price & Description */}
            <div className="space-y-3 max-w-lg">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#f6ecdd] border border-[#e4d0b2] shadow-2xs">
                <span className="text-[11px] uppercase tracking-wider font-semibold text-[#8c5620]">Starting From</span>
                <span className="text-sm font-extrabold text-[#2a1a10]">{slide.price}</span>
              </div>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed lowercase first-letter:uppercase">
                {slide.subtext}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                onClick={() => setQuoteModalOpen(true)}
                className="bg-[#241710] hover:bg-[#382317] text-[#fdf8f0] text-xs tracking-widest uppercase font-bold px-8 py-3.5 rounded-lg border border-[#d6a55e]/40 shadow-md hover:shadow-xl hover:border-[#d6a55e]/80 transition-all duration-200 inline-block active:scale-98 cursor-pointer"
              >
                READ MORE
              </button>
              <button
                onClick={() => {
                  const el = document.getElementById('products');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-[#643d1a] hover:text-[#241710] hover:bg-[#f6eee0] text-xs tracking-widest uppercase font-bold px-5 py-3.5 rounded-lg border border-[#ebd8c2] transition-colors cursor-pointer"
              >
                View Catalog
              </button>
            </div>

            {/* Slider Navigation: ← ─── → 01 */}
            <div className="pt-6 sm:pt-10 flex items-center gap-4">
              <button
                onClick={prevSlide}
                className="p-1.5 rounded-full text-[#382315] hover:text-[#b87a2a] hover:bg-[#f3e7d6] transition-colors focus:outline-hidden cursor-pointer"
                aria-label="Previous slide"
              >
                <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
              </button>

              {/* Progress track */}
              <div className="relative w-28 sm:w-36 h-[3px] bg-[#e4d6c4] rounded-full overflow-hidden">
                <div
                  className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#b87a2a] to-[#dca34f] rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentSlide + 1) / slides.length) * 100}%`,
                  }}
                />
              </div>

              <button
                onClick={nextSlide}
                className="p-1.5 rounded-full text-[#382315] hover:text-[#b87a2a] hover:bg-[#f3e7d6] transition-colors focus:outline-hidden cursor-pointer"
                aria-label="Next slide"
              >
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <span className="text-xs font-mono font-bold text-[#724a25] ml-2 tracking-widest">
                0{currentSlide + 1}
              </span>
            </div>

          </div>

          {/* Right Column: Hero Visual Cutout & Warm Organic Shape */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Wooden circular art ring backdrop */}
            <div className="relative w-full max-w-[500px] aspect-square rounded-full p-4 sm:p-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-2 border-[#d9c4aa]/70 bg-gradient-to-tr from-[#ece0ce] via-[#faf5ec] to-[#f4ebe0] shadow-[0_10px_40px_rgba(82,51,21,0.08)]" />

              {/* Wooden cutout furniture image */}
              <div className="relative z-10 w-full h-full flex items-center justify-center overflow-hidden rounded-full p-2">
                <img
                  src={slide.image}
                  alt={`${slide.title1} ${slide.title2}`}
                  className="w-full h-full object-cover rounded-full shadow-2xl transition-all duration-500 hover:scale-105"
                  loading="eager"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur-md px-4 py-2 rounded-xl shadow-lg border border-[#ebdcc7] text-xs font-semibold text-[#422a19] flex items-center gap-1.5">
                <span className="text-[#b87a2a]">✦</span>
                <span>{slide.badge}</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
