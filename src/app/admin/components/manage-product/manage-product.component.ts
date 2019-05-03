import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { pluck } from 'rxjs/operators';
import { CanComponentDeactivate } from 'src/app/core/interfaces/can-component-deactivate.interface';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AppState } from 'src/app/core/state/app.state';
import * as act from 'src/app/core/state/products/products.actions';
import { getProductsState } from 'src/app/core/state/products/products.selectors';
import { ProductsState } from 'src/app/core/state/products/products.state';
import { ProductModel } from 'src/app/products/models/product.model';

@Component({
  selector: 'app-manage-product',
  templateUrl: './manage-product.component.html'
})
export class ManageProductComponent
  implements OnInit, OnDestroy, CanComponentDeactivate {
  product: ProductModel;
  originalProduct: ProductModel;
  private sub: Subscription;
  private productsState$: Observable<ProductsState>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private dialogService: DialogService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.sub = this.route.data
      .pipe(pluck('product'))
      .subscribe((product: ProductModel) => {
        this.product = { ...product };
        this.originalProduct = { ...product };
      });

    this.productsState$ = this.store.pipe(select(getProductsState));
    this.sub.add(
      this.productsState$.subscribe(state => {
        if (state.selectedProduct) {
          this.product = { ...state.selectedProduct };
          this.originalProduct = { ...state.selectedProduct };
        }

        if (state.editComplete) {
          this.onGoBack();
        }
      })
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  canDeactivate(): Promise<boolean> | boolean {
    const flags = Object.keys(this.originalProduct).map(key => {
      if (this.originalProduct[key] === this.product[key]) {
        return true;
      }
      return false;
    });

    if (flags.every(el => el)) {
      return true;
    }

    // Otherwise ask the user with the dialog service and return its
    // promise which resolves to true or false when the user decides
    return this.dialogService.confirm('Discard changes?');
  }

  onSaveProduct() {
    const product = { ...this.product };
    if (product.id) {
      this.store.dispatch(new act.EditProduct(product));
    } else {
      this.store.dispatch(new act.AddProduct(product));
    }
  }

  onGoBack() {
    this.location.back();
  }
}
