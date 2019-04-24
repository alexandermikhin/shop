import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private readonly url = `http://localhost:3000/products`;

  constructor(private http: HttpClient) {}

  getProducts(): Promise<ProductModel[]> {
    return this.http
      .get<ProductModel[]>(this.url)
      .toPromise()
      .catch(this.handleError);
  }

  getProduct(id: number): Promise<ProductModel> {
    return this.http
      .get<ProductModel>(this.url + '/' + id)
      .toPromise()
      .catch(this.handleError);
  }

  async addProduct(product: ProductModel): Promise<ProductModel> {
    const products = await this.getProducts();
    const maxId = products
      .map(p => p.id)
      .reduce((prev, cur) => (prev < cur ? cur : prev));

    const productToAdd = {
      ...product,
      id: maxId + 1,
      updateDate: this.getUpdateDate()
    };

    const body = this.getRequestBody(productToAdd);
    const options = this.getRequestOptions();

    return this.http
      .post<ProductModel>(this.url, body, options)
      .toPromise()
      .catch(this.handleError);
  }

  editProduct(product: ProductModel): Promise<ProductModel> {
    const updateUrl = `${this.url}/${product.id}`;
    const productToUpdate = {
      ...product,
      updateDate: this.getUpdateDate()
    };
    const body = this.getRequestBody(productToUpdate);
    const options = this.getRequestOptions();

    return this.http
      .put<ProductModel>(updateUrl, body, options)
      .toPromise()
      .catch(this.handleError);
  }

  deleteProduct(id: number): Promise<{}> {
    const deleteUrl = `${this.url}/${id}`;
    return this.http
      .delete<{}>(deleteUrl)
      .toPromise()
      .catch(this.handleError);
  }

  private getRequestOptions(): { [option: string]: any } {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
  }

  private handleError(error: { message?: string }): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

  private getRequestBody(model: any): any {
    return JSON.stringify(model);
  }

  private getUpdateDate(): string {
    return new Date().toISOString();
  }
}
