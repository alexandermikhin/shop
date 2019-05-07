import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MinDateDirective } from './directives/min-date.directive';
import { ValidateAddressService } from './services/validate-address.service';

@NgModule({
  declarations: [MinDateDirective],
  providers: [ValidateAddressService],
  imports: [CommonModule],
  exports: [MinDateDirective]
})
export class ValidatorsModule {}
