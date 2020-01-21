import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUser } from '../core/guards/current-user';
import { ElectronService } from '../core/services';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInAnimation } from '@enexus/flipper-components';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('insertLogin', [
      transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '1s' } }))
    ]),
  ],
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, public currentUser: CurrentUser, public electronService: ElectronService) {
  }

  ngOnInit() { }

  userLogin() {

    if (this.currentUser.userById(1)) {
      this.currentUser.updateUser({ token: 'zsaas', active: true }, this.currentUser.userById(1).id);
    } else {
      this.currentUser.insertUser({
        name: 'Ganza respice',
        email: 'respinho2014@gmail.com',
        token: 'dxmsdeod',
        active: true
      });
    }
    this.router.navigate([this.currentUser.getRedirectUri()]);

    this.electronService.redirect('https://yegobox.com/login');
  }

  getStaredNewToFlipper() {
    this.electronService.redirect('https://flipper.rw');
  }


}
