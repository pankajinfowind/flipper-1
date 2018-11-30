import { Injector, Injectable } from "@angular/core";
import { Settings } from "../config/settings.service";
import { AppConfig } from "../../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class URL {
  settings: Settings;
  constructor(protected injector: Injector) {
    this.settings = this.injector.get(Settings);
  }
  defineAppUrl(): string {
    let url;
    if (this.settings.getBaseUrl() != "http://localhost:4200/") {
      return (url = AppConfig.url + "secure/bootstrap-data");
    } else {
      return (url = this.settings.getBaseUrl() + "secure/bootstrap-data");
    }
  }
  defineAppUrlStock(): string {
    let url;
    if (this.settings.getBaseUrl() != "http://localhost:4200/") {
      return (url = AppConfig.url);
    } else {
      return (url = this.settings.getBaseUrl());
    }
  }
}
