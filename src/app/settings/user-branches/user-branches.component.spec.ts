import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserBranchesComponent } from './user-branches.component';

describe('UserBranchesComponent', () => {
  let component: UserBranchesComponent;
  let fixture: ComponentFixture<UserBranchesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserBranchesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
