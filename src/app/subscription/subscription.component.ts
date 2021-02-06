import { Component, OnInit } from '@angular/core'
import { CurrentUser } from '../core/guards/current-user'
import { ElectronService } from '../core/services'
import { trigger, transition, useAnimation } from '@angular/animations'
import { fadeInAnimation, PouchConfig, PouchDBService, User, UserLoggedEvent } from '@enexus/flipper-components'
import { FlipperEventBusService } from '@enexus/flipper-event'
import { filter, finalize } from 'rxjs/internal/operators'
import { HttpHeaders, HttpClient } from '@angular/common/http'
import { BehaviorSubject } from 'rxjs'
import { CardValidationComponent } from './validate-card/validate-card.component'
import { environment } from '../../environments/environment'
import { DialogService, DialogSize } from '@enexus/flipper-dialog'
// import { AngularFirestore } from '@angular/fire/firestore'
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'
import { PusherService } from '../pusher.service'
import { PaidSuccessComponent } from './paid-success/paid-success.component'
import { Router } from '@angular/router'
export interface MomoFlutterWaveResponse {
    message: MomoMessage;
}

export interface MomoMessage {
    status:  string;
    message: string;
    meta:    Meta;
}

export interface Meta {
    authorization: Authorization;
}

export interface Authorization {
    redirect: string;
    mode:     string;
}
export class Response {
  message: Message
}
export class Plan {
  amount: number
}
export class Data {
  txRef?: any
  code?: string
  flwRef?: string
  raveRef?: string
  amount?: any
  currency?: any
  message?: string
  customer?: Customer
  customerId?: any
  chargeResponseMessage?: any
  status?: any
}
export class Message {
  status?: string
  meta: any
  data: Data
  message?: string
  expiresAt?: any
}
export class Customer {
  id?: number
  accountId?: any
  fullName?: string
}

@Component({
  selector: 'app-subscription',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.scss'],
  animations: [
    trigger('insertLogin', [transition(':enter', useAnimation(fadeInAnimation, { params: { duration: '1s' } }))]),
  ],
})
export class SubscriptionComponent implements OnInit {

  plans:any =[
    {
      'name': 'Gold /6 months',
      'value': 600
    },
    {
      'name': 'Starter /monthly',
      'value': 150
    },
    {
      'name': 'Premimum / 3 months',
      'value': 100
    },
    {
      'name': 'Gold /12 months',
      'value': 1200
    }
  ];
  branches:any = [1,2,4,6,10]
  constructor(
    private pusher: PusherService,
    // private firestore: AngularFirestore,
    private router: Router,
    private formBuilder: FormBuilder,
    public dialog: DialogService,
    private eventBus: FlipperEventBusService,
    private database: PouchDBService,
    public currentUser: CurrentUser,
    public electronService: ElectronService,
    protected httpClient: HttpClient
  ) {
    this.database.connect(PouchConfig.bucket, window.localStorage.getItem('channel'))
  }

  get mobilephone() {
    return this.buyForm.get('mobilephone')
  }

  get amount() {
    return this.buyForm.get('amount')
  }
  user: Array<any>
  public loading = new BehaviorSubject(false)
  public ccNumMissingTxt = new BehaviorSubject('CCV number is required')
  public cardExpiredTxt = new BehaviorSubject('Card has expired')
  message = { message: null, momo: null, error: false }
  flipperPlan = 0
  buyForm: FormGroup = this.formBuilder.group({
    mobilephone: ''
  })
  currency = 'RWF'
  showCard = false
  color = 'primary'
  public totalAmount: any = null
  today = new Date()

