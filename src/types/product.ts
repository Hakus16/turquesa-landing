export type CategoryId = 'todos' | 'flores' | 'frutales' | 'geometricas' | 'vasos' | 'sets';

export interface Category {
  id: CategoryId;
  label: string;
}

export interface Aroma {
  id: string;
  name: string;
  description: string;
  intensity: 'Suave' | 'Media' | 'Intensa';
  mood: string;
  badgeBg: string;
}

export interface Product {
  id: string;
  name: string;
  size?: string;
  price: number;
  category: CategoryId;
  image: string;
  description?: string;
  badge?: string;
  inStock?: boolean;
}

export interface OrderStepItem {
  step: number;
  title: string;
  description: string;
  detail: string;
  badgeText: string;
}
