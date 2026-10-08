import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProjectItem } from '../types';
import { Share2, Clock, Play } from 'lucide-react';

export const RecentProjects: React.FC = () => {
  const { projects, setActiveVideo } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Bedroom', 'Kitchen', 'Bathrooms', 'Commercial', 'Full House'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) =>
        p.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        p.title.toLowerCase().includes(selectedCategory.toLowerCase())
      );

  const handleCardClick = (project: ProjectItem) => {
    setActiveVideo(project);
  };

  return (
    <section id="projects" className="py-16 sm:py-24 bg-[#fbf8f3] relative border-b border-[#ebdcc7]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading matching screenshot: Our Recent Projects */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#a86c22]">
            Proven Portfolio & Walkthroughs
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#241710] tracking-tight mt-1">
            Our Recent <span className="text-gold-gradient">Projects</span>
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#b87a2a] to-transparent mx-auto mt-3" />
          <p className="text-stone-600 text-xs sm:text-sm mt-2.5 max-w-xl mx-auto">
            Explore our real-world transformation stories, site before-and-after work, and bespoke woodwork walkthroughs.
          </p>

          {/* Quick filter tabs */}
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#241710] text-[#fdf8f0] border border-[#d6a55e]/40 shadow-xs'
                    : 'bg-white text-[#4a3424] hover:bg-[#f6eee0] border border-[#e8decb]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Video Card Grid: 2 cards per row on mobile (2 2 phir 2), compact, sleek */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-4 lg:gap-5">
          {filteredProjects.map((project, idx) => (
            <div
              key={project.id}
              onClick={() => handleCardClick(project)}
              className="group cursor-pointer bg-[#1c130d] hover:bg-[#251911] rounded-xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 border border-[#3b271a] hover:border-[#c28c46] flex flex-col justify-between"
            >
              {/* Compact YouTube Style Video Preview */}
              <div className="relative aspect-video w-full overflow-hidden bg-stone-950">
                {/* Thumbnail */}
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                  onError={(e) => {
                    const fallbackId = project.youtubeId || 'dQw4w9WgXcQ';
                    (e.target as HTMLImageElement).src = `https://img.youtube.com/vi/${fallbackId}/hqdefault.jpg`;
                  }}
                />

                {/* Subtle vignette overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/50 pointer-events-none" />

                {/* Top Badge: Box Number & Category */}
                <div className="absolute top-1.5 left-1.5 right-1.5 flex items-center justify-between z-10 pointer-events-none">
                  <span className="bg-[#b87a2a] text-[#1a110a] text-[9px] font-black px-1.5 py-0.5 rounded-xs shadow-xs">
                    #{idx + 1}
                  </span>
                  <span className="bg-black/75 backdrop-blur-xs text-[#f5d59f] text-[8px] sm:text-[9px] font-semibold px-1.5 py-0.5 rounded-xs line-clamp-1 max-w-[70%]">
                    {project.category}
                  </span>
                </div>

                {/* Compact YouTube Red Play Button */}
                <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                  <div className="w-8 h-5.5 sm:w-10 sm:h-7 bg-red-600 group-hover:bg-red-500 rounded-md sm:rounded-lg flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white text-white translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Bar: YouTube logo pill + Duration */}
                <div className="absolute bottom-1 left-1.5 right-1.5 flex items-center justify-between z-10 pointer-events-none text-white">
                  <span className="flex items-center gap-0.5 bg-black/70 px-1 py-0.5 rounded-xs text-[8px] sm:text-[9px] font-bold">
                    <span className="bg-red-600 text-white rounded-2xs px-0.5 text-[7px] leading-tight font-black">▶</span>
                    <span>YouTube</span>
                  </span>
                  {project.duration && (
                    <span className="bg-black/85 font-mono text-[8px] sm:text-[9px] px-1 py-0.5 rounded-xs">
                      {project.duration}
                    </span>
                  )}
                </div>
              </div>

              {/* Compact Title & Footer */}
              <div className="p-2 sm:p-2.5 bg-[#18110b] border-t border-[#2d1e14] flex flex-col justify-between flex-1">
                <div>
                  <h3 className="text-white text-[11px] sm:text-xs font-semibold leading-tight line-clamp-1 group-hover:text-[#e4a853] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-[10px] text-stone-400 mt-0.5 line-clamp-1">
                    {project.description || `${project.category} Craftsmanship`}
                  </p>
                </div>
                
                <div className="mt-1.5 pt-1.5 border-t border-stone-800/80 flex items-center justify-between text-[10px]">
                  <span className="text-[#c28c46] font-medium text-[9px] sm:text-[10px] flex items-center gap-1 group-hover:underline">
                    <span>Watch Video</span>
                    <Play className="w-2.5 h-2.5 fill-[#c28c46]" />
                  </span>
                  <span className="text-stone-500 text-[9px]">Tap to play</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
