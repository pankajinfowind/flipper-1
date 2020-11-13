import { Injectable } from '@angular/core';

import { FlipperEventBusService } from '@enexus/flipper-event';
import { MenuEntries, Business, Branch, Subscription,
  PouchDBService, PouchConfig, Tables, Menu,
  UserLoggedEvent, UserSubscriptionEvent,
  CurrentBusinessEvent,
  User
} from '@enexus/flipper-components';

import {CurrentBranchEvent} from '@enexus/flipper-components';
import { ModelService } from '@enexus/flipper-offline-database';

@Injectable({
  providedIn: 'root'
})
export class CurrentUser {
public redirectUri?: string;
public userInfo=null;
public current: MenuEntries;
currentUser: User=null;
currentBusiness: Business=null;
currentBranch: Branch=null;
currentSubscription: Subscription=null;

  constructor(private eventBus: FlipperEventBusService,private model: ModelService,
              private database: PouchDBService) {
    this.database.connect(PouchConfig.bucket);
  }

  public get<K extends keyof User>(prop: K): User[K] {
    return this.currentUser && this.currentUser[prop];
  }


  public set(key: string, value: any): void {
    this.currentUser[key] = value;
  }

  public async user(table=null) {

   await this.database.get(table?table:PouchConfig.Tables.user).then( res=> {

    this.eventBus.publish(new UserLoggedEvent(res));

  },error=> {
      if(error.error && error.status==='404' ||  error.status===404) {
        this.eventBus.publish(new UserLoggedEvent(null));
      }
  });


  }

  public async subscription() {

    await this.database.get(PouchConfig.Tables.subscription).then( res=> {

     this.eventBus.publish(new UserSubscriptionEvent(res));

   },error=> {
       if(error.error && error.status==='404' ||  error.status===404) {
         this.eventBus.publish(new UserSubscriptionEvent(null));
       }
   });


   }

   public async defaultBusiness() {
    await this.database.get(PouchConfig.Tables.business).then(res=> {

        const currentBusiness: Business=res.businesses.find(business=>business.active);
        this.eventBus.publish(new CurrentBusinessEvent(currentBusiness));

    },error=> {
        if(error.error && error.status==='404' ||  error.status===404) {
          this.eventBus.publish(new CurrentBusinessEvent(null));
        }
    });

  }


  public async defaultBranch() {
    await this.database.get(PouchConfig.Tables.branches).then(res=> {
      const currentBranch: Branch=res.branches.find(branch=>branch.active);
      this.eventBus.publish(new CurrentBranchEvent(currentBranch));

  },error=> {
      if(error.error && error.status==='404' ||  error.status===404) {
        this.eventBus.publish(new CurrentBranchEvent(null));
      }
  });
  }


  public userLoggedIn() {
   return this.database.find(PouchConfig.Tables.user).then(res=> {
    if(res) {
       return res;
    }
  });
  }


  public userHasBusiness() {
    return this.model.active<Business>(Tables.business);
  }

  public activeMenu() {
    return this.model.active<Menu>(Tables.menu);
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
