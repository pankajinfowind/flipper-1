import 'reflect-metadata';
import '../polyfills';

import { NgModule } from '@angular/core';
import {  HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MigrationModule } from './migration/migration.module';
import { PouchDBService } from '@enexus/flipper-components';
import { Router } from '@angular/router';
import { SubscriptionComponent } from './subscription/subscription.component';
import { CardValidationComponent } from './subscription/validate-card/validate-card.component';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { PaidSuccessComponent } from './subscription/paid-success/paid-success.component';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, LoginComponent,SubscriptionComponent,CardValidationComponent,PaidSuccessComponent],
  imports: [
   CoreModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.config),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    MigrationModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [PouchDBService],
  bootstrap: [AppComponent],
  entryComponents:[CardValidationComponent,PaidSuccessComponent]
})
export class AppModule {
constructor(private database: PouchDBService) {
 if(localStorage.getItem('channel')===null || localStorage.getItem('channel')==='null' || localStorage.getItem('channel')===undefined) {
  localStorage.setItem('channel',this.database.uid());
 }
 localStorage.setItem('bucket', 'lagrace');
 localStorage.setItem('syncUrl', 'http://64.227.5.49:4984');
 localStorage.setItem('canSync', 'true');
}

}
