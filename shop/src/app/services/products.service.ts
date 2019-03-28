import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor() { }

  getProducts(): ProductModel[] {
    return [
      {
        category: Category.category1,
        description: 'product-1-description',
        isAvailable: true,
        name: 'product-1-name',
        price: 100,
        suppliers: [
          'supplier-1',
          'supplier-2'
        ]
      },
      {
        category: Category.category2,
        description: 'product-2-description',
        isAvailable: false,
        name: 'product-2-name',
        price: 200,
        suppliers: [
          'supplier-3',
          'supplier-1'
        ]
      }
    ];
  }
}
