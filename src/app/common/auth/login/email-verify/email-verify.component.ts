import { Component, OnInit, Input, Output, EventEmitter, Inject } from "@angular/core";
import { FormControl, Validators, FormGroup } from "@angular/forms";
import { GlobalVariables } from "../../../core/global-variables";
import { AuthService } from "../../auth.service";
import { Settings } from "../../../core/config/settings.service";
import { ElectronService } from '../../../core/config/electron.service';
import { DOCUMENT } from '@angular/common';

// import { ElectronService } from "ngx-electron";
@Component({
  selector: "app-email-verify",
  templateUrl: "./email-verify.component.html",
  styleUrls: ["./email-verify.component.scss"]
})
export class EmailVerifyComponent {
  emailForm: FormGroup;
  @Input() label;
  @Input() token;
  @Input() appname;
  @Input() redirecturl;
  @Output() valueChange = new EventEmitter<any>();
  ipcRenderer: any;
  constructor(
    public settings: Settings,
    private auth: AuthService,
    public v: GlobalVariables,
    public electronService: ElectronService,
    @Inject(DOCUMENT) private document: Document,
  ) {
    this.emailForm = new FormGroup({
      email: new FormControl("", [Validators.required, Validators.email])
    });
    this.v.loading = false;
    if (this.electronService.isElectron) {
      this.ipcRenderer.send("version-ping", "ping");
      this.ipcRenderer.on("version-pong", (event, version) => {
        this.v.webTitle("Sign in - eNexus Accounts" + "v" + version);
      });
    } else {
      this.v.webTitle("Sign in - eNexus Accounts");
    }
  }
 


  get email() {
    return this.emailForm.get("email");
  }

  emailVerify() {
    this.v.errorMsg = "";
    if (this.emailForm.valid) {
      this.v.loading = true;
      this.v.response = [];
      const data = { email: this.emailForm.value.email };
      this.auth.verifyUserEmail(data).subscribe(
        res => {
      if(res == 422 || res == '422'){
        this.v.errorMsg="We can't find a user with that e-mail address. ";

      }
      if(res == 403 || res == '403'){
        this.v.errorMsg="Flipper token unauthorized.(Contact to Flipper Team) ";

      }
      //console.log(res);
          this.v.loading = false;
          if (res["data"]) {
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
  public openRegister() {
    if (this.electronService.isElectron) {
       this.electronService.shell.openExternal("https://yegobox.com/register");
    } else{
      this.document.location.href="https://yegobox.com/register";
    }
  }
}
