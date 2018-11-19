import {
  Component,
  OnInit,
  ChangeDetectorRef,
  ViewChild,
  Input
} from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { ApiItemService } from "./api/api.service";
import { Item } from "electron";
import { MatSort, MatPaginator, MatTableDataSource } from "@angular/material";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"]
})
export class ItemsComponent implements OnInit {
  public loading = new BehaviorSubject(false);
  constructor(private api: ApiItemService, private ref: ChangeDetectorRef) {}
  data: Item[] = [];
  displayedColumns: string[] = [
    "sku",
    "item",
    "price",
    "sale_price",
    "category",
    "action"
  ];
  dataSource = new MatTableDataSource<Item>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() shared_output: Item;
  ngOnInit() {
    this.items();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  items() {
    this.loading.next(true);
    this.api
      .get()
      .pipe(finalize(() => this.loading.next(false)))
      .subscribe(
        res => {
          console.log(res);
          this.data = res["items"]["data"];
          this.dataSource = new MatTableDataSource<Item>(this.data);
        },
        _error => {
          console.error(_error);
        }
      );
  }

  checkIncomingData() {}
}
