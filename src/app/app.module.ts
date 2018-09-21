import "zone.js/dist/zone-mix";
import "reflect-metadata";
import "../polyfills";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { HttpClientModule, HttpClient } from "@angular/common/http";

import { AppRoutingModule } from "./app-routing.module";

// NG Translate
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";

import { ElectronService } from "./providers/electron.service";

import { WebviewDirective } from "./directives/webview.directive";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { ChangePasswordComponent } from "./reset-password/change-password/change-password.component";
import { EmailVerifyComponent } from "./login/email-verify/email-verify.component";
import { MaterialModule } from "./material/material.module";
import { PasswordVerifyComponent } from "./login/password-verify/password-verify.component";
import { SendResetPassLinkComponent } from "./reset-password/send-reset-pass-link.component";

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    WebviewDirective,
    LoginComponent,
    RegisterComponent,
    EmailVerifyComponent,
    PasswordVerifyComponent,
    SendResetPassLinkComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule
  ],
  providers: [ElectronService],
  bootstrap: [AppComponent]
})
export class AppModule {}
