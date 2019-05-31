import { InjectionToken } from '@angular/core';
import { GeneratorService } from './generator.service';

export const Generator15 = new InjectionToken<string>('Generator15');

export function generatorFactory(n: number) {
  return (generatorService: GeneratorService): string => {
    return generatorService.getSequence(n);
  };
}
