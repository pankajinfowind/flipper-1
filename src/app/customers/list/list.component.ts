import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Observable } from 'rxjs';
import { Customer } from '../customer';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  customers: Observable<Customer[]>; //make it to be observable
  constructor(private customer: CustomerService) { }

  listCustomers(): Observable<Customer[]> {
    this.customers = this.customer.getCustomers();
    return this.customers;
  }
}
