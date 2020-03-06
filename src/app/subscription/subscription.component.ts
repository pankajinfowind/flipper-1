import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../core/guards/current-user';
import { ElectronService } from '../core/services';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInAnimation, PouchConfig, PouchDBService } from '@enexus/flipper-components';
import { FlipperEventBusService } from '@enexus/flipper-event';
import { UserLoggedEvent } from '../core/guards/user-logged-event';
import { filter, finalize } from 'rxjs/internal/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  animations: [
    trigger('insertLogin', [
      transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '1s' } }))
    ]),
  ],
})
export class SubscriptionComponent implements OnInit {
   user: Array<any>;
   public loading = new BehaviorSubject(false);
   public ccNumMissingTxt = new BehaviorSubject('CCV number is required');
   public cardExpiredTxt = new BehaviorSubject('Card has expired');

  constructor(private eventBus: FlipperEventBusService,private database: PouchDBService,
              public currentUser: CurrentUser, public electronService: ElectronService,protected httpClient: HttpClient) {
    this.database.connect(PouchConfig.bucket);
  }

   ngOnInit() {
    this.eventBus.of < UserLoggedEvent > (UserLoggedEvent.CHANNEL)
    .pipe(filter(e => e.user && (e.user.id !== null ||  e.user.id !==undefined)))
    .subscribe(res =>
      this.currentUser.currentUser = res.user);

    if(PouchConfig.canSync) {
      this.database.sync(PouchConfig.syncUrl);
    }


  }

  subscribe(data) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': '*'});
    this.loading.next(true);
    this.ccNumMissingTxt.next('');
    this.cardExpiredTxt.next('');
    const formSubscription= {
        card:data.cardNumber,
        expirymonth:data.expirationMonth,
        expiryyear:data.expirationYear,
        cvv:data.ccv,
        email:this.currentUser.currentUser.email,
        firstname:data.cardHolder
      };

    const creds = 'card=' + formSubscription.card + '&expirymonth=' + formSubscription.expirymonth +
     '&expiryyear='+formSubscription.expiryyear+ '&cvv='+formSubscription.cvv+'&email='
     +formSubscription.email+'&firstname='+formSubscription.firstname ;
    return this.httpClient
        .post('https://mysterious-depths-19225.herokuapp.com/subscribe',
        creds,{headers}).pipe(finalize(() => this.loading.next(false)))
        .subscribe(response => {
          this.loading.next(false);

          if(response) {
                if(response.message.status==='error') {
                      if(response.message.data.code==='CARD_ERR') {
                        this.ccNumMissingTxt.next(response.message.data.message);
                      }
                      if(response.message.data.code==='ERR') {
                        this.cardExpiredTxt.next('Card has expired');
                      }

                } else if(response.message.status==='success') {
                  const subscription= {
                    id: this.database.uid(),
                    userId: this.currentUser.currentUser.id,
                    subscriptionType: 'monthly',
                    lastPaymentDate: new Date(),
                    nextPaymentDate:new Date(),
                    status:'success',
                    didSubscribed:true,
                    createdAt: new Date(),
                    updatedAt:new Date(),
                        };
                  if(this.database.put(PouchConfig.Tables.subscription,subscription)) {
                      return this.saveSubscriptionToFripperApi({
                        subscribed: 'subscribed',
                        txRef: response.message.data.txRef,
                        flwRef: response.message.data.flwRef,
                        raveRef:response.message.data.raveRef,
                        flutter_customer_id:response.message.data.customer.id,
                        flutter_customer_accountId:response.message.data.customer.accountId,
                        amount:response.message.data.amount,
                        currency: response.message.data.currency,
                        app: 'Flipper',
                        customer_name:response.message.data.customer.fullName
                      });
                   }
                } else {
                  console.log(response);
                }

            }

        }, error => {
          this.loading.next(false);
          console.log(error);
        });

      }

saveSubscriptionToFripperApi(data: any) {
   const headers = new HttpHeaders({'Content-Type': 'aapplication/json',Accept: 'application/json',
   'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': '*', Authorization: 'Bearer '
    + this.currentUser.currentUser.token});
   this.loading.next(true);
   return this.httpClient
   .post('https://test.flipper.rw/api/activate_subscription',
   data,{headers}).pipe(finalize(() => this.loading.next(false)))
   .subscribe(response => {
     this.loading.next(false);
     if(response) {
                return window.location.href='/admin';
       }

   }, error => {
     this.loading.next(false);
     console.log(error);
   });

}

/**
 * Parse JSON without throwing errors.
 */

  getStaredNewToFlipper() {
    this.electronService.redirect('https://flipper.rw');
  }


}
