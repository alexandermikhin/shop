import { CartItem } from 'src/app/cart/models/cart-item.model';

export interface Order {
  id: number;
  cartItems: CartItem[];
  date: string;
  name: string;
  phone: string;
  shouldDeliver?: boolean;
  deliveryAddress?: string;
  email?: string;
  remark?: string;
}
