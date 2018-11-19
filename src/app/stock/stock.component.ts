import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ApiStockService } from "./api/api.service";
import { finalize } from "rxjs/operators";
import { Stock } from "./api/stock";

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.scss"]
})
export class StockComponent implements OnInit {
  add_toggled = false;
  link: string = "available";
  title: string = "Available stock";
  action: string = "";
  nav_position: string = "start";
  links: any[] = [
    { value: "new", viewValue: "Add item in stock" },
    { value: "available", viewValue: "Available stock" },
    { value: "stockout", viewValue: "Sold out" },
    { value: "damaged", viewValue: "Stock Damaged" }
  ];
  public loading = new BehaviorSubject(false);
  _data: Stock[] = [];
  constructor(private api: ApiStockService, private ref: ChangeDetectorRef) {
    this.stocks();
  }

  ngOnInit() {

  }
  goTo(v: string, vv: string) {
    this.link = v;
    this.title = vv;
    if(this.link){
      console.log('link',this.link);
      this.stocks();
    }
  }

  stocks() {
    this.loading.next(true);
    this.api
      .getStockByBranch(1, this.link)
      .pipe(finalize(() => this.loading.next(false)))
      .subscribe(
        res => {
          console.log('ddddd',this.data);
          this.data = res["stocks"]["data"];
          this.ref.detectChanges();
        },
        _error => {
          console.error(_error);
        }
      );
  }
  set data(data:Stock[]){
    this._data=data;
  }
  get data():Stock[]{
    return this._data;
  }
}
