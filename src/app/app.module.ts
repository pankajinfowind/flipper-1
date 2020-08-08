import 'reflect-metadata';
import '../polyfills';

import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';

import { AppRoutingModule } from './app-routing.module';

// NG Translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { MigrationModule } from './migration/migration.module';
import { PouchDBService, CurrentBusinessEvent } from '@enexus/flipper-components';
import { SubscriptionComponent } from './subscription/subscription.component';
import { CardValidationComponent } from './subscription/validate-card/validate-card.component';
import { environment } from '../environments/environment';

import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { PaidSuccessComponent } from './subscription/paid-success/paid-success.component';
import { FlipperEventBusService } from '@enexus/flipper-event';
import { SafePipe } from './safe.pipe';
import { AnQrcodeModule } from 'an-qrcode';
// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent, LoginComponent, SubscriptionComponent, CardValidationComponent,
     PaidSuccessComponent,SafePipe],
  imports: [
    CoreModule,
    SharedModule,
    AppRoutingModule,
    AnQrcodeModule,
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
  entryComponents: [CardValidationComponent, PaidSuccessComponent]
})
export class AppModule {
  businessName: string;

  
  constructor(private database: PouchDBService,
    private eventBus: FlipperEventBusService,
    private firestore: AngularFirestore) {
    if (window.localStorage.getItem('channel') === null
      || localStorage.getItem('channel') === 'null'
      || localStorage.getItem('channel') === undefined) {
      window.localStorage.setItem('channel', this.database.uid());
    }


    this.eventBus.of<CurrentBusinessEvent>(CurrentBusinessEvent.CHANNEL)
      .subscribe(res => {
        if(!res.business)return;
        this.businessName = res.business.name;
        this.firestore.collection(this.businessName).valueChanges().subscribe(res => {
          if (res) {
            // http://localhost:4985/
            const plan: any[] = res as any[];
            if (plan.length == 0) {
              this.firestore.collection(this.businessName).add({
                'bucket': 'main',
                'syncUrl': 'http://localhost:4985/',
                'canSync': 'true',
                'businessName': this.businessName,
                'channel': this.database.uid()
              }).then(() => {
                this.firestore.collection(this.businessName).valueChanges().subscribe(res => {
                  if (res) {
                    const plan: any[] = res as any[];
                    window.localStorage.setItem('bucket', plan[0].bucket);
                    window.localStorage.setItem('syncUrl', plan[0].syncUrl);
                    window.localStorage.setItem('canSync', plan[0].canSync);
                  }
                  this.database.sync(plan[0].syncUrl);
                })
              })
            }else{
              this.firestore.collection(this.businessName).valueChanges().subscribe(res => {
                if (res) {
                  

                  const plan: any[] = res as any[];

                  if(plan[0].canSync == 'true'){
                    this.database.sync(plan[0].syncUrl);
                  }
                  

                  window.localStorage.setItem('bucket', plan[0].bucket);
                  window.localStorage.setItem('syncUrl', plan[0].syncUrl);
                  window.localStorage.setItem('canSync', plan[0].canSync);
                }
              })
            }
          }
        });
      });
  }
}
