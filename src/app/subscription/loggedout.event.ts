import { BusEvent } from "@enexus/flipper-event"

export class LoggedOutEvent extends BusEvent {
  public static readonly CHANNEL = 'user-logged'

  constructor(public event: boolean) {
    super(LoggedOutEvent.CHANNEL)
  }
}
