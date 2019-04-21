import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/cart/services/cart.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Order } from '../../models/order.model';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html'
})
export class OrderFormComponent implements OnInit {
  order: Order;
  totalSum: number;

  constructor(
    private cartService: CartService,
    private dialogService: DialogService,
    private router: Router
  ) {}

  ngOnInit() {
    const cartItems = this.cartService
      .getItems()
      .filter(item => item.quantity > 0);
    this.order = {
      cartItems,
      name: '',
      deliveryAddress: ''
    };

    this.totalSum = this.cartService.cartSum;
  }

  onProcessOrder() {
    console.log('Process order');
    this.cartService.emptyCart();
    this.router.navigate(['/products-list']);
  }

  async cancelOrder() {
    const result = await this.dialogService.confirm('Cancel order?');
    if (result) {
      this.cartService.emptyCart();
      this.router.navigate(['/products-list']);
    }
  }
}
