import {Component, ViewEncapsulation} from '@angular/core';
import {AuthService} from '../../../auth/auth.service';
import {CurrentUser} from '../../../auth/current-user';
import { Router } from '@angular/router';
import { constructDependencies } from '@angular/core/src/di/reflective_provider';

@Component({
    selector: 'logged-in-user-widget',
    templateUrl: './logged-in-user-widget.component.html',
    styleUrls: ['./logged-in-user-widget.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoggedInUserWidgetComponent  {
  loading:boolean=false;
    constructor(private router: Router, public currentUser: CurrentUser, public auth: AuthService) {}

    logOut(){
    this.loading=true;
    this.auth.logOut().subscribe(() => {
      this.loading=false;
      this.currentUser.clear();
      this.router.navigate(["/login"]);
    });
  }
}
