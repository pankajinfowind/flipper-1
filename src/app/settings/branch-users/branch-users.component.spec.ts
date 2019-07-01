import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchUsersComponent } from './branch-users.component';

describe('BranchUsersComponent', () => {
  let component: BranchUsersComponent;
  let fixture: ComponentFixture<BranchUsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchUsersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
