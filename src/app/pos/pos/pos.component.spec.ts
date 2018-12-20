import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { PosComponent } from "./pos.component";
import { PosModule } from "../pos.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterTestingModule } from "@angular/router/testing";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { PosModelService } from '../pos-model.service';

describe("PosComponent", () => {
  let component: PosComponent;
  let fixture: ComponentFixture<PosComponent>;
  let posService = jasmine.createSpyObj("PosModelService", [
    "dummy"
  ]);
  let pos: PosModelService;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PosModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: PosModelService, useValue: posService }
      ]
    });
  }));
  beforeEach(() => {
    pos = TestBed.get(PosModelService);
    fixture = TestBed.createComponent(PosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
