import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrupdatePeriodModalComponent } from './crupdate-period-modal.component';

describe('CrupdatePeriodModalComponent', () => {
  let component: CrupdatePeriodModalComponent;
  let fixture: ComponentFixture<CrupdatePeriodModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrupdatePeriodModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrupdatePeriodModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
