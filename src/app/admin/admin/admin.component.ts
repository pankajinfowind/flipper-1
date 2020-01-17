import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { MenuEntries, MainModelService, Tables, Business, Branch, Menu } from '@enexus/flipper-components';
import { Router } from '@angular/router';
import { CurrentUser } from '../../core/guards/current-user';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit,OnDestroy  {

  entry:MenuEntries=null;

  userToggledMenu:boolean=false;
  business:Business[]=[];
  branches:Branch[]=[];
  menus:Branch[]=[];

  set entries(value: MenuEntries) {
    this.entry = value;
  }
  get entries(): MenuEntries{
    return this.entry;
  }

 

  constructor(private model:MainModelService, private router:Router,public currentUser: CurrentUser) {
    this.loadMenusEntries();
 }

   loadMenusEntries(){
     this.business=[];
     this.branches=[];
     this.menus=[];

    this.model.loadAll<Business>(Tables.business).forEach(business=>{
      this.business.push(business as Business);
    });
    this.model.filters<Business>(Tables.branch,'businessId',this.model.active<Business>(Tables.business).id as any).forEach(branch=>{
      this.branches.push(branch as Business);
    });
    this.model.loadAll<Business>(Tables.menu).forEach(menu=>{
      this.menus.push(menu as Menu);
    });

  this.entries={
    businesses:this.business,
    user:this.currentUser.userLoggedIn(),
    branches:this.branches,
    menu:this.menus
  };
  
   }
 
   ngOnDestroy() {
 }
  ngOnInit() {
    
  }
  isMenuToggled(event){
    this.userToggledMenu=event;
  }

  displaySwitchedBusiness(event){
    const activatedBusiness=this.currentUser.userHasBusiness();
   this.activateBusiness(event,true);
    this.activateBusiness(activatedBusiness,false);
    this.loadMenusEntries();
  }

  activateBusiness(business:Business,bol:boolean){
    business.active=bol;
   this.model.update<Business>(Tables.business,business as Business,business.id as number) ;
  }
 
  displaySwitchedBranch(event){
  
  }
  didUserLoggedOut(event){
    const user=this.currentUser.userLoggedIn();
    user.active=false;
    this.currentUser.updateUser(user,user.id);
    this.router.navigate(['/login']);
  
  }
  getRouterClicked(event){
  this.router.navigate([event.router]);
  }
}
