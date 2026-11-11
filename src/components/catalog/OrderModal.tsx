import React, { useState, useEffect } from 'react';
import { X, Sparkles, Plus, Minus, MessageCircle, ShieldCheck, ShoppingBag, Check } from 'lucide-react';
import type { Product } from '../../types/product';
import { AROMAS } from '../../data/aromas';
import { CANDLE_COLORS } from '../../data/colors';
import { formatCOP } from '../../utils/formatPrice';
import { createProductOrderWhatsAppLink } from '../../utils/whatsappLink';
import { useCart } from '../../context/CartContext';

interface OrderModalProps {
  product: Product;
  onClose: () => void;
}

export const OrderModal: React.FC<OrderModalProps> = ({ product, onClose }) => {
  const { addItem, openCart } = useCart();
  const [selectedAroma, setSelectedAroma] = useState<string>(AROMAS[0].name);
  const [selectedColor, setSelectedColor] = useState<string>(CANDLE_COLORS[0].name);
  const [customColor, setCustomColor] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [notes, setNotes] = useState<string>('');
  const [isAdded, setIsAdded] = useState<boolean>(false);

  // Lock body scroll cleanly and handle Escape key
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow || '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const totalPrice = product.price * quantity;
  const depositPrice = totalPrice * 0.5;

  const activeColor = customColor.trim() ? customColor : selectedColor;

  const handleAddToCart = () => {
    addItem({
      product,
      aroma: selectedAroma,
      color: activeColor,
      quantity,
      notes: notes.trim() || undefined,
      unitPrice: product.price,
    });
    setIsAdded(true);
    setTimeout(() => {
      onClose();
      openCart();
    }, 280);
  };

  const handleWhatsAppSubmit = () => {
    const link = createProductOrderWhatsAppLink({
      product,
      aroma: selectedAroma,
      color: activeColor,
      quantity,
      customNote: notes.trim() || undefined,
    });
    window.open(link, '_blank');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4 overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-[#FAF7F2] rounded-2xl sm:rounded-3xl max-w-xl w-full border border-[#E4D9C9] shadow-2xl flex flex-col max-h-[92dvh] relative animate-in fade-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
      >
        {/* Header - Fixed at top */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#E4D9C9] bg-[#F4EFE6] flex-shrink-0 rounded-t-2xl sm:rounded-t-3xl">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="w-8 h-8 rounded-full bg-[#0D9488]/10 text-[#0D9488] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-4 h-4" />
            </span>
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold text-[#2D2723]">
                Personalizar Vela
              </h3>
              <p className="text-[11px] sm:text-xs text-[#7A7065]">
                Configura tu esencia y tono antes de pedir
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full text-[#7A7065] hover:text-[#2D2723] hover:bg-[#EAE2D5] transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body - Scrollable content with touch smoothing and min-h-0 */}
        <div className="p-4 sm:p-6 space-y-5 sm:space-y-6 flex-1 min-h-0 overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]">
          
          {/* Selected Product Banner */}
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 bg-[#F4EFE6] p-3 sm:p-3.5 rounded-2xl border border-[#E4D9C9]">
            <img
              src={product.image}
              alt={product.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover bg-[#E8DEC8] flex-shrink-0"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-serif font-bold text-base sm:text-lg text-[#2D2723] leading-snug">
                {product.name}
              </h4>
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[#7A7065] my-1">
                {product.size && <span>Medida: {product.size}</span>}
                {product.size && <span>•</span>}
                <span className="font-semibold text-[#0D9488]">
                  {formatCOP(product.price)} c/u
                </span>
              </div>
              {product.description && (
                <p className="text-xs text-[#7A7065] font-light leading-relaxed">
                  {product.description}
                </p>
              )}
            </div>
          </div>

          {/* Step 1: Aroma */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2723] mb-2">
              1. Selecciona el Aroma / Esencia
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {AROMAS.map((a) => (
                <button
                  key={a.id}
                  type="button"
                  onClick={() => setSelectedAroma(a.name)}
                  className={`p-2.5 rounded-xl text-left border text-xs transition-all active:scale-95 ${
                    selectedAroma === a.name
                      ? 'border-[#0D9488] bg-[#0D9488]/10 text-[#0D9488] font-semibold ring-1 ring-[#0D9488]'
                      : 'border-[#E4D9C9] bg-white text-[#2D2723] hover:bg-[#F4EFE6]'
                  }`}
                >
                  <div className="font-medium truncate">{a.name}</div>
                  <div className="text-[10px] text-[#7A7065] truncate">{a.mood}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Color */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2723] mb-2">
              2. Elige el Color o Tonalidad
            </label>
            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2">
              {CANDLE_COLORS.map((col) => {
                const isSelected = selectedColor === col.name && !customColor;
                return (
                  <button
                    key={col.id}
                    type="button"
                    onClick={() => {
                      setSelectedColor(col.name);
                      setCustomColor('');
                    }}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors active:scale-95 ${
                      isSelected
                        ? 'bg-[#2D2723] text-white border-[#2D2723]'
                        : 'bg-white text-[#2D2723] border-[#E4D9C9] hover:bg-[#F4EFE6]'
                    }`}
                  >
                    <span
                      className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        col.id === 'blanco'
                          ? isSelected
                            ? 'border border-white/60'
                            : 'border border-[#D8CEBE]'
                          : col.id === 'negro' && isSelected
                          ? 'border border-white/40'
                          : ''
                      }`}
                      style={{ backgroundColor: col.hex }}
                    />
                    <span>{col.name}</span>
                  </button>
                );
              })}
            </div>
            <input
              type="text"
              placeholder="O escribe otro color (ej. Morado lavanda, Verde salvia)..."
              value={customColor}
              onChange={(e) => setCustomColor(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E4D9C9] text-xs text-[#2D2723] focus:outline-none focus:border-[#0D9488]"
            />
          </div>

          {/* Step 3: Quantity & Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 sm:gap-4 items-center">
            <div className="sm:col-span-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2723] mb-1.5 sm:mb-2">
                Cantidad
              </label>
              <div className="flex items-center border border-[#E4D9C9] rounded-xl bg-white w-fit">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 sm:p-2.5 text-[#7A7065] hover:text-[#2D2723] active:bg-[#EAE2D5] rounded-l-xl"
                  aria-label="Disminuir"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-10 text-center text-sm font-bold text-[#2D2723]">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 sm:p-2.5 text-[#7A7065] hover:text-[#2D2723] active:bg-[#EAE2D5] rounded-r-xl"
                  aria-label="Aumentar"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-[#2D2723] mb-1.5 sm:mb-2">
                Notas / Mensaje especial (Opcional)
              </label>
              <input
                type="text"
                placeholder="Ej. Es para regalo, incluir tarjetita..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl bg-white border border-[#E4D9C9] text-xs text-[#2D2723] focus:outline-none focus:border-[#0D9488]"
              />
            </div>
          </div>

          {/* Price Calculation & 50% info */}
          <div className="bg-[#F4EFE6] p-3.5 sm:p-4 rounded-2xl border border-[#E4D9C9] space-y-1.5 sm:space-y-2">
            <div className="flex justify-between items-center text-xs sm:text-sm">
              <span className="text-[#7A7065]">Total estimado:</span>
              <span className="font-serif text-lg sm:text-xl font-bold text-[#2D2723]">
                {formatCOP(totalPrice)}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#0D9488] font-medium pt-1 border-t border-[#E4D9C9]">
              <ShieldCheck className="w-4 h-4 flex-shrink-0" />
              <span>Abono para iniciar (50%): <strong>{formatCOP(depositPrice)}</strong></span>
            </div>
          </div>

        </div>

        {/* Footer Actions - Fixed at bottom */}
        <div className="p-3.5 sm:p-5 border-t border-[#E4D9C9] bg-[#F4EFE6] flex flex-col gap-2.5 flex-shrink-0 rounded-b-2xl sm:rounded-b-3xl">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full sm:w-auto px-4 py-2 sm:py-2.5 rounded-full text-xs font-semibold text-[#7A7065] hover:text-[#2D2723] transition-colors order-2 sm:order-1 text-center"
            >
              Seguir explorando
            </button>
            
            <button
              type="button"
              onClick={handleAddToCart}
              disabled={isAdded}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#0D9488] text-white text-xs sm:text-sm font-semibold hover:bg-[#0F766E] shadow-md hover:shadow-lg transition-all active:scale-95 order-1 sm:order-2 disabled:opacity-75"
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4 text-white animate-in zoom-in-50" />
                  <span>¡Agregada al carrito!</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-white" />
                  <span>Agregar al Carrito</span>
                </>
              )}
            </button>
          </div>

          <div className="text-center pt-1 border-t border-[#E4D9C9]/60">
            <button
              type="button"
              onClick={handleWhatsAppSubmit}
              className="text-[11px] text-[#7A7065] hover:text-[#0D9488] inline-flex items-center gap-1 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366] fill-[#25D366]" />
              <span>O pedir solo esta vela directamente por WhatsApp</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
