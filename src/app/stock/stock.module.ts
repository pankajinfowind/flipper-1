import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StocksComponent } from './stocks/stocks.component';
import { UiModule } from '../common/core/ui/ui.module';
import { StockModelModule } from './stock-model/stock-model.module';
import { DetailsModule } from '../details/details.module';
import { ExpiredStockComponent } from './expired-stock/expired-stock.component';
import { DiplayExpiredStockComponent } from './diplay-expired-stock/diplay-expired-stock.component';
import { DataTableModule } from '../data-table/data-table/data-table.module';
import { StockRoutingModule } from '../routing/stock-routing.module';
import { AvailabeStockComponent } from './availabe-stock/availabe-stock.component';
import { StockSoldOutComponent } from './stock-sold-out/stock-sold-out.component';
import { StockLowerComponent } from './stock-lower/stock-lower.component';
import { StockTableComponent } from './stock-table/stock-table.component';
import { NoEntryFoundStockComponent } from './messages/no-entry-found/no-entry-found.component';

@NgModule({
  declarations:
   [StockComponent,
    StocksComponent,
       ExpiredStockComponent,
        DiplayExpiredStockComponent,
        AvailabeStockComponent,
    StockSoldOutComponent,
    StockLowerComponent,
     StockTableComponent,
     NoEntryFoundStockComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StockRoutingModule,
    UiModule,
    StockModelModule,
    DetailsModule,
    DataTableModule
  ],
  exports:
  [StockComponent,StocksComponent,
    AvailabeStockComponent,
    StockSoldOutComponent,
    StockLowerComponent,
     StockTableComponent,
     NoEntryFoundStockComponent]
})
export class StockModule {
    //   static forRoot(): ModuleWithProviders {
    //     return {
    //         ngModule: StockModule,
    //         providers: [
    //             CurrentUser,
    //             Bootstrapper,
    //             {
    //                 provide: HttpErrorHandler,
    //                 useClass: BackendHttpErrorHandler,
    //             },
    //             {
    //                 provide: APP_INITIALIZER,
    //                 useFactory: init_app,
    //                 deps: [Bootstrapper,CurrentUser],
    //                 multi: true,
    //             },
    //             {
    //                 provide: ErrorHandler,
    //                 useFactory: ravenErrorHandlerFactory,
    //                 deps: [ApiStockService, StockModelService,ApiExpiredItemService],
    //             },
    //         ]
    //     };
    // }
 }
