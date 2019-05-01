import { ProductModel } from 'src/app/products/models/product.model';

export interface ProductsState {
  data: ProductModel[];
  selectedProduct: ProductModel;
  loading: boolean;
  loaded: boolean;
  error: Error | string;
}

export const initialProductsState: ProductsState = {
  data: [],
  selectedProduct: null,
  loading: false,
  loaded: false,
  error: null
};
