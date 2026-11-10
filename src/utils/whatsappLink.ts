import type { Product } from '../types/product';
import { formatCOP } from './formatPrice';

const WHATSAPP_NUMBER = '573244496273';

interface OrderMessageOptions {
  product?: Product;
  aroma?: string;
  color?: string;
  quantity?: number;
  customNote?: string;
}

export const createGeneralWhatsAppLink = (customText?: string): string => {
  const defaultText = customText || '¡Hola Turquesa! 🕯️ Me gustaría recibir más información sobre el catálogo de velas y hacer un pedido personalizado.';
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(defaultText)}`;
};

export const createProductOrderWhatsAppLink = ({
  product,
  aroma,
  color,
  quantity = 1,
  customNote,
}: OrderMessageOptions): string => {
  if (!product) {
    return createGeneralWhatsAppLink();
  }

  const lines: string[] = [
    '✨ *¡Hola Turquesa! Deseo realizar un pedido artesanal* ✨',
    '',
    `🕯️ *Vela:* ${product.name}`,
    product.size ? `📏 *Medida:* ${product.size}` : '',
    aroma ? `🌸 *Esencia elegida:* ${aroma}` : '🌸 *Esencia:* Por definir',
    color ? `🎨 *Color deseado:* ${color}` : '',
    `🔢 *Cantidad:* ${quantity} unidad(es)`,
    `💰 *Precio estimado:* ${formatCOP(product.price * quantity)}`,
    customNote ? `📝 *Detalles adicionales:* ${customNote}` : '',
    '',
    '💬 *Pregunta:* ¿Tienen disponibilidad para iniciar con el abono del 50% y coordinar la entrega?',
  ].filter(Boolean);

  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines.join('\n'))}`;
};
