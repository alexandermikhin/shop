import { Component, OnInit } from '@angular/core';
import { CartItem } from 'src/app/models/cart-item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

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

}
