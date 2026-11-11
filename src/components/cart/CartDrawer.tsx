import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, MessageCircle, ShieldCheck, ArrowRight } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { formatCOP } from '../../utils/formatPrice';
import { createCartOrderWhatsAppLink } from '../../utils/whatsappLink';

export const CartDrawer: React.FC = () => {
  const {
    items,
    removeItem,
    updateQuantity,
    clearCart,
    totalItemsCount,
    totalAmount,
    depositAmount,
    isCartOpen,
    closeCart,
  } = useCart();

  // Safely manage body scroll lock on mobile, tablet & desktop
  useEffect(() => {
    if (!isCartOpen) return;

    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;

    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow || '';
      document.body.style.touchAction = previousTouchAction || '';
    };
  }, [isCartOpen]);

  // Handle Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) {
        closeCart();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, closeCart]);

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
        onClick={closeCart}
        aria-hidden="true"
      />

      {/* Slide-over panel: Full width on mobile, max-w-md on tablet/desktop */}
      <div className="relative z-10 w-full sm:max-w-md bg-[#FAF7F2] border-l border-[#E4D9C9] shadow-2xl flex flex-col h-full h-[100dvh] max-h-[100dvh] animate-in slide-in-from-right duration-300">
        
        {/* Header - Fixed at top */}
        <div className="p-4 sm:p-5 border-b border-[#E4D9C9] bg-[#F4EFE6] flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="w-9 h-9 rounded-full bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center flex-shrink-0">
              <ShoppingBag className="w-5 h-5" />
            </span>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2D2723]">
                Tu Carrito
              </h3>
              <p className="text-[11px] text-[#7A7065]">
                {totalItemsCount} {totalItemsCount === 1 ? 'vela seleccionada' : 'velas seleccionadas'}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={closeCart}
            className="p-2 -mr-1 rounded-full text-[#7A7065] hover:text-[#2D2723] hover:bg-[#EAE2D5] active:bg-[#D8CEBE] transition-colors cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Scrollable Body with min-h-0 to allow unbounded items */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-3.5 sm:p-5 space-y-3 sm:space-y-4 [-webkit-overflow-scrolling:touch]">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#F4EFE6] border border-[#E4D9C9] text-[#7A7065] flex items-center justify-center mx-auto">
                <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
              </div>
              <div>
                <h4 className="font-serif text-lg font-bold text-[#2D2723]">
                  Tu carrito está vacío
                </h4>
                <p className="text-xs text-[#7A7065] max-w-xs mx-auto mt-1 font-light leading-relaxed">
                  Explora nuestro catálogo, personaliza tus velas con aroma y color, y agrégalas para pedirlas juntas.
                </p>
              </div>
              <button
                type="button"
                onClick={closeCart}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0D9488] text-white text-xs font-semibold shadow hover:bg-[#0F766E] transition-colors cursor-pointer"
              >
                <span>Explorar Catálogo</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                className="bg-[#F4EFE6] rounded-2xl p-3 sm:p-3.5 border border-[#E4D9C9] flex gap-3 relative shadow-xs"
              >
                {/* Thumbnail */}
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-[#E8DEC8] flex-shrink-0"
                  loading="lazy"
                />

                {/* Info */}
                <div className="flex-1 min-w-0 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-1.5">
                      <h4 className="font-serif font-bold text-sm sm:text-base text-[#2D2723] leading-snug line-clamp-1">
                        {item.product.name}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-[#7A7065] hover:text-red-600 transition-colors p-1 -mr-1 -mt-1 cursor-pointer"
                        title="Eliminar vela"
                        aria-label={`Eliminar ${item.product.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Details tags */}
                    <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[10px] sm:text-[11px] text-[#7A7065]">
                      <span className="bg-white/90 px-2 py-0.5 rounded-md border border-[#E4D9C9]">
                        🌸 {item.aroma}
                      </span>
                      <span className="bg-white/90 px-2 py-0.5 rounded-md border border-[#E4D9C9]">
                        🎨 {item.color}
                      </span>
                      {item.product.size && (
                        <span className="bg-white/90 px-2 py-0.5 rounded-md border border-[#E4D9C9]">
                          📏 {item.product.size}
                        </span>
                      )}
                    </div>

                    {item.notes && (
                      <p className="text-[10px] text-[#7A7065] italic mt-1 line-clamp-1">
                        Nota: "{item.notes}"
                      </p>
                    )}
                  </div>

                  {/* Quantity controls & Subtotal */}
                  <div className="flex items-center justify-between pt-2 mt-2 border-t border-[#E4D9C9]/60">
                    <div className="flex items-center border border-[#E4D9C9] rounded-lg bg-white shadow-xs">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 sm:p-1.5 text-[#7A7065] hover:text-[#2D2723] active:bg-[#EAE2D5] rounded-l-lg touch-manipulation cursor-pointer"
                        aria-label="Disminuir cantidad"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="w-7 text-center text-xs font-bold text-[#2D2723] select-none">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 sm:p-1.5 text-[#7A7065] hover:text-[#2D2723] active:bg-[#EAE2D5] rounded-r-lg touch-manipulation cursor-pointer"
                        aria-label="Aumentar cantidad"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="font-serif font-bold text-sm sm:text-base text-[#2D2723]">
                      {formatCOP(item.unitPrice * item.quantity)}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer - Pinned firmly at bottom */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#E4D9C9] bg-[#F4EFE6] space-y-3 flex-shrink-0 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]">
            
            {/* Calculation Breakdown */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs sm:text-sm text-[#7A7065]">
                <span>Total productos ({totalItemsCount}):</span>
                <span className="font-serif text-lg sm:text-xl font-bold text-[#2D2723]">
                  {formatCOP(totalAmount)}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-[#0D9488] font-medium pt-1.5 border-t border-[#E4D9C9]">
                <span className="inline-flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                  <span>Abono para iniciar (50%):</span>
                </span>
                <strong className="text-sm font-bold">{formatCOP(depositAmount)}</strong>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-0.5">
              {/* WhatsApp Checkout */}
              <a
                href={createCartOrderWhatsAppLink(items)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2.5 py-3 px-5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-xs sm:text-sm font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95 text-center cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 fill-white flex-shrink-0" />
                <span>Pedir todo por WhatsApp</span>
              </a>

              {/* Continue Shopping button */}
              <button
                type="button"
                onClick={closeCart}
                className="w-full py-2.5 px-4 rounded-full border border-[#E4D9C9] bg-white hover:bg-[#FAF7F2] active:bg-[#EAE2D5] text-xs font-semibold text-[#2D2723] transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <span>Seguir viendo más velas</span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0D9488]" />
              </button>
            </div>

            <div className="flex items-center justify-between text-[11px] text-[#7A7065] pt-1">
              <button
                type="button"
                onClick={clearCart}
                className="hover:text-red-600 transition-colors underline cursor-pointer"
              >
                Vaciar carrito
              </button>
              <span>Envíos a convenir por chat</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
