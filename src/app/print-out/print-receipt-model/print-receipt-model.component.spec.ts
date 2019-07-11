import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintReceiptModelComponent } from './print-receipt-model.component';

describe('PrintReceiptModelComponent', () => {
  let component: PrintReceiptModelComponent;
  let fixture: ComponentFixture<PrintReceiptModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintReceiptModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintReceiptModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
