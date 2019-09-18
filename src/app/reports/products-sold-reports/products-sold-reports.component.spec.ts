import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsSoldReportsComponent } from './products-sold-reports.component';

describe('ProductsSoldReportsComponent', () => {
  let component: ProductsSoldReportsComponent;
  let fixture: ComponentFixture<ProductsSoldReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductsSoldReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsSoldReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
