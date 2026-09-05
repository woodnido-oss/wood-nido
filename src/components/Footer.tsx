import React from 'react';
import { useWoodStore } from '../context/WoodStoreContext';
import { Check, MapPin, Mail, Phone, Facebook, Instagram, Youtube } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

// Custom TikTok SVG Icon matching theme
const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.29 0 .57.04.83.1v-3.6a6.34 6.34 0 0 0-.83-.05A6.33 6.33 0 0 0 3 15.42a6.34 6.34 0 0 0 10.86 4.46V10.7a8.27 8.27 0 0 0 5.73 2.2V9.45a4.83 4.83 0 0 1 0-2.76z" />
  </svg>
);

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { siteSettings } = useWoodStore();

  return (
    <footer className="bg-[#121110] text-[#B5ADA3] border-t-2 border-[#C08A3E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          
          {/* Useful Links Column matching screenshot */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-[#E5A94D] tracking-wide">
              Useful Links
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about-section')}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Check className="w-3.5 h-3.5 text-[#E5A94D] shrink-0" />
                  <span>About</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('location-section')}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Check className="w-3.5 h-3.5 text-[#E5A94D] shrink-0" />
                  <span>Location</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories-section')}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Check className="w-3.5 h-3.5 text-[#E5A94D] shrink-0" />
                  <span>Services</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects-section')}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Check className="w-3.5 h-3.5 text-[#E5A94D] shrink-0" />
                  <span>Projects</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products-section')}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Check className="w-3.5 h-3.5 text-[#E5A94D] shrink-0" />
                  <span>Wood Product Catalog</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Information Column matching screenshot */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-[#E5A94D] tracking-wide">
              Information
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li>
                <span className="flex items-center gap-2 text-[#9A9187]">
                  <Check className="w-3.5 h-3.5 text-[#E5A94D] shrink-0" />
                  <span>Privacy Policy</span>
                </span>
              </li>
              <li>
                <span className="flex items-center gap-2 text-[#9A9187]">
                  <Check className="w-3.5 h-3.5 text-[#E5A94D] shrink-0" />
                  <span>Terms & Conditions</span>
                </span>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact-section')}
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Check className="w-3.5 h-3.5 text-[#E5A94D] shrink-0" />
                  <span>Contact</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Get In Touch Column matching screenshot */}
          <div className="space-y-4">
            <h4 className="text-base font-bold text-[#E5A94D] tracking-wide">
              Get In Touch
            </h4>
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#E5A94D] shrink-0 mt-0.5" />
                <span>{siteSettings.address}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#E5A94D] shrink-0" />
                <a
                  href={`mailto:${siteSettings.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteSettings.email}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#E5A94D] shrink-0" />
                <a
                  href={`tel:${siteSettings.phone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors"
                >
                  {siteSettings.phone}
                </a>
              </div>
            </div>

            {/* Social Media Channels with Elegant Theme Styling (No bright colors) */}
            <div className="pt-3 flex items-center gap-3">
              {/* Facebook */}
              <a
                href={siteSettings.facebookUrl || 'https://facebook.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center hover:bg-[#C08A3E] hover:text-black hover:border-[#C08A3E] hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
                title="Facebook"
              >
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              {/* Instagram */}
              <a
                href={siteSettings.instagramUrl || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center hover:bg-[#C08A3E] hover:text-black hover:border-[#C08A3E] hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
                title="Instagram"
              >
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>

              {/* TikTok */}
              <a
                href={siteSettings.tiktokUrl || 'https://tiktok.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center hover:bg-[#C08A3E] hover:text-black hover:border-[#C08A3E] hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
                title="TikTok"
              >
                <TikTokIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
              </a>

              {/* YouTube */}
              <a
                href={siteSettings.youtubeUrl || 'https://youtube.com'}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center hover:bg-[#C08A3E] hover:text-black hover:border-[#C08A3E] hover:scale-105 active:scale-95 transition-all shadow-xs cursor-pointer"
                title="YouTube"
              >
                <Youtube className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
