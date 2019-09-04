import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockButtonModelComponent } from './stock-button-model.component';

describe('StockButtonModelComponent', () => {
  let component: StockButtonModelComponent;
  let fixture: ComponentFixture<StockButtonModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockButtonModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockButtonModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
