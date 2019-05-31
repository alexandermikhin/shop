import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { RouterEffects } from './router/router.effects';
import {
  routerReducers,
  RouterStateSerializerProvider
} from './router/router.state';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forRoot(routerReducers),
    StoreRouterConnectingModule.forRoot(),
    EffectsModule.forRoot([RouterEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : []
  ],
  providers: [RouterStateSerializerProvider]
})
export class CoreStoreModule {}
