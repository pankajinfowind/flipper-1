import { Component, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { Location } from "@angular/common";
import { filter, map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';
import { APIService } from '@enexus/api-services';
import { FlipperEventBusService } from '@enexus/flipper-event';
import { LoggedOutEvent } from '../subscription/loggedout.event';
import { Business, CurrentBusinessEvent } from '@enexus/flipper-components';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  drawerClass = 'sidenav-container'
  authenticated: boolean = false;
  business: Business;
  showhidesearch:boolean = false;
  opened = true;
  @ViewChild('drawer') drawer: MatSidenav;
  @ViewChild('search') searchElement: ElementRef;
  setClosedClass() {
    this.drawerClass = 'sidenav-container-closed'
  }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  public showTopNav:boolean =false;

  constructor(private eventBus: FlipperEventBusService,

    private location: Location, private breakpointObserver: BreakpointObserver, private router: Router,private api:APIService ) {
    // CurrentBusinessEvent
    this.eventBus
      .of<CurrentBusinessEvent>(CurrentBusinessEvent.CHANNEL)
      .subscribe(res => {
        if(res.business){
          this.business = res.business;
        }
      })
    this.authenticated = localStorage.getItem('userIdNew') != null;
    this.eventBus
      .of<LoggedOutEvent>(LoggedOutEvent.CHANNEL)
      .subscribe(res => {
        if(res.event){
          this.showTopNav =true
        }else{
          localStorage.removeItem('userIdNew');
          this.authenticated = localStorage.getItem('userIdNew') != null;
          this.showTopNav = false;
          this.router.navigate(['/login']);
        }
      })
  }
  Logout(){
    localStorage.removeItem('userIdNew');
    this.authenticated = localStorage.getItem('userIdNew') != null;
    this.showTopNav = false;
    this.router.navigate(['/login']);
  }

  toggle() {
    if(this.drawer){ //avoid accessing drawer when undefined!
      this.drawer.toggle();
    }
  }

  ShowSearch() {
    this.showhidesearch = true;
    setTimeout(()=>{
      this.searchElement.nativeElement.focus();
    },0);
  }

  HideSearch() {
    this.showhidesearch = false;
  }
}
