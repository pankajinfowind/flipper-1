import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  CanLoad,
  Route
} from '@angular/router';
import { CurrentUser } from './current-user';
import { FlipperEventBusService } from '@enexus/flipper-event';
import { filter } from 'rxjs/internal/operators';
import { UserSubscriptionEvent } from '@enexus/flipper-components';

@Injectable({
  providedIn: 'root'
})
export class HasSubscribedGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private eventBus: FlipperEventBusService,private currentUser: CurrentUser, private router: Router) {
    this.eventBus.of < UserSubscriptionEvent > (UserSubscriptionEvent.CHANNEL)
    .pipe(filter(e =>e.subscription && e.subscription.didSubscribed))
    .subscribe(res =>
      this.currentUser.currentSubscription = res.subscription);
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    return this.handle(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.handle(state.url);
  }
  canLoad(route: Route) {
    return this.handle(route.path);
  }

  private async handle(url: string) {

    await this.currentUser.subscription();
    // console.log(this.currentUser.currentSubscription);
    if (this.currentUser.currentSubscription && this.currentUser.currentSubscription.didSubscribed) {
      return true;
    }

    this.currentUser.redirectUri = url;
    this.router.navigate(['/pay-now']);
    return false;
  }

}
