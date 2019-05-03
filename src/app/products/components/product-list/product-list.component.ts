import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { CartService } from 'src/app/cart/services/cart.service';
import { AppState } from 'src/app/core/state/app.state';
import * as act from 'src/app/core/state/products/products.actions';
import { getProductsState } from 'src/app/core/state/products/products.selectors';
import { ProductsState } from 'src/app/core/state/products/products.state';
import { ProductModel } from '../../models/product.model';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  cartSum: number;
  isLoading = true;
  productsState$: Observable<ProductsState>;

  private subscription = new Subscription();

  constructor(
    private router: Router,
    private cartService: CartService,
    private store: Store<AppState>
  ) {
    this.initSubscription();
  }

  ngOnInit() {
    this.cartSum = this.cartService.cartSum;
    this.productsState$ = this.store.pipe(select(getProductsState));
    this.store.dispatch(new act.GetProducts());
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onBuy(product: ProductModel) {
    this.cartService.addToCart({
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }

  onSeeDetails(product: ProductModel) {
    const link = ['/product', product.id];
    this.router.navigate(link);
  }

  private initSubscription() {
    this.subscription.add(
      this.cartService.cartSumChanged.subscribe(sum => (this.cartSum = sum))
    );
  }
}
