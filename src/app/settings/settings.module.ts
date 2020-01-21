import { NgModule } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { SharedModule } from '../shared/shared.module';
import { FlipperSettingsModule } from '@enexus/flipper-settings';
import { SettingRoutingModule } from './setting-routing.module';

@NgModule({
  declarations: [SettingsComponent],
  exports: [SettingsComponent],
  imports: [
    SharedModule,
    FlipperSettingsModule,
    SettingRoutingModule
  ]
})
export class SettingsModule { }
