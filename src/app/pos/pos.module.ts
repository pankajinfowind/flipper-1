import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SalePointComponent } from "./sale-point/sale-point.component";
import { SessionsComponent } from "./sessions/sessions.component";
import { MaterialModule } from "../material/material.module";
import { PosComponent } from './pos/pos.component';
import { PosRoutingModule } from './pos-routing.module';
import { UiModule } from '../common/core/ui/ui.module';
import { StockModule } from '../stock/stock.module';
import { MasterModule } from '../admin/master/master/master.module';

@NgModule({
  declarations: [SalePointComponent, SessionsComponent, PosComponent],
  imports: [CommonModule, MaterialModule,PosRoutingModule,UiModule],
  exports: [SessionsComponent, SalePointComponent,PosComponent]
})
export class PosModule {}
