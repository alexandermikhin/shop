import { Location } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductModel } from 'src/app/products/models/product.model';
import { pluck } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'src/app/core/services/dialog.service';
import { Subscription } from 'rxjs';
import { ProductsService } from 'src/app/products/services/products.service';
import { CanComponentDeactivate } from 'src/app/core/interfaces/can-component-deactivate.interface';

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
    private location: Location,
    private router: Router,
    private dialogService: DialogService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.route.data
      .pipe(pluck('product'))
      .subscribe((product: ProductModel) => {
        this.product = { ...product };
        this.originalProduct = { ...product };
      });
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

  async onSaveProduct() {
    const product = { ...this.product };
    let savedProduct: ProductModel;
    if (product.id) {
      savedProduct = await this.productsService.editProduct(product);
    } else {
      savedProduct = await this.productsService.addProduct(product);
    }

    this.originalProduct = { ...savedProduct };
    this.product = { ...savedProduct };
    this.onGoBack();
  }

  onGoBack() {
    this.location.back();
  }
}
