import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosSearchBarComponent } from './pos-search-bar.component';

describe('PosSearchBarComponent', () => {
  let component: PosSearchBarComponent;
  let fixture: ComponentFixture<PosSearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosSearchBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosSearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
