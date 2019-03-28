import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private items: CartItem[] = [];

  constructor() { }

  getItems(): CartItem[] {
    return this.items;
  }

  addToCart(item: CartItem) {
    const cartItem = this.items.find(i => i.name === item.name);
    if (!cartItem) {
      this.items.push(item);
    } else {
      cartItem.quantity += item.quantity;
    }
  }

  emptyCart() {
    this.items = [];
  }

  removeItem(item: CartItem) {
    const cartItemIndex = this.items.findIndex(i => i.name === item.name);
    if (cartItemIndex !== -1) {
      this.items.splice(cartItemIndex, 1);
    }
  }
}
