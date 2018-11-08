import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, Validators } from "@angular/forms";

import { ApiService } from "../../api/api.service";

import { AuthService } from "../../api/auth-service";
import { Settings } from "../../common/core/config/flipper-settings.service";
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
    public v: Settings,
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
  }
}
