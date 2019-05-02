import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayExpiredStockByCustomComponent } from './display-expired-stock-by-custom.component';

describe('DisplayExpiredStockByCustomComponent', () => {
  let component: DisplayExpiredStockByCustomComponent;
  let fixture: ComponentFixture<DisplayExpiredStockByCustomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayExpiredStockByCustomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayExpiredStockByCustomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
