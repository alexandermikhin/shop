import { Pipe, PipeTransform } from '@angular/core';
import { CartItem } from 'src/app/cart/models/cart-item.model';

export type SortOption = 'name' | 'price' | 'sum';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  transform(
    products: CartItem[],
    sortOption: SortOption = 'name',
    isDesc = false
  ): CartItem[] {
    let result: CartItem[];
    switch (sortOption) {
      case 'name':
        result = this.applySorting(products, item => item.name.toLowerCase(), isDesc);
        break;
      case 'price':
        result = this.applySorting(products, item => item.price, isDesc);
        break;
      case 'sum':
        result = this.applySorting(
          products,
          item => item.price * item.quantity,
          isDesc
        );
        break;
      default:
        result = products;
        break;
    }

    return result;
  }

  private applySorting<T>(
    items: CartItem[],
    getValue: (item: CartItem) => T,
    isDesc: boolean
  ): CartItem[] {
    const k = !isDesc ? 1 : -1;
    return Array.from(items).sort((a, b) => {
      const aValue = getValue(a);
      const bValue = getValue(b);

      if (aValue < bValue) {
        return k * -1;
      }

      if (aValue > bValue) {
        return k;
      }

      return 0;
    });
  }
}
