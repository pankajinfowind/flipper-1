import { Component, OnInit, NgZone } from '@angular/core';
import { CurrentUser } from '../core/guards/current-user';
import { ElectronService } from '../core/services';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInAnimation, PouchConfig, PouchDBService, UserLoggedEvent } from '@enexus/flipper-components';
import { FlipperEventBusService } from '@enexus/flipper-event';
import { filter } from 'rxjs/internal/operators';
import { environment } from '../../environments/environment';
import { PusherService } from '../pusher.service';
declare const Pusher: any;


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
  qrcode: any;
  pushers: any;
  flipperPlan = [];
  loginApproved: any;
  constructor(
    private pusher: PusherService,
    private eventBus: FlipperEventBusService, private database: PouchDBService,
    public currentUser: CurrentUser, private ngZone: NgZone, public electronService: ElectronService) {
    this.database.connect(PouchConfig.bucket);
  }
  ngOnInit() {
    this.qrcode = 'code23';
    // this.qrcode = Date.now();
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
          const user = {
            _id: '',
            name: arg[1].replace('%20', ' '),
            email: arg[0].replace('%20', ' '),
            token: arg[3].replace('%20', ' '),
            active: true,
            createdAt: new Date(),
            updatedAt: new Date(),
            id: this.database.uid(),
            userId: arg[4].replace('%20', ' '),
            expiresAt: Date.parse(arg[6]) as number
          };
          window.localStorage.setItem('channel', arg[4].replace('%20', ' '));
          window.localStorage.setItem('sessionId', 'b2dfb02940783371ea48881e9594ae0e0eb472d8');
          PouchConfig.Tables.user = 'user_' + window.localStorage.getItem('channel');
          PouchConfig.channel = window.localStorage.getItem('channel');
          PouchConfig.sessionId = window.localStorage.getItem('b2dfb02940783371ea48881e9594ae0e0eb472d8');
          await this.currentUser.user(PouchConfig.Tables.user);
          if (this.currentUser.currentUser) {
            user.id = this.currentUser.currentUser.id;
            user.createdAt = this.currentUser.currentUser.createdAt;
          }
          if (this.database.put(PouchConfig.Tables.user, user)) {
            return window.location.href = '/admin';
          }
        }
      });
    });

    // use Qr code to log in
    this.pushers = new Pusher(environment.pusher.key,
      {
        cluster: environment.pusher.cluster,
        encrypted: environment.pusher.cluster,
      });
    this.loginApproved = this.pushers.subscribe('login-flipper.' + this.qrcode);

    this.loginApproved.bind('event-login-flipper.' + this.qrcode, async (event) => {

      if (event) {
        console.log("data", event.name);
        const user = {
          _id: '',
          name: event.name,
          email: event.email,
          token: event.personal_token,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          id: this.database.uid(),
          userId: event.id,
          expiresAt: event.expiresAt as number
        };
        window.localStorage.setItem('channel', event.id); //event.id is the userId
        window.localStorage.setItem('sessionId', 'b2dfb02940783371ea48881e9594ae0e0eb472d8');
        PouchConfig.Tables.user = 'user_' + window.localStorage.getItem('channel');
        PouchConfig.channel = window.localStorage.getItem('channel');
        PouchConfig.sessionId = window.localStorage.getItem('b2dfb02940783371ea48881e9594ae0e0eb472d8');
        await this.currentUser.user(PouchConfig.Tables.user);
        if (this.currentUser.currentUser) {
          user.id = this.currentUser.currentUser.id;
          user.createdAt = this.currentUser.currentUser.createdAt;
        }
        if (this.database.put(PouchConfig.Tables.user, user)) {
          return window.location.href = '/admin';
        }
      }
    });
    // end of deal here
  }
  userLogin() {
    this.electronService.ipcRenderer.send('sent-login-message', environment.appUrl);
  }
  getStaredNewToFlipper() {
    this.electronService.redirect('https://flipper.rw');
  }
}