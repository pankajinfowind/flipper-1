import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SalesComponent} from './sales/sales.component';
import {ReportManagerComponent} from './report-manager/report-manager.component';
import {MaterialModule} from "../material/material.module";

@NgModule({
    declarations: [SalesComponent, ReportManagerComponent],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [SalesComponent, ReportManagerComponent]
})
export class ReportsModule {
}
