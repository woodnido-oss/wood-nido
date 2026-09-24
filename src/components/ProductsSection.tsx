import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductItem } from '../types';
import { MessageCircle, Phone, Sparkles, Check, ChevronRight, Ruler, Layers } from 'lucide-react';

export const ProductsSection: React.FC = () => {
  const { products, siteConfig, setQuoteModalOpen, setSelectedServiceForQuote } = useApp();
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(products.map((p) => p.category)))];

  const filteredProducts = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory);

  const handleInquire = (product: ProductItem) => {
    setSelectedServiceForQuote(`Product Inquiry: ${product.title} (${product.category})`);
    setQuoteModalOpen(true);
  };

  const handleWhatsAppProduct = (product: ProductItem) => {
    const text = `Assalam o Alaikum! I am interested in your product:\n*${product.title}*\nCategory: ${product.category}\nPlease provide details, custom sizing, and quotation.`;
    window.open(`https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <section id="products" className="py-16 sm:py-24 bg-[#fbf8f3] relative border-t border-[#ebdcc7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching website typography */}
        <div className="text-center mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#fbf4e8] border border-[#e5cd9e] text-[#8c5417] text-xs font-bold uppercase tracking-wider mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#b87a2a]" />
            <span>Handcrafted Collection</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif-title font-bold text-[#241710] tracking-tight">
            Our Custom Wood <span className="text-gold-gradient">Products</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 max-w-2xl mx-auto">
            Explore our ready-to-order bespoke furniture, designer wardrobes, solid wood entrance doors, and modular kitchen units. Crafted with seasoned wood and durable hardware.
          </p>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#b87a2a] to-transparent mx-auto mt-4" />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-8 sm:mb-10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                activeCategory === cat
                  ? 'bg-[#241710] text-[#fdf8f0] border border-[#d6a55e]/40 shadow-sm'
                  : 'bg-white text-[#4a3424] hover:bg-[#f6eee0] border border-[#e8decb] shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid - Note: NO PRICES DISPLAYED per user requirement */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden border border-[#ebdcc7] shadow-xs hover:border-[#b87a2a] hover:shadow-[0_12px_32px_rgba(67,34,12,0.08)] transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Product Image */}
                <div 
                  onClick={() => setSelectedProduct(product)}
                  className="relative aspect-square overflow-hidden bg-stone-100 cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  
                  {/* Category Tag */}
                  <span className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs text-[#382315] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs border border-[#ebdcc7]">
                    {product.category}
                  </span>

                  {/* Ready to Build / In Stock Badge */}
                  <span className="absolute top-3 right-3 bg-[#244528]/90 text-[#f0f9f1] text-[10px] font-semibold px-2.5 py-0.5 rounded-full shadow-xs border border-[#487852]/40 flex items-center gap-1">
                    <Check className="w-3 h-3 stroke-[3]" />
                    <span>Custom Made</span>
                  </span>

                  {/* Hover Quick View overlay */}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-[#241710] text-[#fdf8f0] text-xs font-bold px-3.5 py-1.5 rounded-lg shadow-lg border border-[#d6a55e]/40">
                      View Specifications
                    </span>
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4 sm:p-5">
                  <h3 
                    onClick={() => setSelectedProduct(product)}
                    className="font-bold text-[#241710] text-sm sm:text-base leading-snug group-hover:text-[#b87a2a] transition-colors cursor-pointer line-clamp-1"
                  >
                    {product.title}
                  </h3>
                  
                  <p className="text-xs text-stone-600 mt-1.5 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Specifications snippet (Material / Dimensions) */}
                  {(product.material || product.dimensions) && (
                    <div className="mt-3 pt-3 border-t border-[#f2e9dc] space-y-1">
                      {product.material && (
                        <div className="flex items-center gap-1.5 text-[11px] text-stone-600 truncate">
                          <Layers className="w-3.5 h-3.5 text-[#b87a2a] shrink-0" />
                          <span className="truncate"><strong>Wood:</strong> {product.material}</span>
                        </div>
                      )}
                      {product.dimensions && (
                        <div className="flex items-center gap-1.5 text-[11px] text-stone-600 truncate">
                          <Ruler className="w-3.5 h-3.5 text-[#b87a2a] shrink-0" />
                          <span className="truncate"><strong>Size:</strong> {product.dimensions}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons: Request Custom Quote & WhatsApp */}
              <div className="p-4 sm:p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleInquire(product)}
                  className="w-full bg-[#241710] hover:bg-[#382317] text-[#fdf8f0] text-xs font-bold py-2.5 px-2 rounded-xl border border-[#d6a55e]/30 transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer active:scale-98"
                >
                  <span>Inquire Now</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={() => handleWhatsAppProduct(product)}
                  className="w-full bg-[#1e7845] hover:bg-[#186439] text-white text-xs font-bold py-2.5 px-2 rounded-xl transition-all flex items-center justify-center gap-1 shadow-xs cursor-pointer active:scale-98"
                  title="WhatsApp Inquiry"
                >
                  <MessageCircle className="w-3.5 h-3.5 fill-white" />
                  <span>WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner for Custom Dimensions / Orders */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#241710] border border-[#3d291e] text-stone-200 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="text-base sm:text-lg font-bold text-amber-100 flex items-center justify-center sm:justify-start gap-2">
              <Sparkles className="w-4 h-4 text-[#dca34f]" />
              Need a Custom Size or Different Wood Finish?
            </h4>
            <p className="text-xs sm:text-sm text-stone-300">
              We fabricate all products according to your room dimensions, color palette, and preferred timber (Teak, Oak, Ash, Deodar, UV Acrylic).
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => {
                setSelectedServiceForQuote('Custom Woodwork & Furniture Order');
                setQuoteModalOpen(true);
              }}
              className="bg-gradient-to-r from-[#c48834] via-[#dca44f] to-[#b87824] hover:brightness-105 text-[#1e130a] text-xs sm:text-sm font-bold px-5 py-3 rounded-xl transition-all shadow-md active:scale-98 cursor-pointer"
            >
              Book Free Site Measurement
            </button>
            <a
              href={`tel:${siteConfig.phone}`}
              className="p-3 rounded-xl bg-[#38251a] hover:bg-[#4a3224] text-amber-200 transition-colors border border-[#523927]"
              title="Call Us Directly"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>

      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-xs animate-in fade-in duration-150">
          <div 
            className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl border border-stone-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-video w-full bg-stone-900">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black transition-colors"
              >
                ✕
              </button>
              <span className="absolute bottom-3 left-3 bg-white/90 text-stone-900 text-xs font-bold px-3 py-1 rounded-md shadow-md">
                {selectedProduct.category}
              </span>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <h3 className="text-xl font-bold text-stone-900">{selectedProduct.title}</h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed">{selectedProduct.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-xs">
                {selectedProduct.material && (
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Material & Finish</span>
                    <span className="font-semibold text-stone-800">{selectedProduct.material}</span>
                  </div>
                )}
                {selectedProduct.dimensions && (
                  <div>
                    <span className="text-stone-400 block text-[10px] uppercase font-bold">Standard Sizing</span>
                    <span className="font-semibold text-stone-800">{selectedProduct.dimensions}</span>
                  </div>
                )}
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Customization</span>
                  <span className="font-semibold text-[#b57a2c]">Available in any dimensions & polish tone</span>
                </div>
                <div>
                  <span className="text-stone-400 block text-[10px] uppercase font-bold">Delivery & Fitting</span>
                  <span className="font-semibold text-emerald-700">Free delivery & installation in Islamabad/Rawalpindi</span>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={() => {
                    handleInquire(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 bg-[#1f1e1d] hover:bg-black text-white text-xs font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-[#c28c46]" />
                  <span>Get Custom Quote for This Product</span>
                </button>
                <button
                  onClick={() => handleWhatsAppProduct(selectedProduct)}
                  className="flex-1 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
