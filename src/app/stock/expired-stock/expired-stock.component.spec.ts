import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredStockComponent } from './expired-stock.component';

describe('ExpiredStockComponent', () => {
  let component: ExpiredStockComponent;
  let fixture: ComponentFixture<ExpiredStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
