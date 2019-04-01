import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailsService } from '../details/details.service';
import { Details } from '../details/details';
import { SetUpModelService } from './setup-model.service';
import { SetUp } from './setup';
import { ActivatedRoute, Router } from '@angular/router';
import { BootstrapperSetUp } from './bootstrapper.service';
import { NavItem } from './menus';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SetupComponent implements OnInit, OnDestroy {


  links: any[] = [
    {
      menu:'Products',icon:'settings',path:'item',
    },
    {
      menu:'Categories',icon:'settings',path:'category',
    },
    {
      menu:'Brands',icon:'settings',path:'brand',
    },
    {
      menu:'Customer Type',icon:'settings',path:'customertype',
    },
    {
      menu:'Tax rate',icon:'settings',path:'tax-rate',
    },
    {
      menu:'Stock Movement',icon:'settings',path:'reasons/stock_movements',
    },

    {
      menu:'Expiration Setting',icon:'settings',path:'expiration_setting',
    },

  ];

// links: any[] = [
//   {
//     menu:'Company',icon:'settings',
//     submenu:[
//             {path:'customertype',label:'Customer Types'},
//           ]
//       },
//   {
// menu:'Banking',icon:'settings',
// submenu:[
//         {path:'tax-rate',label:'Tax rates'},
//       ]
//   },
//   {
//     menu:'Reasons',icon:'settings',
//     submenu:[
//            {path:'reasons/stock_movements',label:'Stock Movement'},
//             {path:'reasons/discount',label:'Discount'},
//             {path:'reasons/refund',label:'Refund'},
//           ]
//       },
//       {
//         menu:'Stock',icon:'settings',
//         submenu:[
//                 {path:'expiration_setting',label:'Expiration Setting'}
//               ]
//       }
// ];
// navItems: NavItem[] = [
//   {
//     displayName: 'Company',
//     iconName: 'settings',
//     route: '',
//     children: [
//       {
//         displayName: 'Customer Types',
//         iconName: 'remove',
//         route: '/admin/setup/customertype'
//           },
//         ]
//       },
//       {
//         displayName: 'Banking',
//         iconName: 'settings',
//         route: '',
//         children: [
//           {
//             displayName: 'Tax Rate',
//             iconName: 'remove',
//             route: '/admin/setup/tax-rate'
//           }
//         ]
//       },

//         {
//           displayName: 'Reasons',
//           iconName: 'settings',
//           route: '',
//           children: [
//             {
//               displayName: 'Stock Movement',
//               iconName: 'remove',
//               route: '/admin/setup/reasons/stock_movements'
//             },
//             {
//               displayName: 'Discount',
//               iconName: 'remove',
//               route: '/admin/setup/reasons/discount'
//             },
//             {
//               displayName: 'Refund',
//               iconName: 'remove',
//               route: '/admin/setup/reasons/refund'
//             }
//           ]
//         },

//       {
//         displayName: 'Stock',
//         iconName: 'settings',
//         route: '',
//         children: [
//           {
//             displayName: 'Expiration Setting',
//             iconName: 'remove',
//             route: '/admin/setup/expiration_setting'
//           }
//         ]
//   }
// ];

//customertype
toggled=false;
isMobile=false;
leftColumnIsHidden=false;
subscription: Observable<Details>;
details$: Observable<Details>;
setup$: Observable<SetUp>;
constructor(private bootstrapper_setup:BootstrapperSetUp,private router: Router,private msterModelService:SetUpModelService,private detailsService:DetailsService) {
  this.init_setup();
}
 init_setup() {
  return this.bootstrapper_setup.bootstrap();
  }
  ngOnInit() {
    this.redirectLink();
    this.getMenuHighlighted();
    this.setup$ = this.msterModelService.setup$;
    this.subscription = this.details$ = this.detailsService.details$;
  }

  ngOnDestroy() {
    //this.subscription.next();
  }
  clickedOnLink(path){
    localStorage.setItem('setup-path',path);
  }
  redirectLink(){
    if(localStorage.getItem('setup-path') && !localStorage.getItem('setup-path')==null){
      return this.router.navigate([localStorage.getItem('setup-path')]);
    }
  }
  clickedMenu(menu){
    localStorage.setItem('setup-menu',menu);
  }
  getMenuHighlighted(){
    if(localStorage.getItem('setup-menu')==null){
      return 'Company';
    }else{
      return localStorage.getItem('setup-menu');
    }

  }
}
