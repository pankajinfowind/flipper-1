import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReasonDataTableComponent } from './reason-data-table.component';

describe('ReasonDataTableComponent', () => {
  let component: ReasonDataTableComponent;
  let fixture: ComponentFixture<ReasonDataTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReasonDataTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReasonDataTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
