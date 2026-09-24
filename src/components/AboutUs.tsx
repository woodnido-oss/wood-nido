import React from 'react';
import { useApp } from '../context/AppContext';
import { Edit3, Factory, Users, Star } from 'lucide-react';

export const AboutUs: React.FC = () => {
  const { siteConfig } = useApp();

  return (
    <section id="about" className="py-16 sm:py-24 bg-gradient-to-b from-[#fbf8f3] to-[#f7f2e7] relative border-b border-[#ebdcc7]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#a86c22]">
            Heritage & Craftsmanship
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif-title font-bold text-[#241710] tracking-tight mt-1">
            About <span className="text-gold-gradient">Wood Nido</span>
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#b87a2a] to-transparent mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          
          {/* Left: 3 Story Paragraphs & Optional Workshop Image */}
          <div className="lg:col-span-8 space-y-5 text-[#3e2e22] text-xs sm:text-sm leading-relaxed text-justify sm:text-left">
            <p className="first-letter:text-2xl first-letter:font-serif first-letter:font-bold first-letter:text-[#8a5522]">
              {siteConfig.aboutText1}
            </p>
            <p>
              {siteConfig.aboutText2}
            </p>
            <p>
              {siteConfig.aboutText3}
            </p>

            {siteConfig.aboutImage && (
              <div className="pt-2">
                <div className="rounded-2xl overflow-hidden shadow-md border border-[#ebdcc7] max-h-72">
                  <img
                    src={siteConfig.aboutImage}
                    alt={`${siteConfig.companyName || 'Wood Nido'} Workshop`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Right: 4 Golden Stats Cards (2x2 Grid) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-4 sm:gap-5 pt-2">
            
            {/* Stat 1: Years of Experience */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/80 backdrop-blur-xs border border-[#ebdcc7] shadow-xs hover:border-[#b87a2a] hover:shadow-md transition-all duration-200">
              <div className="w-11 h-11 rounded-lg bg-[#fbf5eb] border border-[#ecdac4] flex items-center justify-center text-[#b87a2a] mb-2.5 shadow-2xs">
                <Edit3 className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#241710]" style={{ fontFamily: "'Cinzel', Georgia, serif" }}>
                {siteConfig.yearsExperience}
              </span>
              <span className="text-[11px] font-semibold text-[#7c5b40] mt-1">
                Years Experience
              </span>
            </div>

            {/* Stat 2: Industry Experts */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/80 backdrop-blur-xs border border-[#ebdcc7] shadow-xs hover:border-[#b87a2a] hover:shadow-md transition-all duration-200">
              <div className="w-11 h-11 rounded-lg bg-[#fbf5eb] border border-[#ecdac4] flex items-center justify-center text-[#b87a2a] mb-2.5 shadow-2xs">
                <Factory className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#241710]" style={{ fontFamily: "'Cinzel', Georgia, serif" }}>
                {siteConfig.industryExperts}
              </span>
              <span className="text-[11px] font-semibold text-[#7c5b40] mt-1">
                Industry Experts
              </span>
            </div>

            {/* Stat 3: User Retention */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/80 backdrop-blur-xs border border-[#ebdcc7] shadow-xs hover:border-[#b87a2a] hover:shadow-md transition-all duration-200">
              <div className="w-11 h-11 rounded-lg bg-[#fbf5eb] border border-[#ecdac4] flex items-center justify-center text-[#b87a2a] mb-2.5 shadow-2xs">
                <Users className="w-5 h-5 stroke-[2]" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#241710]" style={{ fontFamily: "'Cinzel', Georgia, serif" }}>
                {siteConfig.userRetention}
              </span>
              <span className="text-[11px] font-semibold text-[#7c5b40] mt-1">
                Client Satisfaction
              </span>
            </div>

            {/* Stat 4: Global Clients */}
            <div className="flex flex-col items-center text-center p-4 rounded-xl bg-white/80 backdrop-blur-xs border border-[#ebdcc7] shadow-xs hover:border-[#b87a2a] hover:shadow-md transition-all duration-200">
              <div className="w-11 h-11 rounded-lg bg-[#fbf5eb] border border-[#ecdac4] flex items-center justify-center text-[#b87a2a] mb-2.5 shadow-2xs">
                <Star className="w-5 h-5 fill-[#b87a2a] text-[#b87a2a]" />
              </div>
              <span className="text-2xl sm:text-3xl font-extrabold text-[#241710]" style={{ fontFamily: "'Cinzel', Georgia, serif" }}>
                {siteConfig.globalClients}
              </span>
              <span className="text-[11px] font-semibold text-[#7c5b40] mt-1">
                Projects Completed
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
