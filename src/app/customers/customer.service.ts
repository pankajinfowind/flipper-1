import { Injectable, Injector, EventEmitter } from "@angular/core";
import { Customer } from "./customer";
import { ModelFactory, Model } from "ngx-model";
import { Observable } from "rxjs";
import { Sqlite3Service } from '../common/sqlit3/sqlite3.service';
import { ElectronService } from 'ngx-electron';
import { Orders } from '../orders/orders';
import { catchError } from 'rxjs/operators';
import { PaginationResponse } from '../common/core/types/pagination-response';
import { HttpCacheClient } from '../common/core/http/http-cache-client';


@Injectable({
  providedIn: "root"
})
export class CustomerService extends Sqlite3Service {
  public model: Model<Customer[]>;
  ROOT_URL = "customer";
  DELETE_MULTIPLE="customers/delete-multiple"
  customers$: Observable<Customer[]>;
  protected http: HttpCacheClient;
  custObs: Observable<Customer[]>;
  constructor(
    _electronService: ElectronService,
    public modelFactory: ModelFactory<Customer[]>,
    protected injector: Injector,
  ) {
    super(_electronService);
    this.model = this.modelFactory.create([]);
    this.customers$ = this.model.data$;
    this.http = this.injector.get(HttpCacheClient);
  }
  createCustomer(customer: Partial<Customer>): Observable<Customer> {
    return this.http.post<Customer>(this.ROOT_URL, customer);
  }
  observed: EventEmitter<Customer | Orders> = new EventEmitter<Customer | Orders>();
  getCustomers() {
    //experiment if I can get data from sqlite3
    //I want to check if we have internet then query from sqlite3
    //and On Application load I use internet for only once, save data into sqlit3
    //from that point on, I wont go back to backend unless If I created Data
    //i.e I will sync this newly created data to online
    //With Shared data such as customers every user should have all data so we can avoid conflict
    this.getSqliteData('customers');

    this.sqlite3Data.subscribe(customers => {
      //console.log('I Am emited data', res);
      if (customers.length === 0) {
        //we do not have any customer from our sqlite3 database so go back and fetch from remote server
        this.http.get<Customer[]>(this.ROOT_URL).subscribe(customers => {
          //need to do it the right way, on first load should add this data
          //se if I can save the entire array directly
          // console.log(typeof customers);
          // this.saveSqliteData(customers); //check why customers is returned as object not array
          customers.customers.data.forEach(customer => {
            this.saveSqliteData(customer, 'users');
          });
        });

      } else {
        this.observed.emit(customers);
      }
    });
    return this.observed;
  }

  getAllCustomers(params = {order_by:'created_at',order_dir:'desc',per_page:30,query:null}): Observable<PaginationResponse<Customer>> {
        return this.http.getWithCache(this.ROOT_URL,params);
  }
  create(customer: Partial<Customer>): Observable<Customer> {
    return this.http.post(this.ROOT_URL, customer);
}

public update(id:number,params: Customer): Observable<Customer> {
  return this.http.put(this.ROOT_URL+'/'+id, params);
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

  public deleteMultiple(ids: number[]) {
    return this.http.delete(this.DELETE_MULTIPLE, {ids});
  }
}
