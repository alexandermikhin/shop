import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { ActiveView } from 'src/app/models/active-view';
import { CartItem } from '../../models/cart-item.model';
import { CartService } from '../../services/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit, OnDestroy {
  @Output() viewChange = new EventEmitter<ActiveView>();
  items: CartItem[];
  totalCount: number;
  totalSum: number;

  private subscription = new Subscription();

  constructor(private service: CartService) {
    this.initSubscription();
  }

  ngOnInit() {
    this.totalCount = this.service.cartCount;
    this.totalSum = this.service.cartSum;
    this.items = this.service.getItems();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  emptyCart() {
    this.service.emptyCart();
  }

  removeItem(item: CartItem) {
    this.service.removeItem(item);
  }

  changeQuantity(item: CartItem) {
    this.service.changeQuantity(item);
  }

  changeView() {
    this.viewChange.emit(ActiveView.productsList);
  }

  private initSubscription() {
    this.subscription.add(
      this.service.itemsChanged.subscribe(items => (this.items = items))
    );

    this.subscription.add(
      this.service.cartSumChanged.subscribe(sum => (this.totalSum = sum))
    );

    this.subscription.add(
      this.service.cartCountChanged.subscribe(
        count => (this.totalCount = count)
      )
    );
  }
}
