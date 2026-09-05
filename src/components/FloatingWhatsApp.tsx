import React, { useState } from 'react';
import { useWoodStore } from '../context/WoodStoreContext';
import { X, Send, Sparkles } from 'lucide-react';

// Official Authentic WhatsApp Logo SVG
const WhatsAppBrandIcon: React.FC<{ className?: string }> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.301-.15-1.78-.878-2.056-.978-.276-.101-.477-.15-.678.15-.2.301-.778.978-.954 1.18-.175.201-.351.226-.652.075-.301-.151-1.272-.469-2.423-1.496-.895-.798-1.5-1.784-1.676-2.085-.175-.301-.019-.464.132-.614.136-.135.301-.351.452-.527.15-.176.2-.301.3-.502.101-.201.05-.377-.025-.527-.075-.151-.678-1.633-.929-2.235-.244-.586-.492-.507-.678-.516-.176-.008-.377-.01-.578-.01-.201 0-.527.075-.803.376s-1.054 1.03-1.054 2.511 1.079 2.912 1.23 3.113c.15.201 2.124 3.244 5.145 4.549.719.31 1.28.496 1.718.635.722.23 1.378.197 1.898.12.579-.087 1.78-.727 2.03-1.429.251-.703.251-1.305.176-1.43-.076-.125-.276-.2-.577-.35zM12.04 2C6.52 2 2.03 6.49 2.03 12c0 1.93.55 3.73 1.5 5.26L2 22l4.9-1.45A9.94 9.94 0 0 0 12.04 22c5.52 0 10.01-4.49 10.01-10s-4.49-10-10.01-10zm0 18.25c-1.62 0-3.13-.48-4.41-1.32l-.32-.21-3.27.97.98-3.18-.23-.36A8.2 8.2 0 0 1 3.78 12c0-4.56 3.7-8.25 8.26-8.25 4.55 0 8.25 3.69 8.25 8.25 0 4.56-3.7 8.25-8.25 8.25z" />
  </svg>
);

export const FloatingWhatsApp: React.FC = () => {
  const { siteSettings } = useWoodStore();
  const [isOpen, setIsOpen] = useState(false);
  const [userMsg, setUserMsg] = useState('Hello Wood Nido, I would like to get a quote for custom furniture.');

  const handleSend = () => {
    const cleanNumber = siteSettings.whatsappNumber.replace(/[^0-9]/g, '');
    const encoded = encodeURIComponent(userMsg);
    window.open(`https://wa.me/${cleanNumber}?text=${encoded}`, '_blank');
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-50 flex flex-col items-end">
      {/* WhatsApp chat popup */}
      {isOpen && (
        <div className="mb-2.5 w-[calc(100vw-32px)] max-w-xs sm:w-80 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in slide-in-from-bottom-5">
          {/* Header */}
          <div className="bg-[#075E54] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#128C7E] flex items-center justify-center text-white text-sm">
                <WhatsAppBrandIcon className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs sm:text-sm font-bold">{siteSettings.businessName} Carpentry</h4>
                <p className="text-[10px] text-emerald-200">Typically replies within 15 mins</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/80 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-3.5 bg-[#ECE5DD] space-y-3">
            <div className="bg-white p-3 rounded-lg rounded-tl-none shadow-xs text-xs text-gray-800 leading-relaxed">
              <p className="font-semibold text-emerald-800 mb-1">Assalam-o-Alaikum! 👋</p>
              <p>
                Welcome to Wood Nido. Looking for solid wood doors, custom kitchen cabinets, or modern furniture? Type your message below and chat directly with our workshop manager.
              </p>
              <span className="block text-[10px] text-gray-400 text-right mt-1">Just now</span>
            </div>

            <div className="flex items-center gap-1.5">
              <input
                type="text"
                value={userMsg}
                onChange={(e) => setUserMsg(e.target.value)}
                placeholder="Type your wood inquiry..."
                className="flex-1 bg-white border border-gray-300 rounded-full px-3 py-2 text-xs text-gray-900 focus:outline-none focus:border-[#25D366]"
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              />
              <button
                onClick={handleSend}
                className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shrink-0 hover:bg-[#1EBE5D] transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5 ml-0.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button (Compact, Sleek & Authentic WhatsApp Brand Icon) */}
      <button
        id="floating-whatsapp-button"
        onClick={() => setIsOpen(!isOpen)}
        className="group relative w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 focus:outline-none cursor-pointer"
        aria-label="Chat on WhatsApp"
        title="Chat on WhatsApp"
      >
        <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
        <WhatsAppBrandIcon className="w-6 h-6 fill-current" />
      </button>
    </div>
  );
};
