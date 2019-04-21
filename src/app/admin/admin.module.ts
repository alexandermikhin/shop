import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AdminComponent } from '../admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';

@NgModule({
  imports: [CommonModule, AdminRoutingModule],
  declarations: [
    AdminDashboardComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    AdminComponent,
    ManageOrderComponent,
    ManageProductComponent
  ]
})
export class AdminModule {}
