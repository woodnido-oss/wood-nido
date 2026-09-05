import React, { useState } from 'react';
import { WoodProject } from '../types';
import { X, ExternalLink, MessageSquare, Sparkles, Youtube } from 'lucide-react';
import { useWoodStore } from '../context/WoodStoreContext';
import { getYouTubeEmbedUrl, getYouTubeVideoId } from '../utils/youtube';

interface VideoModalProps {
  project: WoodProject | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ project, onClose }) => {
  const { siteSettings } = useWoodStore();
  const [iframeLoaded, setIframeLoaded] = useState(false);

  if (!project) return null;

  const videoId = getYouTubeVideoId(project.videoUrl);
  const embedUrl = getYouTubeEmbedUrl(project.videoUrl, true);
  const directYouTubeUrl = videoId
    ? `https://www.youtube.com/watch?v=${videoId}`
    : project.videoUrl;

  const handleInquireProject = () => {
    const cleanNumber = siteSettings.whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello ${siteSettings.businessName}! I saw your project video "${project.title}" (${project.category}) on your website and would like a similar woodwork renovation quote for my home.`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-[#141210] text-white rounded-xl border border-amber-600/40 shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="p-3 sm:p-4 border-b border-white/10 flex items-center justify-between bg-[#191715]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-red-600 flex items-center justify-center text-white shadow-xs">
              <Youtube className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 block">
                {project.category} • Video Showcase
              </span>
              <span className="text-xs text-gray-300 line-clamp-1 max-w-sm sm:max-w-md">
                {project.title}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <a
              href={directYouTubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1 text-xs text-gray-300 hover:text-white bg-white/10 hover:bg-white/20 px-2.5 py-1.5 rounded transition-colors"
            >
              <span>YouTube</span>
              <ExternalLink className="w-3 h-3 text-red-400" />
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-white rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real YouTube Video Embed */}
        <div className="relative aspect-video w-full bg-black overflow-hidden flex items-center justify-center">
          {videoId ? (
            <iframe
              src={embedUrl}
              title={project.title}
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
              allowFullScreen
              onLoad={() => setIframeLoaded(true)}
            />
          ) : (
            <div className="p-8 text-center space-y-3">
              <p className="text-sm text-gray-400">Please provide a valid YouTube link in Admin Panel.</p>
              <a
                href={project.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-amber-400 underline"
              >
                Open video link directly
              </a>
            </div>
          )}
        </div>

        {/* Info & WhatsApp Inquiry */}
        <div className="p-4 sm:p-5 space-y-4 bg-[#1B1917] overflow-y-auto">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
            <div>
              <h3 className="text-base sm:text-lg font-bold text-white font-serif">
                {project.title}
              </h3>
              <p className="text-xs text-gray-300 mt-1.5 leading-relaxed">
                {project.description}
              </p>
            </div>
            {project.duration && (
              <span className="shrink-0 text-xs text-amber-400/90 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded">
                Duration: {project.duration}
              </span>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-3 border-t border-white/10">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Customized wood, dimensions & polish available for your space</span>
            </div>

            <button
              onClick={handleInquireProject}
              className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded shadow-md transition-colors"
            >
              <MessageSquare className="w-4 h-4 fill-white" />
              <span>Get Quote on WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
