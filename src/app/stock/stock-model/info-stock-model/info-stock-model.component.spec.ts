import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoStockModelComponent } from './info-stock-model.component';

describe('InfoStockModelComponent', () => {
  let component: InfoStockModelComponent;
  let fixture: ComponentFixture<InfoStockModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoStockModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoStockModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
