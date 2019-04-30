import { ProductModel } from 'src/app/products/models/product.model';

export interface ProductsState {
  data: ProductModel[];
}

export const initialProductsState: ProductsState = {
  data: [{
    category: 'cat-1',
    description: 'desc',
    id: 1,
    isAvailable: true,
    name: 'name',
    price: 100,
    suppliers: [],
    updateDate: '2019-04-28'
  }]
};
