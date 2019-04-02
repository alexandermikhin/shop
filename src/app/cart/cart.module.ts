import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CartListComponent } from './components/cart-list/cart-list.component';

@NgModule({
  declarations: [CartListComponent],
  imports: [CommonModule],
  exports: [CartListComponent]
})
export class CartModule {}
