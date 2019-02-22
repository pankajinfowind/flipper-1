import "zone.js/dist/zone-mix";
import "reflect-metadata";
import "../polyfills";
import { BrowserModule } from "@angular/platform-browser";
import {
  NgModule,
  APP_INITIALIZER,
  Injectable,
  ErrorHandler,
  CUSTOM_ELEMENTS_SCHEMA
} from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { AppRoutingModule } from "./app-routing.module";
// NG Translate
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { WebviewDirective } from "./directives/webview.directive";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material/material.module";
import { BusinessModule } from "./business/business.module";
import { AuthModule } from "./common/auth/auth.module";
import { AdminModule } from "./admin/admin.module";
import { RouterModule } from "@angular/router";
import { CoreModule } from "./common/core/core.module";
import { APP_CONFIG } from "./common/core/config/flipper-config";
import { FLIPPER_CONFIG } from "./flipper-config";
import * as Sentry from "@sentry/browser";
import { RedirectComponent } from "./redirect/redirect.component";
import { NgxsModule } from "@ngxs/store";
import { NgxModelModule } from "ngx-model";
import { NgxElectronModule } from "ngx-electron";
import { AppConfig } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { effect, reducers } from './store';
Sentry.init({
  dsn: "https://dff6a3f171414762ac4f1c7e084289c3@sentry.io/1323436"
});
// TODO: improve sentry with this article: https://alligator.io/angular/error-tracking-sentry/
@Injectable()
export class SentryErrorHandler implements ErrorHandler {
  constructor() { }
  handleError(error) {
    if (AppConfig.production) {
      Sentry.captureException(error.originalError || error);
      throw error;
    }
  }
}
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    RedirectComponent
  ],
  imports: [
    NgxElectronModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    BusinessModule,
    RouterModule,
    // Ng2Webstorage,
    CoreModule.forRoot(),
    AuthModule,
    NgxsModule.forRoot([]),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot(effect) ,
    NgxModelModule,
    // NgxsRouterPluginModule.forRoot(),
    // NgxsReduxDevtoolsPluginModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    AdminModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: FLIPPER_CONFIG,
      multi: true
    },
    { provide: ErrorHandler, useClass: SentryErrorHandler }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
