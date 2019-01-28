import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAdvancedOptionsComponent } from './stock-advanced-options.component';

describe('StockAdvancedOptionsComponent', () => {
  let component: StockAdvancedOptionsComponent;
  let fixture: ComponentFixture<StockAdvancedOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockAdvancedOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAdvancedOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
