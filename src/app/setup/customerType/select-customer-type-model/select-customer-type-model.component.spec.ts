import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCustomerTypeModelComponent } from './select-customer-type-model.component';

describe('SelectCustomerTypeModelComponent', () => {
  let component: SelectCustomerTypeModelComponent;
  let fixture: ComponentFixture<SelectCustomerTypeModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCustomerTypeModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCustomerTypeModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
