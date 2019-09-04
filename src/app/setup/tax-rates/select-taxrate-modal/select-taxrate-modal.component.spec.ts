import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectTaxrateModalComponent } from './select-taxrate-modal.component';

describe('SelectTaxrateModalComponent', () => {
  let component: SelectTaxrateModalComponent;
  let fixture: ComponentFixture<SelectTaxrateModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectTaxrateModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectTaxrateModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
