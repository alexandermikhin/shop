import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';

const products: ProductModel[] = [
  {
    id: 1,
    category: 'category-1',
    description: 'product-1-description',
    isAvailable: true,
    name: 'product-1-name',
    price: 100.123,
    suppliers: ['supplier-1', 'supplier-2'],
    updateDate: new Date(2019, 0, 1)
  },
  {
    id: 2,
    category: 'category-2',
    description: 'product-2-description',
    isAvailable: false,
    name: 'product-2-name',
    price: 200.1,
    suppliers: ['supplier-3', 'supplier-1'],
    updateDate: new Date(2018, 11, 1)
  },
  {
    id: 3,
    category: 'category-3',
    description: 'product-3-description',
    isAvailable: true,
    name: 'product-3-name',
    price: 300.0,
    suppliers: ['supplier-1', 'supplier-4'],
    updateDate: new Date(2018, 10, 30)
  },
  {
    id: 4,
    category: 'category-3',
    description: 'product-4-description',
    isAvailable: true,
    name: 'product-4-name',
    price: 300.009,
    suppliers: ['supplier-1', 'supplier-4'],
    updateDate: new Date(2019, 3, 10)
  }
];

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  getProducts(): Promise<ProductModel[]> {
    return new Promise(resolve => {
      setTimeout(() => resolve(products), 0);
    });
  }

  getProduct(id: number): Promise<ProductModel> {
    return new Promise(resolve => {
      setTimeout(() => {
        const product = products.find(p => p.id === id);
        resolve(product);
      }, 0);
    });
  }

  addProduct(product: ProductModel): Promise<ProductModel> {
    return new Promise(resolve => {
      setTimeout(() => {
        const id = products
          .map(p => p.id)
          .reduce((prev, cur) => {
            return prev < cur ? cur : prev;
          });
        const savedProduct = { ...product, id: id + 1, updateDate: new Date() };
        products.push(savedProduct);
        resolve(savedProduct);
      });
    });
  }

  editProduct(product: ProductModel): Promise<ProductModel> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const productIndex = products.findIndex(p => p.id === product.id);
        if (productIndex > -1) {
          products[productIndex] = { ...product, updateDate: new Date() };
          resolve(product);
        } else {
          reject('Product to edit was not found');
        }
      });
    });
  }

  deleteProduct(id: number): Promise<ProductModel> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const productIndex = products.findIndex(p => p.id === id);
        if (productIndex > -1) {
          const product = products[productIndex];
          products.splice(productIndex, 1);
          resolve(product);
        } else {
          reject('Product to delete was not found');
        }
      });
    });
  }
}
