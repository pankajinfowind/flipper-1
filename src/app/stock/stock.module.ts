import { NgModule, CUSTOM_ELEMENTS_SCHEMA, ModuleWithProviders, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewStockComponent } from './new-stock/new-stock.component';
import { AvailabeStockComponent } from './availabe-stock/availabe-stock.component';
import { StockSoldOutComponent } from './stock-sold-out/stock-sold-out.component';
import { StocksComponent } from './stocks/stocks.component';
import { StockRoutingModule } from './stock-routing.module';
import { UiModule } from '../common/core/ui/ui.module';
import { StockTableComponent } from './stock-table/stock-table.component';
import { NoEntryFoundStockComponent } from './messages/no-entry-found/no-entry-found.component';
import { Bootstrapper, init_app } from './bootstrapper.service';
import { HttpErrorHandler } from '../common/core/http/errors/http-error-handler.service';
import { BackendHttpErrorHandler } from '../common/core/http/errors/backend-http-error-handler.service';
import { ravenErrorHandlerFactory } from '../common/core/errors/raven-error-handler';
import { ApiStockService } from './api/api.service';
import { StockModelService } from './stock-model.service';
import { StockModelModule } from './stock-model/stock-model.module';
import { DetailsModule } from '../details/details.module';
import { CurrentUser } from '../common/auth/current-user';
import { ReportsModule } from '../reports/reports.module';
import { ReportManagerComponent } from './report-manager/report-manager.component';
import { StockLowerComponent } from './stock-lower/stock-lower.component';



@NgModule({
  declarations:
   [StockComponent,StocksComponent,NewStockComponent, AvailabeStockComponent, StockSoldOutComponent,StockLowerComponent, StockTableComponent,NoEntryFoundStockComponent, ReportManagerComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    StockRoutingModule,
    UiModule,
    StockModelModule,
    DetailsModule,
    ReportsModule
  ],
  exports:
  [StockComponent,StocksComponent,NewStockComponent, AvailabeStockComponent, StockSoldOutComponent,StockLowerComponent,NoEntryFoundStockComponent]
})
export class StockModule {
      static forRoot(): ModuleWithProviders {
        return {
            ngModule: StockModule,
            providers: [
                CurrentUser,
                Bootstrapper,
                {
                    provide: HttpErrorHandler,
                    useClass: BackendHttpErrorHandler,
                },
                {
                    provide: APP_INITIALIZER,
                    useFactory: init_app,
                    deps: [Bootstrapper,CurrentUser],
                    multi: true,
                },
                {
                    provide: ErrorHandler,
                    useFactory: ravenErrorHandlerFactory,
                    deps: [ApiStockService, StockModelService],
                },
            ]
        };
    }
 }
