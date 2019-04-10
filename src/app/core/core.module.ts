import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConstantsService } from './services/constants.service';
import { Generator15, generatorFactory } from './services/generator-factory';
import { GeneratorService } from './services/generator.service';
import { constantsService } from './models/constants';


@NgModule({
  declarations: [],
  providers: [
    GeneratorService,
    { provide: ConstantsService, useValue: constantsService},
    {
      provide: Generator15,
      useFactory: generatorFactory(15),
      deps: [GeneratorService]
    }
  ],
  imports: [CommonModule]
})
export class CoreModule {}
