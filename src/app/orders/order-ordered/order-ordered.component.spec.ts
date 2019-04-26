import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderOrderedComponent } from './order-ordered.component';

describe('OrderOrderedComponent', () => {
  let component: OrderOrderedComponent;
  let fixture: ComponentFixture<OrderOrderedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderOrderedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderOrderedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
