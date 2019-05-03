import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from './products.state';
import { getRouterState } from '../router/router.selectors';
import { ProductModel } from 'src/app/products/models/product.model';

export const getProductsState = createFeatureSelector<ProductsState>(
  'products'
);

export const getProducts = createSelector(
  getProductsState,
  state => state.data
);

export const getSelectedProduct = createSelector(
  getProductsState,
  state => state.selectedProduct
);

export const getProductsLoading = createSelector(
  getProductsState,
  state => state.loading
);

export const getProductEditComplete = createSelector(
  getProductsState,
  state => state.editComplete
);

export const getProductByUrl = createSelector(
  getProducts,
  getRouterState,
  (products, router): ProductModel => {
    const taskID = router.state.params.taskID;
    return taskID ? products.find(p => p.id === +taskID) : new ProductModel();
  }
);
