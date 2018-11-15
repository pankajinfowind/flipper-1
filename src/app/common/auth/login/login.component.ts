import {
  Component,
  ViewEncapsulation,
  Input,
  Output,
  EventEmitter
} from "@angular/core";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent {
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
