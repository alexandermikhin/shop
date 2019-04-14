import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BorderDirective } from './directives/border.directive';
import { HighlightDirective } from './directives/highlight.directive';
import { OrderByPipe } from './pipes/order-by.pipe';

const exportedDeclarations = [HighlightDirective, BorderDirective, OrderByPipe];

@NgModule({
  imports: [CommonModule],
  declarations: [...exportedDeclarations],
  exports: [...exportedDeclarations]
})
export class SharedModule {}
