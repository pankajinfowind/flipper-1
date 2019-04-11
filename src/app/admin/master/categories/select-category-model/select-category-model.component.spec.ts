import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectCategoryModelComponent } from './select-category-model.component';

describe('SelectCategoryModelComponent', () => {
  let component: SelectCategoryModelComponent;
  let fixture: ComponentFixture<SelectCategoryModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectCategoryModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectCategoryModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
