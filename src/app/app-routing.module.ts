import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartListComponent } from './cart/components/cart-list/cart-list.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { LoginComponent } from './components/login/login.component';
import { PathNotFoundComponent } from './components/path-not-found/path-not-found.component';
import { AuthGuard } from './core/guards/auth.guard';
import { OrderFormComponent } from './orders/components/order-form/order-form.component';

const routes: Routes = [
  { path: 'cart', component: CartListComponent },
  { path: 'order', component: OrderFormComponent },
  { path: 'contact-us', component: ContactUsComponent },
  {
    path: 'admin',
    canLoad: [AuthGuard],
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
  },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/products-list', pathMatch: 'full' },
  { path: '**', component: PathNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
