import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { ProductsService } from 'src/app/products/services/products.service';
import * as act from './products.actions';

@Injectable()
export class ProductsEffects {
  constructor(
    private actions$: Actions,
    private productsService: ProductsService
  ) {}

  @Effect()
  getProducts$: Observable<Action> = this.actions$.pipe(
    ofType<act.GetProducts>(act.GET_PRODUCTS),
    switchMap(() =>
      this.productsService
        .getProducts()
        .then(products => new act.GetProductsSuccess(products))
        .catch(err => new act.GetProductsError(err))
    )
  );

  @Effect()
  getProduct$: Observable<Action> = this.actions$.pipe(
    ofType<act.GetProduct>(act.GET_PRODUCT),
    switchMap(action =>
      this.productsService
        .getProduct(action.payload)
        .then(product => new act.GetProductSuccess(product))
        .catch(err => new act.GetProductError(err))
    )
  );
}
