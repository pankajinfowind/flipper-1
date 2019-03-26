import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { Observable } from "rxjs";
import 'rxjs/add/operator/takeUntil';
import { Select } from "@ngxs/store";
import { MasterState } from "../state/master-state";
import { StockModelService } from "./stock-model.service";
import { DetailsService } from "../details/details.service";
import { Details } from "../details/details";
import { Bootstrapper } from './bootstrapper.service';

@Component({
  selector: "app-stock",
  templateUrl: "./stock.component.html",
  styleUrls: ["./stock.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StockComponent implements OnInit {

  links: any[] = [
    {
      menu:'Stock Available',icon:'assignment',path:'available',
    },
    {
      menu:'Out of Stock',icon:'assignment',path:'stockout',
    },
    {
      menu:'Lower Stock',icon:'assignment',path:'lowerstock',
    },
    {
      menu:'Stock Movements',icon:'assignment',path:'stockmovements',
    },
    {
      menu:'Stock Expired',icon:'assignment',path:'expireditem',
    }

  ];


  @Select(MasterState.loading) loading$: Observable<boolean>;
  isMobile = false;
  leftColumnIsHidden = false;
  stocks$: Observable<any>;

  subscription: Observable<Details>;
  details$: Observable<Details>;


  constructor(private detailsService: DetailsService, private modelService: StockModelService) {
  }

  ngOnInit() {
    this.stocks$ = this.modelService.stocks$;
    this.subscription = this.details$ = this.detailsService.details$;
  }

}
