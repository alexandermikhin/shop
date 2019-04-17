import { Component, OnInit, Input } from '@angular/core';
import { ProductModel } from '../../models/product.model';
import { Route } from '@angular/compiler/src/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { switchMap } from 'rxjs/operators';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: ProductModel;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.product = new ProductModel();

    this.activatedRoute.paramMap
      .pipe(
        switchMap((params: Params) =>
          this.productsService.getProduct(+params.get('productID'))
        )
      )
      .subscribe(
        product => (this.product = { ...product }),
        err => console.error(err)
      );
  }

  onGoBack() {
    this.router.navigate(['/products-list']);
  }
}
