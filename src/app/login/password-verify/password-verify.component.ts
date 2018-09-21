import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

import { ApiService } from "../../api/api.service";

import { GlobalVariables } from "../../classes/global-variables";
import { AuthService } from "../../api/auth-service";
@Component({
  selector: "app-password-verify",
  templateUrl: "./password-verify.component.html",
  styleUrls: ["./password-verify.component.scss"]
})
export class PasswordVerifyComponent implements OnInit {
  @Input()
  label;
  @Input()
  token;
  @Input()
  appname;
  @Input()
  redirecturl;
  @Input()
  user;
  @Output()
  valueChange = new EventEmitter<any>();
  form;

  // tslint:disable-next-line:max-line-length
  constructor(
    public v: GlobalVariables,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private api: ApiService,
    private router: Router,
    private auth: AuthService
  ) {
    this.v.loading = false;
    this.form = fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", Validators.required]
    });
    this.v.webTitle("Sign in - eNexus Accounts");
  }

  ngOnInit() {}

  resetPassword() {
    this.v.response = {
      user: this.user,
      next_step: false,
      rest_password: true
    };
    this.valueChange.emit(this.v.response);
  }
  PasswordVerify() {
    this.v.errorMsg = "";
    this.v.loading = true;
    this.v.response = [];
    const data = {
      email: this.user.email,
      password: this.form.value.password,
      remember: true
    };
    // this.api.passwordVerifying(data, this.user.auth_token).subscribe(
    //   res => {
    //     this.v.loading = false;
    //     if (res) {
    //       //  this.localstorage.save('u_list', {'e_unique': res['email'], 'u_avatar': res['avatar_url']});
    //       //  this.localstorage.save('redirect_url', this.v.redirectUrl);
    //       if (this.auth.sendToken(this.user.auth_token)) {
    //         this.v.redirectUrl =
    //           this.route.snapshot.queryParams["redirect"] || "box/my-box/root";
    //         return this.router.navigate([this.v.redirectUrl]);
    //       }
    //     }
    //   },
    //   _error => {
    //     this.v.loading = false;
    //     if (_error.ok === false) {
    //       this.v.errorMsg = _error["error"]["*"]
    //         ? _error["error"]["*"]
    //         : _error["error"].message;
    //       this.v.errorErrors.push({
    //         email:
    //           _error["error"]["errors"] !== undefined
    //             ? _error["error"]["errors"]["email"][0]
    //             : "",
    //         password:
    //           _error["error"]["errors"] !== undefined
    //             ? _error["error"]["errors"]["password"][0]
    //             : ""
    //       });
    //       return;
    //     }
    //   }
    // );
  }
}
