import { Injectable } from "@angular/core";
// import { Methods } from "../classes/method";

// import { GlobalVariables } from "../classes/global-variables";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  getLoggedUser(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  // constructor(private method: Methods, public v: GlobalVariables) {}
  // emailVerifying(data) {
  //   return this.method.post("/api/auth/user_verify", data);
  // }
  // resetforgettenPassword(data) {
  //   return this.method.post("/api/auth/reset_password", data);
  // }
  // checkToken(reset_token) {
  //   return this.method.post("/api/auth/reset_password", {
  //     reset_pass_token: reset_token
  //   });
  // }
  // passwordVerifying(data, auth_token) {
  //   return this.method.post("/api/auth/login", data, auth_token);
  // }
  // sendLinkToResetPassword(data, auth_token) {
  //   return this.method.post(
  //     "/api/auth/send_resetpassword_link",
  //     data,
  //     auth_token
  //   );
  // }
  // signUp(data) {
  //   return this.method.post("/api/auth/register", data);
  // }
  // logout(auth_token) {
  //   return this.method.get("/api/auth/logout", auth_token);
  // }
  // getLoggedUser(auth_token) {
  //   return this.method.get("/api/auth/user", auth_token);
  // }
}
