import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Stock } from '../api/stock';
import { ApiStockService } from '../api/api.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-stock-sold-out',
  templateUrl: './stock-sold-out.component.html',
  styleUrls: ['./stock-sold-out.component.scss']
})
export class StockSoldOutComponent implements OnInit {

  public loading = new BehaviorSubject(false);
  @Output("cart")
  cart: EventEmitter<Stock> = new EventEmitter();
  constructor(private api: ApiStockService, private ref: ChangeDetectorRef) {}
  soldoutData: Stock[] = [];
  displayedColumns: string[] = [
    "sku",
    "stock",
    "category",
    "sale_price",
    "weight",
    'entry_stock_qty',
    "available_stock_qty",
    'sold',
    "progress",
    "operation"
  ];
  soldoutDataSource = new MatTableDataSource<Stock>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() shared_output: Stock;

  warn = 'warn';
  accent='accent';
  primary='primary';
  mode = 'determinate';

  ngOnInit() {
    this.stocks();
    this.soldoutDataSource.paginator = this.paginator;
    this.soldoutDataSource.sort = this.sort;
    // this.checkIncomingsoldoutData();
  }
  applyFilter(filterValue: string) {
    this.soldoutDataSource.filter = filterValue.trim().toLowerCase();
  }

  stocks() {
    this.loading.next(true);
    this.api
      .getStockByBranch(1, 'stockout')
      .pipe(finalize(() => this.loading.next(false)))
      .subscribe(
        res => {
          this.soldoutData = res["stocks"]["data"];
          console.log(res);
          this.soldoutDataSource = new MatTableDataSource<Stock>(this.soldoutData);
        },
        _error => {
          console.error(_error);
        }
      );
  }
  addToCart(element: Stock) {
    this.cart.emit(element);
  }
  percentage(num,num1) {
    return Math.round(num *100)/num1;
}

}

