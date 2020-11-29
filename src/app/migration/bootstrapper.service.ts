import { Injector, Injectable } from '@angular/core';
import { Schema, ModelService } from '@enexus/flipper-offline-database';
import { Menu, APP_CONFIG, Tables, Types, BusinessCategory, DEFAULT_FLIPPER_DB_CONFIG } from '@enexus/flipper-components';
import { v1 as uuidv1 } from 'uuid';

export function init_app(bootstrapper: Bootstrapper) {
  return () => bootstrapper.bootstrap();
}


@Injectable()
export class Bootstrapper {

  protected schema: Schema;

  constructor(protected injector: Injector) {

  }

  /**
   * Bootstrap application with data returned from server.
   *
   */

  public bootstrap(data?: string) {

  }

  private migrateDataFromCouchbaseToSqldb() {

  }







}
