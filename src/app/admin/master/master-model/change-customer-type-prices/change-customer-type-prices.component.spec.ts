import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeCustomerTypePricesComponent } from './change-customer-type-prices.component';

describe('ChangeCustomerTypePricesComponent', () => {
  let component: ChangeCustomerTypePricesComponent;
  let fixture: ComponentFixture<ChangeCustomerTypePricesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeCustomerTypePricesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeCustomerTypePricesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
