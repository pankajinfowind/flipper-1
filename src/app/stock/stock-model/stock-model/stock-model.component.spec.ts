import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockModelComponent } from './stock-model.component';

describe('StockModelComponent', () => {
  let component: StockModelComponent;
  let fixture: ComponentFixture<StockModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
