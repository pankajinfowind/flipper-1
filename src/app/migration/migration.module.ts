import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core'
import { CommonModule } from '@angular/common'
import { FlipperOfflineDatabaseModule } from '@enexus/flipper-offline-database'
import { Bootstrapper, init_app } from './bootstrapper.service'
import { APP_CONFIG, DEFAULT_FLIPPER_DB_CONFIG } from '@enexus/flipper-components'

@NgModule({
  declarations: [],
  imports: [CommonModule, FlipperOfflineDatabaseModule],
})
export class MigrationModule {
  static forRoot(): ModuleWithProviders<MigrationModule> {
    return {
      ngModule: MigrationModule,
      providers: [
        Bootstrapper,
        {
          provide: APP_CONFIG,
          useValue: DEFAULT_FLIPPER_DB_CONFIG,
          multi: true,
        },

        {
          provide: APP_INITIALIZER,
          useFactory: init_app,
          deps: [Bootstrapper],
          multi: true,
        },
      ],
    }
  }
}
