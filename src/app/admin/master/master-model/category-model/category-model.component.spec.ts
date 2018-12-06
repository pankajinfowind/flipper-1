import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { CategoryModelComponent } from "./category-model.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("CategoryModelComponent", () => {
  let component: CategoryModelComponent;
  let fixture: ComponentFixture<CategoryModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryModelComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
