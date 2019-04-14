import { Product } from './product';

export class ProductModel implements Product {
  name: string;
  description: string;
  price: number;
  category: string;
  isAvailable: boolean;
  updateDate: Date;
  suppliers: string[];
}
