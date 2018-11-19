import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StockComponent } from './stock.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewStockComponent } from './new-stock/new-stock.component';
import { AvailabeStockComponent } from './availabe-stock/availabe-stock.component';
import { StockSoldOutComponent } from './stock-sold-out/stock-sold-out.component';
import { StockDamagedComponent } from './stock-damaged/stock-damaged.component';
import { StocksComponent } from './stocks/stocks.component';

@NgModule({
  declarations:
   [StockComponent,StocksComponent,NewStockComponent, AvailabeStockComponent, StockSoldOutComponent,StockDamagedComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:
  [StockComponent,StocksComponent,NewStockComponent, AvailabeStockComponent, StockSoldOutComponent]
})
export class StockModule { }
