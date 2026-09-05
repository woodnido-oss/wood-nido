import React from 'react';
import { useWoodStore } from '../context/WoodStoreContext';
import { ArrowRight, Eye } from 'lucide-react';

interface HomeRenovationCategoriesProps {
  onSelectCategory: (categoryName: string) => void;
}

export const HomeRenovationCategories: React.FC<HomeRenovationCategoriesProps> = ({
  onSelectCategory
}) => {
  const { categories, selectedCategory, setSelectedCategory, galleryPhotos } = useWoodStore();

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
    onSelectCategory(categoryName);
  };

  return (
    <section id="categories-section" className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EAE4D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching screenshot */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#C08A3E] font-serif tracking-tight">
            Our Home Renovation
          </h2>
          <p className="text-sm text-[#736B63] mt-2 max-w-xl mx-auto">
            From bespoke solid wood cabinetry and doors to fine furniture polishing and full room architecture.
          </p>
          <div className="w-12 h-0.5 bg-[#C08A3E] mx-auto mt-3"></div>
        </div>

        {/* 9 Category Cards Grid matching screenshot */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.name;
            return (
              <div
                key={cat.id}
                id={`category-card-${cat.id}`}
                onClick={() => handleCategoryClick(cat.name)}
                className={`group cursor-pointer bg-white p-3 rounded-xl border-2 transition-all duration-300 hover:shadow-lg ${
                  isSelected
                    ? 'border-[#C08A3E] shadow-md ring-2 ring-[#C08A3E]/30'
                    : 'border-[#DECDBA] hover:border-[#C08A3E]'
                }`}
              >
                {/* Image Container with rounded corners matching screenshot */}
                <div className="relative aspect-4/3 w-full overflow-hidden rounded-lg bg-[#EFECE6]">
                  <img
                    src={cat.imageUrl}
                    alt={cat.name}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/25 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <span className="bg-white/90 text-black text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-sm">
                      <Eye className="w-3.5 h-3.5 text-[#C08A3E]" />
                      <span>View Products</span>
                    </span>
                  </div>
                </div>

                {/* Title below photo matching screenshot */}
                <div className="text-center pt-3 pb-1">
                  <h3 className="text-base sm:text-lg font-bold text-[#1C1A17] group-hover:text-[#C08A3E] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-[#7A7268] line-clamp-1 mt-0.5 px-2">
                    {cat.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Real Work Gallery Grid matching the screenshot (8-grid below categories) */}
        <div className="mt-14 pt-10 border-t border-[#E5DDD0]">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-[#1F1C18] font-serif">
                Master Woodwork Portfolio
              </h3>
              <p className="text-xs sm:text-sm text-[#736B63]">
                Recent installations and architectural carpentry executed by our master artisans
              </p>
            </div>
            <button
              onClick={() => onSelectCategory('All')}
              className="text-xs font-bold text-[#C08A3E] hover:text-[#9A6B29] flex items-center gap-1 uppercase tracking-wider"
            >
              <span>Explore All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {galleryPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-4/3 sm:aspect-square overflow-hidden bg-[#E2DBD1] rounded-sm shadow-xs cursor-pointer"
                onClick={() => handleCategoryClick(photo.category)}
              >
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-3 text-white">
                  <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    {photo.category}
                  </span>
                  <span className="text-xs font-semibold leading-tight line-clamp-2">
                    {photo.title}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
