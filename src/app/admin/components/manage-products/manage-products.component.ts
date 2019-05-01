import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/core/state/app.state';
import * as act from 'src/app/core/state/products/products.actions';
import { ProductsState } from 'src/app/core/state/products/products.state';
import { ProductModel } from 'src/app/products/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-manage-products',
  templateUrl: './manage-products.component.html'
})
export class ManageProductsComponent implements OnInit {
  productsState$: Observable<ProductsState>;

  constructor(
    private store: Store<AppState>,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.productsState$ = this.store.pipe(select('products'));
    this.store.dispatch(new act.GetProducts());
  }

  async onDelete(product: ProductModel) {
    await this.productsService.deleteProduct(product.id);
    this.store.dispatch(new act.GetProducts());
  }
}
