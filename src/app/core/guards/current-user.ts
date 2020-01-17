import { Injectable } from "@angular/core";
import { User, Business, Tables } from "@enexus/flipper-components";
import {ModelService}from '@enexus/flipper-offline-database';


@Injectable({
  providedIn: "root"
})
export class CurrentUser {
    public redirectUri?: string;
    constructor( private model:ModelService
      ) {
     }
    public isLoggedIn(): boolean {
        return this.userLoggedIn() && this.userLoggedIn().id > 0;
      }

      public hasBusiness(): boolean {
        return this.userHasBusiness() && this.userHasBusiness().id > 0;
      }

      public userLoggedIn(){
        return this.model.select(Tables.user).where('active',true).first<User>();
      }

      public userHasBusiness(){
        return this.model.select(Tables.business)
        .where('active',true).first<Business>();
      }

      public userById(id:number){
        return this.model.select(Tables.user)
        .where('id',id).first<User>();
      }

      public insertUser(user:User){
          return this.model.create<User>(Tables.user,[user]);
      }

      public updateUser(user:User,id:number){
         return this.model.update<User>(Tables.user,user,id);
     }



      public getRedirectUri(): string {
        let uri="/admin"
        if (this.redirectUri) {
           uri = this.redirectUri;
          this.redirectUri = null;
        }
        return uri;
      }
}