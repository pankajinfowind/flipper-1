import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintInvoiceComponent } from './print-invoice/print-invoice.component';

@NgModule({
  declarations: [PrintInvoiceComponent],
  imports: [
    CommonModule
  ],
  exports: [PrintInvoiceComponent],
})
export class PrintOutModule {

}
