import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AdminComponent } from '../admin/admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ManageOrderComponent } from './components/manage-order/manage-order.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';
import { ManageProductComponent } from './components/manage-product/manage-product.component';
import { ManageProductsComponent } from './components/manage-products/manage-products.component';
import { OrderResolveGuard } from './guards/order-resolve-guard';
import { ProductResolveGuard } from './guards/product-resolve.guard';

@NgModule({
  imports: [CommonModule, FormsModule, AdminRoutingModule],
  declarations: [
    AdminDashboardComponent,
    ManageProductsComponent,
    ManageOrdersComponent,
    AdminComponent,
    ManageOrderComponent,
    ManageProductComponent
  ],
  providers: [ProductResolveGuard, OrderResolveGuard]
})
export class AdminModule {}
