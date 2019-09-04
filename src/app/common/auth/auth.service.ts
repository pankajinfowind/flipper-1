import { Injectable, NgZone } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { CurrentUser } from "./current-user";
import { Toast } from "../core/ui/toast.service";
import { User } from "../core/types/models/User";
import { Observable } from "rxjs";
import { Settings } from "../core/config/settings.service";
import { AppHttpClient } from "../core/http/app-http-client.service";
import { ApiService } from "../../api/api.service";
import { YLocalStorage } from "../classes/local-storage";
import { GlobalVariables } from "../core/global-variables";
import { BootstrapData } from '../core/bootstrapper.service';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  /**
   * Route users should be redirected to after successful login.
   */
  protected redirectUri: string;

  /**
   * Route admins should be redirected to after successful login.
   */
  protected adminRedirectUri: string;

  /**
   * AuthService Constructor.
   */
  constructor(
    protected httpClient: AppHttpClient = null,
    protected currentUser: CurrentUser = null,
    protected router: Router = null,
    protected route: ActivatedRoute = null,
    protected toast: Toast = null,
    protected zone: NgZone = null,
    private v: GlobalVariables = null,
    private api: ApiService = null,
    private localstorage: YLocalStorage = null,
    protected config: Settings = null
  ) {
    this.redirectUri = this.config.get("vebto.auth.redirectUri");
    this.adminRedirectUri = this.config.get("vebto.auth.adminRedirectUri");
  }

  /**
   * Log user in with specified credentials.
   */
  public login(credentials: Object): Observable<any> {
    this.httpClient.prefix = "secure";
    return this.httpClient.post("auth/login", credentials);
  }
  /**
   * Verify user email before login.
   */
  public verifyUserEmail(credentials: Object): Observable<any> {
    this.httpClient.prefix = "secure";
    return this.httpClient.post("verify/email", credentials);
  }

  /**
   * Register a new user.
   */
  public register(
    credentials: Object
  ): Observable<{ data?: User; type?: string }> {
    return this.httpClient.post("auth/register", credentials);
  }

  /**
   * Log current user out.
   */
  public logOut() : Observable<any> {
    this.httpClient.prefix = "secure";
    let parms={logout:true};
    return this.httpClient.post("auth/logout",parms);
  }

  /**
   * Send password reset link to user via email.
   */
  public sendPasswordResetLink(
    credentials: Object
  ): Observable<{ data: string }> {
    return this.httpClient.post("auth/password/email", credentials);
  }

  /**
   * Reset user password.
   */
  public resetPassword(credentials: Object): Observable<{data:any}> {
    return this.httpClient.post("auth/password/reset", credentials);
  }

  /**
   * Get URI user should be redirect to after login.
   */
  public getRedirectUri(): string {
    if (this.currentUser.redirectUri) {
      const uri = this.currentUser.redirectUri;
      this.currentUser.redirectUri = null;
      return uri;
    } else if (this.currentUser.isAdmin()) {
      return this.adminRedirectUri;
    } else {
      return this.redirectUri;
    }
  }

  //TOO: i kept their login and tried to embed our own logic too! try to find common ground

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
      return this.router.navigate(["login"], {
        queryParams: { redirect: this.localstorage.get("redirect_url") }
      });
    }
  }
  getLoggedUser() {
    return this.api.getLoggedUser(this.getToken());
  }
  // logout() {
  //   this.clearAll();
  // }
  clearAll() {
    this.localstorage.remove("auth_token");
    this.localstorage.remove("redirect_url");
    if (this.localstorage.get("redirect_url")) {
      this.localstorage.remove("redirect_url");
    }
    this.router.navigate(["login"]);
  }
}
