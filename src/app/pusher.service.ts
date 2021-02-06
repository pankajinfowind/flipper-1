declare const Pusher: any
import { Injectable } from '@angular/core'
import { CurrentUser } from './core/guards/current-user'
import { environment } from '../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class PusherService {
  pusher: any
  handleDomainMessage: any
  paymentApproved: any

  constructor(private user: CurrentUser) {
    this.pusher = new Pusher(environment.pusher.key, {
      cluster: environment.pusher.cluster,
      encrypted: environment.pusher.cluster,
    })

    const userId = this.user.get('userIdNew') as string

    this.handleDomainMessage = this.pusher.subscribe('handle-domain-message-flipper.' + userId)
    this.paymentApproved = this.pusher.subscribe('payment-message-flipper.' + userId)
  }
}
