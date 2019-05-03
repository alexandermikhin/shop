import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/core/state/app.state';
import * as act from 'src/app/core/state/products/products.actions';
import { getSelectedProduct } from 'src/app/core/state/products/products.selectors';
import { FeedbacksService } from 'src/app/feedbacks/services/feedbacks.service';
import { ProductModel } from '../../models/product.model';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: ProductModel;

  private sub: Subscription;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public feedbacksService: FeedbacksService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.sub = this.store
      .pipe(select(getSelectedProduct))
      .subscribe(product => (this.product = product || new ProductModel()));

    this.activatedRoute.paramMap.subscribe(params => {
      const id = params.get('productID');
      if (id) {
        this.store.dispatch(new act.GetProduct(+id));
      }
    });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onGoBack() {
    this.feedbacksService.isDisplayed = false;
    this.router.navigate(['/products-list']);
  }

  toggleFeedbacks(display: boolean) {
    this.feedbacksService.activeProductId = this.product.id;
    this.feedbacksService.isDisplayed = display;
    if (display) {
      this.router.navigate([
        '/product',
        this.product.id,
        { outlets: { feedback: ['feedback'] } }
      ]);
    } else {
      this.router.navigate([
        '/product',
        this.product.id,
        { outlets: { feedback: null } }
      ]);
    }
  }
}
