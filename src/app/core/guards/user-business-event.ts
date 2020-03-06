import { BusEvent } from "@enexus/flipper-event";
import {  Business } from "@enexus/flipper-components";


export class UserBusinessEvent extends BusEvent {

  public static readonly CHANNEL = 'user-business';

  constructor(public business: Business[]) {
    super(UserBusinessEvent.CHANNEL);
  }
}
