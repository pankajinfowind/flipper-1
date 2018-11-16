import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockDamagedComponent } from './stock-damaged.component';

describe('StockDamagedComponent', () => {
  let component: StockDamagedComponent;
  let fixture: ComponentFixture<StockDamagedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockDamagedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockDamagedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
