import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from 'src/app/orders/models/order.model';
import { OrderService } from 'src/app/orders/services/order.service';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html'
})
export class ManageOrdersComponent implements OnInit {
  orders$: Observable<Order[]>;

  constructor(private orderService: OrderService) {}

  ngOnInit() {
    this.initOrders();
  }

  onDelete(order: Order) {
    this.orderService.deleteOrder(order.id);
    this.initOrders();
  }

  private initOrders() {
    this.orders$ = this.orderService.getOrders();
  }
}
