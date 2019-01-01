import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Observable, of } from 'rxjs';
import { Customer } from '../customer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AddComponent } from '../add/add.component';
import { NgxService } from '../../common/ngx-db/ngx-service';


@Component({
  selector: 'customer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  cust: Partial<Customer>;
  register_customer_form: FormGroup;
  formValid: boolean = false;
  customer: Customer;
  customers: Customer[] = []; //make it to be observable
  tableHeads: string[] = ['cstomer_no', 'full_name', 'phone'];
  //TODO: matDialog not covered by unit test
  constructor(private api: CustomerService, public dialog: MatDialog, private db: NgxService) {
    this.register_customer_form = new FormBuilder().group({
      'full_name': [undefined, Validators.required],
      'email': [undefined, Validators.required],
      'cstomer_no': [undefined, Validators.required],
      'phone': [undefined, Validators.required]
    });
    this.register_customer_form.valueChanges.subscribe(() => {
      this.formValid = this.register_customer_form.valid;
    });
  }
  ngOnInit(): void {
    this.listCustomers();
  }
  listCustomers(): void {
    this.api.getCustomers().subscribe(res => {
      this.customers = res.customers.data;
    });
  }
  addCustomer() {
    const customer = this.register_customer_form.value;
    this.api.createCustomer(customer).subscribe(res => {
      this.customers.push(res.customer_created);
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
