import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BestSellerReportsComponent } from './best-seller-reports.component';

describe('BestSellerReportsComponent', () => {
  let component: BestSellerReportsComponent;
  let fixture: ComponentFixture<BestSellerReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BestSellerReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BestSellerReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
