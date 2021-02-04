import { Component, OnInit, NgZone } from '@angular/core'
import { CurrentUser } from '../core/guards/current-user'
import { ElectronService } from '../core/services'
import { trigger, transition, useAnimation } from '@angular/animations'
import {
  CurrentBusinessEvent,
  fadeInAnimation,
  PouchConfig,
  PouchDBService,
  UserLoggedEvent,
} from '@enexus/flipper-components'
import { FlipperEventBusService } from '@enexus/flipper-event'
import { environment } from '../../environments/environment'
import { PusherService } from '../pusher.service'
import { Router } from '@angular/router'
declare const Pusher: any

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('insertLogin', [transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '1s' } }))]),
  ],
})
export class LoginComponent implements OnInit {
  user: Array<any>
  qrcode: any
  pushers: any
  flipperPlan = []
  loginApproved: any
  constructor(
    private pusher: PusherService,
    private eventBus: FlipperEventBusService,
    private database: PouchDBService,
    public currentUser: CurrentUser,
    private ngZone: NgZone,
    public electronService: ElectronService
  ) {
    this.database.connect(PouchConfig.bucket)

    this.eventBus
      .of<CurrentBusinessEvent>(CurrentBusinessEvent.CHANNEL)
      .subscribe(res => (this.currentUser.currentBusiness = res.business))
  }
  ngOnInit() {
    // localStorage.setItem('loggedin','false');

    this.qrcode = Date.now()
    // use Qr code to log in
    this.pushers = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: environment.pusher.cluster,
    })
    this.loginApproved = this.pushers.subscribe('login-flipper.' + this.qrcode)

    this.loginApproved.bind('event-login-flipper.' + this.qrcode, async event => {
      if (event) {
        const user = {
          name: event.name,
          email: event.email,
          active: true,
          createdAt: null,
          token: event.personal_token,
          id: event.id.toString(),
          userId: event.id.toString(),
          table: 'users',
          channels: [event.id.toString()]
        }
        localStorage.setItem('token',user.token);

        await this.currentUser.configAuthUser(user.id);
        this.eventBus.publish(new UserLoggedEvent(user))

      }
    })
    // end of deal here
  }
  userLogin() {
    this.electronService.ipcRenderer.send('sent-login-message', environment.appUrl)
  }
  getStaredNewToFlipper() {
    this.electronService.redirect('https://flipper.yegobox.com')
  }
}
