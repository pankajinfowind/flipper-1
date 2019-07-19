import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttachItemCustomerTypesModelComponent } from './attach-item-customer-types-model.component';

describe('AttachItemCustomerTypesModelComponent', () => {
  let component: AttachItemCustomerTypesModelComponent;
  let fixture: ComponentFixture<AttachItemCustomerTypesModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttachItemCustomerTypesModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttachItemCustomerTypesModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
