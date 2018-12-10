import { DashboardComponent } from "./dashboard.component";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { AdminModule } from "../admin.module";
import { NgxElectronModule } from "ngx-electron";

describe("DashboardComponent", () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AdminModule, NgxElectronModule]
    });
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
