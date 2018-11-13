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

  constructor(private auth:CurrentUser, private router: Router, public v: GlobalVariables) {
     this.goTo();
  }

  ngOnInit() {
    this.goTo();
  }

  goTo(){
    if(! this.auth.get('has_business_belongs') ){
      return this.router.navigate(["/customer"]);
    }else{
      if(this.auth.get('roles')['name']=='admin'){
        this.v.webTitle('Admin -Flipper');
        this.router.navigate(["/admin"]);
      }
    }

  }
}
