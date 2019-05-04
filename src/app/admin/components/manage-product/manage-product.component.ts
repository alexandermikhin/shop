import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter, pluck } from 'rxjs/operators';
import { CanComponentDeactivate } from 'src/app/core/interfaces/can-component-deactivate.interface';
import { DialogService } from 'src/app/core/services/dialog.service';
import { AppState } from 'src/app/core/state/app.state';
import * as pa from 'src/app/core/state/products/products.actions';
import {
  getProductEditComplete,
  getSelectedProduct
} from 'src/app/core/state/products/products.selectors';
import * as ra from 'src/app/core/state/router/router.actions';
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

  constructor(
    private route: ActivatedRoute,
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

    this.sub.add(
      this.store
        .pipe(
          select(getSelectedProduct),
          filter(product => !!product)
        )
        .subscribe(product => {
          this.product = { ...product };
          this.originalProduct = { ...product };
        })
    );

    this.sub.add(
      this.store
        .pipe(
          select(getProductEditComplete),
          filter(editComplete => editComplete)
        )
        .subscribe(() => this.onGoBack())
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
      this.store.dispatch(new pa.EditProduct(product));
    } else {
      this.store.dispatch(new pa.AddProduct(product));
    }
  }

  onGoBack() {
    this.store.dispatch(new ra.Back());
  }
}
