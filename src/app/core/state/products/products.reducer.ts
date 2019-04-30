import { ProductsState, initialProductsState } from './products.state';
import * as act from './products.actions';

export function productsReducer(
  state: ProductsState = initialProductsState,
  action: act.ProductsActions
): ProductsState {
  switch (action.type) {
    case act.GET_PRODUCTS: {
      return { ...state };
    }
    case act.ADD_PRODUCT: {
      return { ...state };
    }
    case act.EDIT_PRODUCT: {
      return { ...state };
    }
    case act.DELETE_PRODUCT: {
      return { ...state };
    }
    default: {
      return state;
    }
  }
}
