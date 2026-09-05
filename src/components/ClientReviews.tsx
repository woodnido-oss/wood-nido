import React, { useState } from 'react';
import { useWoodStore } from '../context/WoodStoreContext';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CAROUSEL_SLIDES = [
  {
    id: 1,
    leftImg: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=800&q=80',
    centerImg: 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?auto=format&fit=crop&w=800&q=80',
    rightImg: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80',
    caption: 'Executive Villa Master Kitchen, Wardrobe Suite & TV Lounge Woodwork'
  },
  {
    id: 2,
    leftImg: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    centerImg: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
    rightImg: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    caption: 'Solid Teak Entrance Doors, Boardroom Desk & Floating Hardwood Stairs'
  },
  {
    id: 3,
    leftImg: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
    centerImg: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?auto=format&fit=crop&w=800&q=80',
    rightImg: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    caption: 'Handcrafted Living Lounge Seating, Sheesham Dining & Accent Armchairs'
  }
];

export const ClientReviews: React.FC = () => {
  const { reviews } = useWoodStore();
  const [carouselIndex, setCarouselIndex] = useState(0);

  const prevSlide = () => {
    setCarouselIndex((prev) => (prev - 1 + CAROUSEL_SLIDES.length) % CAROUSEL_SLIDES.length);
  };

  const nextSlide = () => {
    setCarouselIndex((prev) => (prev + 1) % CAROUSEL_SLIDES.length);
  };

  const currentSlide = CAROUSEL_SLIDES[carouselIndex];

  return (
    <section id="reviews-section" className="py-16 sm:py-24 bg-white border-b border-[#EAE4D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Golden Section Title matching screenshot */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#C08A3E] font-serif tracking-tight">
            What Our Clients Say
          </h2>
          <div className="w-12 h-0.5 bg-[#C08A3E] mx-auto mt-2"></div>
        </div>

        {/* 4 Review Cards in 2x2 or 4x1 grid matching screenshot */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#FAF7F2] p-6 sm:p-8 rounded-none border border-[#E6DDD0] hover:border-[#C08A3E] transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* 5 Yellow Stars matching screenshot */}
                <div className="flex items-center gap-1 text-[#F59E0B]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current text-amber-500" />
                  ))}
                </div>

                {/* Client Name in bold black matching screenshot */}
                <div className="flex items-baseline justify-between">
                  <h3 className="text-base sm:text-lg font-bold text-[#1B1815]">
                    {rev.clientName}
                  </h3>
                  <span className="text-[11px] text-[#867E74] font-medium">
                    {rev.roleOrLocation}
                  </span>
                </div>

                {/* Review Text matching screenshot verbatim */}
                <p className="text-xs sm:text-sm text-[#544E47] leading-relaxed text-justify">
                  {rev.comment}
                </p>
              </div>

              {rev.serviceType && (
                <div className="pt-4 mt-4 border-t border-[#EAE3D6] text-[11px] text-[#C08A3E] font-semibold flex items-center gap-1">
                  <span>Service: {rev.serviceType}</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Showcase Gallery Carousel Slider matching the bottom of screenshot 1 / top of screenshot 2 */}
        <div className="mt-12">
          <div className="relative bg-[#181614] rounded-lg overflow-hidden border border-[#D8CEBF] shadow-lg">
            
            {/* Carousel images container (3-image split view matching screenshot) */}
            <div className="relative aspect-16/9 sm:aspect-21/9 w-full overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={carouselIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full grid grid-cols-1 sm:grid-cols-3 gap-0.5"
                >
                  <div className="relative h-full overflow-hidden">
                    <img
                      src={currentSlide.leftImg}
                      alt="Project 1"
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="relative h-full overflow-hidden hidden sm:block border-x border-white/20">
                    <img
                      src={currentSlide.centerImg}
                      alt="Project 2"
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="relative h-full overflow-hidden hidden sm:block">
                    <img
                      src={currentSlide.rightImg}
                      alt="Project 3"
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Left & Right navigation arrows matching screenshot */}
              <button
                onClick={prevSlide}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-md backdrop-blur-xs focus:outline-none"
                aria-label="Previous showcase"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 hover:bg-black/80 text-white flex items-center justify-center transition-colors shadow-md backdrop-blur-xs focus:outline-none"
                aria-label="Next showcase"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Bottom caption */}
              <div className="absolute bottom-3 left-14 right-14 text-center pointer-events-none">
                <span className="inline-block bg-black/75 backdrop-blur-xs text-white text-xs px-4 py-1.5 rounded-full font-medium">
                  {currentSlide.caption}
                </span>
              </div>
            </div>

            {/* Dot Pagination indicators matching screenshot (3 dots) */}
            <div className="py-3 bg-[#11100E] flex items-center justify-center gap-2">
              {CAROUSEL_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCarouselIndex(idx)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    idx === carouselIndex ? 'bg-amber-400 w-6' : 'bg-white/30 hover:bg-white/50'
                  }`}
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
