import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { DialogService } from 'src/app/core/services/dialog.service';
import { LocalStorageService } from 'src/app/core/services/local-storage.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { CartListComponent } from './cart-list.component';

describe('CartComponent', () => {
  let component: CartListComponent;
  let fixture: ComponentFixture<CartListComponent>;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;
  let dialogService: jasmine.SpyObj<DialogService>;

  beforeEach(() => {
    localStorageService = jasmine.createSpyObj('LocalStorageService', [
      'getItem'
    ]);
    dialogService = jasmine.createSpyObj('DialogService', ['confirm']);
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, FormsModule],
      declarations: [CartListComponent],
      providers: [
        { provide: LocalStorageService, useValue: localStorageService },
        { provide: DialogService, useValue: dialogService }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CartListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
