import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartListComponent } from './components/cart-list/cart-list.component';

@NgModule({
  declarations: [CartListComponent, CartItemComponent],
  imports: [CommonModule, FormsModule, RouterModule, SharedModule],
  exports: [CartListComponent]
})
export class CartModule {}
