import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { NewBusinessComponent } from "./new-business.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("NewBusinessComponent", () => {
  let component: NewBusinessComponent;
  let fixture: ComponentFixture<NewBusinessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewBusinessComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBusinessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
