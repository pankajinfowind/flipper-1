import { Component, OnInit,ViewChild } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Customer } from '../customer';
import { MatDialog } from '@angular/material';
import { NgxService } from '../../common/ngx-db/ngx-service';

import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import { PosModelService } from '../../pos/pos-model.service';
@Component({
  selector: 'customer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  //virtual scrolling start

  action:string='add';
  data:Customer=null;

  batch = 20;
  theEnd = false;

  offset = new BehaviorSubject(null);
  customers: Observable<any[]>;
  //virtual scrolling end

  cust: Partial<Customer>;

  customer: Customer;
  tableHeads: string[] = ['cstomer_no', 'full_name', 'phone'];
customers$:Observable<Customer[]>;
loading$:Observable<boolean>;
loaded$:Observable<boolean>;
toggled$:BehaviorSubject<boolean>=new BehaviorSubject(false);
  //TODO: matDialog not covered by unit test
  constructor(private posModelService: PosModelService,private store:Store<fromStore.CustomersState>, private api: CustomerService, public dialog: MatDialog, private db: NgxService) {
    this.store.dispatch(new fromStore.LoadCustomers());
  }
  ngOnInit(): void {
   // this.listCustomers();
    this.customers$=this.store.select(fromStore.getAllCustomers);
    this.loading$=this.store.select(fromStore.getCustomersLoading);
    this.loaded$=this.store.select(fromStore.getCustomersLoaded);
  }
  //virtual scroll func
  updatePosLayout(panel = 'home') {
    this.posModelService.update({ panel_content: panel });
  }

  getBatch(offset) {
    //TODO: replace this func with my database call
    // return this.db
    //   .collection('people', ref =>
    //     ref
    //       .orderBy('name')
    //       .startAfter(offset)
    //       .limit(this.batch)
    //   )
    //   .snapshotChanges()
    //   .pipe(
    //     tap(arr => (arr.length ? null : (this.theEnd = true))),
    //     map(arr => {
    //       return arr.reduce((acc, cur) => {
    //         const id = cur.payload.doc.id;
    //         const data = cur.payload.doc.data();
    //         return { ...acc, [id]: data };
    //       }, {});
    //     })
    // );
  }

  nextBatch(e, offset) {
    if (this.theEnd) {
      return;
    }

    // const end = this.viewport.getRenderedRange().end;
    // const total = this.viewport.getDataLength();
    // if (end === total) {
    //   this.offset.next(offset);
    // }
  }

  trackByIdx(i) {
    return i;
  }

  listCustomers(): void {

    this.api.getCustomers().subscribe(res => {
      this.customers = res;
    });
  }

  editCustomer(customer: Partial<Customer>): Observable<Customer> {
    return this.api.editCustomer(customer);
  }

  // TODO: change type after drafting
  emitCustomer(customer: any) {
    this.db.addItem(customer);
  }

  saveCustomer(){
    const customer:Partial<Customer>={
        full_name:'respice',
        email:'resp@gmail.com',
        customer_type_id:1,
        branch_id:1,
        title:'Mr',
        gender:'Male',
        state:'single',


    }
        this.store.dispatch(new fromStore.AddCustomer(customer));
      }

      toggled($event) {
            this.toggled$.next($event!=$event);
      }
      actions(action,data:Customer=null) {
        this.action=action;this.data=data;
        this.toggled$.next(true);
  }
}
