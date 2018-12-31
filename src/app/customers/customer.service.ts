import { Injectable, Injector } from "@angular/core";
import { Customer } from "./customer";
import { ModelFactory, Model } from "ngx-model";
import { Observable } from "rxjs";
import { HttpClient } from "@angular/common/http";
import { AppHttpClient } from '../common/core/http/app-http-client.service';

@Injectable({
  providedIn: "root"
})
export class CustomerService {
  public model: Model<Customer[]>;
  ROOT_URL = "customers";
  customers$: Observable<Customer[]>;
  protected http: AppHttpClient;
  custObs: Observable<Customer[]>;
  constructor(
    public modelFactory: ModelFactory<Customer[]>,
    protected injector: Injector
  ) {
    this.model = this.modelFactory.create([]);
    this.customers$ = this.model.data$;
    this.http = this.injector.get(AppHttpClient);
  }
  createCustomer(customer: Partial<Customer>): Observable<Customer> {
    return this.http.post<Customer>(this.ROOT_URL, customer);
  }
  getCustomers() {
    return this.http.get<Customer[]>(this.ROOT_URL);
  }
  editCustomer(customer: Partial<Customer>): Observable<Customer> {
    return this.http.put<Customer>(this.ROOT_URL, customer);
  }
  initCustomerList(customer: Observable<Customer[]>) {
    customer.subscribe(cust => {
      this.modelFactory.create(cust);
    });
    return this.model.data$;
  }
}
