import { Injectable, Injector } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { APP_CONFIG } from "./config/flipper-config.service";

@Injectable({
  providedIn: "root"
})
export class BootstraperService {
  protected http: HttpClient;
  settings: any;

  constructor(protected injector: Injector) {
    this.http = this.injector.get(HttpClient);

    // merge all config provided by modules into single object
    this.injector.get(APP_CONFIG).forEach(providedConfig => {
      return this.settings.merge({ vebto: providedConfig });
    });
  }
}
