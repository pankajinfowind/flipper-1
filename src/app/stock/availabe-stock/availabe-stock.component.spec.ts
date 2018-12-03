import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailabeStockComponent } from './availabe-stock.component';

describe('AvailabeStockComponent', () => {
  let component: AvailabeStockComponent;
  let fixture: ComponentFixture<AvailabeStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AvailabeStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailabeStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
