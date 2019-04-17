import { Product } from './product';

export class ProductModel implements Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  isAvailable: boolean;
  updateDate: Date;
  suppliers: string[];
}
