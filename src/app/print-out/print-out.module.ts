import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';
import { NgxsModule } from '@ngxs/store';
import { PosOrderState } from '../store/states/PosOrderStates';
import { MaterialModule } from '../material/material.module';
import { PipeModuleModule } from '../../pipe-module/pipe-module.module';
import { PrintReceiptModelComponent } from './print-receipt-model/print-receipt-model.component';

@NgModule({
  declarations: [PrintInvoiceComponent, PrintReceiptModelComponent],
  imports: [
    CommonModule,
    MaterialModule,
    PipeModuleModule,
    NgxsModule.forFeature([PosOrderState]),
  ],
  entryComponents: [PrintReceiptModelComponent],
  exports: [PrintInvoiceComponent,PrintReceiptModelComponent],
})
export class PrintOutModule {

}
