import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  Input,
  Output,
  EventEmitter
} from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ApiStockService } from "../api/api.service";
import { MatTableDataSource, MatPaginator, MatSort } from "@angular/material";
import { Stock } from "../api/stock";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-stocks",
  templateUrl: "./stocks.component.html",
  styleUrls: ["./stocks.component.scss"]
})
export class StocksComponent implements OnInit {
  public loading = new BehaviorSubject(false);
  @Output("cart")
  cart: EventEmitter<Stock> = new EventEmitter();
  constructor(private api: ApiStockService, private ref: ChangeDetectorRef) {}

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

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() shared_output: Stock;
  @Input() data: Stock[];
  dataSource = new MatTableDataSource<Stock>([]);
  warn = 'warn';
  accent='accent';
  primary='primary';
  mode = 'determinate';

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.dataSource = new MatTableDataSource<Stock>(this.data);
    this.ref.detectChanges();

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addToCart(element: Stock) {
    this.cart.emit(element);
  }
  percentage(num,num1) {
    return Math.round(num *100)/num1;
  }

}
