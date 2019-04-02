import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';
import { ActiveView } from 'src/app/models/active-view';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  @Output() viewChange = new EventEmitter<ActiveView>();
  items: CartItem[];

  constructor(private service: CartService) { }

  ngOnInit() {
    this.items = this.service.getItems();
  }

  emptyCart() {
    this.service.emptyCart();
    this.items = this.service.getItems();
  }

  removeItem(item: CartItem) {
    this.service.removeItem(item);
    this.items = this.service.getItems();
  }

  changeView() {
    this.viewChange.emit(ActiveView.productsList);
  }
}
