import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosProductsComponent } from './pos-products.component';

describe('PosProductsComponent', () => {
  let component: PosProductsComponent;
  let fixture: ComponentFixture<PosProductsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosProductsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
