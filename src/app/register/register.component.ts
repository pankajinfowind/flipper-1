import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { ApiService } from "../api/api.service";
import { MatDialog } from "@angular/material";
import { Settings } from "../common/core/config/flipper-settings.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"]
})
export class RegisterComponent implements OnInit {
  // Gender list for the select control element
  appname = "Yegobox";
  password_hide = true;
  cfm_password_hide = true;
  signupForm: FormGroup;
  // Property for the user

  constructor(
    private fb: FormBuilder,
    private api: ApiService,
    public dialog: MatDialog,
    public v: Settings
  ) {
    this.v.loading = false;
    this.v.doesMatchPassword = false;
    this.v.webTitle("Sign Up - eNexus Accounts");
  }

  ngOnInit() {
    this.signupForm = new FormGroup({
      firstname: new FormControl("", [Validators.required]),
      lastname: new FormControl("", [Validators.required]),
      email: new FormControl("", [Validators.required, Validators.email]),
      gender: new FormControl("", [Validators.required]),
      country: new FormControl("", [Validators.required]),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]),
      confpassword: new FormControl("", [
        Validators.required,
        Validators.minLength(6)
      ]),
      agree_term_condition: new FormControl(true),
      phone: new FormControl()
    });
  }
  get firstname() {
    return this.signupForm.get("firstname");
  }
  get lastname() {
    return this.signupForm.get("lastname");
  }
  get email() {
    return this.signupForm.get("email");
  }
  get gender() {
    return this.signupForm.get("gender");
  }
  get country() {
    return this.signupForm.get("country");
  }
  get password() {
    return this.signupForm.get("password");
  }
  get confpassword() {
    return this.signupForm.get("confpassword");
  }

  onAccountInfoSubmit() {
    this.v.doesMatchPassword = false;
    if (this.signupForm.valid) {
      if (
        this.signupForm.value.password !== this.signupForm.value.confpassword
      ) {
        this.v.doesMatchPassword = true;
        return;
      }
      this.v.loading = true;
      // this.v.user = this.signupForm.value;
      // this.api.signUp(this.v.user).subscribe(
      //   res => {
      //     this.v.loading = false;
      //     if (res["response"] === false) {
      //       this.v.error_errors.push({
      //         email:
      //           res["errors"]["email"] !== undefined
      //             ? res["errors"]["email"][0]
      //             : "",
      //         password:
      //           res["errors"]["password"] !== undefined
      //             ? res["errors"]["password"][0]
      //             : ""
      //       });
      //       return;
      //     } else {
      //       console.log(res);
      //     }
      //   },
      //   _error => {
      //     this.v.loading = false;
      //     console.log(_error);
      //   }
      // );
    }
  }
}
