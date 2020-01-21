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

@Injectable({
  providedIn: 'root'
})
export class HasBusinessGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private currentUser: CurrentUser, private router: Router) {

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

  private handle(url: string) {

    if (this.currentUser.hasBusiness()) {
      return true;
    }

    this.currentUser.redirectUri = url;

    this.router.navigate(['setup/business/new']);
    return false;
  }

}
