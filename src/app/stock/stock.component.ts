import { Component, OnInit, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import { ApiStockService } from "./api/api.service";
import 'rxjs/add/operator/takeUntil';
import { Select } from "@ngxs/store";
import { MasterState } from "../state/master-state";

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockComponent implements OnInit {

  links: any[] = [
    { path: "new", label: "New Stock" },
    { path: "available", label: "Available Stock" },
    { path: "stockout", label: "Sold Out Items" },
    { path: "damaged", label: "Damaged Items" }
  ];

  @Select(MasterState.loading) loading$: Observable<boolean>;

  leftColumnIsHidden=false;

  constructor(private api: ApiStockService, private ref: ChangeDetectorRef) {

  }

  ngOnInit() {

  }

}
