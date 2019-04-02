import { Product } from './product';
import { Category } from './category';

export class ProductModel implements Product {
  name: string;
  description: string;
  price: number;
  category: Category;
  isAvailable: boolean;
  suppliers: string[];
}
