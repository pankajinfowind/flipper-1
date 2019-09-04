import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchBranchComponent } from './switch-branch.component';

describe('SwitchBranchComponent', () => {
  let component: SwitchBranchComponent;
  let fixture: ComponentFixture<SwitchBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SwitchBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
