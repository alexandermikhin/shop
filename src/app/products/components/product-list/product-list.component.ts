import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/cart/services/cart.service';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, OnDestroy {
  products: Promise<ProductModel[]>;
  cartSum: number;
  isLoading = true;

  private subscription = new Subscription();

  constructor(
    private router: Router,
    private productsService: ProductsService,
    private cartService: CartService
  ) {
    this.initSubscription();
  }

  ngOnInit() {
    this.cartSum = this.cartService.cartSum;
    this.products = this.productsService.getProducts();
    this.products.finally(() => (this.isLoading = false));
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
