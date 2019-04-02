import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActiveView } from 'src/app/models/active-view';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit {
  @Output() viewChange = new EventEmitter<ActiveView>();
  items: CartItem[];
  totalCount: number;
  totalSum: number;

  constructor(private service: CartService) { }

  ngOnInit() {
    this.updateView();
  }

  emptyCart() {
    this.service.emptyCart();
    this.updateView();
  }

  removeItem(item: CartItem) {
    this.service.removeItem(item);
    this.updateView();
  }

  changeQuantity(item: CartItem) {
    this.service.changeQuantity(item);
    this.updateView();
  }

  changeView() {
    this.viewChange.emit(ActiveView.productsList);
  }

  private updateView() {
    this.items = this.service.getItems();
    this.totalCount = this.service.getCartCount();
    this.totalSum = this.service.getCartSum();
  }
}
