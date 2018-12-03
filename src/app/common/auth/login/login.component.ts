import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter,
  OnInit
} from "@angular/core";
import * as Raven from "raven-js";
Raven.config(
  "https://dff6a3f171414762ac4f1c7e084289c3@sentry.io/1323436"
).install();

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  ngOnInit(): void {
    // throw new Error("I Know nothing");
    // Raven.captureException("we can not load item from stock sir sorry");
    // Raven.showReportDialog();
  }
  constructor() {}
  @Input() label = "login";
  @Input() token = "";
  @Input() appname = "YeGoBox";
  @Input() redirecturl = "/home";
  @Output() action = new EventEmitter<any>();
  user = {};
  next_step = false;
  rest_password = false;
  checkChanges($event) {
    this.user = $event.user;
    this.next_step = $event.next_step;
    this.rest_password = $event.rest_password;
  }
}
