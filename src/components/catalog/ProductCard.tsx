import React, { useState } from 'react';
import { Sparkles, ShoppingBag, AlertCircle, Check } from 'lucide-react';
import type { Product } from '../../types/product';
import { formatCOP } from '../../utils/formatPrice';
import { useCart } from '../../context/CartContext';
import { AROMAS } from '../../data/aromas';
import { CANDLE_COLORS } from '../../data/colors';

interface ProductCardProps {
  product: Product;
  onOpenModal: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenModal }) => {
  const isAvailable = product.inStock ?? true;
  const { addItem, openCart } = useCart();
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      product,
      aroma: AROMAS[0].name,
      color: CANDLE_COLORS[0].name,
      quantity: 1,
      unitPrice: product.price,
    });
    setIsAdded(true);
    openCart();
    setTimeout(() => setIsAdded(false), 1200);
  };

  return (
    <div className={`group bg-[#F4EFE6] rounded-2xl overflow-hidden border border-[#E4D9C9] shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between hover:-translate-y-1 ${
      !isAvailable ? 'opacity-85' : ''
    }`}>
      
      {/* Image Container */}
      <div className="relative aspect-[4/3] bg-[#E8DEC8] overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ${
            !isAvailable ? 'grayscale-[30%]' : ''
          }`}
          loading="lazy"
        />

        {/* Badges */}
        {!isAvailable ? (
          <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-[#2D2723]/90 text-white backdrop-blur-sm px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider shadow-sm">
            Agotado temporalmente
          </span>
        ) : product.badge ? (
          <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-white/95 backdrop-blur-sm px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#0D9488] shadow-sm border border-white/60">
            {product.badge}
          </span>
        ) : null}

        {/* Size Badge */}
        {product.size && (
          <span className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 bg-[#26211E]/85 backdrop-blur-sm text-white px-2 sm:px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-medium">
            {product.size}
          </span>
        )}
      </div>

      {/* Info Container */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3.5 sm:space-y-4">
        <div className="space-y-1.5">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2D2723] group-hover:text-[#0D9488] transition-colors leading-snug">
            {product.name}
          </h3>
          {product.description && (
            <p className="text-xs text-[#7A7065] leading-relaxed font-light">
              {product.description}
            </p>
          )}
        </div>

        {/* Price & Action Buttons */}
        <div className="pt-3 border-t border-[#E4D9C9] space-y-2.5 sm:space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#7A7065]">Precio</span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#2D2723]">
              {formatCOP(product.price)}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOpenModal(product)}
              className="w-full py-2.5 px-2 sm:px-3 rounded-xl bg-white text-[#2D2723] text-[11px] sm:text-xs font-semibold border border-[#E4D9C9] hover:bg-[#EAE2D5] hover:border-[#D8CEBE] transition-colors flex items-center justify-center gap-1 active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#0D9488] flex-shrink-0" />
              <span className="truncate">Personalizar</span>
            </button>

            {isAvailable ? (
              <button
                type="button"
                onClick={handleQuickAddToCart}
                disabled={isAdded}
                className="w-full py-2.5 px-2 sm:px-3 rounded-xl bg-[#0D9488] text-white text-[11px] sm:text-xs font-semibold hover:bg-[#0F766E] transition-all flex items-center justify-center gap-1 shadow-sm active:scale-95 cursor-pointer disabled:opacity-85"
                title="Agregar al carrito de compras"
                aria-label={`Agregar ${product.name} al carrito`}
              >
                {isAdded ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white animate-in zoom-in-50" />
                    <span className="truncate">¡Agregado!</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-3.5 h-3.5 flex-shrink-0" />
                    <span className="hidden sm:inline truncate">Agregar al Carrito</span>
                    <span className="sm:hidden truncate">+ Carrito</span>
                  </>
                )}
              </button>
            ) : (
              <button
                disabled
                className="w-full py-2.5 px-2 sm:px-3 rounded-xl bg-stone-200 text-stone-500 text-[11px] sm:text-xs font-semibold flex items-center justify-center gap-1 cursor-not-allowed"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span className="truncate">Agotado</span>
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};
