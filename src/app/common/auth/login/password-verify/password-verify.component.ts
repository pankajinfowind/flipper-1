import { Component, OnInit, Input, Output, EventEmitter, Inject } from "@angular/core";
import { MatDialog } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from "@angular/forms";

import { AuthService } from "../../auth.service";
import { SocialAuthService } from "../../social-auth.service";
import { Bootstrapper } from "../../../core/bootstrapper.service";
import { Settings } from "../../../core/config/settings.service";

import { ElectronService } from '../../../core/config/electron.service';
import { DOCUMENT } from '@angular/common';
import { GlobalVariables } from '../../../core/global-variables';

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
  form: FormGroup;
  password_hide = true;
  ipcRenderer: any;
  constructor(
    public socialAuth: SocialAuthService,
    public settings: Settings,
    private bootstrapper: Bootstrapper,
    public v: GlobalVariables,
    public dialog: MatDialog,
    private router: Router,
    private auth: AuthService,
    public electronService: ElectronService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.v.loading = false;
      this.v.webTitle("Sign in");
  }

  ngOnInit() {
    this.form = new FormGroup({
            password: new FormControl("", [Validators.required])
    });
  }
  get password() {
    return this.form.get("password");
  }
  resetPassword() {
    this.v.response = {
      user: this.user,
      next_step: false,
      rest_password: true
    };
    this.valueChange.emit(this.v.response);
  }
  reload() {
    return () => window.location.reload();
  }
  public login() {
    this.v.loading = true;
    this.v.model = {
      email: this.user.email,
      password: this.form.value.password,
      remember: true
    };

    this.auth.login(this.v.model).subscribe(
      response => {
        this.v.loading = false;
        if(response == 422 || response == '422'){
          this.v.errorMsg="These credentials do not match our records. ";

        }
        if(response == 403 || response == '403'){
          this.v.errorMsg="Flipper token unauthorized.(Contact to Flipper Team) ";

        }
        this.bootstrapper.bootstrap(response.data);
        this.router.navigate([""]).then(navigated => {
          this.v.loading = false;
          if (!navigated) {
            this.router.navigate([""]);
          }
        });
      },
      error => {
        this.v.errorMsg="These credentials do not match our records. ";
       // console.log(error)
        this.v.errors = error["messages"];
        this.v.loading = false;
      }
    );
  }
  isElectron = () => {
    return window && window.process && window.process.type;
  };
  public openForgetPassword() {
    if (this.electronService.isElectron) {
       this.electronService.shell.openExternal("https://yegobox.com/login");
    }else{
      this.document.location.href="https://yegobox.com/login";
    }
  }
}
