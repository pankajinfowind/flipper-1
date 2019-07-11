import {EventEmitter, Injectable} from '@angular/core';
import {Event, NavigationEnd, Router} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
@Injectable()
export class NavService {
  public appDrawer: any;
  public currentUrl = new BehaviorSubject<string>(undefined);
  
  public openedLeftSide = new BehaviorSubject<boolean>(false);
  public isOpenedLeftSide: Observable<boolean> = this.openedLeftSide.asObservable();
  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl.next(event.urlAfterRedirects);
        
        if(event.url.split('/')[1] =='pos' || event.url.split('/')[2]=='pos'){
          this.openedLeftSide.next(false);
        }else{
          this.openedLeftSide.next(true);
        }
       
      }
    });
  }

 
  public closeNav() {
    this.appDrawer.close();
  }

  public openNav() {
    this.appDrawer.open();
  }

 
}
