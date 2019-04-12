import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';

@NgModule({
  declarations: [ProductComponent, ProductListComponent],
  imports: [CommonModule, SharedModule],
  exports: [ProductListComponent]
})
export class ProductsModule {}
