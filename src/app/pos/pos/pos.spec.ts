import { PosComponent } from "./pos.component";
import { TestBed, ComponentFixture } from "@angular/core/testing";
import { Settings } from "../../common/core/config/settings.service";

describe("POS Service", () => {
  let component: PosComponent;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PosComponent]
    }).overrideComponent(PosComponent, {
      set: {
        providers: [{ provide: Settings, useFactory: Settings }]
      }
    });
    component = new PosComponent(null, null);
  });
  it("should create component", () => {
    expect(component).toBeTruthy();
  });
  it("should init leftColumnIsHidden with false", () => {
    expect(component.leftColumnIsHidden).toBeFalsy();
  });
  it("should init isMobile with false", () => {
    expect(component.isMobile).toBeFalsy();
  });
  it("should toggle on left column", () => {
    component.toggleLeftColumn(true);
    expect(component.leftColumnIsHidden).toBeTruthy();
  });
  it("should taggle of left column", () => {
    component.toggleLeftColumn(false);
    expect(component.leftColumnIsHidden).toBeFalsy();
  });
  it("should alwasy be desktop not mobile", () => {
    component.ngOnInit();
    expect(component.isMobile).toBeFalsy();
  });
});
