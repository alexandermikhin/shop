import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Order } from '../models/order.model';

@Injectable()
export class OrderService {
  private orders: Order[] = [];
  private readonly url = `http://localhost:3000/orders`;

  constructor(private http: HttpClient) {}

  addOrder(order: Order): Order {
    const id =
      this.orders.length > 0
        ? this.orders
            .map(p => p.id)
            .reduce((prev, cur) => {
              return prev < cur ? cur : prev;
            })
        : 0;
    const savedOrder = { ...order, id: id + 1 };
    this.orders.push(savedOrder);
    console.log(this.orders);
    return savedOrder;
  }

  editOrder(order: Order): Order {
    const index = this.orders.findIndex(o => o.id === order.id);
    if (index === -1) {
      throw new Error('No order found');
    }

    this.orders[index] = { ...order };
    return order;
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url).pipe(catchError(this.handleError));
  }

  getOrder(id: number): Order | undefined {
    return this.orders.find(o => o.id === id);
  }

  deleteOrder(id: number): Order | null {
    const orderIndex = this.orders.findIndex(o => o.id === id);
    if (orderIndex > -1) {
      const order = this.orders[orderIndex];
      this.orders.splice(orderIndex, 1);
      return order;
    } else {
      return null;
    }
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage: string;

    // A client-side or network error occurred.
    if (err.error instanceof Error) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Backend returned code ${err.status}, body was: ${
        err.error
      }`;
    }

    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
