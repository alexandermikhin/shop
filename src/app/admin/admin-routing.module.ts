import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';
import { CanDeactivateGuard } from '../core/guards/can-deactivate.guard';
import { ProductResolveGuard } from './guards/product-resolve.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        children: [
          { path: 'products', component: ManageProductsComponent },
          {
            path: 'product',
            children: [
              { path: 'add', component: ManageProductComponent },
              {
                path: 'edit/:productID',
                component: ManageProductComponent,
                canDeactivate: [CanDeactivateGuard],
                resolve: {
                  product: ProductResolveGuard
                }
              }
            ]
          },
          { path: 'orders', component: ManageOrdersComponent },
          {
            path: 'order',
            children: [
              { path: 'edit/:orderID', component: ManageOrderComponent }
            ]
          },
          { path: '', component: AdminDashboardComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
