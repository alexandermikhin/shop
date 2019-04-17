import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FeedbacksService } from 'src/app/feedbacks/services/feedbacks.service';
import { ProductModel } from '../../models/product.model';
import { ProductsService } from '../../services/products.service';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: ProductModel;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    public feedbacksService: FeedbacksService
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
    this.feedbacksService.isDisplayed = false;
    this.router.navigate(['/products-list']);
  }

  onShowFeedbacks() {
    this.router.navigate([ '/product', this.product.id, { outlets: { feedback: ['feedback']}}]);
    this.feedbacksService.activeProductId = this.product.id;
    this.feedbacksService.isDisplayed = true;
  }
}
