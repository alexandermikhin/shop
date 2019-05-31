import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductModel } from '../../models/product.model';
import { ProductComponent } from './product.component';

describe('ProductComponent', () => {
  let component: ProductComponent;
  let fixture: ComponentFixture<ProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have product name in Title case', () => {
    component.product = getProduct();

    fixture.detectChanges();
    const debugElement = fixture.debugElement.query(By.css('.panel-heading'));
    const headingElement: HTMLDivElement = debugElement.nativeElement;

    expect(headingElement.innerText).toBe('Product-name');
  });

  it('should have disabled add to cart button if product is not available', () => {
    component.product = {
      ...getProduct(),
      isAvailable: false
    };

    fixture.detectChanges();

    const debugElement = fixture.debugElement.query(By.css('.btn-primary'));
    const button: HTMLButtonElement = debugElement.nativeElement;
    expect(button.disabled).toBeTruthy();
  });

  it('should emit add to cart event on add to cart button click', () => {
    component.product = getProduct();
    spyOn(component.addToCart, 'emit');
    fixture.detectChanges();
    const event = new Event('click');
    const debugElement = fixture.debugElement.query(By.css('.btn-primary'));
    const button: HTMLButtonElement = debugElement.nativeElement;
    button.dispatchEvent(event);
    expect(component.addToCart.emit).toHaveBeenCalledWith(component.product);
  });

  it('should emit add to cart event on add to cart button click', () => {
    component.product = getProduct();
    spyOn(component.seeDetails, 'emit');
    fixture.detectChanges();
    const event = new Event('click');
    const debugElement = fixture.debugElement.queryAll(By.css('.btn-sm'));
    debugElement[1].triggerEventHandler('click', event);
    expect(component.seeDetails.emit).toHaveBeenCalledWith(component.product);
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
