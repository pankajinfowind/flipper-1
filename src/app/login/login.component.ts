import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
@Component({
  selector: "yegobox-user-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor() {}
  @Input()
  label = "login";
  @Input()
  token = "";
  @Input()
  appname = "Yegobox";
  @Input()
  redirecturl = "/home";
  @Output()
  action = new EventEmitter<any>();
  user = {};
  next_step = false;
  rest_password = false;
  checkChanges($event) {
    this.user = $event.user;
    this.next_step = $event.next_step;
    this.rest_password = $event.rest_password;
  }

  ngOnInit() {}
}
