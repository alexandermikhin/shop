import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';

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
              { path: 'edit/:productID', component: ManageProductComponent }
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
