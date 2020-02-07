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
  redirected=false;
  constructor(private currentUser: CurrentUser,
              private model: MainModelService, private router: Router) {

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
    this.currentUser.redirectUri = url;
    this.activeMenu();
    if(!this.redirected) {
      this.redirectByMenuRouterSetted(url);
    }
    return true;
  }

  redirectByMenuRouterSetted(url) {
    const activeMenu=this.model.active<Menu>(Tables.menu);
    let router=null;
    if(!activeMenu || activeMenu===undefined) {
      router=url;
    } else {
      router=activeMenu.route;
    }
    if(router) {
      this.redirected=true;
      return this.router.navigate([router]);
    }
   //
  }
   activeMenu() {
     const activemenu=this.model.active<Menu>(Tables.menu);
     if(!activemenu || activemenu===undefined) {
          const menu=this.model.loadAll<Menu>(Tables.menu);
          if(menu.length > 0) {
            const m=menu[0];
            m.active=true;
            this.model.update<Menu>(Tables.menu,m,m.id);
          }
        }

   }

}
