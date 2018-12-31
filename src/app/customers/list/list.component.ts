import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Observable, of } from 'rxjs';
import { Customer } from '../customer';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

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
  constructor(private api: CustomerService) {
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
}
