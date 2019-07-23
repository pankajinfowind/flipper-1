import { Injectable, Injector } from "@angular/core";
import { finalize } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { Settings } from '../common/core/config/settings.service';
import { CurrentUser } from '../common/auth/current-user';
import { ApiTaxRateService } from './tax-rates/api/api.service';
import { TAXRATE } from './tax-rates/api/tax-rate';
import { AppConfig } from '../../environments/environment';
import { API_ROUTES_TAXRATE } from './tax-rates/api/api-routes.enum';
import { SetUpModelService } from './setup-model.service';
import { Reason } from './reasons/api/reason';
import { API_ROUTES_REASON } from './reasons/api/api-routes.enum';
import { CustomerType } from './customerType/api/CustomerType';
import { API_ROUTES_CUSTOMER_TYPE } from './customerType/api/api-routes.enum';
import { ExpirationSetting } from './expiration_setting/api/expiration_setting';
import { API_ROUTES_EXPIRATIONSETTING } from './expiration_setting/api/api-routes.enum';

export function init_app(bootstrapper: BootstrapperSetUp) {
  return () => bootstrapper.bootstrap();
}

@Injectable()
export class BootstrapperSetUp {
  protected taxrate: ApiTaxRateService;
  protected modelSetUpService: SetUpModelService;
  protected http: HttpClient;
  protected settings: Settings;
  protected user: CurrentUser;
  constructor(protected injector: Injector) {
    this.http = this.injector.get(HttpClient);

    this.taxrate = this.injector.get(ApiTaxRateService);

    this.modelSetUpService = this.injector.get(SetUpModelService);

    this.settings = this.injector.get(Settings);
    this.user = this.injector.get(CurrentUser);
  }

  /**
   * Bootstrap application with data returned from server.
   */
  public bootstrap() {
    //this.user.userChanged.subscribe(res => {
      if (localStorage.getItem('active_branch')) {
        this.taxRates();
        this.reasons();
        this.customerTypes();
        this.expirationSettings();
      }
   // });
  }


  protected customerTypes(): Promise<CustomerType[]> {
    let url;
    if (this.settings.getBaseUrl() != "http://localhost:4200/") {
      url = AppConfig.url + "secure/" + API_ROUTES_CUSTOMER_TYPE.CUSTOMER_TYPE;
    } else {
      url = this.settings.getBaseUrl() + "secure/" + API_ROUTES_CUSTOMER_TYPE.CUSTOMER_TYPE;
    }
    this.modelSetUpService.update({ loading: true });
    return new Promise((resolve, reject) => {
      this.http
        .get(url)
        .pipe(
          finalize(() => this.modelSetUpService.update({ loading: false }))
        )
        .subscribe(
          res => {
            this.modelSetUpService.update({
              loading: false,
              customertypes: res["customertypes"]["data"].length > 0
                ? res["customertypes"]["data"]
                : []
            });

            resolve();
          },
          error => {
            this.modelSetUpService.update({ loading: false });
           // console.log("bootstrap error", error);
            reject();
          }
        );
    });
  }

  protected expirationSettings(): Promise<ExpirationSetting[]> {
    let url;
    if (this.settings.getBaseUrl() != "http://localhost:4200/") {
      url = AppConfig.url + "secure/" + API_ROUTES_EXPIRATIONSETTING.EXPIRATIONSETTING;
    } else {
      url = this.settings.getBaseUrl() + "secure/" + API_ROUTES_EXPIRATIONSETTING.EXPIRATIONSETTING;
    }
    this.modelSetUpService.update({ loading: true });
    return new Promise((resolve, reject) => {
      this.http
        .get(url)
        .pipe(
          finalize(() => this.modelSetUpService.update({ loading: false }))
        )
        .subscribe(
          res => {
            this.modelSetUpService.update({
              loading: false,
              expirationSetting: res["expiration_setting"]["data"].length > 0
                ? res["expiration_setting"]["data"]
                : []
            });

            resolve();
          },
          error => {
            this.modelSetUpService.update({ loading: false });
            console.log("bootstrap error", error);
            reject();
          }
        );
    });
  }
  /**
   * Handle specified bootstrap data.
   */
  //reasons
  protected reasons(): Promise<Reason[]> {
    let url;
    if (this.settings.getBaseUrl() != "http://localhost:4200/") {
      url = AppConfig.url + "secure/" + API_ROUTES_REASON.REASON;
    } else {
      url = this.settings.getBaseUrl() + "secure/" +  API_ROUTES_REASON.REASON;
    }
    this.modelSetUpService.update({ loading: true });
    return new Promise((resolve, reject) => {
      this.http
        .get(url)
        .pipe(
          finalize(() => this.modelSetUpService.update({ loading: false }))
        )
        .subscribe(
          res => {

            this.modelSetUpService.update({
              loading: false,
              reasons: res["reasons"]["data"].length > 0
                ? res["reasons"]["data"]
                : []
            });

            resolve();
          },
          error => {
            this.modelSetUpService.update({ loading: false });
            console.log("bootstrap error", error);
            reject();
          }
        );
    });
  }
  protected taxRates(): Promise<TAXRATE[]> {
    let url;
    if (this.settings.getBaseUrl() != "http://localhost:4200/") {
      url = AppConfig.url + "secure/" + API_ROUTES_TAXRATE.TAXRATE;
    } else {
      url = this.settings.getBaseUrl() + "secure/" +  API_ROUTES_TAXRATE.TAXRATE;
    }
    this.modelSetUpService.update({ loading: true });
    return new Promise((resolve, reject) => {
      this.http
        .get(url)
        .pipe(
          finalize(() => this.modelSetUpService.update({ loading: false }))
        )
        .subscribe(
          res => {
            this.modelSetUpService.update({
              loading: false,
              taxRates: res["taxrates"]["data"].length > 0
                ? res["taxrates"]["data"]
                : []
            });

            resolve();
          },
          error => {
            this.modelSetUpService.update({ loading: false });
            console.log("bootstrap error", error);
            reject();
          }
        );
    });
  }



}
