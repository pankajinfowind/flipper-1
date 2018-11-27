import { Component, OnInit,ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import 'rxjs/add/operator/takeUntil';
import { Select } from "@ngxs/store";
import { MasterState } from "../state/master-state";
import { StockModelService } from "./stock-model.service";

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
  stocks$: Observable<any>;
  constructor(private modelService:StockModelService) {
  }

  ngOnInit() {
    this.stocks$ = this.modelService.stocks$;
  }

}