  step = 0
  isFocused: any = ''
  redirectMomo = null
  ngOnInit() {

    const userId = this.currentUser.get('userIdNew') as String

    this.pusher.handleDomainMessage.bind('event-handle-domain-message-flipper.' + userId, event => {
      if (event) {
        this.message.error = true
        this.message.message = event.message
      }
    })

    this.pusher.paymentApproved.bind('event-payment-message-flipper.' + userId, event => {
      // console.table(event);
      if (event) {
        if (event.payment_status === 'approved') {
          this.message.error = false
          this.message.message = ''
          this.message.momo = ''
          // this.currentUser.currentUser.expiresAt = Date.parse(event.expiresAt)
          //TODO: save that the user has completed payment
          // this.database.put(PouchConfig.Tables.user, this.currentUser.currentUser)

          this.openDialog(true, event)
        } else {
          this.openDialog(false, event)
        }
      }
    })

    this.eventBus
      .of<UserLoggedEvent>(UserLoggedEvent.CHANNEL)
      // .pipe(filter(e => e.user && (e.user.id !== null || e.user.id !== undefined)))
      .subscribe(res => (this.currentUser.currentUser = res.user))

    if (PouchConfig.canSync) {
      // this.database.sync([PouchConfig.syncUrl])
    }

    // this.getFlipperPlan()
    //   .valueChanges()
    //   .subscribe(res => {
    //     if (res) {
    //       const plan: Plan[] = res as Plan[]
    //       this.flipperPlan = plan[0].amount
    //     }
    //   })

    this.buyForm = new FormGroup({
      mobilephone: new FormControl('', [Validators.required]),
    })
  }

  disableMomo:boolean = false;
  changePlan(price){
    this.flipperPlan = price[0];
    if(this.flipperPlan == this.plans[1].value){
      this.disableMomo = true;
    }else{
      this.disableMomo = false;
    }
  }
  changeBusinessSize(branches){
    if(branches.length == 0){
      this.flipperPlan = 0;
      this.flipperPlan = this.plans[2].value * 1; //when unselect assume momo is still selected
    }else{
      this.flipperPlan = this.flipperPlan * branches[0]; //default is 1 branch
    }
  }
  openDialog(success, event) {
    return this.dialog.open(PaidSuccessComponent, DialogSize.SIZE_MD, { success, event }).subscribe(result => {
      const today =
        this.today.getFullYear() +
        '-' +
        ('0' + (this.today.getMonth() + 1)).slice(-2) +
        '-' +
        ('0' + this.today.getDate()).slice(-2)

      if (success) {
        const subscription = {
          id: this.database.uid(),
          userId: this.currentUser.currentUser.userId,
          subscriptionType: 'monthly',
          lastPaymentDate: today,
          nextPaymentDate: event.expiresAt,
          status: 'success',
          didSubscribed: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          table: 'subscription',
          docId: PouchConfig.Tables.subscription,
        }

        this.database.put(PouchConfig.Tables.subscription, subscription)
        return this.router.navigate(['/admin'])
      }
    })
  }

  getFlipperPlan() {
    // return this.firestore.collection('flipper-plan')
  }

  submitCard(data) {
    const formSubscription = {
      cardno: data.cardNumber,
      expirymonth: data.expirationMonth,
      expiryyear: data.expirationYear,
      vcc: data.ccv,
      email: this.currentUser.get('email'),
      firstname: data.cardHolder,
      lastname: data.cardHolder,
      planid: '5422',
      transactionid: new Date().getTime,
      phone: '07888888888',
      amount: this.flipperPlan,
      pay_type: 'CARD',
      appname: 'FLIPPER',
      currency: 'RWF',
      userId: this.currentUser.currentUser.id,
    }
    return this.subscribeWithCard(formSubscription)
  }
  subscribeWithCard(cardDetail){
    this.loading.next(true)
    this.ccNumMissingTxt.next('')
    this.cardExpiredTxt.next('')
    this.message.error = false
    this.message.message = ''
    this.redirectMomo = ''
    return this.httpClient
      .post(environment.paymentUrl + 'subscribe', cardDetail)
      .pipe(finalize(() => this.loading.next(false)))
      .subscribe(
        (res:MomoFlutterWaveResponse) => {
          this.loading.next(false)
            if(res.message.status =="success"){
              this.redirectMomo = res.message.meta.authorization.redirect;
              //save the payment subscription and date.
            }
        },
        error => {
          this.loading.next(false)
          this.message.error = true
          this.message.message = 'Something went wrong, check you are connected to internet!'
          console.log(error)
        }
      )
  }
  submitMomo() {
    const time = new Date().getTime();
    const formSubscription = {
      firstname: this.currentUser.get('name'),
      phonenumber: this.buyForm.value.mobilephone,
      phone: this.buyForm.value.mobilephone,
      amount: this.flipperPlan,
      transactionid: time,
      userIf: localStorage.getItem('userIdNew'),
      pay_type: 'MOMO-RWANDA',
      userId: this.currentUser.currentUser.id,
      email: 'dev@gmail.com',
      lastname: this.currentUser.get('name'),
      appname: 'FLIPPER',
      currency: 'RWF',
    }
    this.message.error = false
    this.message.message = ''
    if (!this.buyForm.value.mobilephone) {
      this.message.error = true
      this.message.message = 'Mobile number is required'
    }
    return this.chargeMomo(formSubscription)
  }

