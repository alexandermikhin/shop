import { Action } from '@ngrx/store';
import { ProductModel } from 'src/app/products/models/product.model';

export const GET_PRODUCTS = '[Products] - Get products';
export const GET_PRODUCTS_SUCCESS = '[Products] - Get products success';
export const GET_PRODUCTS_ERROR = '[Products] - Get products error';
export const GET_PRODUCT = '[Products] - Get product';
export const GET_PRODUCT_SUCCESS = '[Products] - Get product success';
export const GET_PRODUCT_ERROR = '[Products] - Get product error';
export const ADD_PRODUCT = '[Products] - Add product';
export const EDIT_PRODUCT = '[Products] - Edit product';
export const DELETE_PRODUCT = '[Products] - Delete product';

export class GetProducts implements Action {
  type = GET_PRODUCTS;
}

export class GetProductsSuccess implements Action {
  type = GET_PRODUCTS_SUCCESS;
  constructor(public payload: ProductModel[]){}
}

export class GetProductsError implements Action {
  type = GET_PRODUCTS_ERROR;
  constructor(public payload: Error | string) {}
}

export class GetProduct implements Action {
  type = GET_PRODUCT;
  constructor(public payload: number) {}
}

export class GetProductSuccess implements Action {
  type = GET_PRODUCT_SUCCESS;
  constructor(public payload: ProductModel){}
}

export class GetProductError implements Action {
  type = GET_PRODUCT_ERROR;
  constructor(public payload: Error | string) {}
}

export class AddProduct implements Action {
  type = ADD_PRODUCT;
  constructor(public payload: ProductModel) {}
}

export class EditProduct implements Action {
  type = EDIT_PRODUCT;
  constructor(public payload: ProductModel) {}
}

export class DeleteProduct implements Action {
  type = DELETE_PRODUCT;
  constructor(public payload: number) {}
}

export type ProductsActions =
  | GetProducts
  | GetProductsSuccess
  | GetProductsError
  | GetProduct
  | GetProductSuccess
  | GetProductError
  | AddProduct
  | EditProduct
  | DeleteProduct;
