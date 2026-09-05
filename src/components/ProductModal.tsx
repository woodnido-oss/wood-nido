import React from 'react';
import { WoodProduct } from '../types';
import { useWoodStore } from '../context/WoodStoreContext';
import { X, CheckCircle2, MessageSquare, Truck, ShieldCheck, Ruler, Sparkles } from 'lucide-react';

interface ProductModalProps {
  product: WoodProduct | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { siteSettings } = useWoodStore();

  if (!product) return null;

  const handleWhatsAppOrder = () => {
    const cleanNumber = siteSettings.whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello Wood Nido! I want to order/inquire about "${product.title}" (Category: ${product.category}, Wood: ${product.woodType}, Price: Rs ${product.price.toLocaleString()}). What is the delivery time and payment procedure?`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-xs animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-none border border-[#D5CCC0] shadow-2xl overflow-y-auto md:overflow-hidden flex flex-col md:flex-row max-h-[92vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 bg-black/60 hover:bg-black/90 text-white rounded-full transition-colors cursor-pointer"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Product Image */}
        <div className="md:w-1/2 relative bg-[#EFECE5] min-h-[220px] sm:min-h-[260px] shrink-0 md:shrink">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-3 left-3 bg-black/75 text-white text-xs px-3 py-1 font-semibold uppercase tracking-wider">
            {product.woodType}
          </div>
        </div>

        {/* Right Details */}
        <div className="md:w-1/2 p-5 sm:p-6 overflow-y-auto flex flex-col justify-between space-y-5">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#C08A3E] uppercase tracking-wider">
                {product.category}
              </span>
              <span className="text-gray-300">•</span>
              {product.inStock ? (
                <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Ready Stock</span>
                </span>
              ) : (
                <span className="text-xs text-amber-700 font-medium">
                  Made to Order (7-14 days)
                </span>
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-bold text-[#1B1916] font-serif leading-tight">
              {product.title}
            </h3>

            <div className="text-2xl font-extrabold text-[#1A1815]">
              Rs {product.price.toLocaleString()}
            </div>

            <p className="text-xs sm:text-sm text-[#615A52] leading-relaxed">
              {product.description}
            </p>

            {/* Specs Table */}
            <div className="bg-[#FAF7F2] p-3.5 border border-[#E8E2D6] space-y-2 text-xs">
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500">Wood Species:</span>
                <span className="font-semibold text-gray-900">{product.woodType}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500">Dimensions:</span>
                <span className="font-semibold text-gray-900">{product.dimensions || 'Customizable'}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-gray-200">
                <span className="text-gray-500">Polish Finish:</span>
                <span className="font-semibold text-gray-900">{product.finishType || 'Matte Lacquer'}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-gray-500">Warranty:</span>
                <span className="font-semibold text-gray-900">Termite & Moisture Shield</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-3 border-t border-gray-100">
            <button
              onClick={handleWhatsAppOrder}
              className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Inquire / Order on WhatsApp</span>
            </button>
            <p className="text-[10px] text-gray-500 text-center">
              Direct communication with Wood Nido factory team in Islamabad.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
