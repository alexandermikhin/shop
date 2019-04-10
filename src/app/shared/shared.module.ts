import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightDirective } from './directives/highlight.directive';
import { BorderDirective } from './directives/border.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [HighlightDirective, BorderDirective],
  exports: [HighlightDirective, BorderDirective]
})
export class SharedModule {}
