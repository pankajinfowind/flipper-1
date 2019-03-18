import { Injectable, Injector } from "@angular/core";
import { finalize } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { CurrentUser } from "../common/auth/current-user";
import { Settings } from "../common/core/config/settings.service";
import { ApiPosService } from "./api/api.service";
import { PosModelService } from "./pos-model.service";
import { AppConfig } from "../../environments/environment";
import { API_ROUTES } from "./api/api-routes.enum";
import { OrderModelService } from '../orders/order-model.service';
import { Orders } from '../orders/orders';
import { OrderItemsModelService } from './cart/order-item-model.service';
import { NgxService } from '../common/ngx-db/ngx-service';
import { Stock } from '../stock/api/stock';
import { Pos } from './pos';

export function init_app(bootstrapper: BootstrapperPos) {
  return () => bootstrapper.bootstrap();
}

@Injectable()
export class BootstrapperPos {
  protected http: HttpClient;
  protected settings: Settings;
  protected user: CurrentUser;
  protected apiPos: ApiPosService;
  protected posModelService: PosModelService;
  protected orderModelService: OrderModelService;
  protected orderItemModelService: OrderItemsModelService
  constructor(protected injector: Injector, private db: NgxService) {
    this.http = this.injector.get(HttpClient);

    this.apiPos = this.injector.get(ApiPosService);

    this.posModelService = this.injector.get(PosModelService);
    this.orderModelService = this.injector.get(OrderModelService);
    this.orderItemModelService = this.injector.get(OrderItemsModelService);
    this.settings = this.injector.get(Settings);
    this.user = this.injector.get(CurrentUser);
  }
  /**
   * Bootstrap application with data returned from server.
   */
  public bootstrap() {
      if (localStorage.getItem('active_branch')) {
        const active_branch =parseInt(localStorage.getItem('active_branch'));
        this.posSaleStocks(active_branch);
        this.orders();
      }
  }

  /**
   * Handle specified bootstrap data.
   */
  protected posSaleStocks(branch_id): Promise<Stock[]> {
    let url;
    if (this.settings.getBaseUrl() != "http://localhost:4200/") {
      url = AppConfig.url + "secure/" + API_ROUTES.POSSALESSTOCK+'/'+branch_id;
    } else {
      url = this.settings.getBaseUrl() + "secure/" + API_ROUTES.POSSALESSTOCK+'/'+branch_id;
    }
    this.posModelService.update({ loading: true });
    return new Promise((resolve, reject) => {
      this.http
        .get(url)
        .pipe(finalize(() => this.posModelService.update({ loading: false })))
        .subscribe(
          res => {
            if (res['status'] == 'success') {
              const stocks: Stock[] = res['stocks']['data'].length > 0 ? res['stocks']['data']:[];
              this.posModelService.update({ loading: false, stocks:stocks});
            }
            resolve();
          },
          error => {
            this.posModelService.update({ loading: false, pos_sale_stock:[]});
             reject();
          }
        );
    });
  }
  protected orders(): Promise<Orders[]> {
    let url;
    if (this.settings.getBaseUrl() != "http://localhost:4200/") {
      url = AppConfig.url + "secure/" + API_ROUTES.USERORDER;
    } else {
      url = this.settings.getBaseUrl() + "secure/" + API_ROUTES.USERORDER;
    }
    this.posModelService.update({ loading: true });
    return new Promise((resolve, reject) => {
      this.http
        .get(url)
        .pipe(finalize(() => this.posModelService.update({ loading: false })))
        .subscribe(
          res => {
            if (res['status'] == 'success') {
              if(res['orders']){
              const order: Orders = res['orders'].length > 0 ? res['orders'].find(order => order.is_currently_processing === '1') : null;

              const obj:Pos={ loading: false,
                currently_ordered: order ? order : null,panel_content: 'home',orders: res["orders"].length > 0 ? res['orders'] : []
                };


                  if(order && order.customer){
                    obj.choose_customer=order.customer;
                    obj.customer_type_price=order.customer_type;
                  }else{
                    obj.choose_customer=null;
                    obj.customer_type_price=null;
                  }

                this.posModelService.update(obj);
                  if(obj){
                    this.orderItemModelService.update(order['order_items'], 'all');
                  }


              }
            }

            resolve();
          },
          error => {
            this.orderModelService.update([]);
            reject();
          }
        );
    });
  }
}
