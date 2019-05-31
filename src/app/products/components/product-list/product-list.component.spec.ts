import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { AppState } from 'src/app/core/state/app.state';
import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let store: jasmine.SpyObj<Store<AppState>>;

  beforeEach(() => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', [
      'getItem'
    ]);

    store = jasmine.createSpyObj('Store', ['dispatch', 'pipe']);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [
        { provide: LocalStorageService, useValue: localStorageService },
        { provide: Store, useValue: store }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
