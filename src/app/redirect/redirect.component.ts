import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../common/auth/current-user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private auth:CurrentUser, private router: Router) {
     this.goTo();
  }

  ngOnInit() {
    this.goTo();
  }

  goTo(){
    console.log(this.auth.get('roles'));
    if(this.auth.get('roles')['name']=='admin'){
      this.router.navigate(["/admin"]);
    }
  }
}
