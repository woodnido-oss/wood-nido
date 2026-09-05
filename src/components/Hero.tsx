import React, { useState, useEffect } from 'react';
import { useWoodStore } from '../context/WoodStoreContext';
import { Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { initialHeroSlides } from '../data/initialData';

interface HeroProps {
  onExploreClick: () => void;
  onContactClick: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onContactClick }) => {
  const { siteSettings } = useWoodStore();
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Touch swipe states
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  // Prioritize admin-saved heroSlides from siteSettings, fallback to initial if empty
  const slides = siteSettings.heroSlides && siteSettings.heroSlides.length > 0
    ? siteSettings.heroSlides
    : initialHeroSlides;

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlideIndex(index);
  };

  // Finger swipe handler for mobile/touch devices
  const minSwipeDistance = 45;

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
  };

  // Auto advance every 6 seconds, pauses on mouse hover
  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const safeIndex = currentSlideIndex < slides.length ? currentSlideIndex : 0;
  const currentSlide = slides[safeIndex] || initialHeroSlides[0];

  return (
    <section
      id="hero-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      className="relative w-full md:min-h-[580px] lg:min-h-[640px] bg-[#FAF8F5] border-b border-[#EAE4D8] overflow-hidden select-none"
    >
      {/* ========================================================================= */}
      {/* DESKTOP VIEW (md: and above): Full Panoramic Poster Layout */}
      {/* ========================================================================= */}
      <div className="hidden md:flex relative w-full flex-col justify-between flex-1 min-h-[580px] lg:min-h-[640px]">
        {/* Full Panoramic Background Image */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={safeIndex}
              initial={{ opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.65, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={currentSlide.imageUrl}
                alt={currentSlide.itemTitle || currentSlide.headline}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('photo-1586023492125')) {
                    target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1800&q=85';
                  }
                }}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Seamless Left Scrim / Gradient Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to right, #FAF8F4 0%, #FAF8F4 28%, rgba(250, 248, 244, 0.96) 38%, rgba(250, 248, 244, 0.75) 50%, rgba(250, 248, 244, 0) 68%)'
          }}
        />

        {/* Desktop Poster Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full pt-14 lg:pt-16 pb-6 flex-1 flex flex-col justify-center">
          <div className="max-w-xl lg:max-w-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={safeIndex}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="space-y-4"
              >
                <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#936224] uppercase">
                  <Sparkles className="w-3.5 h-3.5 text-[#936224]" />
                  <span>{currentSlide.badge || 'Solid Hardwood Craft'}</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-[54px] font-black uppercase text-[#141210] font-sans tracking-tight leading-[1.06]">
                  {currentSlide.headline}
                </h1>

                <div>
                  <h2 className="text-lg md:text-xl font-bold text-[#86531A] tracking-tight">
                    {currentSlide.price}
                  </h2>
                </div>

                <p className="text-sm md:text-base text-[#575048] leading-relaxed max-w-lg">
                  {currentSlide.subtext}
                </p>

                <div className="pt-4 flex items-center gap-4">
                  <button
                    id="hero-read-more-btn-desktop"
                    onClick={onExploreClick}
                    className="bg-[#181614] hover:bg-black text-white text-xs font-bold tracking-widest uppercase px-8 py-3.5 transition-all shadow-xs active:scale-98 cursor-pointer text-center whitespace-nowrap"
                  >
                    READ MORE
                  </button>

                  <button
                    id="hero-get-quote-btn-desktop"
                    onClick={onContactClick}
                    className="bg-transparent hover:bg-[#181614] hover:text-white border border-[#181614] text-[#181614] text-xs font-bold tracking-widest uppercase px-7 py-3.5 transition-all active:scale-98 cursor-pointer text-center whitespace-nowrap"
                  >
                    GET FREE QUOTE
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Desktop Centered Indicator Dots */}
        <div className="relative z-10 w-full pb-6 flex items-center justify-center">
          <div className="flex items-center gap-2 px-3.5 py-1.5 bg-black/25 backdrop-blur-xs rounded-full">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`transition-all rounded-full cursor-pointer ${
                  idx === safeIndex
                    ? 'w-7 h-2 bg-[#C08A3E]'
                    : 'w-2 h-2 bg-white/70 hover:bg-white'
                }`}
                title={`Slide ${idx + 1}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE PHONE VIEW (< md): Full Photo Display + Compact Details */}
      {/* ========================================================================= */}
      <div className="flex md:hidden flex-col w-full bg-[#FAF8F5]">
        <div className="relative w-full h-[210px] sm:h-[260px] bg-[#1a1816] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={safeIndex}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: 'easeInOut' }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={currentSlide.imageUrl}
                alt={currentSlide.itemTitle || currentSlide.headline}
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.src.includes('photo-1586023492125')) {
                    target.src = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1800&q=85';
                  }
                }}
              />
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/25 via-transparent to-black/35" />

          <div className="absolute top-2.5 right-2.5 z-10 bg-black/75 backdrop-blur-xs text-[10px] font-bold text-[#E5B56A] uppercase px-2 py-0.5 rounded shadow-xs">
            {currentSlide.badge || 'Solid Wood'}
          </div>

          <div className="absolute bottom-2 left-2.5 right-2.5 z-10 text-white/90 text-[11px] font-medium truncate drop-shadow-sm">
            {currentSlide.itemTitle || currentSlide.headline}
          </div>
        </div>

        <div className="px-4 py-3 space-y-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={safeIndex}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="space-y-1.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-extrabold text-[#936224] uppercase tracking-wider">
                  {currentSlide.badge || 'Solid Hardwood'}
                </span>
                <span className="text-xs font-bold text-[#86531A]">
                  {currentSlide.price}
                </span>
              </div>

              <h1 className="text-lg sm:text-2xl font-black uppercase text-[#141210] font-sans tracking-tight leading-snug">
                {currentSlide.headline}
              </h1>

              <p className="text-[11px] text-[#575048] leading-relaxed line-clamp-2">
                {currentSlide.subtext}
              </p>

              <div className="pt-1.5 flex items-center gap-2">
                <button
                  id="hero-read-more-btn-mobile"
                  onClick={onExploreClick}
                  className="flex-1 bg-[#181614] active:bg-black text-white text-[10px] font-bold tracking-wider uppercase py-2 px-3 rounded-xs shadow-xs text-center cursor-pointer"
                >
                  READ MORE
                </button>

                <button
                  id="hero-get-quote-btn-mobile"
                  onClick={onContactClick}
                  className="flex-1 bg-transparent active:bg-[#181614] active:text-white border border-[#181614] text-[#181614] text-[10px] font-bold tracking-wider uppercase py-2 px-3 rounded-xs text-center cursor-pointer"
                >
                  GET FREE QUOTE
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Centered Indicator Dots for Mobile */}
          <div className="pt-2 pb-1 flex items-center justify-center">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-black/10 rounded-full">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all rounded-full cursor-pointer ${
                    idx === safeIndex
                      ? 'w-5 h-1.5 bg-[#C08A3E]'
                      : 'w-1.5 h-1.5 bg-black/30 hover:bg-black/50'
                  }`}
                  title={`Slide ${idx + 1}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
