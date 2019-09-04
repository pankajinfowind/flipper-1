import { EventEmitter, Injectable } from "@angular/core";
import { User, UserData } from "../core/types/models/User";
import { Branch } from '../../admin/master/branch/api/branch';
import { Role } from '../core/types/models/Role';
import { Business } from '../../business/api/business';
import { LocalStorage } from '../core/services/local-storage.service';
import { NavItem } from '../../nav-menu-bar/nav-item';

@Injectable({
  providedIn: "root"
})
export class CurrentUser {
  /**
   * Current user model.
   */
  private current: User;

  private currentBranch: Branch;
  private currentBusiness:Business;
  private currentReceipt:any;
  private userRole: Role;
  private allRoles:Role[];
  private allMenus:NavItem[];
  private currentPermissions:any;

  /**
   * Role that should be assigned to guests.
   */
  private guestsRole: Role;

  /**
   * Merged explicit and inherited from
   * roles permissions for current user.
   */
  private cachedPermissions: { [key: string]: number };

  /**
   * Uri user was attempting to open before
   * redirect to login page, if any.
   */
  public redirectUri?: string;

  public userChanged: EventEmitter<User> = new EventEmitter();
  public currentBranchChanged: EventEmitter<Branch> = new EventEmitter();
  public currentBusinessChanged: EventEmitter<Business> = new EventEmitter();
  public currentRoleChanged: EventEmitter<Role> = new EventEmitter();
  public currentPermissionChanged: EventEmitter<any> = new EventEmitter();
  public currentRolesChanged: EventEmitter<Role[]> = new EventEmitter();
  public currentMenusChanged: EventEmitter<NavItem[]> = new EventEmitter();
  public currentReceiptChanged: EventEmitter<any> = new EventEmitter();
  public userSetting() {
    return this.current.settings;
  }
  /**
   * Get property of currently logged in user model.
   */
  user: User;
  branch:Branch;
  user_role:Role[];
  business:Business;
  receipt:any;
  roles:Role[];
  menus:NavItem[];
  permissions:any;
  has_business_belongs:boolean;
  public get<K extends keyof User>(prop: K): User[K] {
    this.user = this.current && this.current[prop];
    return this.user;
  }


  /**
   * Get model of currently logged in user.
   */
  public getModel(): User {
    return Object.assign({}, this.current);
  }

  /**
   * Set property of currently logged in user object.
   */
  public set(key: string, value: any): void {
    this.current[key] = value;
  }

  public getCurrentBranch<K extends keyof Branch>(prop: K): Branch[K] {
    this.branch = this.currentBranch && this.currentBranch[prop];
    return this.branch;
  }

  public setRole(key: string, value: any): void {
    this.userRole[key] = value;
  }

   set hasBusiness(value:boolean){
      this.has_business_belongs=value;
  }
   get hasBusiness():boolean{
    return this.has_business_belongs;
  }


  public getRole<K extends keyof Role>(prop: K): Role[K] {
    return this.userRole && this.userRole[prop];
    //return this.user_role;
  }

  public getBusiness<K extends keyof Business>(prop: K): Business[K] {
    this.business = this.currentBusiness && this.currentBusiness[prop];
    return this.business;
  }

  public getReceipt<K extends keyof any>(prop: K): any[K] {
    this.receipt = this.currentReceipt && this.currentReceipt[prop];
    return this.receipt;
  }

  public setCurrentBranch(key: string, value: any): void {
    this.currentBranch[key] = value;
  }

  public setBusiness(key: string, value: any): void {
    this.currentBusiness[key] = value;
  }

  public getRoles(): Array<Role> {
    return this.allRoles;
  }

