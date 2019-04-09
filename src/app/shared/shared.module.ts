import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HighlightDirective } from './directives/highlight.directive';
import { ConstantsService } from './services/constants.service';

const constantsService: ConstantsService = {
  app: 'Shop',
  ver: '1.0'
};

@NgModule({
  imports: [CommonModule],
  declarations: [HighlightDirective],
  providers: [{ provide: ConstantsService, useValue: constantsService}],
  exports: [HighlightDirective]
})
export class SharedModule {}
