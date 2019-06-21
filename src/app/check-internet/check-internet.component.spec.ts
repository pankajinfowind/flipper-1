import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInternetComponent } from './check-internet.component';

describe('CheckInternetComponent', () => {
  let component: CheckInternetComponent;
  let fixture: ComponentFixture<CheckInternetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInternetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInternetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
