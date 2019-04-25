import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, concatMap } from 'rxjs/operators';
import { Order } from '../models/order.model';

@Injectable()
export class OrderService {
  private readonly url = `http://localhost:3000/orders`;

  constructor(private http: HttpClient) {}

  addOrder(order: Order): Observable<Order> {
    return this.getOrders().pipe(
      concatMap(orders => {
        const maxId = orders
          .map(o => o.id)
          .reduce((prev, cur) => Math.max(prev, cur));
        const orderToAdd: Order = {
          ...order,
          id: maxId + 1
        };
        const body = this.getRequestBody(orderToAdd);
        const options = this.getRequestOptions();
        return this.http
          .post<Order>(this.url, body, options)
          .pipe(catchError(this.handleError));
      })
    );
  }

  editOrder(order: Order): Observable<Order> {
    const updateUrl = `${this.url}/${order.id}`;
    const body = this.getRequestBody(order);
    const options = this.getRequestOptions();
    return this.http
      .put<Order>(updateUrl, body, options)
      .pipe(catchError(this.handleError));
  }

  getOrders(): Observable<Order[]> {
    return this.http.get<Order[]>(this.url).pipe(catchError(this.handleError));
  }

  getOrder(id: number): Observable<Order> {
    const getUrl = this.url + '/' + id;
    return this.http.get<Order>(getUrl).pipe(catchError(this.handleError));
  }

  deleteOrder(id: number): Observable<{}> {
    const deleteUrl = this.url + '/' + id;
    return this.http.delete<{}>(deleteUrl).pipe(catchError(this.handleError));
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

  private getRequestOptions(): { [option: string]: any } {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  private getRequestBody(model: any): any {
    return JSON.stringify(model);
  }
}
