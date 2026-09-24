import React, { useState } from 'react';
import { LARGE_SLIDER_ITEMS } from '../data/initialData';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export const InteriorShowcaseSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + LARGE_SLIDER_ITEMS.length) % LARGE_SLIDER_ITEMS.length);
  };

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % LARGE_SLIDER_ITEMS.length);
  };

  return (
    <section className="py-12 bg-gradient-to-b from-[#f7f2e7] to-[#fbf8f3] relative border-b border-[#ebdcc7]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Large Slider Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#ebdcc7] bg-black aspect-[16/8] sm:aspect-[21/9]">
          
          {/* 3-panel split view matching screenshot */}
          <div className="grid grid-cols-3 w-full h-full">
            {LARGE_SLIDER_ITEMS.map((item, idx) => (
              <div
                key={item.id}
                className="relative h-full overflow-hidden border-r last:border-r-0 border-stone-800 group cursor-pointer"
                onClick={() => setActiveIndex(idx)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${
                    activeIndex === idx ? 'brightness-100 scale-102' : 'brightness-75 hover:brightness-90'
                  }`}
                />

                {/* Subtle bottom gradient & info */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent flex flex-col justify-end p-4 sm:p-6">
                  <h4 className="text-white text-xs sm:text-base font-bold drop-shadow-md truncate">
                    {item.title}
                  </h4>
                  <p className="text-amber-200/90 text-[10px] sm:text-xs line-clamp-1 mt-0.5 hidden sm:block">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Left Arrow Button matching screenshot `<` */}
          <button
            onClick={prevSlide}
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#241710]/80 hover:bg-[#241710] text-amber-200 flex items-center justify-center backdrop-blur-xs transition-transform active:scale-95 z-20 border border-[#d6a55e]/40 shadow-lg cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Right Arrow Button matching screenshot `>` */}
          <button
            onClick={nextSlide}
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-[#241710]/80 hover:bg-[#241710] text-amber-200 flex items-center justify-center backdrop-blur-xs transition-transform active:scale-95 z-20 border border-[#d6a55e]/40 shadow-lg cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

        </div>

        {/* 3 Pagination dots */}
        <div className="flex justify-center items-center gap-2 mt-4">
          {LARGE_SLIDER_ITEMS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`rounded-full transition-all cursor-pointer ${
                activeIndex === idx
                  ? 'w-6 h-2 bg-[#b87a2a]'
                  : 'w-2 h-2 bg-[#d9c5af] hover:bg-[#b87a2a]/60'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};
