import {
  ActivatedRouteSnapshot,
  Params,
  RouterStateSnapshot
} from '@angular/router';
import {
  routerReducer,
  RouterReducerState,
  RouterStateSerializer
} from '@ngrx/router-store';
import { ActionReducerMap } from '@ngrx/store';

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
  fragment: string;
}

export interface ShopRouterState {
  router: RouterReducerState<RouterStateUrl>;
}

export const routerReducers: ActionReducerMap<ShopRouterState> = {
  router: routerReducer
};

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    const { url } = routerState;
    const { queryParams } = routerState.root;
    let state: ActivatedRouteSnapshot = routerState.root;
    while (state.firstChild) {
      state = state.firstChild;
    }

    const { params, fragment } = state;

    return { url, queryParams, params, fragment };
  }
}

export const RouterStateSerializerProvider = {
  provide: RouterStateSerializer,
  useClass: CustomSerializer
};
