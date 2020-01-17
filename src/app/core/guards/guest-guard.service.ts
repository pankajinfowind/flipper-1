import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CurrentUser } from './current-user';


@Injectable({
    providedIn: 'root',
})
export class GuestGuard implements CanActivate {
    constructor(
        private currentUser: CurrentUser,
        private router: Router,
    ) {
       
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
   
        if ( ! this.currentUser.isLoggedIn()) return true;
      
              this.router.navigate([this.currentUser.getRedirectUri()]);

        return false;
    }


}