  chargeMomo(creds) {

    const headers = new HttpHeaders({
      'Content-Type': 'aapplication/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': '*',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    })
    this.loading.next(true)
    this.ccNumMissingTxt.next('')
    this.cardExpiredTxt.next('')
    this.message.error = false
    this.message.message = ''
    this.redirectMomo = ''
    return this.httpClient
      .post(environment.paymentUrl + 'charge', creds)
      .pipe(finalize(() => this.loading.next(false)))
      .subscribe(
        (res:MomoFlutterWaveResponse) => {
          this.loading.next(false)
            if(res.message.status =="success"){
              this.redirectMomo = res.message.meta.authorization.redirect;
            }
        },
        error => {

          this.loading.next(false)
          this.message.error = true
          this.message.message = 'Something went wrong, maybe you are not connected to the internet!'
          console.log(error)
        }
      )
  }

  saveExpiredDate() {
    const headers = new HttpHeaders({
      'Content-Type': 'aapplication/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': '*',
      // TODO: add token back in user model
      // Authorization: 'Bearer ' + this.currentUser.currentUser.token,
    })

    this.loading.next(true)

    return this.httpClient
      .get(environment.url + 'api/save-expired-at/' + this.currentUser.get('userIdNew'), { headers })
      .pipe(finalize(() => this.loading.next(false)))
      .subscribe(res => {
        const resp: Message = res as Message

        this.loading.next(false)
        const data: User = resp.data as User
        if (resp.status === 'success') {
          this.message.error = false
          this.message.message = ''
          this.message.momo = ''
          // this.currentUser.currentUser.expiresAt = Date.parse(data.expiresAt)
          // console.log(this.currentUser.currentUser);
          this.database.put(PouchConfig.Tables.user, this.currentUser.currentUser)
          return this.openDialog(true, data)
        }
      })
  }

  openValidateCardDialog(obj) {
    return this.dialog.open(CardValidationComponent, DialogSize.SIZE_MD, obj).subscribe(result => {
      // console.log(result);
      if (result === 'success') {
        return this.saveExpiredDate()
      }
    })
  }

  /**
   * Parse JSON without throwing errors.
   */

  getStaredNewToFlipper() {
    this.electronService.redirect('https://flipper.yegobox.com')
  }

  setStep(index: number) {
    this.step = index
  }

  nextStep() {
    this.step++
  }

  prevStep() {
    this.step--
  }

  focusing(value: any) {
    this.isFocused = value
    this.buyForm.controls.mobilephone.setValue('')
  }
  focusingOut() {
    this.isFocused = ''
  }

  async logout() {
    await this.currentUser.user()
    console.log(this.currentUser.currentUser)
    if (this.currentUser.currentUser) {
      this.currentUser.currentUser.active = false
      await this.database.put(PouchConfig.Tables.user, this.currentUser.currentUser)
    }

    window.localStorage.setItem('channel', this.database.uid())
    this.currentUser.redirectUri = 'login'
    return this.router.navigate(['/login'])
  }
}
