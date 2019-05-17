import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrupdateInvoiceCustomizationComponent } from './crupdate-invoice-customization.component';

describe('CrupdateInvoiceCustomizationComponent', () => {
  let component: CrupdateInvoiceCustomizationComponent;
  let fixture: ComponentFixture<CrupdateInvoiceCustomizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrupdateInvoiceCustomizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrupdateInvoiceCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
