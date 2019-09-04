import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { NgxModelModule } from 'ngx-model';
import { DetailsService } from './details.service';
import { MaterialModule } from '../material/material.module';
import { DetailsPanelComponent } from './details-panel/details-panel.component';
import { MasterModelModule } from '../admin/master/master-model/master-model.module';
import { StockModelModule } from '../stock/stock-model/stock-model.module';
import { SetUpModelModule } from '../setup/setup-model/setup-model.module';

@NgModule({
  declarations: [DetailsComponent, DetailsPanelComponent],
  imports: [
    CommonModule,
    NgxModelModule,
    MaterialModule,
    MasterModelModule,
    StockModelModule,
    SetUpModelModule
  ],
  exports:[DetailsComponent],
  providers: [DetailsService],
})
export class DetailsModule { }
