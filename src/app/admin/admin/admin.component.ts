import { Component, OnInit, OnDestroy, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { MenuEntries, MainModelService, Tables, Business, Branch, Menu, User } from '@enexus/flipper-components';
import { Router } from '@angular/router';
import { CurrentUser } from '../../core/guards/current-user';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminComponent implements OnInit, OnDestroy {


  businesses: Business[] = [];
  menus: Menu[] = [];
  branches: Branch[] = [];
  users: User;
  userToggledMenu: boolean;
  settingMenus: Menu=null;

  set menu(value: Menu[]) {
    this.menus = value;
  }
  get menu(): Menu[] {
    return this.menus;
  }
  //
  set business(value: Business[]) {
    this.businesses = value;
  }
  get business(): Business[] {
    return this.businesses;
  }
  //
  set branch(value: Branch[]) {
    this.branches = value;
  }
  get branch(): Branch[] {
    return this.branches;
  }

  set user(value: User) {
    this.users = value;
  }
  get user(): User {
    return this.users;
  }
  set settingMenu(value: Menu) {
    this.settingMenus = value;
  }
  get settingMenu(): Menu {
    return this.settingMenus;
  }



  constructor(private model: MainModelService, private router: Router, public currentUser: CurrentUser) {
    this.loadMenusEntries();
  }

  loadMenusEntries() {
    this.business =this.model.loadAll<Business>(Tables.business);
    this.branch   =this.model.loadAll<Business>(Tables.branch);
    this.user     =this.model.active(Tables.user);
    this.menu     =this.model.loadAll<Menu>(Tables.menu).filter(m => m.isSetting===false);
    this.settingMenu=this.model.loadAll<Menu>(Tables.menu).find(m=>m.isSetting===true);


  }

  ngOnDestroy() {
  }
  ngOnInit() {

  }
  isMenuToggled(event) {
    this.userToggledMenu = event;
  }

  displaySwitchedBusiness(event: Business) {

    const activatedBusiness: Business = this.currentUser.userHasBusiness();
    activatedBusiness.active = false;
    event.active = true;

    this.activateOrDesactived<Business>(Tables.business, event, event.id);
    this.activateOrDesactived<Business>(Tables.business, activatedBusiness, activatedBusiness.id);

    this.loadMenusEntries();
  }

  activateOrDesactived<T>(Table: string, entry: T, id: number) {
    this.model.update<T>(Table, entry as T, id as number);
  }

  displaySwitchedBranch(event) {

  }
  didUserLoggedOut(event) {
    const user = this.currentUser.userLoggedIn();
    user.active = false;
    this.currentUser.updateUser(user, user.id);
    this.router.navigate(['/login']);

  }

    getRouterClicked(event) {

     this.desactiveAllMenu();
     if(event.clickedMenu) {
        event.clickedMenu.active=true;
        this.model.update<Menu>(Tables.menu,event.clickedMenu,event.clickedMenu.id);
      }

     this.menu     =this.model.loadAll<Menu>(Tables.menu).filter(m => m.isSetting===false);
     this.settingMenu=this.model.loadAll<Menu>(Tables.menu).find(m=>m.isSetting===true);

     this.router.navigate([event.clickedMenu.route]);
  }

  desactiveAllMenu() {
    this.model.loadAll<Menu>(Tables.menu).forEach(menu=> {
      menu.active=false;
      this.model.update<Menu>(Tables.menu,menu,menu.id);
    });
  }

}
