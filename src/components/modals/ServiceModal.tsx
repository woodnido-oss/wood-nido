import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Check, ArrowRight, ShieldCheck, Hammer, Sparkles } from 'lucide-react';

export const ServiceModal: React.FC = () => {
  const { activeService, setActiveService, setQuoteModalOpen, setSelectedServiceForQuote } = useApp();

  if (!activeService) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div 
        className="relative w-full max-w-xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-stone-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image banner */}
        <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
          <img
            src={activeService.image}
            alt={activeService.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <button
            onClick={() => setActiveService(null)}
            className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 hover:bg-black text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="absolute bottom-4 left-4 right-4 text-white">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-sm bg-[#c28c46] text-white">
              {activeService.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-bold mt-1">
              {activeService.title}
            </h3>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          <p className="text-stone-700 text-xs sm:text-sm leading-relaxed">
            {activeService.description}
          </p>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3.5 rounded-xl bg-[#fbf5eb] border border-[#ebdcc7]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#241710]">
                <Hammer className="w-3.5 h-3.5 text-[#b87a2a]" />
                Starting Rate
              </div>
              <p className="text-sm font-extrabold text-[#b87a2a] mt-1">
                {activeService.priceStart || 'Custom Quotation'}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#fbf5eb] border border-[#ebdcc7]">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#241710]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#1f7a46]" />
                Workmanship Warranty
              </div>
              <p className="text-xs font-semibold text-[#7c5b40] mt-1">
                100% Quality Guaranteed
              </p>
            </div>
          </div>

          <div className="space-y-2 text-xs text-[#4a3424]">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#b87a2a]" />
              <span>Premium seasoned wood & moisture-resistant cores</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#b87a2a]" />
              <span>Free onsite measurement & layout 3D design consultation</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-[#b87a2a]" />
              <span>Soft-close German hinges, telescopic channels & durable hardware</span>
            </div>
          </div>

          {/* Action */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={() => {
                setSelectedServiceForQuote(activeService.title);
                setActiveService(null);
                setQuoteModalOpen(true);
              }}
              className="flex-1 bg-[#241710] hover:bg-[#382317] text-[#fdf8f0] text-xs font-bold py-3 rounded-xl border border-[#d6a55e]/30 flex items-center justify-center gap-2 transition-colors shadow-md cursor-pointer"
            >
              <span>Get Estimate for {activeService.title}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#dca34f]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
