import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReportManagerComponent} from './report-manager/report-manager.component';
import {MaterialModule} from "../material/material.module";

@NgModule({
    declarations: [ReportManagerComponent],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [ReportManagerComponent]
})
export class ReportsModule {
}
