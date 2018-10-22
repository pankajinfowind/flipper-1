import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { MatDialog } from "@angular/material";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { ApiService } from "../../api/api.service";
import { GlobalVariables } from "../../classes/global-variables";

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
      document.querySelector("form").disabled = true;
      const data = { email: this.emailForm.value.email };
      // this.api.emailVerifying(data).subscribe(
      //   res => {
      //     this.v.loading = false;
      //     document.querySelector("form").disabled = false;
      //     if (res["response"]) {
      //       if (res["data"] && res["status"] === 200) {
      //         this.v.response = {
      //           status: res["status"],
      //           message: res["message"],
      //           user: res["data"]["user"],
      //           next_step: true
      //         };
      //         this.valueChange.emit(this.v.response);
      //       }
      //     } else {
      //       this.v.response = {
      //         status: res["status"],
      //         message: res["message"],
      //         erros: res["errors"],
      //         next_step: false
      //       };
      //       this.v.errorMsg = res["errors"]["message"];
      //       this.valueChange.emit(this.v.response);
      //     }
      //   },
      //   _error => {
      //     this.v.loading = false;
      //     if (_error["status"] === 500) {
      //       this.v.errorMsg = _error["statusText"];
      //     }
      //   }
      // );
    }
  }
}
