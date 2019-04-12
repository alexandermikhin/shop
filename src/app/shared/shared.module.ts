import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightDirective } from './directives/highlight.directive';
import { BorderDirective } from './directives/border.directive';

const exportedDeclarations = [HighlightDirective, BorderDirective];

@NgModule({
  imports: [CommonModule],
  declarations: [...exportedDeclarations],
  exports: [...exportedDeclarations]
})
export class SharedModule {}
