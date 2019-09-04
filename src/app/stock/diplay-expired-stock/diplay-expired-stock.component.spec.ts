import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplayExpiredStockComponent } from './diplay-expired-stock.component';

describe('DiplayExpiredStockComponent', () => {
  let component: DiplayExpiredStockComponent;
  let fixture: ComponentFixture<DiplayExpiredStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplayExpiredStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplayExpiredStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
