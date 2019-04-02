import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsService } from './services/products.service';

@NgModule({
  declarations: [ProductComponent, ProductListComponent],
  imports: [CommonModule],
  providers: [ProductsService],
  exports: [ProductListComponent]
})
export class ProductsModule {}
