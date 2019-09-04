import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiModule } from '../../common/core/ui/ui.module';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '../../common/core/http/http.module';
import { DataTableModule } from '../../data-table/data-table/data-table.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { AnalyticsComponent } from './analytics/analytics.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
     MaterialModule,
      FormsModule,
       UiModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpModule,
        DataTableModule],
  exports: [
    DashboardComponent
    ],
  declarations: [
    DashboardComponent,
    AnalyticsComponent
  ],
  providers: [
  ],
entryComponents: []
})
export class DashbordModule {

}
