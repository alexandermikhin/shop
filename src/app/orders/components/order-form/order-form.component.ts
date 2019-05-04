import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart/services/cart.service';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AppState } from 'src/app/core/state/app.state';
import { Go } from 'src/app/core/state/router/router.actions';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html'
})
export class OrderFormComponent implements OnInit, OnDestroy {
  order: Order;
  totalSum: number;
  private addOrderSub: Subscription;

  constructor(
    private cartService: CartService,
    private dialogService: DialogService,
    private orderService: OrderService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    const cartItems = this.cartService
      .getItems()
      .filter(item => item.quantity > 0);
    this.order = {
      id: 0,
      cartItems,
      date: new Date().toISOString(),
      name: '',
      deliveryAddress: ''
    };

    this.totalSum = this.cartService.cartSum;
  }

  ngOnDestroy() {
    if (this.addOrderSub) {
      this.addOrderSub.unsubscribe();
    }
  }

  onProcessOrder() {
    console.log('Process order');
    this.addOrderSub = this.orderService.addOrder(this.order).subscribe(() => {
      this.cartService.emptyCart();
      this.store.dispatch(new Go({ path: ['/products-list'] }));
    });
  }

  async cancelOrder() {
    const result = await this.dialogService.confirm('Cancel order?');
    if (result) {
      this.cartService.emptyCart();
      this.store.dispatch(new Go({ path: ['/products-list'] }));
    }
  }
}
