import { Injectable, Injector } from "@angular/core";
import { finalize } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { ApiItemService } from "./items/api/api.service";
import { MasterModelService } from "./master-model.service";
import { HttpClient } from "@angular/common/http";
import { CurrentUser } from "../../common/auth/current-user";
import { AppConfig } from "../../../environments/environment";
import { ApiCategoryService } from "./categories/api/api.service";
import { ApiInsuranceService } from "./insurance/api/ap.service";
import { Settings } from "../../common/core/config/settings.service";
import { API_ROUTES } from "./categories/api/api-routes.enum";
import { API_ROUTES_ITEMS } from "./items/api/api-routes.enum";
import { Category } from "./categories/api/category";
import { Insurance } from "./insurance/api/insurance";
import { API_ROUTES_INSURANCES } from "./insurance/api/api-routes.enum";
import { Item } from "./items/api/item";
import { Brand } from './brands/api/brand';
import { API_ROUTES_BRAND } from './brands/api/api-routes.enum';
import { API_ROUTES_BRANCH } from './branch/api/api-routes.enum';
import { Branch } from './branch/api/branch';

export function init_app(bootstrapper: Bootstrapper) {
  return () => bootstrapper.bootstrap();
}

@Injectable()
export class Bootstrapper {
  protected apiItem: ApiItemService;
  protected apiCategories: ApiCategoryService;
  protected apiInsurances: ApiInsuranceService;
  protected modelMasterService: MasterModelService;
  protected http: HttpClient;
  protected settings: Settings;
  protected user: CurrentUser;
  constructor(protected injector: Injector) {
    this.http = this.injector.get(HttpClient);

    this.apiItem = this.injector.get(ApiItemService);
    this.apiCategories = this.injector.get(ApiCategoryService);
    this.apiInsurances = this.injector.get(ApiInsuranceService);

    this.modelMasterService = this.injector.get(MasterModelService);

    this.settings = this.injector.get(Settings);
    this.user = this.injector.get(CurrentUser);
  }

  /**
   * Bootstrap application with data returned from server.
   */
  public bootstrap() {
    this.user.userChanged.subscribe(res => {
      if (res["business"][0]) {
        this.categories();
        this.items();
        this.brands();
        this.insurances();
        this.branchies();
      }
    });
  }

  /**
   * Handle specified bootstrap data.
   */
  protected categories(): Promise<Category[]> {
    let url;
    if (this.settings.getBaseUrl() != "http://localhost:4200/") {
      url = AppConfig.url + "secure/" + API_ROUTES.CATEGORY;
    } else {
      url = this.settings.getBaseUrl() + "secure/" + API_ROUTES.CATEGORY;
    }
    this.modelMasterService.update({ loading: true });
    return new Promise((resolve, reject) => {
      this.http
        .get(url)
        .pipe(
          finalize(() => this.modelMasterService.update({ loading: false }))
        )
        .subscribe(
          res => {
            this.modelMasterService.update({
              loading: false,
              categories: res["categories"]["data"].length > 0
                ? res["categories"]["data"]
                : []
            });

            resolve();
          },
          error => {
            this.modelMasterService.update({ loading: false });
            console.log("bootstrap error", error);
            reject();
          }
        );
    });
  }
  protected branchies(): Promise<Branch[]> {
    let url;
    if (this.settings.getBaseUrl() != "http://localhost:4200/") {
      url = AppConfig.url + "secure/" + API_ROUTES_BRANCH.BRANCH;
    } else {
      url = this.settings.getBaseUrl() + "secure/" + API_ROUTES_BRANCH.BRANCH;
    }
    this.modelMasterService.update({ loading: true });
    return new Promise((resolve, reject) => {
      this.http
        .get(url)
        .pipe(
          finalize(() => this.modelMasterService.update({ loading: false }))
        )
        .subscribe(
          res => {
            this.modelMasterService.update({
              loading: false,
              branchs: res["branchs"]["data"].length > 0
                ? res["branchs"]["data"]
                : []
            });

            resolve();
          },
          error => {
            this.modelMasterService.update({ loading: false });
            console.log("bootstrap error", error);
            reject();
          }
        );
    });
  }



  protected brands(): Promise<Brand[]> {
    let url;
    if (this.settings.getBaseUrl() != "http://localhost:4200/") {
      url = AppConfig.url + "secure/" + API_ROUTES_BRAND.BRAND;
    } else {
      url = this.settings.getBaseUrl() + "secure/" + API_ROUTES_BRAND.BRAND;
    }
    this.modelMasterService.update({ loading: true });
    return new Promise((resolve, reject) => {
      this.http
        .get(url)
        .pipe(
          finalize(() => this.modelMasterService.update({ loading: false }))
        )
        .subscribe(
          res => {
            this.modelMasterService.update({
              loading: false,
              brands: res["brands"]["data"] .length > 0
                ? res["brands"]["data"]
                : []
            });

            resolve();
          },
          error => {
            this.modelMasterService.update({ loading: false });
            console.log("bootstrap error", error);
            reject();
          }
        );
    });
  }
  /**
   * Handle specified bootstrap data.
   */
  protected items(): Promise<Item[]> {
    let url;
    if (this.settings.getBaseUrl() != "http://localhost:4200/") {
      url = AppConfig.url + "secure/" + API_ROUTES_ITEMS.ITEM;
    } else {
      url = this.settings.getBaseUrl() + "secure/" + API_ROUTES_ITEMS.ITEM;
    }
    this.modelMasterService.update({ loading: true });
    return new Promise((resolve, reject) => {
      this.http
        .get(url)
        .pipe(
          finalize(() => this.modelMasterService.update({ loading: false }))
        )
        .subscribe(
          res => {
            this.modelMasterService.update({
              loading: false,
              items: res["items"]["data"].length > 0 ? res["items"]["data"] : []
            });

            resolve();
          },
          error => {
            this.modelMasterService.update({ loading: false });
            console.log("bootstrap error", error);
            reject();
          }
        );
    });
  }
  /**
   * Handle specified bootstrap data.
   */
  protected insurances(): Promise<Insurance[]> {
    let url;
    if (this.settings.getBaseUrl() != "http://localhost:4200/") {
      url =
        AppConfig.url + "secure/" + API_ROUTES_INSURANCES.BUSINESS_INSURANCES;
    } else {
      url =
        this.settings.getBaseUrl() +
        "secure/" +
        API_ROUTES_INSURANCES.BUSINESS_INSURANCES;
    }

    this.modelMasterService.update({ loading: true });

    return new Promise((resolve, reject) => {
      this.http
        .get(url)
        .pipe(
          finalize(() => this.modelMasterService.update({ loading: false }))
        )
        .subscribe(
          res => {
            this.modelMasterService.update({
              loading: false,
              insurances: res["business_insurance"].length > 0
                ? res["business_insurance"]
                : []
            });

            resolve();
          },
          error => {
            this.modelMasterService.update({ loading: false });
            console.log("bootstrap error", error);
            reject();
          }
        );
    });
  }
}
