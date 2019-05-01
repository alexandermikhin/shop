import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { constantsService } from './models/constants';
import {
  AppSettings$,
  appSettingsFactory
} from './services/app-settings-factory';
import { AppSettingsService } from './services/app-settings.service';
import { ConstantsService } from './services/constants.service';
import { Generator15, generatorFactory } from './services/generator-factory';
import { GeneratorService } from './services/generator.service';
import { JsonServerClientService } from './services/json-server-client.service';
import { JsonServerApiProvider } from './services/json-server.config';
import { LocalStorageService } from './services/local-storage.service';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  declarations: [],
  providers: [
    AppSettingsService,
    GeneratorService,
    LocalStorageService,
    JsonServerClientService,
    JsonServerApiProvider,
    { provide: ConstantsService, useValue: constantsService },
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
  ]
})
export class CoreModule {}
