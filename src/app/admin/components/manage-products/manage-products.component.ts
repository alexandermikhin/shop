import { Component, OnInit } from '@angular/core';
import { ProductModel } from 'src/app/products/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html',
})
export class ManageProductsComponent implements OnInit {

  products: ProductModel[];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
    this.initProducts();
  }

  onEdit(product: ProductModel) {
    
  }

  async onDelete(product: ProductModel) {
    await this.productsService.deleteProduct(product.id);
    this.initProducts();
  }

  private async initProducts() {
    this.products = await this.productsService.getProducts();
  }

}
