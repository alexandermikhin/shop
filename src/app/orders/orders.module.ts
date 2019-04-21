import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderService } from './services/order.service';

@NgModule({
  imports: [CommonModule],
  declarations: [OrderFormComponent],
  providers: [OrderService],
  exports: [OrderFormComponent]
})
export class OrdersModule { }
