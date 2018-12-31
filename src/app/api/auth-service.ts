import { Injectable } from "@angular/core";

import { Router } from "@angular/router";
import { ApiService } from "../api/api.service";
import { Settings } from "../common/core/config/settings.service";

@Injectable({ providedIn: "root" })
export class AuthService {
  //TODO: make localstorage somethhing and test it too now is mocked
  localstorage: any;
  constructor(
    private v: Settings,
    private myRoute: Router,
    private api: ApiService
  ) {}

  sendToken(token: string) {
    this.localstorage.save("auth_token", token);
    return true;
  }

  setRedirectUrl(url) {
    if (url) {
      this.localstorage.save("redirect_url", url);
    }
  }
  getRedirectUrl() {
    return this.localstorage.get("redirect_url");
  }
  getToken() {
    return this.localstorage.get("auth_token");
  }

  isLoggednIn() {
    return this.localstorage.get("auth_token") !== null;
  }
  checkSession() {
    if (!this.isLoggednIn()) {
      return this.myRoute.navigate(["sign-in"], {
        queryParams: { redirect: this.localstorage.get("redirect_url") }
      });
    }
  }
  getLoggedUser() {
    // return this.api.getLoggedUser(this.getToken());
  }

  logout() {}
  clearAll() {
    this.localstorage.remove("auth_token");
    this.localstorage.remove("redirect_url");
    if (this.localstorage.get("redirect_url")) {
      this.localstorage.remove("redirect_url");
    }
    this.myRoute.navigate(["sign-in"]);
  }
}
