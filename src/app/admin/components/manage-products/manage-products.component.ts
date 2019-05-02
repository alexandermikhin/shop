import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/core/state/app.state';
import * as act from 'src/app/core/state/products/products.actions';
import { ProductsState } from 'src/app/core/state/products/products.state';
import { ProductModel } from 'src/app/products/models/product.model';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html'
})
export class ManageProductsComponent implements OnInit, OnDestroy {
  productsState$: Observable<ProductsState>;

  private sub: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.productsState$ = this.store.pipe(select('products'));
    this.sub = this.productsState$.subscribe(state => {
      if (state.editComplete) {
        this.store.dispatch(new act.GetProducts());
      }
    });

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