  public getMenus(): Array<NavItem> {
    return this.allMenus;
  }
//currentPermissions

public getPermissions<K extends keyof any>(prop: K): any[K] {
  this.permissions = this.currentPermissions && this.currentPermissions[prop];
  return this.permissions;
}

public setPermissions(key: string, value: any): void {
  this.currentPermissions[key] = value;
}
  /**
   * Set a new current user.
   */
  public assignCurrent(model?: UserData) {
    this.clear();

    if (model) {
      this.current = model.user_logged_in;
      this.currentBranch=model.switched_branch;
      this.userRole=model.user_logged_role;
      this.currentBusiness=model.business;
      this.allRoles=model.roles;
      this.allMenus=model.menus;
      this.currentPermissions=model.permissions;
      this.hasBusiness=model.has_business_belongs;
      if(model.business){
        this.currentReceipt=model.business.receipt;
      }
    

      if(model.switched_branch){
        const active_branch=model.switched_branch;
        const b_id:number=active_branch.id;
        localStorage.setItem('active_branch',b_id.toString());
      }

    }


    this.userChanged.emit(this.current);
    this.currentBranchChanged.emit(this.currentBranch);
    this.currentBusinessChanged.emit(this.currentBusiness);
    this.currentRoleChanged.emit(this.userRole);
    this.currentRolesChanged.emit(this.allRoles);
    this.currentMenusChanged.emit(this.allMenus);
    this.currentPermissionChanged.emit(this.currentPermissions);
    this.currentReceiptChanged.emit(this.currentReceipt);
  }

  /**
   * Check if current user has all specified permissions.
   */
  public hasPermissions(permissions: string[]): boolean {
    return (
      permissions.filter(permission => {
        return !this.hasPermission(permission);
      }).length === 0
    );
  }

  /**
   * Check if user has given permission.
   */
  public hasPermission(permission: string): boolean {
     return this.getRole('name')==permission;
  }

  public hasRole(role: string): boolean {
    return (
      this.current.roles && !!this.current.roles.find(r => r.name === role)
    );
  }

  /**
   * Check if current user is logged in.
   */
  public isLoggedIn(): boolean {
    
    return this.get("id") > 0;
  }
  public hasCurrentBranch(): boolean {

        return this.getCurrentBranch("id") > 0;
  }
  /**
   * Check if user subscription is active, on trial, or on grace period.
   */
  public isSubscribed(): boolean {
    // if ( ! this.current.subscriptions) return false;
    // return this.current.subscriptions.find(sub => sub.valid) !== undefined;
    return false;
  }



  /**
   * Check if current user is an admin.
   */
  public isAdmin(): boolean {
    return this.hasPermission("admin");
  }
  public isManager(): boolean {
    return this.hasPermission("manager");
  }
  public isCashier(): boolean {
    return this.hasPermission("cashier");
  }
  /**
   * Clear current user information.
   */
  public clear() {
    this.current = null;
    this.cachedPermissions = null;
    this.currentBranch=null;
    this.userRole=null;
    this.currentBusiness=null;
    this.allRoles=[];
    this.allMenus=[];
    this.currentPermissions=null;
    this.currentReceipt=null;
    this.userChanged.emit(this.current);
    this.currentBranchChanged.emit(this.currentBranch);
    this.currentBusinessChanged.emit(this.currentBusiness);
    this.currentRoleChanged.emit(this.userRole);
    this.currentRolesChanged.emit(this.allRoles);
    this.currentPermissionChanged.emit(this.currentPermissions);
    this.currentReceiptChanged.emit(this.currentReceipt);
    this.currentMenusChanged.emit(this.allMenus);
  }

  /**
   * Init CurrentUser service.
   */
  public init(params: { user_data?: UserData, guestsRole: Role }) {
    this.guestsRole = params.guestsRole;
    this.assignCurrent(params.user_data);
  }

  /**
   * Get flattened array of all permissions current user has.
   */
  private getAllPermissions(): { [key: string]: number } {
    if (this.cachedPermissions) {
      return this.cachedPermissions;
    }

    // permissions on user modal
    const permissions = this.get("permissions") || {};

    // merge role permissions
    const roles = this.get("roles") || [];
    // roles.forEach((role: Role) => {
    //     if (role) Object.assign(permissions, role.permissions);
    // });

    // merge billing plan permissions
    // const subscription = this.getSubscription();
    // if (subscription && subscription.plan) {
    //     Object.assign(permissions, subscription.plan.permissions);
    // }

    return (this.cachedPermissions = permissions);
  }
}
