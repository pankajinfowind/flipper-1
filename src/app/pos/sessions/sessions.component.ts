import { Component, OnInit } from "@angular/core";
import { CurrentUser } from "../../common/auth/current-user";
import { ApiService } from "../api.service";
import * as Raven from "raven-js";
Raven.config(
  "https://dff6a3f171414762ac4f1c7e084289c3@sentry.io/1323436"
).install();

export interface Session {
  branch_id: number;
  session: string;
}
@Component({
  selector: "app-sessions",
  templateUrl: "./sessions.component.html",
  styleUrls: ["./sessions.component.scss"]
})
export class SessionsComponent implements OnInit {
  constructor(private current_user: CurrentUser, private api: ApiService) {}

  ngOnInit() {}
  createSession() {
    this.api
      .create({ branch_id: 1, session: "flipper-01" })
      .subscribe(
        data => console.log("Session::", data),
        error => this.errorHandler("Flipper can not create session", error)
      );
  }
  errorHandler(problem: string, prex: any): any {
    console.log(prex);
    // Raven.captureException(problem);
    // Raven.showReportDialog();
  }
}
