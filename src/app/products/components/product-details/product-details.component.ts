import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from 'src/app/core/state/app.state';
import { getProductByUrl } from 'src/app/core/state/products/products.selectors';
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
    public feedbacksService: FeedbacksService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.sub = this.store
      .pipe(select(getProductByUrl))
      .subscribe(product => (this.product = product));
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
