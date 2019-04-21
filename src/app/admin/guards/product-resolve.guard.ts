import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { ProductModel } from 'src/app/products/models/product.model';
import { ProductsService } from 'src/app/products/services/products.service';

@Injectable()
export class ProductResolveGuard implements Resolve<ProductModel> {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  async resolve(route: ActivatedRouteSnapshot): Promise<ProductModel> {
    if (!route.paramMap.has('productID')) {
      return Promise.resolve(new ProductModel());
    }

    const id = +route.paramMap.get('productID');
    try {
      const p = await this.productsService.getProduct(id);
      if (p) {
        return p;
      } else {
        this.router.navigate(['/admin/products']);
        return null;
      }
    } catch (e) {
      this.router.navigate(['/admin/products']);
      return null;
    }
  }
}
