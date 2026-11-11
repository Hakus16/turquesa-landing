import type { Product, Category } from '../types/product';

export const CATEGORIES: Category[] = [
  { id: 'todos', label: 'Todos los Diseños' },
  { id: 'flores', label: 'Florales' },
  { id: 'frutales', label: 'Frutales' },
  { id: 'geometricas', label: 'Figuras & Siluetas' },
  { id: 'vasos', label: 'En Vaso' },
  { id: 'sets', label: 'Sets & Colecciones' },
];

export const PRODUCTS: Product[] = [
  {
    id: 'margaritas',
    name: 'Margaritas',
    size: 'Pequeñas',
    price: 3000,
    category: 'flores',
    image: '/images/margaritas.png',
    description: 'Velas individuales en forma de margarita con centro detallado. Ideales para recuerdos y detalles especiales.',
    inStock: true
  },
  {
    id: 'nube',
    name: 'Nube Minimalista',
    size: '5 cm',
    price: 5000,
    category: 'geometricas',
    image: '/images/nube.png',
    description: 'Diseño suave y esponjoso en forma de nube. Un acento relajante y tierno para tu mesa de noche o escritorio.',
    inStock: true
  },
  {
    id: 'mariposa',
    name: 'Mariposa Delicada',
    size: '5 cm',
    price: 7000,
    category: 'geometricas',
    image: '/images/mariposa.png',
    description: 'Silueta de mariposa con finas ranuras geométricas en sus alas. Disponible en tonos cálidos y pasteles.',
    inStock: true
  },
  {
    id: 'rosa',
    name: 'Rosa Esculpida',
    size: 'Pequeña - 4 cm',
    price: 7000,
    category: 'flores',
    image: '/images/rosa.png',
    description: 'Floración tridimensional de pétalos superpuestos con texturas hiperrealistas. Elegancia atemporal.',
    inStock: true
  },
  {
    id: 'mandarina-pequena',
    name: 'Mandarina Pequeña',
    size: '4 cm',
    price: 8000,
    category: 'frutales',
    image: '/images/mandarina-pequena.png',
    description: 'Vela artesanal con textura de cáscara de cítrico y hoja decorativa. Llena de frescura visual.',
    inStock: true
  },
  {
    id: 'cruz',
    name: 'Cruz Escultural',
    size: '10 cm',
    price: 10000,
    category: 'geometricas',
    image: '/images/cruz.png',
    description: 'Diseño arquitectónico sagrado y solemne con acabado satinado. Perfecta para momentos de reflexión y serenidad.',
    inStock: true
  },
  {
    id: 'copo-nieve',
    name: 'Copo de Nieve / Espiral',
    size: '6 cm',
    price: 12000,
    category: 'geometricas',
    image: '/images/copo-nieve.png',
    description: 'Escultura helicoidal con curvas dinámicas que generan sombras fascinantes al estar encendida.',
    inStock: true
  },
  {
    id: 'cuadrado-corazones',
    name: 'Cuadrado de Corazones',
    size: '5 cm x 5 cm',
    price: 15000,
    category: 'geometricas',
    image: '/images/cuadrado-corazones.png',
    description: 'Cubocúbico compuesto por esferas de corazones entrelazadas. La pieza viral indispensable para estética aesthetic.',
    inStock: true
  },
  {
    id: 'vasito',
    name: 'Vasito Personalizado',
    price: 15000,
    category: 'vasos',
    image: '/images/vasito.png',
    description: 'Vela vertida en vaso de vidrio reutilizable con color y esencia a elección. (Sujeto a disponibilidad).',
    inStock: true
  },
  {
    id: 'mandarina-grande',
    name: 'Mandarina Grande',
    size: '8 cm',
    price: 17000,
    category: 'frutales',
    image: '/images/mandarina-grande.png',
    description: 'Tamaño generoso con textura botánica hiperrealista. Un punto focal alegre y vibrante en cualquier habitación.',
    inStock: true
  },
  {
    id: 'postres',
    name: 'Postres Gourmet en Vaso',
    price: 20000,
    category: 'vasos',
    image: '/images/postres.png',
    description: 'Vaso relleno de cera con cera batida decorada con corazones y tabletas de chocolate artesanales. (Sujeto a disponibilidad).',
    badge: 'Edición Gourmet',
    inStock: true
  },
  {
    id: 'arcos-set',
    name: 'Arcos  (Set x3)',
    size: '8 cm - 7 cm - 6 cm',
    price: 20000,
    category: 'sets',
    image: '/images/arcos.png',
    description: 'Trilogía de arcos acanalados en tres alturas armoniosas. Moderna ideales para repisas y mesas de centro.',
    inStock: true
  }
];
