import { Injectable } from '@angular/core'
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad,
  Route,
} from '@angular/router'
import { CurrentUser } from './current-user'
import { FlipperEventBusService } from '@enexus/flipper-event'
import { filter } from 'rxjs/internal/operators'
import { UserSubscriptionEvent } from '@enexus/flipper-components'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class HasSubscribedGuard implements CanActivate {
  today = new Date()
  constructor(private eventBus: FlipperEventBusService, private currentUser: CurrentUser, private router: Router) {
    this.eventBus
      .of<UserSubscriptionEvent>(UserSubscriptionEvent.CHANNEL)
      .pipe(filter(e => e.subscription && e.subscription.didSubscribed))
      .subscribe(res => (this.currentUser.currentSubscription = res.subscription))
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.handle(state.url)
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.handle(state.url)
  }
  canLoad(route: Route) {
    return this.handle(route.path)
  }

  private async handle(url: string) {
    const today =
      this.today.getFullYear() +
      '-' +
      ('0' + (this.today.getMonth() + 1)).slice(-2) +
      '-' +
      ('0' + this.today.getDate()).slice(-2)
    const todayDate: number = Date.parse(today) as number
    await this.currentUser.user()

    const subscriptionEnd = Date.parse(localStorage.getItem('subscriptionEndDate'));
    if ( subscriptionEnd <= todayDate) { //FIXME: the comparison was >= payment is not complete
      return true
    }
    console.log("time to pay!")
    this.currentUser.redirectUri = url
    this.router.navigate(['/pay-now'])
    return false
  }
}
