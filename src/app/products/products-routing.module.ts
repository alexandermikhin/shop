import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FeedbacksComponent } from '../feedbacks/components/feedbacks/feedbacks.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductListComponent } from './components/product-list/product-list.component';

const routes: Routes = [
  { path: 'products-list', component: ProductListComponent },
  {
    path: 'product/:productID',
    component: ProductDetailsComponent
    /* children: [
      { path: 'feedback', component: FeedbacksComponent, outlet: 'feedback' }
    ] */
  },
  { path: 'feedback', component: FeedbacksComponent, outlet: 'feedback' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}
