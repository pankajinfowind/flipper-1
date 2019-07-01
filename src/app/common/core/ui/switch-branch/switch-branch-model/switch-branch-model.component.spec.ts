import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchBranchModelComponent } from './switch-branch-model.component';

describe('SwitchBranchModelComponent', () => {
  let component: SwitchBranchModelComponent;
  let fixture: ComponentFixture<SwitchBranchModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchBranchModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchBranchModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
