import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCustomerModelComponent } from './select-customer-model.component';

describe('SelectCustomerModelComponent', () => {
  let component: SelectCustomerModelComponent;
  let fixture: ComponentFixture<SelectCustomerModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCustomerModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCustomerModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
