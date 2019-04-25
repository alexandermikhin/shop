import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConstantsService } from './services/constants.service';
import { Generator15, generatorFactory } from './services/generator-factory';
import { GeneratorService } from './services/generator.service';
import { constantsService } from './models/constants';
import { AppSettingsService } from './services/app-settings.service';
import { LocalStorageService } from './services/local-storage.service';
import { AppSettings$, appSettingsFactory } from './services/app-settings-factory';
import { JsonServerClientService } from './services/json-server-client.service';


@NgModule({
  declarations: [],
  providers: [
    AppSettingsService,
    GeneratorService,
    LocalStorageService,
    JsonServerClientService,
    { provide: ConstantsService, useValue: constantsService},
    {
      provide: Generator15,
      useFactory: generatorFactory(15),
      deps: [GeneratorService]
    },
    {
      provide: AppSettings$,
      useFactory: appSettingsFactory(),
      deps: [AppSettingsService]
    }
  ],
  imports: [CommonModule]
})
export class CoreModule {}
