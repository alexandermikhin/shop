import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MinDateDirective } from './directives/min-date.directive';

@NgModule({
  declarations: [MinDateDirective],
  imports: [CommonModule],
  exports: [MinDateDirective]
})
export class ValidatorsModule {}
