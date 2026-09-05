import React from 'react';
import { useWoodStore } from '../context/WoodStoreContext';
import { MapPin, Navigation, ExternalLink, Clock, Phone, Mail } from 'lucide-react';

export const LocationMap: React.FC = () => {
  const { siteSettings } = useWoodStore();

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    'Plot 126 I&T Center G-9/1 Islamabad Pakistan'
  )}`;

  return (
    <section id="location-section" className="py-12 sm:py-16 bg-[#F8F5F0] border-b border-[#EAE3D6]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="bg-white border border-[#DDD4C5] shadow-xs overflow-hidden">
          {/* Header Bar */}
          <div className="p-4 sm:p-6 border-b border-[#EBE4D8] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#FAF8F5]">
            <div className="flex items-start sm:items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center text-[#C08A3E] shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-[#1C1A17]">
                  Wood Nido Showroom & Factory Location
                </h3>
                <p className="text-xs sm:text-sm text-[#70685E]">
                  {siteSettings.address}
                </p>
              </div>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-[#171513] hover:bg-[#2B2724] text-white text-xs font-semibold px-4 py-2.5 transition-colors uppercase tracking-wider shadow-xs"
            >
              <span>Open in Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>
          </div>

          {/* Interactive Map Visual */}
          <div className="relative w-full h-[360px] sm:h-[420px] bg-[#E5E0D8] overflow-hidden">
            {/* Styled Realistic Map Canvas representation */}
            <div className="absolute inset-0 bg-[#E8ECE9]">
              {/* Subtle Road & River SVG network */}
              <svg className="w-full h-full opacity-60" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
                    <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#D3DBD5" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#grid)" />
                {/* Major highways */}
                <path d="M -50,150 Q 300,200 900,100 T 1600,300" fill="none" stroke="#FCE7B8" strokeWidth="8" />
                <path d="M 200,-50 L 350,600" fill="none" stroke="#FFFFFF" strokeWidth="6" />
                <path d="M 500,-50 L 520,600" fill="none" stroke="#FFFFFF" strokeWidth="6" />
                <path d="M -50,320 L 1600,280" fill="none" stroke="#FFFFFF" strokeWidth="5" />
                {/* Green park zones */}
                <circle cx="280" cy="120" r="70" fill="#D4E6D7" opacity="0.8" />
                <circle cx="750" cy="220" r="110" fill="#D4E6D7" opacity="0.8" />
              </svg>

              {/* Geographical Labels matching screenshot */}
              <div className="absolute top-12 left-[12%] text-xs font-bold text-gray-600 bg-white/70 px-2 py-0.5 rounded shadow-2xs">
                KHYBER PAKHTUNKHWA
              </div>
              <div className="absolute top-16 left-[40%] text-sm font-bold text-gray-700 bg-white/80 px-2 py-0.5 rounded shadow-2xs">
                ISLAMABAD CAPITAL TERRITORY
              </div>
              <div className="absolute bottom-16 left-[38%] text-base font-extrabold text-gray-800 bg-white/90 px-3 py-1 rounded shadow-xs">
                Rawalpindi <span className="font-urdu text-sm font-normal text-gray-600 ml-1">راولپنڈی</span>
              </div>
              <div className="absolute top-28 left-[24%] text-xs font-semibold text-gray-500">
                Tarnol
              </div>
              <div className="absolute bottom-28 left-[18%] text-xs font-semibold text-gray-500">
                TopCity-1
              </div>
              <div className="absolute top-24 right-[15%] text-xs font-semibold text-gray-500">
                Bahria Enclave
              </div>

              {/* Pin Marker on G-9/1 I&T Center matching screenshot */}
              <div className="absolute top-[42%] left-[45%] -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-red-400 opacity-75"></span>
                  <div className="w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg border-2 border-white z-10">
                    <MapPin className="w-4 h-4 fill-current" />
                  </div>
                </div>

                {/* Callout box */}
                <div className="mt-1 bg-white border border-gray-300 shadow-lg px-3 py-1.5 rounded text-center whitespace-nowrap">
                  <p className="text-xs font-bold text-gray-900">Wood Nido Showroom</p>
                  <p className="text-[10px] text-gray-600">Plot #126, I&T Center, G-9/1</p>
                </div>
              </div>
            </div>

            {/* Quick Visit Card Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-xs bg-white/95 backdrop-blur-md p-4 border border-[#DDD3C4] shadow-md space-y-2">
              <div className="text-xs font-bold text-[#1C1A17] uppercase tracking-wide flex items-center gap-1.5 text-[#C08A3E]">
                <Clock className="w-3.5 h-3.5" />
                <span>Showroom Hours</span>
              </div>
              <p className="text-xs text-gray-700">
                Monday – Saturday: 10:00 AM – 9:00 PM<br />
                Sunday: 12:00 PM – 8:00 PM
              </p>
              <div className="pt-2 border-t border-gray-200 flex items-center gap-3 text-xs">
                <a
                  href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
                  className="text-gray-900 hover:text-[#C08A3E] font-medium flex items-center gap-1"
                >
                  <Phone className="w-3 h-3 text-[#C08A3E]" />
                  <span>Call Ahead</span>
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
