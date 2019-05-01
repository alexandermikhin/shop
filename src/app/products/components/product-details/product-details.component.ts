import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/core/state/app.state';
import * as act from 'src/app/core/state/products/products.actions';
import { ProductsState } from 'src/app/core/state/products/products.state';
import { FeedbacksService } from 'src/app/feedbacks/services/feedbacks.service';
import { ProductModel } from '../../models/product.model';

@Component({
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {
  product: ProductModel;
  productsState$: Observable<ProductsState>;

  private sub: Subscription;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public feedbacksService: FeedbacksService,
    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.productsState$ = this.store.pipe(select('products'));
    this.sub = this.productsState$.subscribe(
      state => (this.product = state.selectedProduct || new ProductModel())
    );

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
