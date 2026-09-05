import React from 'react';
import { useWoodStore } from '../context/WoodStoreContext';
import { WoodProduct } from '../types';
import { MessageSquare, Sparkles, CheckCircle2, Plus } from 'lucide-react';

interface ProductCatalogProps {
  onProductClick: (product: WoodProduct) => void;
  onOpenAdminAdd?: () => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  onProductClick
}) => {
  const { products, siteSettings } = useWoodStore();

  const handleWhatsAppInquiry = (product: WoodProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    const cleanNumber = siteSettings.whatsappNumber.replace(/[^0-9]/g, '');
    const message = encodeURIComponent(
      `Hello Wood Nido! I am interested in ordering/inquiring about: "${product.title}" (${product.woodType}, Price: Rs ${product.price.toLocaleString()}). Please share delivery and customization details.`
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="products-section" className="py-12 sm:py-20 bg-white border-b border-[#EAE4D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/70 text-amber-900 text-xs font-semibold tracking-wider uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Handcrafted Furniture Catalog</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold text-[#1B1917] font-serif tracking-tight">
              Wood Product Listings
            </h2>
            <p className="text-xs sm:text-sm text-[#736B63] mt-1">
              Select from our curated master collection or request bespoke sizing with solid wood selection.
            </p>
          </div>
        </div>

        {/* Product Grid */}
        {products.length === 0 ? (
          <div className="text-center py-16 bg-[#FAF8F5] border border-dashed border-[#DCD3C6]">
            <p className="text-base font-semibold text-gray-700">No wood products found</p>
            <p className="text-xs text-gray-500 mt-1">Add items to display in the catalog.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {products.map((product) => (
              <div
                key={product.id}
                id={`product-card-${product.id}`}
                onClick={() => onProductClick(product)}
                className="group cursor-pointer bg-white border border-[#E0D7CB] hover:border-[#C08A3E] transition-all duration-300 hover:shadow-md flex flex-col justify-between"
              >
                {/* Image Section */}
                <div className="relative aspect-4/3 w-full bg-[#EFECE5] overflow-hidden">
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-full h-full object-cover object-center group-hover:scale-104 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Top Badges */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="bg-black/75 backdrop-blur-xs text-white text-[11px] font-semibold px-2.5 py-0.5 tracking-wide">
                      {product.category}
                    </span>
                    {product.featured && (
                      <span className="bg-[#C08A3E] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider">
                        Featured
                      </span>
                    )}
                  </div>

                  {/* Stock tag */}
                  <div className="absolute bottom-2.5 left-2.5">
                    {product.inStock ? (
                      <span className="bg-emerald-800/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-300" />
                        <span>Ready in Showroom</span>
                      </span>
                    ) : (
                      <span className="bg-amber-800/80 backdrop-blur-xs text-white text-[10px] font-medium px-2 py-0.5">
                        Made to Order
                      </span>
                    )}
                  </div>
                </div>

                {/* Details Section */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-[#1D1A17] group-hover:text-[#C08A3E] transition-colors line-clamp-1">
                      {product.title}
                    </h3>

                    {/* Specs Pills */}
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#665E54]">
                      <span className="bg-[#F5F2EC] px-2 py-0.5 font-medium">
                        {product.woodType}
                      </span>
                      {product.dimensions && (
                        <span className="bg-[#F5F2EC] px-2 py-0.5">
                          {product.dimensions}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-[#787167] line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Price and Order Button */}
                  <div className="pt-3 border-t border-[#EAE3D7] flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider text-gray-500 font-semibold block">
                        Estimated Price
                      </span>
                      <span className="text-lg font-extrabold text-[#1B1815]">
                        Rs {product.price.toLocaleString()}
                      </span>
                    </div>

                    <button
                      id={`inquire-whatsapp-${product.id}`}
                      onClick={(e) => handleWhatsAppInquiry(product, e)}
                      className="bg-[#25D366] hover:bg-[#1EBE5D] text-white px-3.5 py-2 text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
                      title="Quick Quote on WhatsApp"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
