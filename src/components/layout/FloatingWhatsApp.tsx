import React from 'react';
import { MessageCircle, ShoppingBag } from 'lucide-react';
import { createGeneralWhatsAppLink } from '../../utils/whatsappLink';
import { useCart } from '../../context/CartContext';
import { formatCOP } from '../../utils/formatPrice';

export const FloatingWhatsApp: React.FC = () => {
  const { totalItemsCount, totalAmount, openCart } = useCart();

  return (
    <aside aria-label="Acciones rápidas" className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-2.5">
      {/* Floating Cart Pill when items > 0 */}
      {totalItemsCount > 0 && (
        <button
          type="button"
          onClick={openCart}
          className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#0D9488] text-white text-xs font-semibold shadow-xl hover:bg-[#0F766E] hover:scale-105 active:scale-95 transition-all duration-200 border-2 border-white animate-in slide-in-from-bottom-2"
          aria-label={`Ver carrito con ${totalItemsCount} velas por ${formatCOP(totalAmount)}`}
        >
          <div className="relative">
            <ShoppingBag className="w-4 h-4" />
            <span className="absolute -top-1.5 -right-1.5 bg-white text-[#0D9488] text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {totalItemsCount}
            </span>
          </div>
          <span className="hidden xs:inline sm:inline">Ver Carrito</span>
          <span className="font-bold">({formatCOP(totalAmount)})</span>
        </button>
      )}

      {/* Floating WhatsApp */}
      <div className="flex items-center gap-3">
        <span className="hidden md:inline-flex bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-[#2D2723] shadow-lg border border-[#E4D9C9] animate-bounce pointer-events-none">
          ¿Deseas hacer un pedido? 🕯️
        </span>
        <a
          href={createGeneralWhatsAppLink('¡Hola Turquesa! ✨ Vi el catálogo en la página web y me gustaría asesoría para hacer un pedido.')}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Abrir chat de WhatsApp"
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:bg-[#20BA5A] hover:scale-110 active:scale-95 transition-all duration-300 relative group"
        >
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
          <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7 fill-white" />
        </a>
      </div>
    </aside>
  );
};
