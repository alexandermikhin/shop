import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AppState } from 'src/app/core/state/app.state';
import * as act from 'src/app/core/state/products/products.actions';
import {
  getProductEditComplete,
  getProducts
} from 'src/app/core/state/products/products.selectors';
import { ProductModel } from 'src/app/products/models/product.model';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html'
})
export class ManageProductsComponent implements OnInit, OnDestroy {
  products$: Observable<ProductModel[]>;

  private sub: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.products$ = this.store.pipe(select(getProducts));
    this.sub = this.store
      .pipe(
        select(getProductEditComplete),
        filter(editComplete => editComplete)
      )
      .subscribe(() => this.store.dispatch(new act.GetProducts()));

    this.store.dispatch(new act.GetProducts());
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onDelete(product: ProductModel) {
    this.store.dispatch(new act.DeleteProduct(product.id));
  }
}
