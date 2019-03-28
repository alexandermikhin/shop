import { Component, OnInit } from "@angular/core";
import { ProductModel } from "src/app/models/product.model";
import { ProductsService } from "src/app/services/products.service";
import { CartService } from "src/app/services/cart.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.css"]
})
export class ProductListComponent implements OnInit {
  products: ProductModel[];

  constructor(
    private productsService: ProductsService,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.products = this.productsService.getProducts();
  }

  onBuy(product: ProductModel) {
    this.cartService.addToCart({
      name: product.name,
      price: product.price,
      quantity: 1
    });
  }
}
