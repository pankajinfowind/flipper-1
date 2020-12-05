import { NgModule } from '@angular/core'
import { DashboardComponent } from './dashboard.component'
import { DashboardRoutingModule } from './dashboard-routing.module'
import { SharedModule } from '../shared/shared.module'

@NgModule({
  declarations: [DashboardComponent],
  exports: [DashboardComponent],
  imports: [SharedModule, DashboardRoutingModule],
})
export class DashboardModule {}
