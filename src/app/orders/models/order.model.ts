import { CartItem } from 'src/app/cart/models/cart-item.model';

export interface Order {
  cartItems: CartItem[];
  name: string;
  deliveryAddress: string;
}
