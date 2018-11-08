import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormBuilder,
  Validators,
  FormGroup,
  FormControl
} from "@angular/forms";
import { ApiService } from "../../api/api.service";
@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  loading = false;
  checked = false;
  response = {};
  error_msg = "";
  form;
  is_token_expired: boolean;
  does_match_password: boolean;
  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private api: ApiService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.checkToken();
    this.form = new FormGroup({
      password: new FormControl("", [Validators.required]),
      repeatPassword: new FormControl("", [Validators.required])
    });
  }
  get password() {
    return this.form.get("password");
  }
  get repeatPassword() {
    return this.form.get("repeatPassword");
  }
  changePassword() {
    this.does_match_password = false;
    if (this.form.valid) {
      if (this.form.value.password !== this.form.value.repeatPassword) {
        this.does_match_password = true;
        return;
      }
      this.error_msg = "";
      this.loading = true;
      const data = {
        reset_pass_token: this.route.snapshot.params.token,
        password: this.form.value.password
      };
    }
  }

  checkToken() {
    this.loading = true;
  }
}
