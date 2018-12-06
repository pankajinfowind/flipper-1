import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { ItemsComponent } from "./items.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("ItemsComponent", () => {
  let component: ItemsComponent;
  let fixture: ComponentFixture<ItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
