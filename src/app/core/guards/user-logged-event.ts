import { BusEvent } from '@enexus/flipper-event';
import { User } from '@enexus/flipper-components';


export class UserLoggedEvent extends BusEvent {

  public static readonly CHANNEL = 'current-user';

  constructor(public user: User) {
    super(UserLoggedEvent.CHANNEL);
  }
}
