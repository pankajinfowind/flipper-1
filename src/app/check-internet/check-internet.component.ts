import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Bootstrapper } from '../common/core/bootstrapper.service';
import { CurrentUser } from '../common/auth/current-user';
import { GlobalVariables } from '../common/core/global-variables';

@Component({
  selector: 'app-check-internet',
  templateUrl: './check-internet.component.html',
  styleUrls: ['./check-internet.component.scss']
})
export class CheckInternetComponent implements OnInit {

  constructor(private router: Router,private bootstrapper: Bootstrapper,public auth:CurrentUser, public v: GlobalVariables) { 
   
  }

  ngOnInit() {
   
  }
  retry(){
    if(this.isInternetConnection()){
      this.init_app();
    this.goTo();
    }

  }
  goTo(){
   
    if (this.auth.hasBusiness) {
        if(this.auth.isAdmin()){
          this.v.webTitle('Admin');
          localStorage.setItem('active_menu','dashboard');
          return this.router.navigate(["admin"]);
        }
    }else{
      this.v.webTitle('Create Business/Company');
      return this.router.navigate(["customer"]);
    }

  }

  
   init_app() {
    return  this.bootstrapper.bootstrap();
  }
 
  isInternetConnection() {
    var isOnLine = navigator.onLine;
     if (isOnLine) {
        return true;
     } else {
       return false;
     }
  }
}

