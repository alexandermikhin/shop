import { Component, OnInit } from '@angular/core';
import { Order } from '../../models/order.model';
import { CartService } from 'src/app/cart/services/cart.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
})
export class OrderFormComponent implements OnInit {

  order: Order;
  totalSum: number;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    const cartItems = this.cartService.getItems().filter(item => item.quantity > 0);
    this.order = {
      cartItems,
      name: '',
      deliveryAddress: ''
    };

    this.totalSum = this.cartService.cartSum;
  }

  onProcessOrder() {
    console.log('Process order');
  }
}
