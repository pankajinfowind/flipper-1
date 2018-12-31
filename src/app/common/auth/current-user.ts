import { EventEmitter, Injectable } from "@angular/core";
import { User } from "../core/types/models/User";
import { Role } from "../core/types/models/Role";

@Injectable({
  providedIn: "root"
})
export class CurrentUser {
  /**
   * Current user model.
   */
  private current: User;

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

  public userSetting() {
    return this.current.settings;
  }
  /**
   * Get property of currently logged in user model.
   */
  public get<K extends keyof User>(prop: K): User[K] {
    return this.current && this.current[prop];

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

  /**
   * Set a new current user.
   */
  public assignCurrent(model?: User) {
    this.clear();

    if (model) {
      this.current = model;
    }

    this.userChanged.emit(this.current);
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
    const permissions = this.getAllPermissions();
    return (permissions["admin"] || permissions[permission]) > 0;
  }

  public hasRole(role: string): boolean {

    return true;
    // FIXME: this methos bellow is not working
    // return (
    //   this.current.roles && !!this.current.roles.find(r => r.name === role)
    // );
  }

  /**
   * Check if current user is logged in.
   */
  public isLoggedIn(): boolean {
    return this.get("id") > 0;
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
   * Check if user subscription is active
   */
  public subscriptionIsActive(): boolean {
    return false; //this.isSubscribed() && !this.onTrial();
  }

  public onTrial() {
    // const sub = this.getSubscription();
    // return sub && sub.on_trial;
  }

  public onGracePeriod(): boolean {
    // const sub = this.getSubscription();
    // return sub && sub.on_grace_period;
    return false;
  }



  /**
   * Check if current user is an admin.
   */
  public isAdmin(): boolean {
    return this.hasPermission("admin");
  }

  /**
   * Clear current user information.
   */
  public clear() {
    this.current = new User({ roles: [this.guestsRole] });
    this.cachedPermissions = null;
    this.userChanged.emit(this.current);
  }

  /**
   * Init CurrentUser service.
   */
  public init(params: { user?: User; guestsRole: Role }) {
    this.guestsRole = params.guestsRole;
    this.assignCurrent(params.user);
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

    return (this.cachedPermissions = permissions);
  }
}
