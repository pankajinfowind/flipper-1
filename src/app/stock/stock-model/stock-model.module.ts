import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UpdateStockModelComponent } from './update-stock-model/update-stock-model.component';
import { StockModelComponent } from './stock-model/stock-model.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material/material.module';
import { InfoStockModelComponent, AdvancedOptionDialog } from './info-stock-model/info-stock-model.component';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { StockAdvancedOptionsComponent } from './stock-advanced-options/stock-advanced-options.component';
import { SelectReasonModelComponent } from './update-stock-model/select-reason-model/select-reason-model.component';
import { DataTableModule } from '../../data-table/data-table/data-table.module';
import { UiModule } from '../../common/core/ui/ui.module';
import { StockButtonModelComponent } from './stock-button-model/stock-button-model.component';

@NgModule({
  declarations: [UpdateStockModelComponent, StockModelComponent, InfoStockModelComponent, StockAdvancedOptionsComponent,AdvancedOptionDialog, SelectReasonModelComponent, StockButtonModelComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    UiModule,
    DataTableModule
  ],
  exports:[UpdateStockModelComponent, StockModelComponent,StockAdvancedOptionsComponent,AdvancedOptionDialog,SelectReasonModelComponent],
  entryComponents:[AdvancedOptionDialog,UpdateStockModelComponent,SelectReasonModelComponent,StockButtonModelComponent],
  providers: [
    {
      provide: MAT_STEPPER_GLOBAL_OPTIONS,
      useValue: { displayDefaultIndicatorType: false }
    }
  ]
})
export class StockModelModule { }
