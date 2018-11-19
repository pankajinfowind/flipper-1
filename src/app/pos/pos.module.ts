import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SalePointComponent } from "./sale-point/sale-point.component";
import { SessionsComponent } from "./sessions/sessions.component";
import { MaterialModule } from "../material/material.module";
import { StockModule } from "../stock/stock.module";

@NgModule({
  declarations: [SalePointComponent, SessionsComponent],
  imports: [CommonModule, MaterialModule, StockModule],
  exports: [SessionsComponent, SalePointComponent]
})
export class PosModule {}
