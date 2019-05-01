import * as act from './products.actions';
import { initialProductsState, ProductsState } from './products.state';

export function productsReducer(
  state: ProductsState = initialProductsState,
  action: act.ProductsActions
): ProductsState {
  switch (action.type) {
    case act.GET_PRODUCTS: {
      return {
        ...state,
        loading: true,
        editComplete: false,
        selectedProduct: null
      };
    }
    case act.GET_PRODUCTS_SUCCESS: {
      const data = [...(action as act.GetProductsSuccess).payload];
      return {
        ...state,
        data,
        loading: false,
        loaded: true
      };
    }
    case act.GET_PRODUCTS_ERROR: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: (action as act.GetProductsError).payload
      };
    }
    case act.GET_PRODUCT: {
      return {
        ...state,
        loading: true,
        editComplete: false
      };
    }
    case act.GET_PRODUCT_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true,
        selectedProduct: (action as act.GetProductSuccess).payload
      };
    }
    case act.GET_PRODUCT_ERROR: {
      return {
        ...state,
        loading: false,
        loaded: false,
        error: (action as act.GetProductError).payload
      };
    }
    case act.ADD_PRODUCT: {
      return { ...state, editComplete: false };
    }
    case act.ADD_PRODUCT_SUCCESS: {
      const addItem = (action as act.AddProduct).payload;
      const data = [...state.data, addItem];
      return { ...state, data, editComplete: true };
    }
    case act.ADD_PRODUCT_ERROR: {
      return {
        ...state,
        error: (action as act.AddProductError).payload
      };
    }

    case act.EDIT_PRODUCT: {
      return {
        ...state,
        editComplete: false
      };
    }
    case act.EDIT_PRODUCT_SUCCESS: {
      const product = (action as act.EditProductSuccess).payload;
      const data = [...state.data];
      const index = data.findIndex(item => item.id === product.id);
      data[index] = product;
      return { ...state, data, selectedProduct: product, editComplete: true };
    }
    case act.EDIT_PRODUCT_ERROR: {
      return {
        ...state,
        error: (action as act.EditProductError).payload
      };
    }
    case act.DELETE_PRODUCT: {
      const deleteItemId = (action as act.DeleteProduct).payload;
      const data = state.data.filter(item => item.id !== deleteItemId);
      return { ...state, data };
    }
    default: {
      return state;
    }
  }
}
