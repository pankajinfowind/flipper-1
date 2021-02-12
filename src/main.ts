import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import * as Sentry from "@sentry/angular";
import { Integrations } from "@sentry/tracing";

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {version } from '../package.json';

// if (environment.production) {
//   enableProdMode();
// }
// platformBrowserDynamic().bootstrapModule(AppModule)
//   .catch(err => console.error(err));
// import { AppModule } from "./app/app.module";

Sentry.init({
  dsn: "https://a6d1f7dc8e89475997665868c3fc42dd@o205255.ingest.sentry.io/5632948",
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ["*", "*"],
      routingInstrumentation: Sentry.routingInstrumentation,
    }),
  ],

  // We recommend adjusting this value in production, or using tracesSampler
  // for finer control
  tracesSampleRate: 2.0,
});

enableProdMode();
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(success => console.log(`app version:${version}`))
  .catch(err => console.error(err));
