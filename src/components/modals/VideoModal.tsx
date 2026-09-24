import React from 'react';
import { useApp } from '../../context/AppContext';
import { X, Play, Clock, Share2, ArrowRight } from 'lucide-react';

export const VideoModal: React.FC = () => {
  const { activeVideo, setActiveVideo, setQuoteModalOpen, setSelectedServiceForQuote } = useApp();

  if (!activeVideo) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-3xl bg-stone-950 rounded-2xl overflow-hidden shadow-2xl border border-stone-800"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 bg-stone-900 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-2 max-w-[85%]">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse" />
            <h3 className="text-white text-sm font-bold truncate">
              {activeVideo.title}
            </h3>
          </div>
          <button
            onClick={() => setActiveVideo(null)}
            className="p-1 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player / Simulated High-Definition Video Walkthrough */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
            title={activeVideo.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Project Details Footer */}
        <div className="p-5 bg-stone-900 text-stone-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-[#dfab5f] uppercase tracking-wider">
              {activeVideo.category}
            </span>
            <p className="text-xs text-stone-400 max-w-lg">
              {activeVideo.description || 'Full-scale carpentry craftsmanship delivered with precision engineering by Wood Nido.'}
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedServiceForQuote(activeVideo.category);
              setActiveVideo(null);
              setQuoteModalOpen(true);
            }}
            className="shrink-0 bg-gradient-to-r from-[#c48834] via-[#dca44f] to-[#b87824] hover:brightness-105 text-[#1e130a] font-bold text-xs px-5 py-2.5 rounded-lg flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <span>Inquire About This Work</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
