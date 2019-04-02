import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ActiveView } from 'src/app/models/active-view';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  @Output() viewChange = new EventEmitter<ActiveView>();
  products: ProductModel[];
  cartSum: number;

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.products = this.productsService.getProducts();
    this.cartSum = this.cartService.getCartSum();
  }

  onBuy(product: ProductModel) {
    this.cartService.addToCart({
      name: product.name,
      price: product.price,
      quantity: 1
    });

    this.cartSum = this.cartService.getCartSum();
  }

  changeView() {
    this.viewChange.emit(ActiveView.cart);
  }
}
