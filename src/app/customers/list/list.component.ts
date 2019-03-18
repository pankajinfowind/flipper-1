import { Component, OnInit,ViewChild } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Customer } from '../customer';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { NgxService } from '../../common/ngx-db/ngx-service';

import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
import { PosModelService } from '../../pos/pos-model.service';
import { Orders } from '../../orders/orders';
import { Pos } from '../../pos/pos';
import { ApiPosService } from '../../pos/api/api.service';
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
  tableHeads: string[] = ['cstomer_no', 'full_name', 'phone','operation'];
customers$:Observable<Customer[]>;
orders$:Observable<Orders[]>;
loading$:Observable<boolean>;
loaded$:Observable<boolean>;
meta$:Observable<any>;
toggled$:BehaviorSubject<boolean>=new BehaviorSubject(false);
pos$: Observable<Pos>;
current_order:Orders = null; //TODO: why this has no type?
selected_customer: Customer=null;
dataSource = new MatTableDataSource<Customer>([]);
  //TODO: matDialog not covered by unit test
  constructor(private oapi: ApiPosService,private posModelService: PosModelService,private store:Store<fromStore.FlipperState>, private api: CustomerService, public dialog: MatDialog, private db: NgxService) {
    this.store.dispatch(new fromStore.LoadCustomers());
  }
  ngOnInit(): void {
   // this.listCustomers();
    this.customers$=this.store.select(fromStore.getAllCustomers);
    this.loading$=this.store.select(fromStore.getCustomersLoading);
    this.loaded$=this.store.select(fromStore.getCustomersLoaded);
    this.meta$=this.store.select(fromStore.getCustomerMeta);
    this.pos$ = this.posModelService.pos$;
    this.getCurrentOrder();

  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //virtual scroll func
  updatePosLayout(panel = 'home') {
    this.posModelService.update({ panel_content: panel });
  }
  getCurrentOrder() {
    if (!this.pos$) return;
    this.current_order=null;
    this.pos$.subscribe(res => {
      if (res) {
        if(res.currently_ordered){
          this.current_order = res.currently_ordered;
          this.selected_customer=res.choose_customer?res.choose_customer:null;
        }
      }
    });
  }

  updateOrdered(row) {
    if(!this.current_order){
      const pos=this.posModelService.get();
      pos.choose_customer=row;
      pos.customer_type_price=row.customer_type;
      pos.panel_content='home';
      this.posModelService.update(pos);

    }else{
    const params:Orders={
      is_currently_processing:1,
      customer_id:row.customer_id,
      status:'ordered'
    }
    this.oapi.updateOrder(params,  this.current_order.id).subscribe(
      res => {
        if (res.status == 'success') {
          const order: Orders = res['orders'].length > 0 ? res['orders'].find(order => order.is_currently_processing === '1') : null;
          const obj:Pos={ loading: false,
            currently_ordered: order ? order : null,panel_content: 'home',orders: res["orders"].length > 0 ? res['orders'] : []
            };
            localStorage.setItem('customer_id',row.customer_id);
              if(order && order.customer){
                obj.choose_customer=order.customer;
                obj.customer_type_price=order.customer_type;
              }else{
                obj.choose_customer=null;
                obj.customer_type_price=null;
              }

            this.posModelService.update(obj);
        }


      },
      _error => {
        console.error(_error);
      }
    );
    }
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


      toggleEvent($event) {
            this.toggled$.next($event!=$event);
      }
      actions(action,data:Customer=null) {
        this.action=action;this.data=data;
        this.toggled$.next(true);
  }
}
