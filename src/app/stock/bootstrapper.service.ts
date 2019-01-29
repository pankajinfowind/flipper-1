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
                this.stockHandleData(active_branch, 'available');
                this.stockHandleData(active_branch, 'stockout');
                this.stockHandleData(active_branch, 'damaged');
            }

        //});

    }


    /**
     * Handle specified bootstrap data.
     */
    protected stockHandleData(branch_id, status): Promise<Stock[]> {
        let url;
        if (this.settings.getBaseUrl() != "http://localhost:4200/") {
            url = AppConfig.url + "secure/" + API_ROUTES.BRANCH_STOCK + '/' + branch_id + '/' + status;
        } else {
            url = this.settings.getBaseUrl() + "secure/" + API_ROUTES.BRANCH_STOCK + '/' + branch_id + '/' + status;
        }
        return new Promise((resolve, reject) => {
            this.http.get(url)
                .pipe(finalize(() => this.modelStockService.update({ loading: false })))
                .subscribe(
                    res => {
                        if (status == 'available') {
                                this.modelStockService.update({ loading: false, available: res["stocks"]['data'].length > 0 ?res["stocks"]['data']:[] });

                        } else if (status == 'stockout') {
                                this.modelStockService.update({ loading: false, stockout: res["stocks"]['data'].length > 0 ?res["stocks"]['data']:[] });

                        } else if (status == 'damaged') {
                                this.modelStockService.update({ loading: false, damaged: res["stocks"]['data'].length > 0 ?res["stocks"]['data']:[] });


                        }
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

