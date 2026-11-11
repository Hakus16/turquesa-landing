import type { Aroma } from '../types/product';

export const AROMAS: Aroma[] = [
  {
    id: 'coco',
    name: 'Coco',
    description: 'Notas dulces, tropicales y envolventes que transportan a una playa serena bajo el sol.',
    intensity: 'Media',
    mood: 'Relajante & Exótico',
    badgeBg: 'bg-amber-100 text-amber-800 border-amber-200'
  },
  {
    id: 'lavanda',
    name: 'Lavanda',
    description: 'Aroma floral aromático  ideales para el descanso y la meditación nocturna.',
    intensity: 'Media',
    mood: 'Paz & Desconexión',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  {
    id: 'naranja',
    name: 'Naranja',
    description: 'Explosión cítrica luminosa que revitaliza el ánimo, aclara la mente y purifica el ambiente.',
    intensity: 'Media',
    mood: 'Energía & Alegría',
    badgeBg: 'bg-orange-100 text-orange-800 border-orange-200'
  },
  {
    id: 'maracuya',
    name: 'Maracuyá',
    description: 'Fragancia tropical ácida y fresca, llena de vitalidad veraniega y sofisticación frutal.',
    intensity: 'Media',
    mood: 'Vitalidad & Frescura',
    badgeBg: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  {
    id: 'cafe',
    name: 'Café',
    description: 'El abrazo perfecto para tardes lluviosas.',
    intensity: 'Media',
    mood: 'Acogedor & Confort',
    badgeBg: 'bg-stone-200 text-stone-800 border-stone-300'
  },
  {
    id: 'fresas-chocolate',
    name: 'Fresas con chocolate',
    description: 'Combinación de frutos rojos dulces y cacao cremoso. Un capricho sensorial.',
    intensity: 'Media',
    mood: 'Romance & Dulzura',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-200'
  },
  {
    id: 'eucalipto',
    name: 'Eucalipto',
    description: 'Sensación botánica que abre las vías respiratorias y renueva el aire con frescor verde.',
    intensity: 'Suave',
    mood: 'Claridad & Bienestar',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200'
  }
];
