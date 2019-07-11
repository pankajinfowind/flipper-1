import { Component, OnInit, AfterViewInit, ViewChild, VERSION, ElementRef } from '@angular/core';
import { Settings } from '../common/core/config/settings.service';
import { Router } from '@angular/router';
import { LocalStorage } from '../common/core/services/local-storage.service';
import { NavItem } from '../nav-menu-bar/nav-item';
import { NavService } from '../nav-menu-bar/nav.service';
import { CurrentUser } from '../common/auth/current-user';
import { Business } from '../business/api/business';
import { AuthService } from '../common/auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { SharedModelService } from '../shared-model/shared-model-service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {
public appearance;
activeLinkIndex = -1;
public loading = new BehaviorSubject(false);
    public leftColumnIsHidden = false;
    isOpened:boolean=true;
    @ViewChild('appDrawer') appDrawer: ElementRef;
    version = VERSION;
    navItems: NavItem[] = [
      {
        displayName: 'Analytics',
        iconName: 'dashboard',
        route: '/analytics',
        isSubmenu:false,
      },
      {
        displayName: 'Till',
        iconName: 'shopping_cart',
        route: '/pos/till-categories',
        isSubmenu:false,
      },
      {
        displayName: 'Setup',
        iconName: 'build',
        route: 'setup',
        isSubmenu:false,
        children: [
          {
            displayName: 'Categories',
            iconName: 'group',
            route: 'setup/category',
            isSubmenu:true,
          },
          {
            displayName: 'Brands',
            iconName: 'group',
            route: 'setup/brand',
            isSubmenu:true,
          },
          {
            displayName: 'Products',
            iconName: 'group',
            route: 'setup/item',
            isSubmenu:true,
          }
        ]
      },
       {
      displayName: 'Stock Control',
      iconName: 'subtitles',
      route: 'stock',
      isSubmenu:false,
      children: [
        {
        displayName: 'Available Stock',
        iconName: 'group',
        route: 'stock/available',
        isSubmenu:true,
      },
      {
        displayName: 'Out of Stock',
        iconName: 'group',
        route: 'stock/stockout',
        isSubmenu:true,
      },
      {
        displayName: 'Lower Stock',
        iconName: 'group',
        route: 'stock/lowerstock',
        isSubmenu:true,
      },
      {
        displayName: 'Stock Movements',
        iconName: 'group',
        route: 'stock/stockmovement',
        isSubmenu:true,
      },
      {
        displayName: 'Stock Expired',
        iconName: 'group',
        route: 'stock/expireditem',
        isSubmenu:true,
      }]
    },
    
       {  displayName: 'Sales',
      iconName: 'equalizer',
      route: 'sales',
      children: [{
        displayName: 'Invoices',
        iconName: 'group',
        route: 'sales/invoices/lists',
        isSubmenu:true,
      },
      {
        displayName: 'Customers',
        iconName: 'group',
        route: 'sales/customers/cust-lists',
        isSubmenu:true,
      }]
    },
    {
      displayName: 'Settings',
      iconName: 'settings',
      route: 'settings',
      children: [ {
        displayName: 'Company/Business',
        iconName: 'group',
        route: 'settings/set-company',
        isSubmenu:true,
      },
      {
        displayName: 'Receipt Setting',
        iconName: 'group',
        route: 'settings/receipt-setting',
        isSubmenu:true,
      },
      {
        displayName: 'Invoices Customization',
        iconName: 'group',
        route: 'settings/customize-invoice',
        isSubmenu:true,
      },{
        displayName: 'Branches',
        iconName: 'group',
        route: 'settings/branches',
        isSubmenu:true,
      },{
        displayName: 'Users',
        iconName: 'group',
        route: 'settings/users',
        isSubmenu:true,
      }
    ]
    }
    ];


    business:Business;
  constructor(public shared:SharedModelService,public auth: AuthService,public current: CurrentUser,public navService: NavService,public localStorage: LocalStorage,private router: Router,public setting:Settings) {
  
  }

  ngAfterViewInit() {
    this.navService.appDrawer = this.appDrawer;
  }
  ngOnInit() {
   // console.log(this.current.getBusiness('branches'));
    this.appearance=this.setting.getAll().appearance;
  }
  public toggleLeftSidebar() {
    this.isOpened = !this.isOpened;
}

 
}
