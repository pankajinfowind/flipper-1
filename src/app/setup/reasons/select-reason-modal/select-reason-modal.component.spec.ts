import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectReasonModalComponent } from './select-reason-modal.component';

describe('SelectReasonModalComponent', () => {
  let component: SelectReasonModalComponent;
  let fixture: ComponentFixture<SelectReasonModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectReasonModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectReasonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
