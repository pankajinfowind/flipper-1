import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AdminComponent } from "./admin.component";
import { MaterialModule } from "../material/material.module";
import { AdminRoutingModule } from "./admin-routing.module";
import { UiModule } from "../common/core/ui/ui.module";
import { GlobalVariables } from '../common/core/global-variables';
import { DashbordModule } from './dashboard/dashboard.module';
import { MasterModule } from './master/master/master.module';
import { StockModule } from '../stock/stock.module';
import { SalesModule } from '../sales/sales.module';
import { SettingsModule } from '../settings/settings.module';
import { MenuListItemComponent } from '../nav-menu-bar/menu-list-item/menu-list-item.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NavService } from '../nav-menu-bar/nav.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AdminRoutingModule,
    UiModule,
    FlexLayoutModule,
    DashbordModule,
    StockModule,
    MasterModule,
    SalesModule,
    SettingsModule
  ],
  exports: [AdminComponent],
  declarations: [AdminComponent,MenuListItemComponent],
  providers: [NavService]
})
export class AdminModule {
  constructor(public g: GlobalVariables) {
    this.g.checkInternet();
   }
}
