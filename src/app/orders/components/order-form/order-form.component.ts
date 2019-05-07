import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CartItem } from 'src/app/cart/models/cart-item.model';
import { CartService } from 'src/app/cart/services/cart.service';
import { getIsoDate } from 'src/app/core/helpers/date.helper';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AppState } from 'src/app/core/state/app.state';
import { Go } from 'src/app/core/state/router/router.actions';
import { CustomValidators } from 'src/app/validators/custom.validators';
import { ValidateAddressService } from 'src/app/validators/services/validate-address.service';
import { VALIDATION_MESSAGES } from '../../constants/validation-messages';
import { DeliveryType, Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit, OnDestroy {
  cartItems: CartItem[];
  totalSum: number;
  orderForm: FormGroup;
  DeliveryType = DeliveryType;
  private readonly emailPattern = '[a-z0-9._%+-]+@[a-z0-9.-]+';
  private sub: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private dialogService: DialogService,
    private orderService: OrderService,
    private validateAddressService: ValidateAddressService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.cartItems = this.cartService
      .getItems()
      .filter(item => item.quantity > 0);

    this.buildForm();
    this.watchDeliveryTypeChange();
    this.onDeliveryTypeChange(DeliveryType.byAddress);
    this.totalSum = this.cartService.cartSum;
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get phones(): FormArray {
    return this.orderForm.get('phones') as FormArray;
  }

  onProcessOrder() {
    console.log('Process order');
    const order: Order = {
      id: 0,
      cartItems: this.cartItems,
      date: getIsoDate(new Date()),
      name: this.orderForm.get('name').value,
      phones: this.phones.controls.map(c => c.value),
      deliveryAddress: this.orderForm.get('deliveryAddress').value,
      deliveryDate: this.orderForm.get('deliveryDate').value,
      deliveryType: this.orderForm.get('deliveryType').value,
      email: this.orderForm.get('email').value,
      remark: this.orderForm.get('remark').value
    };

    this.sub.add(
      this.orderService.addOrder(order).subscribe(() => {
        this.cartService.emptyCart();
        this.store.dispatch(new Go({ path: ['/products-list'] }));
      })
    );
  }

  onAddPhone() {
    this.phones.push(this.buildPhoneFormControl());
  }

  onRemovePhone(index: number) {
    this.phones.removeAt(index);
  }

  async cancelOrder() {
    const result = await this.dialogService.confirm('Cancel order?');
    if (result) {
      this.cartService.emptyCart();
      this.store.dispatch(new Go({ path: ['/products-list'] }));
    }
  }

  controlIsInvalid(control: FormControl): boolean {
    return (control.touched || control.dirty) && control.invalid;
  }

  controlHasErrors(control: FormControl): boolean {
    return (control.touched || control.dirty) && !!control.errors;
  }

  getControlErrorMessages(
    control: FormControl,
    section: string
  ): string[] | undefined {
    let messages: string[];
    if (control.errors) {
      messages = Object.keys(control.errors).map(
        error => VALIDATION_MESSAGES[section][error]
      );
    }

    return messages;
  }

  private onDeliveryTypeChange(type: DeliveryType) {
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
        deliveryAddressControl.setAsyncValidators([
          CustomValidators.validAddress(this.validateAddressService)
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
      name: new FormControl('', {
        validators: [Validators.required],
        updateOn: 'blur'
      }),
      phones: this.fb.array([this.buildPhoneFormControl()]),
      deliveryType: DeliveryType.byAddress,
      deliveryAddress: new FormControl('', { updateOn: 'blur' }),
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

  private watchDeliveryTypeChange() {
    this.sub.add(
      this.orderForm
        .get('deliveryType')
        .valueChanges.subscribe((type: DeliveryType) =>
          this.onDeliveryTypeChange(type)
        )
    );
  }

  private buildPhoneFormControl(): FormControl {
    return new FormControl('', {
      validators: [Validators.required, Validators.maxLength(50)]
    });
  }
}
