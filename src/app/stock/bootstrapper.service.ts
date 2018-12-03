import {Injectable, Injector} from "@angular/core";
import {ApiStockService} from "./api/api.service";
import {StockModelService} from "./stock-model.service";
import {finalize} from "rxjs/operators";
import {BehaviorSubject} from "rxjs";
import {API_ROUTES} from "./api/api-routes.enum";
import {HttpClient} from "@angular/common/http";
import {Settings} from "../common/core/config/settings.service";
import {AppConfig} from "../../environments/environment";

export function init_app(bootstrapper: Bootstrapper) {
    return () => bootstrapper.bootstrap();
}


@Injectable()
export class Bootstrapper {
    protected apiStock: ApiStockService;
    protected modelStockService: StockModelService;
    protected http: HttpClient;
    protected settings: Settings;
    public loading = new BehaviorSubject(false);

    constructor(protected injector: Injector) {
        this.http = this.injector.get(HttpClient);
        this.apiStock = this.injector.get(ApiStockService);
        this.modelStockService = this.injector.get(StockModelService);
        this.settings = this.injector.get(Settings);
    }

    /**
     * Bootstrap application with data returned from server.
     */
    public bootstrap() {
        this.modelStockService.update({loading: true});
        this.stockHandleData(1, 'available');
        this.stockHandleData(1, 'stockout');
        this.stockHandleData(1, 'damaged');
    }


    /**
     * Handle specified bootstrap data.
     */
    protected stockHandleData(branch_id, status): Promise<any> {
        let url;
        if (this.settings.getBaseUrl() != "http://localhost:4200/") {
            url = AppConfig.url + "secure/" + API_ROUTES.BRANCH_STOCK + '/' + branch_id + '/' + status;
        } else {
            url = this.settings.getBaseUrl() + "secure/" + API_ROUTES.BRANCH_STOCK + '/' + branch_id + '/' + status;
        }
        return new Promise((resolve, reject) => {
            this.http.get(url)
                .pipe(finalize(() => this.modelStockService.update({loading: false})))
                .subscribe(
                    res => {
                        if (status == 'available') {
                            if (res["stocks"]) {
                                this.modelStockService.update({loading: false, available: res["stocks"]["data"]});
                            }

                        } else if (status == 'stockout') {
                            if (res["stocks"]) {
                                this.modelStockService.update({loading: false, stockout: res["stocks"]["data"]});
                            }
                        } else if (status == 'damaged') {
                            if (res["stocks"]) {
                                this.modelStockService.update({loading: false, damaged: res["stocks"]["data"]});
                            }

                        }
                        resolve();
                    },
                    error => {
                        this.modelStockService.update({loading: false});
                        console.log("bootstrap error", error);
                        reject();
                    }
                );
        });
    }
}

