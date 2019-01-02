import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Customer } from '../customer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AddComponent } from '../add/add.component';
import { NgxService } from '../../common/ngx-db/ngx-service';

import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'customer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  //virtual scrolling start
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;

  batch = 20;
  theEnd = false;

  offset = new BehaviorSubject(null);
  customers: Observable<any[]>;
  //virtual scrolling end

  cust: Partial<Customer>;

  customer: Customer;
  tableHeads: string[] = ['cstomer_no', 'full_name', 'phone'];

  //TODO: matDialog not covered by unit test
  constructor(private api: CustomerService, public dialog: MatDialog, private db: NgxService) {

  }
  ngOnInit(): void {
    this.listCustomers();
  }
  //virtual scroll func


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

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    console.log(`${end}, '>=', ${total}`);
    if (end === total) {
      this.offset.next(offset);
    }
  }

  trackByIdx(i) {
    return i;
  }

  listCustomers(): void {
    this.api.getCustomers().subscribe(res => {
      this.customers = res.customers.data;
    });
  }

  editCustomer(customer: Partial<Customer>): Observable<Customer> {
    return this.api.editCustomer(customer);
  }
  openAddCustomerDialog(): void {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '450px',
      // data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      //TODO:show a toast of the action to be completed
      // this.animal = result;
    });
  }
  // TODO: change type after drafting
  emitCustomer(customer: any) {
    this.db.addItem(customer);
  }
}
