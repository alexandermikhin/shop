import { of } from 'rxjs';
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
    const products: ProductModel[] = [getProduct()];

    jsonServerClient.get.and.returnValue(of(products));
    let result: ProductModel[];
    service.getProducts().then(r => {
      result = r;
      expect(result).toEqual(products);
      done();
    });
  });

  it('should return product on getProduct', (done: () => void) => {
    const product = getProduct();

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
    const products = [getProduct()];
    const productToAdd: ProductModel = {
      ...getProduct(),
      name: 'new-product'
    };
    const expectedProductToAdd: ProductModel = {
      ...productToAdd,
      id: 2,
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
    const productToEdit = getProduct();
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

  function getProduct(): ProductModel {
    return {
      id: 1,
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
