import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderService } from './services/order.service';

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],
  declarations: [OrderFormComponent],
  providers: [OrderService],
  exports: [OrderFormComponent]
})
export class OrdersModule {}
