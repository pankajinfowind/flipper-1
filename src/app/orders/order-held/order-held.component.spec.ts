import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderHeldComponent } from './order-held.component';

describe('OrderHeldComponent', () => {
  let component: OrderHeldComponent;
  let fixture: ComponentFixture<OrderHeldComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderHeldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderHeldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
