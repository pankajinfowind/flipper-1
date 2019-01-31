import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {CurrentUser} from '../../../auth/current-user';
import { Router } from '@angular/router';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';
import { ElectronService } from 'ngx-electron';

@Component({
    selector: 'logged-in-user-widget',
    templateUrl: './logged-in-user-widget.component.html',
    styleUrls: ['./logged-in-user-widget.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoggedInUserWidgetComponent  {
  loading:boolean=false;
  ipcRenderer: any;
    constructor(private _electronService: ElectronService,private router: Router, public currentUser: CurrentUser, public auth: AuthService) {
      if (this.isElectron()) {
        this.ipcRenderer = this._electronService.ipcRenderer;
        this.ipcRenderer.send("version-ping", "ping");
        this.ipcRenderer.on("version-pong", (event, version) => {
          //this.v.webTitle("Sign in - eNexus Accounts Setting" + "v" + version);
        });
      } else {
       // this.v.webTitle("Sign in - eNexus Accounts Setting");
      }
    }

    logOut(){
    this.loading=true;
    this.auth.logOut().subscribe(() => {
      this.loading=false;
      this.currentUser.clear();
      this.router.navigate(["/login"]);
    });
  }
  isElectron = () => {
    return window && window.process && window.process.type;
  };
  public openAccountSettings() {
    if (this.isElectron()) {
      this._electronService.shell.openExternal("https://yegobox.com/account/settings");
    }
  }
}
