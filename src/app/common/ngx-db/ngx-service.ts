import { Injectable } from '@angular/core';
import { Model, ModelFactory } from 'ngx-model';
import { Observable, from } from 'rxjs';
import { Customer } from '../../customers/customer';
// import PouchDB from 'pouchdb';
import { EventEmitter } from '@angular/core';
import { Orders } from '../../orders/orders';
@Injectable({
  providedIn: 'root'
})
export class NgxService {
  private model: Model<any[]>;
  private db: any;
  private isInstantiated: boolean;
  private listener: EventEmitter<any> = new EventEmitter();

  items$: Observable<any | Customer[]>;

  constructor(private modelFactory: ModelFactory<any[]>) {
    // if (!this.isInstantiated) {
    //   this.db = new PouchDB('http://127.0.0.1:3000/tes01');
    //   this.isInstantiated = true;
    // this.db.put({
    //   _id: 'mydoc',
    //   title: 'Heroes'
    // }).then(function (response) {
    //   // handle response
    // }).catch(function (err) {
    //   console.log(err);
    // });
    // }
    this.model = this.modelFactory.create([]); // create model and pass initial data
    this.items$ = this.model.data$; // expose model data as named public property
  }
  addItem(gitem: any | Customer) {
    // retrieve raw model data
    const items = this.model.get();
    // mutate model data
    items[0] = gitem;
    // set new model data (after mutation)
    this.model.set(items);
  }
  offlineData(type: Customer | Orders | any) {

  }
}

