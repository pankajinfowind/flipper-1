import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../common/auth/current-user';
import { Router } from '@angular/router';
import { GlobalVariables } from '../common/core/global-variables';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(public auth:CurrentUser, private router: Router, public v: GlobalVariables) {

     this.goTo();
  }

  ngOnInit() {
    this.goTo();
  }

  goTo(){
   
    if (this.auth.hasBusiness) {
        if(this.auth.isAdmin()){
          this.v.webTitle('Admin');
          localStorage.setItem('active_menu','dashboard');
          return this.router.navigate(["/admin/analytics"]);
        }
    }else{
      this.v.webTitle('Create Business/Company');
      return this.router.navigate(["/customer"]);
    }

  }
}
