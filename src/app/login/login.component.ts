import { Component, OnInit, Inject, NgZone } from '@angular/core';
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

  constructor(private router: Router, public currentUser: CurrentUser,private ngZone: NgZone, public electronService: ElectronService) {
    this.electronService.ipcRenderer.on('received-login-message', (event, arg) => {
      this.ngZone.run(() => {
        if(arg && arg.length > 0) {

           if (this.currentUser.user()) {
            this.currentUser.updateUser({  name: arg[1].replace('%20', ' '),
              email: arg[0].replace('%20', ' '),
              token: arg[3].replace('%20', ' '), active: true }, this.currentUser.user().id);
          } else {
            this.currentUser.insertUser({
              name: arg[1].replace('%20', ' '),
              email: arg[0].replace('%20', ' '),
              token: arg[3].replace('%20', ' '),
              active: true
            });
          }
           this.router.navigate(['/admin']);
        }
      });
  });
  }

  ngOnInit() { }

  userLogin() {
    this.electronService.ipcRenderer.send('sent-login-message', 'ganza need to login');

  }

  getStaredNewToFlipper() {
    this.electronService.redirect('https://flipper.rw');
  }


}
