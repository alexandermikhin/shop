import { CartItem } from 'src/app/cart/models/cart-item.model';
import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;
  let cartItems: CartItem[];

  beforeEach(() => {
    pipe = new OrderByPipe();
  });

  it('should sort by name', () => {
    cartItems = [
      { name: 'item-1', price: 1, quantity: 1 },
      { name: 'ITEM-3', price: 1, quantity: 3 },
      { name: 'item-1', price: 1, quantity: 1 },
      { name: 'item-2', price: 1, quantity: 2 }
    ];

    const expected: CartItem[] = [
      { name: 'item-1', price: 1, quantity: 1 },
      { name: 'item-1', price: 1, quantity: 1 },
      { name: 'item-2', price: 1, quantity: 2 },
      { name: 'ITEM-3', price: 1, quantity: 3 }
    ];

    const actual = pipe.transform(cartItems);

    expect(actual).toEqual(expected);
  });

  it('should sort by price', () => {
    cartItems = [
      { name: 'item-1', price: 5, quantity: 1 },
      { name: 'ITEM-3', price: 3, quantity: 3 },
      { name: 'item-2', price: 2, quantity: 2 }
    ];

    const expected: CartItem[] = [
      { name: 'item-2', price: 2, quantity: 2 },
      { name: 'ITEM-3', price: 3, quantity: 3 },
      { name: 'item-1', price: 5, quantity: 1 }
    ];

    const actual = pipe.transform(cartItems, 'price');

    expect(actual).toEqual(expected);
  });

  it('should sort by sum', () => {
    cartItems = [
      { name: 'expensive-few', price: 500, quantity: 1 },
      { name: 'cheap-much', price: 2, quantity: 200 },
      { name: 'item', price: 30, quantity: 20 }
    ];

    const expected: CartItem[] = [
      { name: 'cheap-much', price: 2, quantity: 200 },
      { name: 'expensive-few', price: 500, quantity: 1 },
      { name: 'item', price: 30, quantity: 20 }
    ];

    const actual = pipe.transform(cartItems, 'sum');

    expect(actual).toEqual(expected);
  });

  it('should leave original array immutable', () => {
    cartItems = [
      { name: 'expensive-few', price: 500, quantity: 1 },
      { name: 'cheap-much', price: 2, quantity: 200 },
      { name: 'item', price: 30, quantity: 20 }
    ];

    const expected: CartItem[] = [
      { name: 'expensive-few', price: 500, quantity: 1 },
      { name: 'cheap-much', price: 2, quantity: 200 },
      { name: 'item', price: 30, quantity: 20 }
    ];

    pipe.transform(cartItems, 'sum');

    expect(cartItems).toEqual(expected);
  });

  it('should sort in descending order', () => {
    cartItems = [
      { name: 'expensive-few', price: 500, quantity: 1 },
      { name: 'cheap-much', price: 2, quantity: 200 },
      { name: 'item', price: 30, quantity: 20 }
    ];

    const expected: CartItem[] = [
      { name: 'item', price: 30, quantity: 20 },
      { name: 'expensive-few', price: 500, quantity: 1 },
      { name: 'cheap-much', price: 2, quantity: 200 }
    ];

    const actual = pipe.transform(cartItems, 'sum', true);

    expect(actual).toEqual(expected);
  });

  it('should preserve original order if unknown sort option', () => {
    cartItems = [
      { name: 'item-1', price: 5, quantity: 1 },
      { name: 'ITEM-3', price: 3, quantity: 3 },
      { name: 'item-2', price: 2, quantity: 2 }
    ];

    const expected: CartItem[] = [
      { name: 'item-1', price: 5, quantity: 1 },
      { name: 'ITEM-3', price: 3, quantity: 3 },
      { name: 'item-2', price: 2, quantity: 2 }
    ];

    const actual = pipe.transform(cartItems, 'date' as any);

    expect(actual).toEqual(expected);
  });

  it('should sort by name by default', () => {
    cartItems = [
      { name: 'item-1', price: 5, quantity: 1 },
      { name: 'ITEM-3', price: 3, quantity: 3 },
      { name: 'item-2', price: 2, quantity: 2 }
    ];

    const expected: CartItem[] = [
      { name: 'item-1', price: 5, quantity: 1 },
      { name: 'item-2', price: 2, quantity: 2 },
      { name: 'ITEM-3', price: 3, quantity: 3 }
    ];

    const actual = pipe.transform(cartItems);

    expect(actual).toEqual(expected);
  });
});
