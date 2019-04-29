import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectReasonModelComponent } from './select-reason-model.component';

describe('SelectReasonModelComponent', () => {
  let component: SelectReasonModelComponent;
  let fixture: ComponentFixture<SelectReasonModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectReasonModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectReasonModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
