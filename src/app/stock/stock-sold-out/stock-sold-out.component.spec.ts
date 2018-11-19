import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockSoldOutComponent } from './stock-sold-out.component';

describe('StockSoldOutComponent', () => {
  let component: StockSoldOutComponent;
  let fixture: ComponentFixture<StockSoldOutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockSoldOutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockSoldOutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
