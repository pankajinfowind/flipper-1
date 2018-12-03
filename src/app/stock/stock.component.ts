import { Component, OnInit,ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import 'rxjs/add/operator/takeUntil';
import { Select } from "@ngxs/store";
import { MasterState } from "../state/master-state";
import { StockModelService } from "./stock-model.service";
import { DetailsService } from "../details/details.service";
import { Details } from "../details/details";

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockComponent implements OnInit {

  links: any[] = [
    { path: "new", label: "Create New Stock" },
    { path: "available", label: "Current Stock" },
    { path: "stockout", label: "Out of Stock Items" },
    { path: "damaged", label: "Damaged Items" }
  ];

  @Select(MasterState.loading) loading$: Observable<boolean>;
  isMobile=false;
  leftColumnIsHidden=false;
  stocks$: Observable<any>;

  subscription: Observable<Details>;
  details$: Observable<Details>;


  constructor(private detailsService:DetailsService,private modelService:StockModelService) {
  }

  ngOnInit() {
    this.stocks$ = this.modelService.stocks$;
    this.subscription = this.details$ = this.detailsService.details$;
  }

}
