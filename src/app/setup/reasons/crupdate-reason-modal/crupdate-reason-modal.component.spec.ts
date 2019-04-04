import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrupdateReasonModalComponent } from './crupdate-reason-modal.component';

describe('CrupdateReasonModalComponent', () => {
  let component: CrupdateReasonModalComponent;
  let fixture: ComponentFixture<CrupdateReasonModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrupdateReasonModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrupdateReasonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
