import { of, throwError } from 'rxjs';
import { JsonServerClientService } from 'src/app/core/services/json-server-client.service';
import { ProductModel } from '../models/product.model';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;
  let jsonServerClient: jasmine.SpyObj<JsonServerClientService>;

  beforeEach(() => {
    jsonServerClient = jasmine.createSpyObj<JsonServerClientService>(
      'JsonServerClientService',
      ['get', 'post', 'put', 'delete']
    );
    service = new ProductsService(jsonServerClient);
  });

  it('should return products on getProducts', (done: () => void) => {
    const products: ProductModel[] = [getProduct(1), getProduct(2)];

    jsonServerClient.get.and.returnValue(of(products));
    let result: ProductModel[];
    service.getProducts().then(r => {
      result = r;
      expect(result).toEqual(products);
      done();
    });
  });

  it('should return product on getProduct', (done: () => void) => {
    const product = getProduct(1);

    jsonServerClient.get.and.returnValue(of(product));
    let result: ProductModel;
    service.getProduct(1).then(r => {
      result = r;
      expect(result).toEqual(product);
      done();
    });
  });

  it('should add product', (done: () => void) => {
    // @ts-ignore
    spyOn(service, 'getUpdateDate').and.returnValue('2019-05-16');
    const products = [getProduct(1), getProduct(3), getProduct(2)];
    const productToAdd: ProductModel = {
      ...getProduct(0),
      name: 'new-product'
    };
    const expectedProductToAdd: ProductModel = {
      ...productToAdd,
      id: 4,
      updateDate: '2019-05-16'
    };
    jsonServerClient.get.and.returnValue(of(products));
    jsonServerClient.post.and.returnValue(of(expectedProductToAdd));
    service.addProduct(productToAdd).then(() => {
      expect(jsonServerClient.post).toHaveBeenCalledWith(
        'products',
        expectedProductToAdd
      );
      done();
    });
  });

  it('should edit product', (done: () => void) => {
    // @ts-ignore
    spyOn(service, 'getUpdateDate').and.returnValue('2019-05-16');
    const productToEdit = getProduct(1);
    const expectedProductToEdit: ProductModel = {
      ...productToEdit,
      updateDate: '2019-05-16'
    };
    jsonServerClient.put.and.returnValue(of(expectedProductToEdit));
    service.editProduct(productToEdit).then(() => {
      expect(jsonServerClient.put).toHaveBeenCalledWith(
        'products/1',
        expectedProductToEdit
      );
      done();
    });
  });

  it('should delete product', (done: () => void) => {
    jsonServerClient.delete.and.returnValue(of({}));
    service.deleteProduct(1).then(() => {
      expect(jsonServerClient.delete).toHaveBeenCalledWith('products/1');
      done();
    });
  });

  it('should handle error if error occurs', (done: () => void) => {
    jsonServerClient.get.and.returnValue(throwError('error'));
    service.getProducts().catch((error) => {
      expect(error).toEqual('error');
      done();
    });
  });

  function getProduct(id: number): ProductModel {
    return {
      id,
      category: 'product-category',
      description: 'product-description',
      isAvailable: true,
      name: 'product-name',
      price: 100,
      suppliers: [],
      updateDate: '2019-05-16'
    };
  }
});
