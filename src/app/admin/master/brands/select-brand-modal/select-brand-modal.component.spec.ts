import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectBrandModalComponent } from './select-brand-modal.component';

describe('SelectBrandModalComponent', () => {
  let component: SelectBrandModalComponent;
  let fixture: ComponentFixture<SelectBrandModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectBrandModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectBrandModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
