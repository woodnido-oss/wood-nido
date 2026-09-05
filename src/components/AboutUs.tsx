import React from 'react';
import { useWoodStore } from '../context/WoodStoreContext';
import { Award, Users, TrendingUp, Star, Hammer, CheckCircle2 } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { siteSettings } = useWoodStore();

  const stats = [
    {
      id: 'stat-1',
      icon: Award,
      value: `${siteSettings.yearsOfExperience}+`,
      label: 'Years of Experience'
    },
    {
      id: 'stat-2',
      icon: TrendingUp,
      value: `${siteSettings.industryExperts}+`,
      label: 'Industry Experts'
    },
    {
      id: 'stat-3',
      icon: Users,
      value: `${siteSettings.userRetention}%`,
      label: 'User retention'
    },
    {
      id: 'stat-4',
      icon: Star,
      value: `${siteSettings.globalClients}+`,
      label: 'Global Clients'
    }
  ];

  return (
    <section id="about-section" className="py-10 sm:py-20 bg-white border-b border-[#EAE4D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching screenshot golden style */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#C08A3E] font-serif tracking-tight">
            About Us
          </h2>
          <div className="w-12 h-0.5 bg-[#C08A3E] mx-auto mt-2"></div>
        </div>

        {/* Text & Stats row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-14">
          {/* Left Text Content matching screenshot */}
          <div className="lg:col-span-8 space-y-5 text-[#4E4841] text-sm sm:text-base leading-relaxed text-justify sm:text-left">
            <p>
              {siteSettings.aboutText1}
            </p>
            <p>
              {siteSettings.aboutText2}
            </p>
            <p>
              {siteSettings.aboutText3}
            </p>
          </div>

          {/* Right Stats Grid matching screenshot */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 sm:gap-6">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.id}
                  className="bg-[#FAF7F2] p-5 sm:p-6 rounded-none border border-[#E8E2D8] flex flex-col items-center text-center group hover:border-[#C08A3E] transition-all hover:shadow-xs"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-100/60 flex items-center justify-center mb-3 text-[#C08A3E] group-hover:bg-[#C08A3E] group-hover:text-white transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-[#1B1917] font-sans">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-[#756E65] mt-1">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Workshop & Artisan Photos (Dynamic Images set by Admin) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-6 border-t border-[#F0EAE1]">
          <div className="md:col-span-7 relative group overflow-hidden border border-[#DECDBA] rounded-lg shadow-xs bg-[#FAF8F5]">
            <div className="aspect-16/9 overflow-hidden">
              <img
                src={siteSettings.aboutImage1 || 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80'}
                alt="Wood Nido Artisan Workshop"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-xs text-white px-3 py-1.5 rounded text-xs flex items-center gap-2">
              <Hammer className="w-3.5 h-3.5 text-amber-400" />
              <span>Wood Nido Islamabad Carpentry Workshop</span>
            </div>
          </div>

          <div className="md:col-span-5 relative group overflow-hidden border border-[#DECDBA] rounded-lg shadow-xs bg-[#FAF8F5]">
            <div className="aspect-4/3 md:aspect-16/9 overflow-hidden">
              <img
                src={siteSettings.aboutImage2 || 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=800&q=80'}
                alt="Master Woodworker Hand Finishing"
                className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute bottom-3 left-3 bg-black/75 backdrop-blur-xs text-white px-3 py-1.5 rounded text-xs flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
              <span>Hand-Rubbed Polish & Seasoned Joinery</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
