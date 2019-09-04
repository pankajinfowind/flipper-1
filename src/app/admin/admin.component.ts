import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { NavItem } from '../nav-menu-bar/nav-item';
import { NavService } from '../nav-menu-bar/nav.service';
import { CurrentUser } from '../common/auth/current-user';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {

    isOpened:boolean=true;
    @ViewChild('appDrawer',{static:true}) appDrawer: ElementRef;
    navItems: NavItem[] =[];
    constructor(public navService: NavService,private currentUser:CurrentUser) {}

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
  ngOnInit() {
    this.navItems=this.currentUser.getMenus();
  }


 
}
