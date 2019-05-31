import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private items: CartItem[] = [];
  private totalSum = 0;
  private totalCount = 0;
  private itemsChangeSubject = new Subject<CartItem[]>();
  private totalSumSubject = new Subject<number>();
  private totalCountSubject = new Subject<number>();

  constructor(private localStorageService: LocalStorageService) {
    this.initCartItems();
  }

  get itemsChanged(): Observable<CartItem[]> {
    return this.itemsChangeSubject.asObservable();
  }

  get cartSumChanged(): Observable<number> {
    return this.totalSumSubject.asObservable();
  }

  get cartCountChanged(): Observable<number> {
    return this.totalCountSubject.asObservable();
  }

  getItems(): CartItem[] {
    return this.items;
  }

  addToCart(item: CartItem) {
    const cartItem = this.items.find(i => i.name === item.name);
    if (!cartItem) {
      this.items.push(item);
    } else {
      cartItem.quantity += item.quantity;
    }

    this.udpateCartSummary();
  }

  emptyCart() {
    this.items = [];
    this.udpateCartSummary();
  }

  removeItem(item: CartItem) {
    const cartItemIndex = this.items.findIndex(i => i.name === item.name);
    if (cartItemIndex !== -1) {
      this.items.splice(cartItemIndex, 1);
    }

    this.udpateCartSummary();
  }

  updateCartItem(item: CartItem) {
    const cartItemIndex = this.items.findIndex(i => i.name === item.name);
    if (cartItemIndex !== -1) {
      this.items[cartItemIndex] = { ...item };
    }

    this.udpateCartSummary();
  }

  get cartSum(): number {
    return this.totalSum;
  }

  get cartCount(): number {
    return this.totalCount;
  }

  private udpateCartSummary() {
    this.updateTotalSum();
    this.updateTotalCount();
    this.updateItems();
    this.setToStorage();
  }

  private updateTotalSum() {
    this.totalSum = this.items.reduce(
      (sum, item) => (sum += item.price * item.quantity),
      0
    );
    this.totalSumSubject.next(this.totalSum);
  }

  private updateTotalCount() {
    this.totalCount = this.items.reduce(
      (count, item) => (count += item.quantity),
      0
    );
    this.totalCountSubject.next(this.totalCount);
  }

  private updateItems() {
    this.items = [...this.items];
    this.itemsChangeSubject.next(this.items);
  }

  private initCartItems() {
    const storageItems = this.localStorageService.getItem('cart');
    this.items = storageItems ? JSON.parse(storageItems) : [];
    this.updateTotalSum();
    this.updateTotalCount();
    this.updateItems();
  }

  private setToStorage() {
    this.localStorageService.setItem('cart', JSON.stringify(this.items));
  }
}
