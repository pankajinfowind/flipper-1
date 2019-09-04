import {Component, ViewEncapsulation, Inject} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {CurrentUser} from '../../../auth/current-user';
import { Router } from '@angular/router';
import { Bootstrapper } from '../../bootstrapper.service';
import { DOCUMENT } from '@angular/common';
import { ElectronService } from '../../config/electron.service';

@Component({
    selector: 'logged-in-user-widget',
    templateUrl: './logged-in-user-widget.component.html',
    styleUrls: ['./logged-in-user-widget.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoggedInUserWidgetComponent  {
  loading:boolean=false;
  ipcRenderer: any;
    constructor(private bootstrapper: Bootstrapper,
      public electronService: ElectronService,
       @Inject(DOCUMENT) private document: Document,
      private router: Router, public currentUser: CurrentUser, public auth: AuthService) {
       
      }
    

    logOut(){
    this.loading=true;
    this.auth.logOut().subscribe(
      response =>  {
      this.loading=false;
      this.currentUser.clear();
      this.bootstrapper.bootstrap(response.data);
      this.router.navigate(["/login"]);
    });
  }
  isElectron = () => {
    return window && window.process && window.process.type;
  };
  public openAccountSettings() {
    if (this.electronService.isElectron) {
       this.electronService.shell.openExternal("https://yegobox.com/account/settings");
    }else{
      this.document.location.href="https://yegobox.com/account/settings";
    }
  }
}
