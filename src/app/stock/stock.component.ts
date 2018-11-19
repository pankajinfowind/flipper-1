import { Component, OnInit, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { ApiStockService } from "./api/api.service";
import { finalize } from "rxjs/operators";
import { Stock } from "./api/stock";
import { IntervalObservable } from 'rxjs/observable/IntervalObservable';
import 'rxjs/add/operator/takeUntil';

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockComponent implements OnInit,OnDestroy {
  private onDestroy$ = new Subject<void>();
  add_toggled = false;
  link: string = "stockout";
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

  }

  ngOnInit() {
    this.stocks();
   // every 5 sec
  //  IntervalObservable.create(500)
  //  .takeUntil(this.onDestroy$)
  //  .subscribe(() => {
  //  });
  }
  goTo(v: string, vv: string) {
    this.link = v;
    this.title = vv;
    if(this.link){
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
         this.data =  res["stocks"]["data"];
          console.log(this.data);
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
  ngOnDestroy() {
    this.onDestroy$.next();
  }
}
