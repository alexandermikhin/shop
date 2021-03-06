import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { CanComponentDeactivate } from 'src/app/core/interfaces/can-component-deactivate.interface';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Order } from 'src/app/orders/models/order.model';
import { OrderService } from 'src/app/orders/services/order.service';

@Component({
  selector: 'app-manage-order',
  templateUrl: './manage-order.component.html'
})
export class ManageOrderComponent
  implements OnInit, OnDestroy, CanComponentDeactivate {
  order: Order;
  originalOrder: Order;
  private sub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private dialogService: DialogService,
    private orderService: OrderService
  ) {}

  ngOnInit() {
    this.route.data.pipe(pluck('order')).subscribe((order: Order) => {
      this.order = { ...order };
      this.originalOrder = { ...order };
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  canDeactivate(): Promise<boolean> | boolean {
    const flags = Object.keys(this.originalOrder).map(key => {
      if (this.originalOrder[key] === this.order[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  onSave() {
    const order = { ...this.order };
    this.sub = this.orderService.editOrder(order).subscribe(o => {
      this.originalOrder = { ...o };
      this.order = { ...o };
      this.onGoBack();
    });
  }

  onGoBack() {
    this.location.back();
  }
}
