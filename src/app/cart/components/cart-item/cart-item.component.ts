import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output
} from '@angular/core';
import { CartItem } from '../../models/cart-item.model';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CartItemComponent {
  @Input() item: CartItem;
  @Output() itemRemove = new EventEmitter<CartItem>();
  @Output() quantityChange = new EventEmitter<CartItem>();

  removeItem(item: CartItem) {
    this.itemRemove.emit(item);
  }

  changeQuantity(quantity: number) {
    const newQuantity = this.item.quantity + quantity;
    if (newQuantity >= 0) {
      this.quantityChange.emit({
        ...this.item,
        quantity: newQuantity
      });
    }
  }
}
