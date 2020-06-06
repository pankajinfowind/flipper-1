import { Injector, Injectable } from '@angular/core';
import { Schema, ModelService } from '@enexus/flipper-offline-database';
import { Menu, APP_CONFIG, MigrateService, Tables, Types, BusinessCategory, DEFAULT_FLIPPER_DB_CONFIG } from '@enexus/flipper-components';
import { v1 as uuidv1 } from 'uuid';

export function init_app(bootstrapper: Bootstrapper) {
  return () => bootstrapper.bootstrap();
}


@Injectable()
export class Bootstrapper {

  protected schema: Schema;
  protected model: ModelService;
  protected migrate: MigrateService;

  constructor(protected injector: Injector) {
    this.schema = this.injector.get(Schema);
    this.model = this.injector.get(ModelService);

    this.migrate = this.injector.get(MigrateService);
  }

  /**
   * Bootstrap application with data returned from server.
   *
   */

  public bootstrap(data?: string) {
    this.buildTables();
    this. migrateDataFromCouchbaseToSqldb();
    }


  private migrateDataFromCouchbaseToSqldb() {
    this.migrate.businessTypes();
    this.migrate.businessCategories();
    this.model.truncate(Tables.user);
    this.model.truncate(Tables.business);
    this.model.truncate(Tables.branch);
    this.model.truncate(Tables.taxes);
    this.migrate.user();
    this.migrate.businesses();
    this.migrate.branches();
    this.migrate.taxes();
  }




private buildTables(): Promise<any> {

  return new Promise((resolve, reject) => {
    this.injector.get(APP_CONFIG).forEach(config => {

      if (config.database.name && config.database.engine) {

        this.schema.createDb(config.database.name, config.database.engine);

        if (config.tables && config.tables.length > 0) {

                config.tables.forEach(table => {

                  if (table.query && table.name) {

                        const myTable = config.database.name + '.' + table.name;
                        this.schema.create(myTable, table.query);

                              ///////////////////////////////////// ADD DEFAULT MENUS //////////////////////////

                        if (table.name === 'menus') {
                                if (config.defaultMenu.length > 0) {
                                  this.insertDefaultData<Menu>(config.defaultMenu as Menu[], myTable);
                                }
                            }

                        if (table.name === 'businessTypes') {
                              if (config.defaultType.length > 0) {
                                 this.insertBusinessTypeData<Types>(config.defaultType as Types[], myTable);
                              }
                          }


                  }

                });

                resolve();

        } else {

          reject();

        }
      } else {
        reject();
      }
    });
  });
}
private insertDefaultData<T>(rows: T[], table: string) {

  rows.forEach(each => {
    const row: any = each;
    const didInserted: any = this.model.findByFirst(table, 'name', row.name);
    if (!didInserted) {
            this.model.create(table, [row]);
        } else {
          this.model.update(table, row,didInserted.id);
        }
  });

}



private insertBusinessTypeData<T>(rows: T[], table) {

  rows.forEach(each => {
    const row: any = each;

    const didInserted: any = this.model.findByFirst(table, 'name', row.name);
    if (!didInserted) {

      const form: Types= {id:uuidv1(), name:row.name};

      this.model.create(table, [form]);

      if(row.category.length > 0) {

                        row.category.forEach( row1=> {
                          const didInserted1: any = this.model.findByFirst(DEFAULT_FLIPPER_DB_CONFIG.database.name+'.businessCategories', 'name', row1.name);

                          if(!didInserted1) {
                            const form2: BusinessCategory= {id:uuidv1(),name:row1.name,typeId:form.id,
                              createdAt: new Date(),
                              updatedAt:new  Date()};

                            this.model.create(DEFAULT_FLIPPER_DB_CONFIG.database.name+'.businessCategories', [form2]);

                                } else {
                                  this.model.update(DEFAULT_FLIPPER_DB_CONFIG.database.name+'.businessCategories', row1,didInserted1.id);
                                }

                            }
                        );

                      }
        } else {
          this.model.update(table, row,didInserted.id);
        }
  });

}


}
