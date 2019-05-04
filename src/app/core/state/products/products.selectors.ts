import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductModel } from 'src/app/products/models/product.model';
import { getRouterState } from '../router/router.selectors';
import { ProductsState } from './products.state';

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
    const productId = router.state.params.productID;
    const product = products.find(p => p.id === +productId);
    return product || new ProductModel();
  }
);
