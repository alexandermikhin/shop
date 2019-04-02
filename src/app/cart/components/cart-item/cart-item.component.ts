import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css']
})
export class CartItemComponent {
  @Input() item: CartItem;
  @Output() itemRemove = new EventEmitter<CartItem>();

  removeItem(item: CartItem) {
    this.itemRemove.emit(item);
  }
}
