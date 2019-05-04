import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, map, take } from 'rxjs/operators';
import { AppState } from 'src/app/core/state/app.state';
import { Go } from 'src/app/core/state/router/router.actions';
import { Order } from 'src/app/orders/models/order.model';
import { OrderService } from 'src/app/orders/services/order.service';

@Injectable()
export class OrderResolveGuard implements Resolve<Order> {
  constructor(
    private orderService: OrderService,
    private store: Store<AppState>
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Order> {
    if (!route.paramMap.has('orderID')) {
      return of({
        cartItems: [],
        date: new Date().toISOString(),
        deliveryAddress: '',
        id: 0,
        name: ''
      });
    }

    const id = +route.paramMap.get('orderID');
    return this.orderService.getOrder(id).pipe(
      map(order => {
        if (order) {
          return order;
        }

        this.store.dispatch(new Go({ path: ['/admin/orders'] }));
        return null;
      }),
      take(1),
      catchError(() => {
        this.store.dispatch(new Go({ path: ['/admin/orders'] }));
        return of(null);
      })
    );
  }
}
