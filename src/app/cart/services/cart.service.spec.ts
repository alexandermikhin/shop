import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { CartService } from './cart.service';

describe('CartService', () => {
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  beforeEach(() => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', [
      'getItem'
    ]);
  });

  beforeEach(() =>
    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: localStorageService }
      ]
    })
  );

  it('should be created', () => {
    const service: CartService = TestBed.get(CartService);
    expect(service).toBeTruthy();
  });
});
