import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemModelComponent } from "./item-model.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("ItemModelComponent", () => {
  let component: ItemModelComponent;
  let fixture: ComponentFixture<ItemModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemModelComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
