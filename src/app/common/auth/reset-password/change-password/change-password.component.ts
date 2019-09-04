import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Validators, FormGroup, FormControl } from "@angular/forms";
import { AuthService } from "../../auth.service";
import { Settings } from "../../../core/config/settings.service";
import { CurrentUser } from "../../current-user";
import { Toast } from "../../../core/ui/toast.service";
import { GlobalVariables } from "../../global-variables";
import { BootstrapData, Bootstrapper } from '../../../core/bootstrapper.service';

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  loading = false;
  checked = false;
  response = {};
  error_token = "";

  error_pass = "";
  error_email = "";
  form;
  is_token_expired: boolean;
  does_match_password: boolean;
  password_hide = true;
  password_confirmation_hide = true;
  constructor(
    public settings: Settings,
    private toast: Toast,
    private user: CurrentUser,
    public v: GlobalVariables,
    private auth: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private bootstrapper: Bootstrapper,
  ) {}
  ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email]),
      password: new FormControl("", [Validators.required]),
      password_confirmation: new FormControl("", [Validators.required])
    });
  }
  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }
  get password_confirmation() {
    return this.form.get("password_confirmation");
  }

  changePassword() {
    this.does_match_password = false;
    if (this.form.valid) {
      if (this.form.value.password !== this.form.value.password_confirmation) {
        this.does_match_password = true;
        return;
      }
      this.error_email = "";
      this.error_pass = "";
      this.error_token = "";
      this.loading = true;
      const data = {
        token: this.route.snapshot.params.token,
        password: this.form.value.password,
        email: this.form.value.email,
        password_confirmation: this.form.value.password_confirmation
      };
      this.auth.resetPassword(data).subscribe(
        response  => {
          this.loading = false;
          this.toast.open("Your password has been reset.");
          this.bootstrapper.bootstrap(response.data);
          this.router.navigate([this.auth.getRedirectUri()]);

          return window.location.reload();
        },
        _error => {
          this.loading = false;
          this.error_pass = _error.messages.password
            ? _error.messages.password
            : "";
          this.error_email = _error.messages.email ? _error.messages.email : "";
          this.error_token = _error.messages.token ? _error.messages.token : "";
        }
      );
    }
  }
}
