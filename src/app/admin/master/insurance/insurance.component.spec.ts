import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { InsuranceComponent } from "./insurance.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("InsuranceComponent", () => {
  let component: InsuranceComponent;
  let fixture: ComponentFixture<InsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [InsuranceComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
