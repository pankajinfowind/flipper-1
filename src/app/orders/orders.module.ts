import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrdersComponent } from './orders/orders.component';
import { MaterialModule } from '../material/material.module';
import { OrderListComponent } from './orders/order-list/order-list.component';
import { OrderRoutingModule } from '../routing/order-routing.module';
import { DataTableModule } from '../data-table/data-table/data-table.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '../common/core/http/http.module';
import { OrderOrderedComponent } from './order-ordered/order-ordered.component';
import { OrderCompleteComponent } from './order-complete/order-complete.component';
import { NgxsModule } from '@ngxs/store';
import { PosOrderState } from '../store/states/PosOrderStates';
import { OrderHeldComponent } from './order-held/order-held.component';
import { PreviewOrderInvoiceComponent } from './orders/preview-order-invoice/preview-order-invoice.component';
import { PrintOutModule } from '../print-out/print-out.module';
import { UiModule } from '../common/core/ui/ui.module';

@NgModule({
  declarations:
  [
  OrdersComponent,
  OrderListComponent,
  OrderOrderedComponent,
  OrderCompleteComponent,
  OrderHeldComponent,
  PreviewOrderInvoiceComponent
  ],
  exports:
  [
  OrdersComponent,
  OrderListComponent,
  OrderOrderedComponent,
  OrderCompleteComponent,
  OrderHeldComponent
  ],
  entryComponents: [PreviewOrderInvoiceComponent],
  imports:
  [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    OrderRoutingModule,
    DataTableModule,
    PrintOutModule,
    UiModule,
    NgxsModule.forFeature([PosOrderState]),
  ]
})
export class OrdersModule { }
