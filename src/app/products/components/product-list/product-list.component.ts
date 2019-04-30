import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { CartService } from 'src/app/cart/services/cart.service';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';
import { AppState } from 'src/app/core/state/app.state';
import { Store, select } from '@ngrx/store';
import { ProductsState } from 'src/app/core/state/products/products.state';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Promise<ProductModel[]>;
  cartSum: number;
  isLoading = true;
  productsState$: Observable<ProductsState>;

  private subscription = new Subscription();

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private cartService: CartService,
    private store: Store<AppState>
  ) {
    this.initSubscription();
  }

  ngOnInit() {
    this.cartSum = this.cartService.cartSum;
    this.productsState$ = this.store.pipe(select('products'));
    // this.products = this.productsService.getProducts();
    // this.products.finally(() => (this.isLoading = false));
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
