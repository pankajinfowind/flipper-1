import { Component, OnInit, NgZone } from '@angular/core';
import { CurrentUser } from '../core/guards/current-user';
import { ElectronService } from '../core/services';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInAnimation, PouchConfig, PouchDBService, UserLoggedEvent } from '@enexus/flipper-components';
import { FlipperEventBusService } from '@enexus/flipper-event';
import { filter } from 'rxjs/internal/operators';


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
  user: Array<any>;
  flipperPlan=[];
  today=new Date();

  constructor(private eventBus: FlipperEventBusService, private database: PouchDBService,
              public currentUser: CurrentUser, private ngZone: NgZone, public electronService: ElectronService) {
              this.database.connect(PouchConfig.bucket);
  }


  ngOnInit() {


  this.eventBus.of<UserLoggedEvent>(UserLoggedEvent.CHANNEL)
      .pipe(filter(e => e.user && (e.user.id !== null || e.user.id !== undefined)))
      .subscribe(res =>
        this.currentUser.currentUser = res.user);

  if (PouchConfig.canSync) {
      this.database.sync(PouchConfig.syncUrl);
    }


  this.electronService.ipcRenderer.on('received-login-message', (event, arg) => {

      this.ngZone.run(async () => {
        if (arg && arg.length > 0) {
          const today= this.today.getFullYear()
          + '-' + ('0' + (this.today.getMonth() + 1)).slice(-2)
           + '-' + ('0' + this.today.getDate()).slice(-2);

          const user = {
            _id: '',
            name: arg[1].replace('%20', ' '),
            email: arg[0].replace('%20', ' '),
            token: arg[3].replace('%20', ' '),
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            id: this.database.uid(),
            userId:arg[4].replace('%20', ' '),
            expiresAt:typeof arg[6] !== 'undefined' || typeof arg[6] !== undefined?Date.parse(arg[6]) as number:today
          };

          localStorage.setItem('channel', arg[4].replace('%20', ' '));
          localStorage.setItem('sessionId', 'b2dfb02940783371ea48881e9594ae0e0eb472d8');
          PouchConfig.Tables.user = 'user_' + localStorage.getItem('channel');

          PouchConfig.channel = localStorage.getItem('channel');

          PouchConfig.sessionId = localStorage.getItem('b2dfb02940783371ea48881e9594ae0e0eb472d8');

          await this.currentUser.user(PouchConfig.Tables.user);

          if (this.currentUser.currentUser) {
            user.id = this.currentUser.currentUser.id;
            user.createdAt = this.currentUser.currentUser.createdAt;
          }

          console.log(user);

          if (this.database.put(PouchConfig.Tables.user, user)) {
            return window.location.href = '/admin';
          }
        }

      });
    });
  }

  userLogin() {
    this.electronService.ipcRenderer.send('sent-login-message', 'someone need to login');
  }


  getStaredNewToFlipper() {
    this.electronService.redirect('https://flipper.rw');
  }


}
