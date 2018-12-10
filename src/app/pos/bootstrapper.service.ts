import { Injectable, Injector } from "@angular/core";
import { finalize } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { CurrentUser } from "../common/auth/current-user";
import { Settings } from "../common/core/config/settings.service";
import { ApiPosService } from "./api/api.service";
import { PosModelService } from "./pos-model.service";
import { OrderModelService } from "./orders/order-model.service";
import { Orders } from "./orders/orders";
import { AppConfig } from "../../environments/environment";
import { API_ROUTES } from "./api/api-routes.enum";

export function init_app(bootstrapper: Bootstrapper) {
  return () => bootstrapper.bootstrap();
}

@Injectable()
export class Bootstrapper {
  protected http: HttpClient;
  protected settings: Settings;
  protected user: CurrentUser;
  protected apiPos: ApiPosService;
  protected posModelService: PosModelService;
  protected orderModelService: OrderModelService;
  constructor(protected injector: Injector) {
    this.http = this.injector.get(HttpClient);

    this.apiPos = this.injector.get(ApiPosService);

    this.posModelService = this.injector.get(PosModelService);
    this.orderModelService = this.injector.get(OrderModelService);

    this.settings = this.injector.get(Settings);
    this.user = this.injector.get(CurrentUser);
  }

  /**
   * Bootstrap application with data returned from server.
   */
  public bootstrap() {
    this.user.userChanged.subscribe(res => {
      if (res["business"][0]) {
        this.orders();
      }
    });
  }

  /**
   * Handle specified bootstrap data.
   */
  protected orders(): Promise<Orders[]> {
    let url;
    if (this.settings.getBaseUrl() != "http://localhost:4200/") {
      url = AppConfig.url + "secure/" + API_ROUTES.ORDER;
    } else {
      url = this.settings.getBaseUrl() + "secure/" + API_ROUTES.ORDER;
    }
    this.posModelService.update({ loading: true });
    return new Promise((resolve, reject) => {
      this.http
        .get(url)
        .pipe(finalize(() => this.posModelService.update({ loading: false })))
        .subscribe(
          res => {
            console.log(res);
            this.orderModelService.update({ orders: res["orders"] });

            resolve();
          },
          error => {
            this.orderModelService.update([]);
            console.log("bootstrap error", error);
            reject();
          }
        );
    });
  }
}
