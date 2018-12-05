import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateStockModelComponent } from './update-stock-model.component';

describe('UpdateStockModelComponent', () => {
  let component: UpdateStockModelComponent;
  let fixture: ComponentFixture<UpdateStockModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateStockModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateStockModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
