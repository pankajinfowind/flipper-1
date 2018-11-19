import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MasterModule } from "./master/master.module";
import { AdminComponent } from "./admin.component";
import { MaterialModule } from "../material/material.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { StockModule } from "../stock/stock.module";
import { PosModule } from "../pos/pos.module";

@NgModule({
  imports: [
    CommonModule,
    PosModule,
    MasterModule,
    MaterialModule,
    AdminRoutingModule,
    StockModule
  ],
  exports: [AdminComponent],
  declarations: [AdminComponent]
})
export class AdminModule {}
