import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Observable } from 'rxjs';
import { Customer } from '../customer';

@Component({
  selector: 'customer-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  ngOnInit(): void {
    this.listCustomers();
  }

  customers: Observable<Customer[]>; //make it to be observable
  constructor(private customer: CustomerService) { }

  listCustomers(): Observable<Customer[]> {
    this.customers = this.customer.getCustomers();
    return this.customers;
  }
}
