import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCustomerTypeModalComponent } from './select-customer-type-modal.component';

describe('SelectCustomerTypeModalComponent', () => {
  let component: SelectCustomerTypeModalComponent;
  let fixture: ComponentFixture<SelectCustomerTypeModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCustomerTypeModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCustomerTypeModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
