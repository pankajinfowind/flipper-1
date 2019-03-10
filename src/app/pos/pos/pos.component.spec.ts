import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PosComponent } from "./pos.component";
import { PosModule } from "../pos.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("PosComponent", () => {
  let component: PosComponent;
  let fixture: ComponentFixture<PosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PosModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      declarations: []
      //can be used to ignore the nested component
      // schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should toggle on and off side nav", () => {
    // component.toggleLeftColumn(true);
    // expect(component.leftColumnIsHidden).toBeTruthy();
    // component.toggleLeftColumn(false);
    // expect(component.leftColumnIsHidden).toBeFalsy();
  });
});
