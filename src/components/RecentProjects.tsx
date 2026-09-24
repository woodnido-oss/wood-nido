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

        {/* Video Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => handleCardClick(project)}
              className="group cursor-pointer bg-[#20150e] rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-[#3e291b] flex flex-col"
            >
              {/* YouTube Style Player Container */}
              <div className="relative aspect-video w-full overflow-hidden bg-stone-950">
                {/* Thumbnail */}
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                  loading="lazy"
                />

                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 pointer-events-none" />

                {/* Top Bar: Channel Tag + Title */}
                <div className="absolute top-0 left-0 right-0 p-3 flex items-start justify-between z-10">
                  <div className="flex items-center gap-2 max-w-[85%]">
                    {/* Small wood logo avatar */}
                    <div className="w-7 h-7 rounded-full bg-[#b87a2a] flex items-center justify-center shrink-0 border border-white/20 shadow-2xs">
                      <span className="text-[10px] font-bold text-white">WN</span>
                    </div>
                    <div className="flex flex-col overflow-hidden">
                      <span className="text-white text-xs font-semibold leading-tight line-clamp-1 drop-shadow-md">
                        {project.title}
                      </span>
                      <span className="text-[10px] text-amber-200 font-medium leading-none mt-0.5">
                        Wood Nido
                      </span>
                    </div>
                  </div>
                </div>

                {/* YouTube Red Play Button in Center */}
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="w-16 h-11 bg-red-600 group-hover:bg-red-500 rounded-2xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
                    <Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
                  </div>
                </div>

                {/* Bottom Bar: Action Icons and "Watch on YouTube" */}
                <div className="absolute bottom-0 left-0 right-0 px-3 py-2 flex items-center justify-between text-stone-300 text-[11px] z-10 bg-gradient-to-t from-black/90 to-transparent">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (navigator.share) {
                          navigator.share({ title: project.title, url: window.location.href });
                        }
                      }}
                      className="hover:text-white transition-colors"
                      title="Share"
                    >
                      <Share2 className="w-3.5 h-3.5" />
                    </button>
                    <button className="hover:text-white transition-colors" title="Watch later">
                      <Clock className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* YouTube badge */}
                  <div className="flex items-center gap-1 text-[11px] font-medium text-stone-300 group-hover:text-white transition-colors">
                    <span>Watch on</span>
                    <span className="font-bold flex items-center gap-0.5 text-white">
                      <span className="bg-red-600 text-white rounded-xs px-1 text-[9px] font-black">
                        ▶
                      </span>
                      YouTube
                    </span>
                  </div>
                </div>

                {/* Duration badge */}
                {project.duration && (
                  <span className="absolute bottom-8 right-2 bg-black/85 text-white font-mono text-[10px] px-1.5 py-0.5 rounded-sm z-10">
                    {project.duration}
                  </span>
                )}
              </div>

              {/* Title & Category Underneath */}
              <div className="p-3 bg-stone-900 border-t border-stone-800">
                <h3 className="text-white text-xs sm:text-sm font-semibold truncate group-hover:text-amber-400 transition-colors">
                  {project.title}
                </h3>
                <p className="text-[11px] text-stone-400 mt-1 line-clamp-1">
                  {project.description || project.category}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
