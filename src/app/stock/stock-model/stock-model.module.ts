import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateStockModelComponent } from './update-stock-model/update-stock-model.component';
import { StockModelComponent } from './stock-model/stock-model.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { InfoStockModelComponent } from './info-stock-model/info-stock-model.component';
import { StockDatailsTableComponent } from './stock-datails-table/stock-datails-table.component';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';

@NgModule({
  declarations: [UpdateStockModelComponent, StockModelComponent, InfoStockModelComponent, StockDatailsTableComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[UpdateStockModelComponent, StockModelComponent],
  providers: [
    {
      provide: MAT_STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class StockModelModule { }
