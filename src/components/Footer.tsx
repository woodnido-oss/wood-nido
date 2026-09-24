import React from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Mail, Phone, Lock, ChevronRight } from 'lucide-react';
import { WoodNidoLogo } from './WoodNidoLogo';

export const Footer: React.FC = () => {
  const { siteConfig, isAdmin, setCurrentView, setAdminLoginModalOpen } = useApp();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#241710] text-stone-300 pt-16 pb-8 border-t-2 border-[#b87a2a]/60 relative shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#3d291e]">
          
          {/* Col 1: Brand & Bio */}
          <div className="lg:col-span-4 space-y-4">
            <div className="cursor-pointer" onClick={() => scrollTo('home')}>
              <WoodNidoLogo size="md" variant="dark" />
            </div>

            <p className="text-xs text-stone-300 leading-relaxed max-w-sm">
              We specialize in custom solid wood carpentry, modular kitchens, cupboards, and luxury home renovations across Islamabad & Rawalpindi.
            </p>

            <div className="pt-2 text-stone-400 text-[11px]">
              ISO-grade seasoned wood, German hardware fittings & bespoke craftsmanship.
            </div>
          </div>

          {/* Col 2: Useful Links matching screenshot */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[#dfab5f] font-bold text-sm tracking-wider uppercase">
              Useful Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo('about')}
                  className="hover:text-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer text-stone-300"
                >
                  <span className="text-[#dca34f]">✔</span> About
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('location')}
                  className="hover:text-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer text-stone-300"
                >
                  <span className="text-[#dca34f]">✔</span> Location
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('services')}
                  className="hover:text-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer text-stone-300"
                >
                  <span className="text-[#dca34f]">✔</span> Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('products')}
                  className="hover:text-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer text-stone-300"
                >
                  <span className="text-[#dca34f]">✔</span> Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('projects')}
                  className="hover:text-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer text-stone-300"
                >
                  <span className="text-[#dca34f]">✔</span> Projects
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Information matching screenshot */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-[#dfab5f] font-bold text-sm tracking-wider uppercase">
              Information
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => scrollTo('contact')}
                  className="hover:text-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer text-stone-300"
                >
                  <span className="text-[#dca34f]">✔</span> Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('contact')}
                  className="hover:text-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer text-stone-300"
                >
                  <span className="text-[#dca34f]">✔</span> Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('contact')}
                  className="hover:text-amber-200 transition-colors flex items-center gap-1.5 cursor-pointer text-stone-300"
                >
                  <span className="text-[#dca34f]">✔</span> Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Get In Touch matching screenshot */}
          <div className="lg:col-span-4 space-y-3.5">
            <h4 className="text-[#dfab5f] font-bold text-sm tracking-wider uppercase">
              Get In Touch
            </h4>

            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#dca34f] shrink-0 mt-0.5" />
                <span>{siteConfig.address}</span>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#dca34f] shrink-0" />
                <a href={`mailto:${siteConfig.email}`} className="hover:text-amber-200 transition-colors">
                  {siteConfig.email}
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#dca34f] shrink-0" />
                <a href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, '')}`} className="hover:text-amber-200 transition-colors font-medium">
                  {siteConfig.displayPhone || siteConfig.phone}
                </a>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pt-2">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#362217] border border-[#d6a55e]/30 hover:bg-[#b87a2a] text-amber-200 hover:text-white flex items-center justify-center font-bold text-xs transition-colors"
                aria-label="Facebook"
              >
                f
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#362217] border border-[#d6a55e]/30 hover:bg-[#b87a2a] text-amber-200 hover:text-white flex items-center justify-center font-bold text-xs transition-colors"
                aria-label="Instagram"
              >
                ig
              </a>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#362217] border border-[#d6a55e]/30 hover:bg-[#b87a2a] text-amber-200 hover:text-white flex items-center justify-center font-bold text-xs transition-colors"
                aria-label="TikTok"
              >
                tk
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-[#362217] border border-[#d6a55e]/30 hover:bg-[#b87a2a] text-amber-200 hover:text-white flex items-center justify-center font-bold text-xs transition-colors"
                aria-label="YouTube"
              >
                yt
              </a>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright © 2025 woodnido.com | Powered by Arteanalytics */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <p>
            Copyright © {new Date().getFullYear()} <strong className="text-amber-200">Wood Nido</strong> (woodnido.com) | Powered by <strong className="text-amber-200">Arteanalytics</strong>
          </p>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                if (isAdmin) setCurrentView('admin');
                else setAdminLoginModalOpen(true);
              }}
              className="hover:text-amber-200 transition-colors flex items-center gap-1 text-[11px] cursor-pointer"
            >
              <Lock className="w-3 h-3 text-[#dca34f]" />
              Admin Portal
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
