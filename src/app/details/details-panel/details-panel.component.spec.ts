import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { DetailsPanelComponent } from "./details-panel.component";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";

describe("DetailsPanelComponent", () => {
  let component: DetailsPanelComponent;
  let fixture: ComponentFixture<DetailsPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DetailsPanelComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
