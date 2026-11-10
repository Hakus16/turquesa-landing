export interface CandleColor {
  id: string;
  name: string;
  hex: string;
  borderClass?: string;
  textColorClass?: string;
}

export const CANDLE_COLORS: CandleColor[] = [
  { id: 'blanco', name: 'Blanco', hex: '#FFFFFF', borderClass: 'border-[#D8CEBE]' },
  { id: 'rosado', name: 'Rosado', hex: '#F472B6', borderClass: 'border-pink-300' },
  { id: 'rojo', name: 'Rojo', hex: '#DC2626', borderClass: 'border-red-400' },
  { id: 'naranja', name: 'Naranja', hex: '#F97316', borderClass: 'border-orange-400' },
  { id: 'amarillo', name: 'Amarillo', hex: '#FBBF24', borderClass: 'border-amber-300' },
  { id: 'verde', name: 'Verde', hex: '#16A34A', borderClass: 'border-emerald-400' },
  { id: 'azul', name: 'Azul', hex: '#2563EB', borderClass: 'border-blue-400' },
  { id: 'negro', name: 'Negro', hex: '#1C1917', borderClass: 'border-stone-800' },
];
