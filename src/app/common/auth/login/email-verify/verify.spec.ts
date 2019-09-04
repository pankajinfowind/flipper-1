import { async, TestBed } from "@angular/core/testing";

import { NgZone } from "@angular/core";
import { EmailVerifyComponent } from "./email-verify.component";

import { Settings } from "../../../core/config/settings.service";
import { GlobalVariables } from "../../../core/global-variables";
// import { ElectronService } from "ngx-electron";
import { Router, ActivatedRoute } from "@angular/router";
import { RouterTestingModule } from "@angular/router/testing";
import { ApiService } from "../../../../api/api.service";
import { AuthService } from "../../auth.service";
import { AppHttpClient } from "../../../core/http/app-http-client.service";
import { CurrentUser } from "../../current-user";
import { Toast } from "../../../core/ui/toast.service";
import { YLocalStorage } from "../../../classes/local-storage";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpModule } from "../../../core/http/http.module";
import { CommonModule } from "@angular/common";
import { MatSnackBarModule } from "@angular/material";
import { NgxModelModule } from "ngx-model";

//level up testing
// 1)
// let fakeService= {
//   getData: ()=> Observable.of('me');
// }

// 2)
// let fakeService =  jasmine.createSpyObj('jService',['data']);
//faktService.getData.and.returnValue(Observable.of('data'));
// or
// spyOn(fakeService,'getData').and.returnValue(Observable.of('data'))
//expect(fakeService.getData).toHaveBeenCalled()

describe("VerifyEmailComponent", () => {
  let component: EmailVerifyComponent;
  let setting: Settings;
  let auth: AuthService;
  let v: GlobalVariables;
  let api: ApiService;
  // let e: ElectronService;
  let httpclient: AppHttpClient;
  let currentUser: CurrentUser;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let toast: Toast;
  let zone: NgZone;
  let localStorage: YLocalStorage;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EmailVerifyComponent, 
        // ElectronService
      ],
      imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule,
        RouterTestingModule,
        MatSnackBarModule,
        NgxModelModule
      ]
    });
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [EmailVerifyComponent],
      imports: [ReactiveFormsModule, FormsModule]
    });
    setting = new Settings();

    auth = new AuthService(
      httpclient,
      currentUser,
      router,
      activatedRoute,
      toast,
      zone,
      v,
      api,
      localStorage,
      setting
    );
    // e = new ElectronService();
    // v = new GlobalVariables();
    //tip: I can do new EmailVerifyComponent(null);
    component = new EmailVerifyComponent(setting, auth, v, e);
  }));
  it("should create EmailVerifyComponent", () => {
    expect(component).toBeTruthy();
  });
  it("should call verifyEmail Function", () => {
    // spyOn(component, "emailVerify").and.returnValues(true);
    // spyOn(auth, "verifyUserEmail").and.returnValue(true);
    expect(component.emailVerify()).toBeTruthy();
  });
});
