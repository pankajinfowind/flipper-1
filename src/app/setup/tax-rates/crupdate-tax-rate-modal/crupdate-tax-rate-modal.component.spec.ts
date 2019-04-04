import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrupdateTaxRateModalComponent } from './crupdate-tax-rate-modal.component';

describe('CrupdateTaxRateModalComponent', () => {
  let component: CrupdateTaxRateModalComponent;
  let fixture: ComponentFixture<CrupdateTaxRateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrupdateTaxRateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrupdateTaxRateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
