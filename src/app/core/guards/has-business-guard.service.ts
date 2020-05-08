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
import { CurrentBusinessEvent, CurrentBranchEvent } from '@enexus/flipper-components';


@Injectable({
  providedIn: 'root'
})
export class HasBusinessGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private eventBus: FlipperEventBusService,private currentUser: CurrentUser, private router: Router) {
    this.eventBus.of < CurrentBusinessEvent > (CurrentBusinessEvent.CHANNEL)
    .subscribe(res =>
      this.currentUser.currentBusiness = res.business);

    this.eventBus.of < CurrentBranchEvent > (CurrentBranchEvent.CHANNEL)
      .subscribe(res =>
        this.currentUser.currentBranch = res.branch);
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

    await this.currentUser.defaultBusiness();
    await this.currentUser.defaultBranch();

    if (this.currentUser.currentBusiness && this.currentUser.currentBusiness.id!==null || this.currentUser.currentBusiness.id!==undefined) {
      return true;
    }

    this.currentUser.redirectUri = url;
    this.router.navigate(['/setup/business/new']);
    return false;
  }

}
