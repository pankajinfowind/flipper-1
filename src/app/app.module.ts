import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { VendorsModule } from '@enexus/flipper-vendors'
import { FlipperComponentsModule, PouchDBService } from '@enexus/flipper-components'
import { FlipperPosModule } from '@enexus/flipper-pos'
import { FlipperDashboardModule } from '@enexus/flipper-dashboard'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { CommonModule } from '@angular/common'
import { AppRoutingModule } from './app-routing.module'
import { LoginComponent } from './login/login.component'
import { SubscriptionComponent } from './subscription/subscription.component'
import { PaidSuccessComponent } from './subscription/paid-success/paid-success.component'
import { CardValidationComponent } from './subscription/validate-card/validate-card.component'
import { SafePipe } from './safe.pipe'
import { AnQrcodeModule } from 'an-qrcode'
import { SharedModule } from './shared/shared.module'
import { AppComponent } from './app.component'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@NgModule({
  declarations: [AppComponent,LoginComponent,SubscriptionComponent,CardValidationComponent,
    PaidSuccessComponent,
    SafePipe,],
  imports: [
    FlipperDashboardModule,
    BrowserModule,
    VendorsModule,
    HttpClientModule,
    AnQrcodeModule,
    CommonModule,
    SharedModule,
    AppRoutingModule,
    FlipperComponentsModule,
    FlipperPosModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  entryComponents: [],
  providers: [PouchDBService],
  bootstrap: [AppComponent]
})
export class AppModule {}
declare module '@angular/core' {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>
    providers?: Provider[]
  }
}
