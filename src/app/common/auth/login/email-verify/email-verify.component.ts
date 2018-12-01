import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";

import { AuthService } from "../../auth.service";
import { SocialAuthService } from "../../social-auth.service";
import { Settings } from "../../../core/config/settings.service";
import { GlobalVariables } from "../../global-variables";
import { ApiService } from "../../../../api/api.service";

@Component({
  selector: "app-email-verify",
  templateUrl: "./email-verify.component.html",
  styleUrls: ["./email-verify.component.scss"]
})
export class EmailVerifyComponent implements OnInit {
  emailForm: FormGroup;
  @Input()
  label;
  @Input()
  token;
  @Input()
  appname;
  @Input()
  redirecturl;
  @Output()
  valueChange = new EventEmitter<any>();

  constructor(
    public socialAuth: SocialAuthService,
    public settings: Settings,
    private auth: AuthService,
    private api: ApiService,
    public v: GlobalVariables
  ) {
    this.v.loading = false;
    this.v.webTitle("Sign in - eNexus Accounts");
  }

  ngOnInit() {
    this.emailForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email])
    });
  }
  get email() {
    return this.emailForm.get("email");
  }

  emailVerify() {
    this.v.errorMsg = "";
    if (this.emailForm.valid) {
      this.v.loading = true;
      this.v.response = [];
      console.log(this.settings.csrfToken);
      const data = { email: this.emailForm.value.email };
      this.auth.verifyUserEmail(data).subscribe(
        res => {
          if (res == 422) {
            this.v.loading = false;
            this.v.errorMsg = "email not found";
          }
          this.v.loading = false;
          if (res.data) {
            this.v.response = {
              status: 200,
              message: "enable login",
              user: res["data"],
              next_step: true
            };
            this.valueChange.emit(this.v.response);
          }
        },
        _error => {
          this.v.loading = false;
          this.v.errorMsg = _error.messages.email;
        }
      );
    }
  }
}
