import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignStockToBranchComponent } from './assign-stock-to-branch.component';

describe('AssignStockToBranchComponent', () => {
  let component: AssignStockToBranchComponent;
  let fixture: ComponentFixture<AssignStockToBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignStockToBranchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignStockToBranchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
