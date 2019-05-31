import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '../common/core/http/http.module';
import { InvoiceComponent } from './invoice/invoice.component';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import { UiModule } from '../common/core/ui/ui.module';
import { NoEntryFoundMasterComponent } from './messages/no-entry-found/no-entry-found.component';
import { DataTableModule } from '../data-table/data-table/data-table.module';
import { InvoicePreviewComponent } from './invoice-preview/invoice-preview.component';
import { PrintOutModule } from '../print-out/print-out.module';

@NgModule({
  declarations: [InvoiceComponent,NoEntryFoundMasterComponent, InvoicePreviewComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    HttpModule,
    MaterialModule,
    FormsModule,
    UiModule,
    PrintOutModule,
    InvoiceRoutingModule,DataTableModule
  ],
  entryComponents: [InvoicePreviewComponent],
  bootstrap: [InvoiceComponent]
})
export class InvoicesModule { }
