import * as act from './products.actions';
import { initialProductsState, ProductsState } from './products.state';

export function productsReducer(
  state: ProductsState = initialProductsState,
  action: act.ProductsActions
): ProductsState {
  switch (action.type) {
    case act.GET_PRODUCTS: {
      return { ...state, loading: true };
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
      }
    }
    case act.ADD_PRODUCT: {
      const addItem = (action as act.AddProduct).payload;
      const data = [...state.data, addItem];
      return { ...state, data };
    }
    case act.EDIT_PRODUCT: {
      const data = state.data.map(item => {
        const editItem = (action as act.EditProduct).payload;
        if (item.id === editItem.id) {
          return editItem;
        }

        return item;
      });
      return { ...state, data };
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
