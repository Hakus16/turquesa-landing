import type { OrderStepItem } from '../types/product';

export const ORDER_STEPS: OrderStepItem[] = [
  {
    step: 1,
    title: 'Elige tu Esencia / Aroma',
    description: 'Selecciona la fragancia que llenará tus momentos de bienestar y calidez.',
    detail: 'Opciones: Coco, Lavanda, Naranja, Maracuyá, Café, Fresas con chocolate o Eucalipto.',
    badgeText: 'Paso 1'
  },
  {
    step: 2,
    title: 'Elige el Diseño y Color',
    description: 'Explora nuestro catálogo y selecciona la figura que mejor armonice con tus espacios.',
    detail: 'Colores disponibles: Rosado, Rojo, Azul, Negro, Blanco, Verde, Amarillo y Naranja.',
    badgeText: 'Paso 2'
  },
  {
    step: 3,
    title: 'Confirma tu Pedido (50% Anticipo)',
    description: 'Asegura tu fecha de entrega con un abono previo para la elaboración artesanal.',
    detail: 'Se debe realizar el 50% del pago para comenzar la fabricación personalizada de tus velas.',
    badgeText: 'Paso 3'
  },
  {
    step: 4,
    title: 'Entrega o Recogida',
    description: 'Recibe en la puerta de tu hogar o recoge personalmente.',
    detail: 'Servicio a domicilio disponible (costo variable según ubicación) o recogida sin costo adicional.',
    badgeText: 'Paso 4'
  }
];

export const BRAND_INFO = {
  name: 'Turquesa',
  tagline: 'Velas Artesanales • Decora tus Espacios',
  phone: '3244496273',
  phoneDisplay: '+57 324 449 6273',
  addressHint: 'Envíos a domicilio y entregas personalizadas',
};
