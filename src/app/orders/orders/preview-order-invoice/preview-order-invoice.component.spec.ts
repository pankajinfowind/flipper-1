import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewOrderInvoiceComponent } from './preview-order-invoice.component';

describe('PreviewOrderInvoiceComponent', () => {
  let component: PreviewOrderInvoiceComponent;
  let fixture: ComponentFixture<PreviewOrderInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewOrderInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewOrderInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
