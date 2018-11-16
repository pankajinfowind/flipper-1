import { Injectable } from "@angular/core";
import { AppHttpClient } from "../common/core/http/app-http-client.service";
import { BackendResponse } from "../common/core/types/backend-response";
import { API_ROUTES } from "./api.enum";
import { Session } from "./sessions/sessions.component";
import * as Raven from "raven-js";
Raven.config(
  "https://dff6a3f171414762ac4f1c7e084289c3@sentry.io/1323436"
).install();

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(private http: AppHttpClient) {}

  create(params: Session): BackendResponse<{ data: any }> {
    return this.http.post(API_ROUTES.SESSIONS, params);
    // .pipe(this.errorHandler("Can not Create Pos Session"));
  }
  errorHandler(problem: string): any {
    Raven.captureException(problem);
    Raven.showReportDialog();
  }
  sold(params: any) {
    // this.http.prefix = "api";
    return this.http.post(API_ROUTES.SOLD, params);
  }
}
