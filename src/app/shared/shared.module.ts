import { NgModule} from '@angular/core';
import { VendorsModule} from '@enexus/flipper-vendors';
import {WebviewDirective} from './directives/';
import {FlipperEventModule} from '@enexus/flipper-event';
import {FlipperComponentsModule} from '@enexus/flipper-components';
import {FlipperPosModule} from '@enexus/flipper-pos';
import {FlipperMenuModule } from '@enexus/flipper-menu';
import { FlipperDashboardModule } from '@enexus/flipper-dashboard';
import { FlipperOfflineDatabaseModule } from '@enexus/flipper-offline-database';
import { FlipperSettingsModule } from '@enexus/flipper-settings';
import { FlipperInventoryModule } from '@enexus/flipper-inventory';
import { FlipperPaymentCardModule } from '@enexus/payment-card';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';
import { PageNotFoundComponent } from './components';
@NgModule({
  declarations: [
    PageNotFoundComponent,
    WebviewDirective,
    LoadingIndicatorComponent
  ],
  imports: [
    FlipperEventModule,
    FlipperComponentsModule,
    FlipperPosModule,
    VendorsModule,
    FlipperMenuModule,
    FlipperDashboardModule,
    FlipperOfflineDatabaseModule,
    FlipperSettingsModule,
    FlipperInventoryModule,
    FlipperPaymentCardModule
  ],
  exports: [
    LoadingIndicatorComponent,
    WebviewDirective,
    FlipperEventModule,
    FlipperComponentsModule,
    FlipperPosModule,
    VendorsModule,
    FlipperMenuModule,
    FlipperDashboardModule,
    FlipperOfflineDatabaseModule,
    FlipperSettingsModule,
    FlipperInventoryModule,
    FlipperPaymentCardModule
  ]
})
export class SharedModule {}
