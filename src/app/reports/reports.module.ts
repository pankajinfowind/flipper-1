import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesReportsComponent } from './sales-reports/sales-reports.component';
import { ProductsSoldReportsComponent } from './products-sold-reports/products-sold-reports.component';
import { BestSellerReportsComponent } from './best-seller-reports/best-seller-reports.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from '../data-table/data-table/data-table.module';
import { PipeModuleModule } from '../../pipe-module/pipe-module.module';



@NgModule({
  declarations: [SalesReportsComponent, ProductsSoldReportsComponent, BestSellerReportsComponent],
  exports: [SalesReportsComponent,ProductsSoldReportsComponent,BestSellerReportsComponent],
  imports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DataTableModule,
    PipeModuleModule
  ]
})
export class ReportsModule { }
