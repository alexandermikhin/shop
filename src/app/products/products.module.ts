import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FeedbacksModule } from '../feedbacks/feedbacks.module';
import { SharedModule } from '../shared/shared.module';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  imports: [CommonModule, SharedModule, FeedbacksModule, ProductsRoutingModule],
  declarations: [
    ProductComponent,
    ProductListComponent,
    ProductDetailsComponent
  ],
  exports: [ProductListComponent]
})
export class ProductsModule {}
