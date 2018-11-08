import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { ApiService } from "../../api/api.service";
import { Settings } from "../../common/core/config/flipper-settings.service";

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
  public socialAuth: any;
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
    public v: Settings
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
      document.querySelector("form").disabled = true;
      const data = { email: this.emailForm.value.email };
    }
  }
}
