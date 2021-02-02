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
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NavComponent } from './nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list'
import { CurrentUser } from './core/guards/current-user'

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

@NgModule({
  declarations: [AppComponent,LoginComponent,SubscriptionComponent,CardValidationComponent,
    PaidSuccessComponent,
    SafePipe,
    NavComponent,],
  imports: [
    FlipperDashboardModule,
    BrowserModule,
    VendorsModule,
    HttpClientModule,
    AnQrcodeModule,
    CommonModule,
    SharedModule,
    AppRoutingModule,
    MatIconModule,
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
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
  ],
  entryComponents: [],
  providers: [PouchDBService],
  bootstrap: [AppComponent]
})
export class AppModule {
  async login(){
    await this.currentUser.configAuthUser(localStorage.getItem('userId'));
  }
  constructor( private currentUser: CurrentUser){
    // on startup the system go to intire login flow ind there check if user still need to be logged in
    if(localStorage.getItem('userId')){
      this.login();
    }
  }
}
declare module '@angular/core' {
  interface ModuleWithProviders<T = any> {
    ngModule: Type<T>
    providers?: Provider[]
  }
}
