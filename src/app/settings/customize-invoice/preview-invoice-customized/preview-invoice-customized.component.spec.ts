import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewInvoiceCustomizedComponent } from './preview-invoice-customized.component';

describe('PreviewInvoiceCustomizedComponent', () => {
  let component: PreviewInvoiceCustomizedComponent;
  let fixture: ComponentFixture<PreviewInvoiceCustomizedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreviewInvoiceCustomizedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewInvoiceCustomizedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
