import { Injector, Injectable } from '@angular/core';
import { Schema, ModelService } from '@enexus/flipper-offline-database';
import { Menu, APP_CONFIG, Tables, Reason, Taxes } from '@enexus/flipper-components';

export function init_app(bootstrapper: Bootstrapper) {
  return () => bootstrapper.bootstrap();
}


@Injectable()
export class Bootstrapper {
  protected schema: Schema;
  protected model: ModelService;

   otherMenus: Menu[]=[{
    name: 'Transactions',
    icon: 'transaction.svg',
    route: 'admin/transactions',
    active: false,
    isSetting: false,
}];

  constructor(protected injector: Injector) {
    this.schema = this.injector.get(Schema);
    this.model = this.injector.get(ModelService);
  }

  /**
   * Bootstrap application with data returned from server.
   */

  private insertDefaultData<T>(menus: T[], table: string, type = '') {
    menus.forEach(m => {
      const menu: any = m;
      const finded = this.model.findByFirst(table,'name', menu.name);
      if (!finded) {
        if (type === 'types') {
          const created: any = this.model.create(table, [{ name: menu.name }]);
          if (created) {
            this.insertDefaultBusinessCategory<T>(menu.category,
              Tables.businessCategory, created.id);
          }
        } else {
          this.model.create(table, [menu]);
        }
      }
    });

  }

  private insertDefaultBusinessCategory<T>(categories: T[], table: string, typesId: number) {
    categories.forEach(cat => {
      const category: any = cat;
      this.model.create(table, [{ name: category.name, typeId: typesId }]);
    });
  }




  public bootstrap(data?: string): Promise<any> {
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

                if (table.name === 'menu') {
                  if (config.defaultMenu.length > 0) {
                    this.insertDefaultData<Menu>(config.defaultMenu as Menu[], myTable);
                    this.insertDefaultData<Menu>(this.otherMenus as Menu[], myTable);
                  }
                }


                /////////////////////////////////// ADD DEFAULT REASONS

                if (table.name === 'reasons') {
                  if (config.defaultReasons.length > 0) {
                    this.insertDefaultData<Reason>(config.defaultReasons as Reason[], myTable);
                  }
                }

                /////////////////////////////////// ADD DEFAULT TAXES

                if (table.name === 'taxes') {
                  if (config.defaultTaxes.length > 0) {
                    this.insertDefaultData<Taxes>(config.defaultTaxes as Taxes[], myTable);
                  }
                }


                ///////////////////////////////////// ADD TYPES //////////////////////////

                if (table.name === 'types') {
                  if (config.defaultType.length > 0) {
                    this.insertDefaultData(config.defaultType, myTable, 'types');
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


}
