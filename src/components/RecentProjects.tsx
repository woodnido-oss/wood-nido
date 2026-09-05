import React, { useState } from 'react';
import { useWoodStore } from '../context/WoodStoreContext';
import { WoodProject } from '../types';
import { Play, Share2, Clock, Youtube, Maximize2, X } from 'lucide-react';
import { getYouTubeThumbnail, getYouTubeEmbedUrl, getYouTubeVideoId } from '../utils/youtube';

interface RecentProjectsProps {
  onProjectClick: (project: WoodProject) => void;
}

export const RecentProjects: React.FC<RecentProjectsProps> = ({ onProjectClick }) => {
  const { projects } = useWoodStore();
  const [playingProjectId, setPlayingProjectId] = useState<string | null>(null);

  const handleCardClick = (project: WoodProject) => {
    // If not already playing, start playing inside this exact box
    if (playingProjectId !== project.id) {
      setPlayingProjectId(project.id);
    }
  };

  return (
    <section id="projects-section" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EAE4D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching golden style */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-100/60 text-amber-800 text-xs font-semibold rounded-full mb-3">
            <Youtube className="w-3.5 h-3.5 text-red-600" />
            <span>YouTube Showcase & Project Videos</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#C08A3E] font-serif tracking-tight">
            Our Recent Projects
          </h2>
          <p className="text-sm text-[#736B63] mt-2 max-w-xl mx-auto">
            Kisi bhi video par click karein — video wahin isi box men live play hogi. Badi screen par dekhne ke liye fullscreen button ya Badi Screen par click karein.
          </p>
          <div className="w-12 h-0.5 bg-[#C08A3E] mx-auto mt-3"></div>
        </div>

        {/* Video Card Grid matching the exact YouTube player styling */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {projects.map((project) => {
            const isPlaying = playingProjectId === project.id;
            const displayThumbnail = project.thumbnailUrl || getYouTubeThumbnail(project.videoUrl);
            const embedUrl = getYouTubeEmbedUrl(project.videoUrl, true);
            const videoId = getYouTubeVideoId(project.videoUrl);

            return (
              <div
                key={project.id}
                id={`project-video-card-${project.id}`}
                className="bg-black rounded-lg overflow-hidden border border-[#D9CEBF] shadow-sm hover:shadow-xl transition-all duration-300 relative aspect-video"
              >
                {/* VIDEO DISPLAY AREA: Either Live In-Box Embed or Thumbnail with Play Button */}
                <div className="relative w-full h-full overflow-hidden bg-zinc-900">
                  {isPlaying ? (
                    // LIVE IN-PLACE YOUTUBE IFRAME (Plays right inside this box)
                    <div className="relative w-full h-full bg-black">
                      <iframe
                        src={embedUrl}
                        title={project.title}
                        className="w-full h-full border-0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen"
                        allowFullScreen
                      />

                      {/* Quick floating action bar on top of playing video */}
                      <div className="absolute top-2 right-2 flex items-center gap-1.5 z-20 pointer-events-auto">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onProjectClick(project);
                          }}
                          className="bg-black/90 hover:bg-[#C08A3E] text-white hover:text-black text-[11px] font-semibold px-2.5 py-1 rounded shadow-lg flex items-center gap-1 border border-white/20 transition-all cursor-pointer"
                          title="Badi Screen Mein Dekhein (Expand to Full View / Modal)"
                        >
                          <Maximize2 className="w-3.5 h-3.5" />
                          <span>Badi Screen</span>
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPlayingProjectId(null);
                          }}
                          className="bg-black/90 hover:bg-red-600 text-white p-1 rounded shadow-lg flex items-center justify-center border border-white/20 transition-all cursor-pointer"
                          title="Video Band Karein (Stop)"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ) : (
                    // THUMBNAIL VIEW (Clicking starts playback in this exact box)
                    <div
                      onClick={() => handleCardClick(project)}
                      className="group cursor-pointer relative w-full h-full"
                    >
                      <img
                        src={displayThumbnail}
                        alt={project.title}
                        className="w-full h-full object-cover object-center opacity-85 group-hover:scale-104 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />

                      {/* Top Video Header Bar overlay */}
                      <div className="absolute top-0 inset-x-0 bg-gradient-to-b from-black/80 to-transparent p-3 flex items-center justify-between text-white pointer-events-none">
                        <div className="flex items-center gap-2 max-w-[80%]">
                          <div className="w-6 h-6 rounded-full bg-amber-600 flex items-center justify-center text-[10px] font-bold text-white shrink-0 shadow-xs">
                            W
                          </div>
                          <span className="text-xs font-medium truncate drop-shadow-sm">
                            {project.title}
                          </span>
                        </div>
                        <div className="text-gray-300">
                          <Share2 className="w-3.5 h-3.5" />
                        </div>
                      </div>

                      {/* YouTube Red Play Button in Center */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-10 bg-[#FF0000] rounded-xl flex items-center justify-center text-white shadow-lg group-hover:scale-115 group-hover:bg-[#CC0000] transition-transform duration-200">
                          <Play className="w-5 h-5 fill-current ml-0.5" />
                        </div>
                      </div>

                      {/* Bottom YouTube Bar */}
                      <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-2.5 flex items-center justify-between text-white text-[11px] pointer-events-none">
                        <div className="flex items-center gap-1.5 opacity-90">
                          <Clock className="w-3 h-3 text-gray-300" />
                          <span>Play in this box</span>
                          <span className="font-bold flex items-center gap-1 text-white ml-1">
                            <span className="bg-[#FF0000] px-1 py-0.2 rounded text-[8px] leading-tight">▶</span>
                            YouTube
                          </span>
                        </div>
                        {project.duration && (
                          <span className="bg-black/80 px-1.5 py-0.5 rounded text-[10px] text-gray-200 font-mono">
                            {project.duration}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
