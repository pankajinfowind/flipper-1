import { Injectable, Injector } from "@angular/core";
import { Customer } from "./customer";
import { ModelFactory, Model } from "ngx-model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  public model: Model<Customer[]>;
  ROOT_URL = "secure/customers";
  customers$: Observable<Customer[]>;
  protected http: HttpClient;
  custObs: Observable<Customer[]>;
  constructor(
    public modelFactory: ModelFactory<Customer[]>,
    protected injector: Injector
  ) {
    this.model = this.modelFactory.create([]);
    this.customers$ = this.model.data$;
    this.http = this.injector.get(HttpClient);
  }
  create(customer: Array<Customer>) {
    return (this.model = this.modelFactory.create(customer));
  }
  getCustomers() {
    return this.http.get<Customer[]>(this.ROOT_URL);
  }
  initCustomerList(customer: Observable<Customer[]>) {
    customer.subscribe(cust => {
      this.modelFactory.create(cust);
    });
    return this.model.data$;
  }
}
