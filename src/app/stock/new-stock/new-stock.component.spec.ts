import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStockComponent } from './new-stock.component';

describe('NewStockComponent', () => {
  let component: NewStockComponent;
  let fixture: ComponentFixture<NewStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
