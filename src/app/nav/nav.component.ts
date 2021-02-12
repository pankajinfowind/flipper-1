import { Component, ElementRef, ViewChild } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  drawerClass = 'sidenav-container'
  authenticated: boolean = false;
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


  constructor(private breakpointObserver: BreakpointObserver, private router: Router,) {
    this.authenticated = localStorage.getItem('userIdNew') != null;
  }

  Toggle() {
    this.drawer.toggle();
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
