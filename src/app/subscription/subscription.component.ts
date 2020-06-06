import { Component, OnInit } from '@angular/core';
import { CurrentUser } from '../core/guards/current-user';
import { ElectronService } from '../core/services';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInAnimation, PouchConfig, PouchDBService, UserLoggedEvent } from '@enexus/flipper-components';
import { FlipperEventBusService } from '@enexus/flipper-event';
import { filter, finalize } from 'rxjs/internal/operators';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {BehaviorSubject, Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { CardValidationComponent } from './validate-card/validate-card.component';
import { environment } from '../../environments/environment';
import { DialogService, DialogSize } from '@enexus/flipper-dialog';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';
export class Response {
  message: Message;

}
export class Data {
  txRef?: any;
  code?: string;
  flwRef?: string;
  raveRef?: string;
  amount?: any;
  currency?: any;
  message?: string;
  customer?: Customer;
  customerId?: any;
  chargeResponseMessage?: any;

}
export class Message {
  status?: string;

  data: Data;
}
export class Customer {
  id?: number;accountId?: any;
  fullName?: string;
}

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
   message = { message:null,momo: null, error: false };
   ref = firebase.firestore().collection('flipper-plan');
   flipperPlan=[];
  constructor(  public dialog: DialogService,private eventBus: FlipperEventBusService,private database: PouchDBService,
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

    firebase.initializeApp(environment.config);
    firebase.firestore().settings(environment.settings);
    this.getFlipperPlan();
    console.log(this.flipperPlan);
  }

  getFlipperPlan() {

      return this.ref.onSnapshot((querySnapshot) => {
        const flipperPlan = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          flipperPlan.push({
            key: doc.id,
            title: data.title,
            description: data.description,
            author: data.author
          });
        });
        this.flipperPlan.push(flipperPlan);
      });

  }

  subscribe(data) {
    const headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Credentials': '*'});
    this.loading.next(true);
    this.ccNumMissingTxt.next('');
    this.cardExpiredTxt.next('');


    const creds = 'cardno=' + data.cardNumber + '&expirymonth=' + data.expirationMonth +
     '&expiryyear='+data.expirationYear+ '&vcc='+data.ccv+'&email='
     +this.currentUser.get('email')+'&firstname='+data.cardHolder
     +'&lastname='+data.cardHolder+'&planId='+5422+'&phonenumber='+'0781945189'
     +'&amount='+2
     +'&pay_type='+'CARD'
     +'&currency='+'RWF'
     +'&appname='+'FLIPPER'+'&transactionid='+1000;

    return this.httpClient
        .post(environment.paymentUrl+'subscribe',
        creds,{headers}).pipe(finalize(() => this.loading.next(false)))
        .subscribe(res => {
          this.loading.next(false);
          console.log(res);
          const response: Response=res as Response;
          if(response) {

                if(response.message.status==='error') {
                      if(response.message.data.code==='CARD_ERR') {
                        this.ccNumMissingTxt.next(response.message.data.message);
                      }
                      if(response.message.data.code==='ERR') {
                        this.cardExpiredTxt.next('Card has expired');
                      }

                } else if(response.message.status==='success') {
                  console.log(res);
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
                  this.message.message = response.message.data.chargeResponseMessage;
                  this.openValidateCardDialog(response.message.data,subscription);
                  // if(this.database.put(PouchConfig.Tables.subscription,subscription)) {
                  //   return window.location.href='/admin';
                      // return this.saveSubscriptionToFripperApi({
                      //   subscribed: 'subscribed',
                      //   txRef: response.message.data.txRef,
                      //   flwRef: response.message.data.flwRef,
                      //   raveRef:response.message.data.raveRef,
                      //   flutter_customer_id:response.message.data.customer?
                      //   response.message.data.customer.id:response.message.data.customerId,
                      //   flutter_customer_accountId:response.message.data.customer?
                      //   response.message.data.customer.accountId:0,
                      //   amount:response.message.data.amount,
                      //   currency: response.message.data.currency,
                      //   app: 'Flipper',
                      //   customer_name:response.message.data.customer?
                      //   response.message.data.customer.fullName:''
                      // });
                 //  }
                } else {
                  console.log(response);
                }

            }

        }, error => {
          this.loading.next(false);
          console.log(error);
        });

      }

      openValidateCardDialog(obj,subscription) {

          return this.dialog.open(CardValidationComponent, DialogSize.SIZE_MD, obj).subscribe(result => {
            console.log(result);
            if(result=='success') {
              if(this.database.put(PouchConfig.Tables.subscription,subscription)) {
                return window.location.href='/admin';
                }
              }

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
