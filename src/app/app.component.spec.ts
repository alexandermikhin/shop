import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { AppComponent } from './app.component';
import { AppSettings, ColorType } from './core/models/app-settings';
import { AppSettings$ } from './core/services/app-settings-factory';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let settings: Observable<AppSettings>;

  beforeEach(() => {
    settings = of({
      color: 'blue' as ColorType,
      addresses: []
    });
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
      providers: [{ provide: AppSettings$, useValue: settings }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'shop'`, () => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement.query(By.css('.navbar-brand'));
    const heading: HTMLLinkElement = debugElement.nativeElement;
    expect(heading.innerText).toEqual('Shop application');
  });

  it('should render title in a link element', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('a.navbar-brand').textContent).toContain(
      'Shop application'
    );
  });

  it('should have blue container color if setting is blue', () => {
    fixture.detectChanges();
    const debugElement = fixture.debugElement.query(By.css('.container-fluid'));
    const container: HTMLDivElement = debugElement.nativeElement;
    expect(container.classList.contains('bg-info')).toBeTruthy();
  });
});
