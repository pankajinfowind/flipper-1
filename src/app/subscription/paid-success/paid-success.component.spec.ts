import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaidSuccessComponent } from './paid-success.component';

describe('PaidSuccessComponent', () => {
  let component: PaidSuccessComponent;
  let fixture: ComponentFixture<PaidSuccessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaidSuccessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaidSuccessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
