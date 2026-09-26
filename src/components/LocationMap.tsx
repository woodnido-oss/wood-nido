import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, ExternalLink, Navigation } from 'lucide-react';

export const LocationMap: React.FC = () => {
  const { siteConfig } = useApp();

  const query = encodeURIComponent(
    siteConfig.mapQuery || siteConfig.address || 'Faizi Plaza Soan Garden Block B Islamabad'
  );
  const zoom = siteConfig.mapZoom || 16;
  
  // Use maps.google.com embed with precise query, or coordinates for Soan Garden Block B Faizi Plaza
  const embedUrl = `https://maps.google.com/maps?q=${query}&t=&z=${zoom}&ie=UTF8&iwloc=&output=embed`;

  // Direct Google Maps link (User provided maps.app.goo.gl link or fallback)
  const googleMapsUrl = siteConfig.mapUrl || `https://www.google.com/maps/search/?api=1&query=${query}`;

  const displayName = siteConfig.locationName || 'Wood Nido Workshop & Display - Soan Garden';
  const displayAddress = siteConfig.address || 'Plot 7/10, Faizi Plaza, Near Creative Furniture, Block B, Soan Garden, Islamabad';

  return (
    <section id="location" className="py-12 bg-gradient-to-b from-[#fbf8f3] to-[#f7f2e7] relative border-b border-[#ebdcc7]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Map Container */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-[#ebdcc7] bg-[#e5e3df] aspect-[16/7] min-h-[340px]">
          
          {/* Dynamic Google Maps embed based on Admin Settings */}
          <div className="relative w-full h-full">
            <iframe
              key={`${siteConfig.mapQuery}-${siteConfig.mapZoom}`}
              title={displayName}
              src={embedUrl}
              className="w-full h-full border-0 grayscale-[10%] contrast-[105%]"
              loading="lazy"
            />
          </div>

          {/* Floating "Open in Maps" button */}
          <div className="absolute top-4 left-4 z-10 flex items-center gap-2">
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#fdfaf6]/95 hover:bg-white text-[#241710] text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md border border-[#ebdcc7] flex items-center gap-1.5 transition-colors"
            >
              <span>Open in Maps</span>
              <ExternalLink className="w-3.5 h-3.5 text-[#b87a2a]" />
            </a>
          </div>

          {/* Location details card floating at bottom */}
          <div className="absolute bottom-4 left-4 right-4 sm:right-auto sm:max-w-md z-10 bg-[#fdfaf6]/95 backdrop-blur-md p-3.5 rounded-xl shadow-xl border border-[#ebdcc7] flex items-center justify-between gap-4">
            <div className="flex items-start gap-2.5">
              <div className="w-8 h-8 rounded-full bg-[#b87a2a] flex items-center justify-center shrink-0 mt-0.5 text-white shadow-xs">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#241710] leading-tight">
                  {displayName}
                </h4>
                <p className="text-[11px] text-stone-600 mt-0.5 leading-snug">
                  {displayAddress}
                </p>
              </div>
            </div>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 bg-[#241710] hover:bg-[#b87a2a] text-white p-2.5 rounded-lg transition-colors shadow-xs"
              title="Get Driving Directions"
            >
              <Navigation className="w-4 h-4" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
};
