import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MessageCircle, X, Send } from 'lucide-react';

export const WhatsAppButton: React.FC = () => {
  const { siteConfig } = useApp();
  const [open, setOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const sendWhatsApp = (msgText?: string) => {
    const textToSend = msgText || customMsg || 'Hello Wood Nido! I would like to get a quote for carpentry & interior work.';
    const url = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(textToSend)}`;
    window.open(url, '_blank');
    setOpen(false);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Popover dialog */}
      {open && (
        <div className="mb-3 w-72 sm:w-80 bg-white rounded-2xl shadow-2xl border border-[#ebdcc7] overflow-hidden animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="bg-[#1f7a46] text-white p-3.5 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-bold text-xs">
                WN
              </div>
              <div>
                <h5 className="text-xs font-bold leading-tight">{siteConfig.companyName || 'Wood Nido'} Concierge</h5>
                <span className="text-[10px] text-green-100 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                  Online • Typically replies instantly
                </span>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-3.5 space-y-2.5 bg-[#fbf8f3] text-xs">
            <div className="bg-white p-2.5 rounded-lg rounded-tl-none shadow-xs border border-[#ebdcc7] text-[#2b1f17]">
              Assalam-o-Alaikum! Welcome to {siteConfig.companyName || 'Wood Nido'} Islamabad. How can our carpentry masters assist you today?
            </div>

            <div className="space-y-1.5 pt-1">
              <button
                onClick={() => sendWhatsApp('Hi, I need quotation for Modular Kitchen renovation.')}
                className="w-full text-left bg-white hover:bg-[#faf4ea] text-[11px] p-2 rounded-lg border border-[#ebdcc7] text-[#3d2c20] font-medium transition-colors cursor-pointer"
              >
                🍳 Modular Kitchen quote
              </button>
              <button
                onClick={() => sendWhatsApp('Hi, I need custom fitted wardrobes/cupboards.')}
                className="w-full text-left bg-white hover:bg-[#faf4ea] text-[11px] p-2 rounded-lg border border-[#ebdcc7] text-[#3d2c20] font-medium transition-colors cursor-pointer"
              >
                🚪 Wardrobes & Cupboards
              </button>
              <button
                onClick={() => sendWhatsApp('Hi, I want to book a site visit for measurement in Islamabad/Rawalpindi.')}
                className="w-full text-left bg-white hover:bg-[#faf4ea] text-[11px] p-2 rounded-lg border border-[#ebdcc7] text-[#3d2c20] font-medium transition-colors cursor-pointer"
              >
                📏 Book Free Site Visit
              </button>
            </div>

            <div className="pt-2 flex items-center gap-1.5">
              <input
                type="text"
                value={customMsg}
                onChange={(e) => setCustomMsg(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && sendWhatsApp()}
                placeholder="Type your message..."
                className="flex-1 bg-white border border-[#ebdcc7] rounded-lg px-2.5 py-1.5 text-xs outline-hidden focus:border-[#b87a2a]"
              />
              <button
                onClick={() => sendWhatsApp()}
                className="bg-[#1f7a46] hover:bg-[#186439] text-white p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Concierge WhatsApp Button */}
      <button
        onClick={() => setOpen(!open)}
        className="w-14 h-14 rounded-full bg-[#1f7a46] hover:bg-[#186439] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 group relative border-2 border-white/80 cursor-pointer"
        aria-label="Contact on WhatsApp"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-400 rounded-full border-2 border-white animate-pulse" />
        <MessageCircle className="w-7 h-7 fill-white stroke-[1.5]" />
      </button>

    </div>
  );
};
