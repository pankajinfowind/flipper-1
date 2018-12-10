// import { async } from "@angular/core/testing";

// import { EmailVerifyComponent } from "./email-verify.component";
// import { Settings } from "../../../core/config/settings.service";
// import { AuthService } from "../../auth.service";
// import { GlobalVariables } from "../../../core/global-variables";
// import { ElectronService } from "ngx-electron";

// class MockedAuthService extends AuthService {}
// class MockedSettings extends Settings {
//   m: string;
//   public set(name: string) {
//     this.m = "auth";
//   }
//   public get(name: string) {
//     return this.m;
//   }
// }
// class MockedGlobalVariable extends GlobalVariables {}
// class MockedElectronService extends ElectronService {}
// class MockedApiService {}
// class MockedAppHttpClient {}
// class MockedCurrentUser {}
// class MockedRouter {}
// class MockedActivatedRoute {}
// class MockedToast {}
// class MockedZone {}
// class MockedLocalStorage {}
// describe("VerifyEmailComponent", () => {
//   let component: EmailVerifyComponent;
//   // create new instance of FormBuilder

//   let setting: MockedSettings;
//   let auth: MockedAuthService;
//   let v: MockedGlobalVariable;
//   let api: MockedApiService;
//   let e: MockedElectronService;
//   let httpclient: MockedAppHttpClient;
//   let currentUser: MockedCurrentUser;
//   let router: MockedRouter;
//   let activatedRoute: MockedActivatedRoute;
//   let toast: MockedToast;
//   let zone: MockedZone;
//   let localStorage: MockedLocalStorage;

//   beforeEach(async(() => {
//     setting = new MockedSettings();
//     auth = new MockedAuthService();
//     e = new MockedElectronService();
//     v = new MockedGlobalVariable();
//     component = new EmailVerifyComponent(setting, auth, v, e);
//   }));
//   afterEach(() => {
//     auth = null;
//     e = null;
//     component = null;
//   });

//   it("should create", () => {
//     expect(component).toBeTruthy();
//   });
// });
