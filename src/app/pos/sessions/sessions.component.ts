import { Component, OnInit } from "@angular/core";
import { CurrentUser } from "../../common/auth/current-user";
import { ApiService } from "../api.service";
import * as Raven from "raven-js";
import { Stock } from "../../stock/api/stock";
Raven.config(
  "https://dff6a3f171414762ac4f1c7e084289c3@sentry.io/1323436"
).install();

export interface Session {
  branch_id: number;
  session: string;
}
@Component({
  selector: "app-sessions",
  templateUrl: "./sessions.component.html",
  styleUrls: ["./sessions.component.scss"]
})
export class SessionsComponent {
  cart_items: Stock[] = [];
  constructor(private current_user: CurrentUser, private api: ApiService) {}

  createSession() {
    //TODO: branch_id should not be hard coded
    this.api
      .create({ branch_id: 1, session: "flipper-01" })
      .subscribe(
        data => console.log("Session::", data),
        error => this.errorHandler("Flipper can not create session", error)
      );
  }
  errorHandler(problem: string, prex: any): any {
  
  }
  onCartItemAdded(item: Stock) {
    this.cart_items.push(item);
   // console.log(this.cart_items);
  }
  saveInvoice() {
    if (this.cart_items.length > 0) {
   //   console.log("submitting to api");
      //TODO: make the values to be dynamic
      //TODO: make sure customer modules it also done no longer faking
      this.api
        .sold({
          invoice_no: "Kim-300-200",
          customer_id: 1,
          sold_date: "2018-01-01 00:00:00",
          payment_method: "Cash",
          discounts: "0.00",
          total_items: "5.00",
          tax: "18.00",
          amount: "4500.00",
          amount_given: "5000.00",
          amount_return: "500.00",
          currency: "Rwf",
          status: "approved",
          pos_session_id: "2",
          branch_id: "1"
        })
        .subscribe(invoice => {
          //console.log(invoice);
        });
    } else {
      //nothing in shopping cart
      console.log("shoping cart is empty");
    }
  }
  public removeItemFromCart(item: Stock) {
    for (var i = 0; i < this.cart_items.length; i++) {
      if (this.cart_items[i] == item) {
        this.cart_items.splice(i, 1);
      }
    }
  }
}
