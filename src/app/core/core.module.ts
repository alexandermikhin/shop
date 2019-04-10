import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Generator15, generatorFactory } from './services/generator-factory';
import { GeneratorService } from './services/generator.service';

@NgModule({
  declarations: [],
  providers: [
    {
      provide: Generator15,
      useFactory: generatorFactory(15),
      deps: [GeneratorService]
    }
  ],
  imports: [CommonModule]
})
export class CoreModule {}
