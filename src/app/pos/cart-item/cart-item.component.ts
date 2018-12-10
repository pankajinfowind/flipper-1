import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerService } from "../../customers/customer.service";
import { Customer } from "../../customers/customer";

@Component({
  selector: "app-cart-item",
  templateUrl: "./cart-item.component.html",
  styleUrls: ["./cart-item.component.scss"]
})
export class CartItemComponent implements OnInit {
  customers: Observable<Customer[]>;
  constructor(public customer: CustomerService) {}
  ngOnInit() {
    if (this.getCustomers()) {
      this.getCustomers().subscribe(customer => {
        this.customer.create(customer);
      });
    }
  }
  getCustomers(): Observable<Customer[]> {
    this.customers = this.customer.getCustomers();
    return this.customers; // ?
  }
}
