import type { Product } from './product';

export interface CartItem {
  id: string; // unique item hash or id
  product: Product;
  aroma: string;
  color: string;
  quantity: number;
  notes?: string;
  unitPrice: number;
}
