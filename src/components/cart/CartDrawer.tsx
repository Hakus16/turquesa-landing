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

  // Lock body scroll when cart is open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
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
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity animate-in fade-in duration-300"
        onClick={closeCart}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF7F2] border-l border-[#E4D9C9] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
          
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-[#E4D9C9] bg-[#F4EFE6] flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-2.5">
              <span className="w-9 h-9 rounded-full bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center">
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
              onClick={closeCart}
              className="p-2 rounded-full text-[#7A7065] hover:text-[#2D2723] hover:bg-[#EAE2D5] transition-colors"
              aria-label="Cerrar carrito"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4 [-webkit-overflow-scrolling:touch]">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 rounded-full bg-[#F4EFE6] border border-[#E4D9C9] text-[#7A7065] flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div>
                  <h4 className="font-serif text-lg font-bold text-[#2D2723]">
                    Tu carrito está vacío
                  </h4>
                  <p className="text-xs text-[#7A7065] max-w-xs mx-auto mt-1 font-light">
                    Explora nuestro catálogo, personaliza tus velas con aroma y color, y agrégalas aquí para pedirlas juntas.
                  </p>
                </div>
                <a
                  href="#catalogo"
                  onClick={closeCart}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#0D9488] text-white text-xs font-semibold shadow hover:bg-[#0F766E] transition-colors"
                >
                  <span>Explorar Catálogo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#F4EFE6] rounded-2xl p-3.5 border border-[#E4D9C9] flex gap-3 relative group"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-[#E8DEC8] flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif font-bold text-sm sm:text-base text-[#2D2723] leading-snug truncate">
                          {item.product.name}
                        </h4>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-[#7A7065] hover:text-red-600 transition-colors p-1 -mr-1"
                          title="Eliminar vela"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Details tags */}
                      <div className="flex flex-wrap items-center gap-1.5 mt-1 text-[11px] text-[#7A7065]">
                        <span className="bg-white/80 px-2 py-0.5 rounded-md border border-[#E4D9C9]">
                          🌸 {item.aroma}
                        </span>
                        <span className="bg-white/80 px-2 py-0.5 rounded-md border border-[#E4D9C9]">
                          🎨 {item.color}
                        </span>
                        {item.product.size && (
                          <span className="bg-white/80 px-2 py-0.5 rounded-md border border-[#E4D9C9]">
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
                      <div className="flex items-center border border-[#E4D9C9] rounded-lg bg-white">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 sm:p-1.5 text-[#7A7065] hover:text-[#2D2723] rounded-l-lg"
                          aria-label="Disminuir"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-[#2D2723]">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 sm:p-1.5 text-[#7A7065] hover:text-[#2D2723] rounded-r-lg"
                          aria-label="Aumentar"
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

          {/* Footer (when items exist) */}
          {items.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-[#E4D9C9] bg-[#F4EFE6] space-y-3.5 flex-shrink-0">
              
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

              {/* Checkout WhatsApp Button & Continue Shopping */}
              <div className="space-y-2 pt-0.5">
                <a
                  href={createCartOrderWhatsAppLink(items)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white text-sm font-semibold shadow-lg hover:shadow-xl transition-all active:scale-95 text-center"
                >
                  <MessageCircle className="w-5 h-5 fill-white flex-shrink-0" />
                  <span>Pedir todo por WhatsApp</span>
                </a>

                <button
                  type="button"
                  onClick={closeCart}
                  className="w-full py-2.5 px-4 rounded-full border border-[#E4D9C9] bg-white hover:bg-[#FAF7F2] text-xs font-semibold text-[#2D2723] transition-colors text-center"
                >
                  Seguir viendo más velas
                </button>
              </div>

              <div className="flex items-center justify-between text-[11px] text-[#7A7065] pt-1">
                <button
                  type="button"
                  onClick={clearCart}
                  className="hover:text-red-600 transition-colors underline"
                >
                  Vaciar carrito
                </button>
                <span>Envíos a convenir por chat</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
