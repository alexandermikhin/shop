import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart/services/cart.service';
import { getIsoDate } from 'src/app/core/helpers/date.helper';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AppState } from 'src/app/core/state/app.state';
import { Go } from 'src/app/core/state/router/router.actions';
import { CustomValidators } from 'src/app/core/validators/custom.validators';
import { DeliveryType, Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html'
})
export class OrderFormComponent implements OnInit, OnDestroy {
  order: Order;
  totalSum: number;
  orderForm: FormGroup;
  DeliveryType = DeliveryType;
  private readonly emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+';
  private addOrderSub: Subscription;

  constructor(
    private fb: FormBuilder,
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
      date: getIsoDate(new Date()),
      name: '',
      phone: '',
      deliveryType: DeliveryType.byAddress
    };

    this.buildForm();
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

  controlIsInvalid(name: string): boolean {
    const control = this.orderForm.get(name);
    return (control.touched || control.dirty) && control.invalid;
  }

  controlHasErrors(name: string): boolean {
    const control = this.orderForm.get(name);
    return (control.touched || control.dirty) && !!control.errors;
  }

  onDeliveryTypeChange(type: DeliveryType) {
    const deliveryAddressControl = this.orderForm.get('deliveryAddress');
    switch (type) {
      case DeliveryType.self:
        deliveryAddressControl.clearValidators();
        break;
      case DeliveryType.byAddress:
        deliveryAddressControl.setValidators([
          Validators.required,
          Validators.maxLength(100)
        ]);
        break;
      default:
        break;
    }

    deliveryAddressControl.updateValueAndValidity();
  }

  private createForm() {
    this.orderForm = new FormGroup({
      name: new FormControl(),
      phone: new FormControl(),
      shouldDeliver: new FormControl(),
      deliveryAddress: new FormControl(),
      email: new FormControl(),
      remark: new FormControl()
    });
  }

  private buildForm() {
    const deliveryDate = this.getDeliveryDate();
    this.orderForm = this.fb.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.maxLength(50)]],
      deliveryType: DeliveryType.byAddress,
      deliveryAddress: '',
      deliveryDate: [
        getIsoDate(deliveryDate),
        [Validators.required, CustomValidators.minDate(deliveryDate)]
      ],
      email: [
        '',
        [Validators.maxLength(50), Validators.pattern(this.emailPattern)]
      ],
      remark: ['', [Validators.maxLength(1000)]]
    });
  }

  private getDeliveryDate(): Date {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 3);
    deliveryDate.setHours(0, 0, 0, 0);

    return deliveryDate;
  }
}
