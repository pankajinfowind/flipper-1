import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCategoriesComponent } from './item-categories.component';

describe('ItemCategoriesComponent', () => {
  let component: ItemCategoriesComponent;
  let fixture: ComponentFixture<ItemCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
