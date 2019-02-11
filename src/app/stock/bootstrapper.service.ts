import { Injectable, Injector } from "@angular/core";
import { ApiStockService } from "./api/api.service";
import { StockModelService } from "./stock-model.service";
import { finalize } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { API_ROUTES } from "./api/api-routes.enum";
import { HttpClient } from "@angular/common/http";
import { Settings } from "../common/core/config/settings.service";
import { AppConfig } from "../../environments/environment";
import { CurrentUser } from '../common/auth/current-user';
import { Stock } from './api/stock';
import { StockExpired } from './expired-stock/api/expired-stock';
import { API_ROUTES_EXPITEDITEM } from './expired-stock/api/api-routes.enum';

export function init_app(bootstrapper: Bootstrapper) {
    return () => bootstrapper.bootstrap();
}


@Injectable()
export class Bootstrapper {

    protected apiStock: ApiStockService;
    protected modelStockService: StockModelService;
    protected http: HttpClient;
    protected settings: Settings;
    protected user: CurrentUser;
    public loading = new BehaviorSubject(false);
    constructor(protected injector: Injector) {
        this.http = this.injector.get(HttpClient);
        this.apiStock = this.injector.get(ApiStockService);
        this.modelStockService = this.injector.get(StockModelService);
        this.settings = this.injector.get(Settings);
        this.user = this.injector.get(CurrentUser);
    }

    /**
     * Bootstrap application with data returned from server.
     */
    public bootstrap() {
      //  this.user.userChanged.subscribe(res => {

            if (localStorage.getItem('active_branch')) {
              const active_branch =parseInt(localStorage.getItem('active_branch'));
                this.modelStockService.update({ loading: true });
                this.stockHandleData(active_branch);
                this.stockExpired(active_branch);
            }

        //});

    }

    /**
     * Handle specified bootstrap data.
     */

    protected stockHandleData(branch_id): Promise<Stock[]> {
        let url;
        if (this.settings.getBaseUrl() != "http://localhost:4200/") {
            url = AppConfig.url + "secure/" + API_ROUTES.BRANCH_STOCK + '/' + branch_id ;
        } else {
            url = this.settings.getBaseUrl() + "secure/" + API_ROUTES.BRANCH_STOCK + '/' + branch_id;
        }
        return new Promise((resolve, reject) => {
            this.http.get(url)
                .pipe(finalize(() => this.modelStockService.update({ loading: false })))
                .subscribe(
                    res => {
                  let available=[];
                  let lowerstock=[];
                  let stockout=[];
                    if(res["stocks"]['data'].length > 0){
                      available=res["stocks"]['data'].filter(stock=>stock.status==='available');
                      lowerstock=res["stocks"]['data'].filter(stock=>stock.status==='lowerstock');
                      stockout =res["stocks"]['data'].filter(stock=>stock.status==='stockout');
                    }
                    this.modelStockService.update({ loading: false, available: available,lowerstock:lowerstock,stockout:stockout });
                        resolve();
                    },
                    error => {
                        this.modelStockService.update({ loading: false });
                        console.log("bootstrap error", error);
                        reject();
                    }
                );
        });
    }

      protected stockExpired(branch_id): Promise<StockExpired[]> {
        let url;
        if (this.settings.getBaseUrl() != "http://localhost:4200/") {
            url = AppConfig.url + "secure/" + API_ROUTES_EXPITEDITEM.EXPITEDITEM_ALL + '/' + branch_id ;
        } else {
            url = this.settings.getBaseUrl() + "secure/" + API_ROUTES_EXPITEDITEM.EXPITEDITEM_ALL + '/' + branch_id;
        }
        return new Promise((resolve, reject) => {
            this.http.get(url)
                .pipe(finalize(() => this.modelStockService.update({ loading: false})))
                .subscribe(
                    res => {
                      this.modelStockService.update({ loading: false, expiredStock:res["expired_items"]['data'].length > 0?res["expired_items"]['data']:[]});
                        resolve();
                    },
                    error => {
                        this.modelStockService.update({ loading: false });
                        console.log("bootstrap error", error);
                        reject();
                    }
                );
        });
    }
}

