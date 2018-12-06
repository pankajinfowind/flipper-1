import { async } from "@angular/core/testing";

import { NgZone } from "@angular/core";
import { EmailVerifyComponent } from "./email-verify.component";

import { Settings } from "../../../core/config/settings.service";

import { GlobalVariables } from "../../../core/global-variables";
import { ElectronService } from "ngx-electron";
import { Router, ActivatedRoute } from "@angular/router";
import { ApiService } from "../../../../api/api.service";
import { AuthService } from "../../auth.service";
import { AppHttpClient } from "../../../core/http/app-http-client.service";
import { CurrentUser } from "../../current-user";
import { Toast } from "../../../core/ui/toast.service";
import { YLocalStorage } from "../../../classes/local-storage";

describe("VerifyEmailComponent", () => {
  let component: EmailVerifyComponent;
  let setting: Settings;
  let auth: AuthService;
  let v: GlobalVariables;
  let api: ApiService;
  let e: ElectronService;
  let httpclient: AppHttpClient;
  let currentUser: CurrentUser;
  let router: Router;
  let activatedRoute: ActivatedRoute;
  let toast: Toast;
  let zone: NgZone;
  let localStorage: YLocalStorage;

  beforeEach(async(() => {
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
    e = new ElectronService();
    v = new GlobalVariables();
    component = new EmailVerifyComponent(setting, auth, v, e);
  }));
  afterEach(() => {
    auth = null;
    e = null;
    component = null;
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
