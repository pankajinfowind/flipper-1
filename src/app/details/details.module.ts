import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { NgxModelModule } from 'ngx-model';
import { DetailsService } from './details.service';
import { MaterialModule } from '../material/material.module';
import { DetailsPanelComponent } from './details-panel/details-panel.component';
import { MasterModelModule } from '../admin/master/master-model/master-model.module';
import { StockModelModule } from '../stock/stock-model/stock-model.module';

@NgModule({
  declarations: [DetailsComponent, DetailsPanelComponent],
  imports: [
    CommonModule,
    NgxModelModule,
    MaterialModule,
    MasterModelModule,
    StockModelModule
  ],
  exports:[DetailsComponent],
  providers: [DetailsService],
})
export class DetailsModule { }
