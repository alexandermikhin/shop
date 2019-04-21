import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DialogService } from 'src/app/core/services/dialog.service';
import { SortOption } from 'src/app/shared/pipes/order-by.pipe';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit, OnDestroy {
  items: CartItem[];
  totalCount: number;
  totalSum: number;
  selectedSorting: SortOption = 'name';
  isDescending = false;

  private subscription = new Subscription();

  constructor(
    private cartService: CartService,
    private dialogService: DialogService
  ) {
    this.initSubscription();
  }

  ngOnInit() {
    this.totalCount = this.cartService.cartCount;
    this.totalSum = this.cartService.cartSum;
    this.items = this.cartService.getItems();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  emptyCart() {
    this.dialogService.confirm('Should empty cart?').then(result => {
      if (result) {
        this.cartService.emptyCart();
      }
    });
  }

  removeItem(item: CartItem) {
    this.cartService.removeItem(item);
  }

  changeQuantity(item: CartItem) {
    this.cartService.updateCartItem(item);
  }

  private initSubscription() {
    this.subscription.add(
      this.cartService.itemsChanged.subscribe(items => (this.items = items))
    );

    this.subscription.add(
      this.cartService.cartSumChanged.subscribe(sum => (this.totalSum = sum))
    );

    this.subscription.add(
      this.cartService.cartCountChanged.subscribe(
        count => (this.totalCount = count)
      )
    );
  }
}
