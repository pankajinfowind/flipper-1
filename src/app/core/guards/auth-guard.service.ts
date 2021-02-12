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
import { CurrentBusinessEvent, PouchDBService, UserLoggedEvent } from '@enexus/flipper-components'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  constructor(
    private eventBus: FlipperEventBusService,
    private database: PouchDBService,
    private http: HttpClient,
    private currentUser: CurrentUser,
    private router: Router
  ) {
    this.eventBus
      .of<UserLoggedEvent>(UserLoggedEvent.CHANNEL)
      .pipe(filter(e => e.user && (e.user.id !== null || e.user.id !== undefined)))
      .subscribe(res => {
        this.currentUser.currentUser = res.user
      })
    this.eventBus.of<CurrentBusinessEvent>(CurrentBusinessEvent.CHANNEL).subscribe(res=>{
      this.currentUser.currentBusiness = res.business;
    })
  }

  canActivate(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.handle(state.url)
  }

  canActivateChild(_route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.handle(state.url)
  }
  canLoad(route: Route) {
    return this.handle(route.path)
  }

  private async handle(url: string) {
    if(localStorage.getItem('userIdNew')){
      // simulate logout.
      // console.log("logged in",localStorage.getItem('userIdNew'))
      // localStorage.removeItem('userIdNew');
      // console.log("logged in",localStorage.getItem('userIdNew'))
      return true;
    }else{
       // FIXME:use bellow code avoid reloading the entire app but as workaround to remove unnessary header on login page we use location.href for now
       location.href = '/login';
       // this.router.navigate(['/login']);
      // this.router.navigate(['/login']);
      return false;
    }
  }
}
