import { Injectable } from '@angular/core';
import { User, Business, Tables, Menu } from '@enexus/flipper-components';
import { ModelService } from '@enexus/flipper-offline-database';


@Injectable({
  providedIn: 'root'
})
export class CurrentUser {
  public redirectUri?: string;
  constructor(private model: ModelService) {

  }

  public isLoggedIn(): boolean {
    return this.userLoggedIn() && this.userLoggedIn().id > 0;
  }

  public hasBusiness(): boolean {
    return this.userHasBusiness() && this.userHasBusiness().id > 0;
  }

  public userLoggedIn() {
    return this.model.active<User>(Tables.user);
  }

  public userHasBusiness() {
    return this.model.active<Business>(Tables.business);
  }

  public activeMenu() {
    return this.model.active<Menu>(Tables.menu);
  }

  public user() {
    return this.model.find<User>(Tables.user, 1);
  }

  public insertUser(user: User) {
    return this.model.create<User>(Tables.user, [user]);
  }

  public updateUser(user: User, id: number) {
    return this.model.update<User>(Tables.user, user, id);
  }



  public getRedirectUri(): string {
    let uri = null;
    uri = this.redirectUri;
    this.redirectUri = null;
    return uri;
  }

}
