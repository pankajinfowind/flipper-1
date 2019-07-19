import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../common/core/ui/ui.module';
import { StockModelModule } from './stock-model/stock-model.module';
import { DetailsModule } from '../details/details.module';
import { ExpiredStockComponent } from './expired-stock/expired-stock.component';
import { DiplayExpiredStockComponent } from './diplay-expired-stock/diplay-expired-stock.component';
import { DataTableModule } from '../data-table/data-table/data-table.module';
import { StockRoutingModule } from '../routing/stock-routing.module';
import { StockTableComponent } from './stock-table/stock-table.component';
import { StockMovementComponent } from './stock-movement/stock-movement.component';
import { DisplayExpiredStockByCustomComponent } from './display-expired-stock-by-custom/display-expired-stock-by-custom.component';
import { NgxsModule } from '@ngxs/store';
import { PosStockExpiredStates } from '../store/states/PosStockExpiredStates';
import { StockInfiniteScrollDirective } from './display-expired-stock-by-custom/stock-infinite-scroll.directive';
import { DisplayExpiredStockByPeriodComponent } from './display-expired-stock-by-period/display-expired-stock-by-period.component';
import { GlobalVariables } from '../common/core/global-variables';

@NgModule({
  declarations:
   [StockComponent,
    ExpiredStockComponent,
     DiplayExpiredStockComponent,
     StockTableComponent,StockMovementComponent, DisplayExpiredStockByCustomComponent,
     DisplayExpiredStockByPeriodComponent,
     StockInfiniteScrollDirective],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StockRoutingModule,
    UiModule,
    StockModelModule,
    DetailsModule,
    DataTableModule,
    NgxsModule.forFeature([PosStockExpiredStates]),
  ],
  exports:
  [StockComponent,
     StockTableComponent,StockMovementComponent,
     DisplayExpiredStockByPeriodComponent,
     StockInfiniteScrollDirective]
})
export class StockModule {
  constructor(public g: GlobalVariables) {
    this.g.checkInternet();
   }

 }
