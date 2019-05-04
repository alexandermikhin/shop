import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/core/state/app.state';
import { GetProductFromUrl } from 'src/app/core/state/products/products.actions';
import { getSelectedProduct } from 'src/app/core/state/products/products.selectors';
import { Go } from 'src/app/core/state/router/router.actions';
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
    public feedbacksService: FeedbacksService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.store.dispatch(new GetProductFromUrl());
    this.sub = this.store
      .pipe(select(getSelectedProduct))
      .subscribe(product => (this.product = product));
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  onGoBack() {
    this.feedbacksService.isDisplayed = false;
    this.store.dispatch(new Go({ path: ['/products-list'] }));
  }

  toggleFeedbacks(display: boolean) {
    this.feedbacksService.activeProductId = this.product.id;
    this.feedbacksService.isDisplayed = display;
    this.store.dispatch(
      new Go({
        path: [
          '/product',
          this.product.id,
          { outlets: { feedback: display ? ['feedback'] : null } }
        ]
      })
    );
  }
}
