import { Category } from './category';

export interface Product {
  name: string;
  description: string;
  price: number;
  category: Category;
  isAvailable: boolean;
}
