import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { AdminComponent } from '../admin/admin.component';

@NgModule({
  declarations: [AdminDashboardComponent, ManageProductsComponent, ManageOrdersComponent, AdminComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
