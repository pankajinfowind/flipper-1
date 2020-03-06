import { BusEvent } from '@enexus/flipper-event';
import { User, Subscription } from '@enexus/flipper-components';


export class UserSubscriptionEvent extends BusEvent {

  public static readonly CHANNEL = 'user-subscription';

  constructor(public subscription: Subscription) {
    super(UserSubscriptionEvent.CHANNEL);
  }
}
