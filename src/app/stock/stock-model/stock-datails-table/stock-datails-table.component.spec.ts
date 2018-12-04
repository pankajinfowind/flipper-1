import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDatailsTableComponent } from './stock-datails-table.component';

describe('StockDatailsTableComponent', () => {
  let component: StockDatailsTableComponent;
  let fixture: ComponentFixture<StockDatailsTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDatailsTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDatailsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
