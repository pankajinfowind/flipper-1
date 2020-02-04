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
import { MainModelService, Menu, Tables } from '@enexus/flipper-components';

@Injectable({
  providedIn: 'root'
})
export class RedirectGuard implements CanActivate, CanActivateChild, CanLoad {
  constructor(private model: MainModelService, private router: Router) {

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

    this.findDefaultMenu();
    return true;
  }

  findDefaultMenu() {
    if(!this.model.active<Menu>(Tables.menu)) {
      const menu=this.model.loadAll<Menu>(Tables.menu)[0];
      menu.active=true;
      this.model.update<Menu>(Tables.menu,menu,menu.id);
      this.router.navigate([menu.route]);
    }
  }
}
