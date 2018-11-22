import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SalePointComponent } from "./sale-point/sale-point.component";
import { SessionsComponent } from "./sessions/sessions.component";
import { MaterialModule } from "../material/material.module";
import { StockModule } from "../stock/stock.module";
import { PosComponent } from './pos/pos.component';

@NgModule({
  declarations: [SalePointComponent, SessionsComponent, PosComponent],
  imports: [CommonModule, MaterialModule, StockModule],
  exports: [SessionsComponent, SalePointComponent,PosComponent]
})
export class PosModule {}
