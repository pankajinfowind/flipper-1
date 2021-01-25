import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
// import { AppComponent } from './app.component'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { VendorsModule } from '@enexus/flipper-vendors'
import { FlipperComponentsModule, PouchDBService } from '@enexus/flipper-components'
import { FlipperPosModule, FlipperPosComponent } from '@enexus/flipper-pos'
// import { DashboardComponent, FlipperDashboardModule } from '@enexus/flipper-dashboard'
import { HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'

@NgModule({
  // declarations: [AppComponent],
  imports: [
    // FlipperDashboardModule,
    BrowserModule,
    VendorsModule,
    HttpClientModule,
    CommonModule,
    FlipperComponentsModule,
    FlipperPosModule,
    BrowserAnimationsModule,
  ],
  entryComponents: [],
  providers: [PouchDBService],
  bootstrap: [FlipperPosComponent],
  // bootstrap: [DashboardComponent],
})
export class AppModule {}
declare module '@angular/core' {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>
    providers?: Provider[]
  }
}
