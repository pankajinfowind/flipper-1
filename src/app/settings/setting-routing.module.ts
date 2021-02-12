import { Routes, RouterModule } from '@angular/router'
import { NgModule } from '@angular/core'
import { SettingsComponent } from './settings.component'

const routes: Routes = [
  {
    path: 'dd',
    component: SettingsComponent,
  },
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingRoutingModule {}
