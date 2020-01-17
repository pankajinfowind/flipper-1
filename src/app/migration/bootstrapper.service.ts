import {
  Injector,
  Injectable
} from "@angular/core";
import {
  Schema,
  ModelService
}
from '@enexus/flipper-offline-database';
import { Menu, APP_CONFIG, Tables } from "@enexus/flipper-components";

export function init_app(bootstrapper: Bootstrapper) {
  return () => bootstrapper.bootstrap();
}


@Injectable()
export class Bootstrapper {
  protected schema: Schema;
  protected model: ModelService;

  constructor(protected injector: Injector) {
    this.schema = this.injector.get(Schema);
    this.model = this.injector.get(ModelService);
  }

  /**
   * Bootstrap application with data returned from server.
   */

  private insertDefaultData<T>(menus:T[],table:string,type="") {
    menus.forEach(menu => {
      let finded=this.model.select(table).where('name', menu['name']).first<T>();
        if(!finded){
          if(type==='types'){
            const created = this.model.create(table,[{name:menu['name']}]);
                  if(created){
                    this.insertDefaultBusinessCategory<T>(menu['category'],
                      Tables.businessCategory,created['id']);
                  }
          }else{
            this.model.create(table,[menu]);
        }
      }
    });
    
  }

  private insertDefaultBusinessCategory<T>(categories:T[],table:string,type_id:number) {
    categories.forEach(cat => {
      this.model.create(table,[{name:cat['name'],typeId:type_id}]);
    });
  }



  public bootstrap(data ? : string): Promise < any > {
    return new Promise((resolve, reject) => {
      this.injector.get(APP_CONFIG).forEach(config => {
        if (config.database.name && config.database.engine) {
        this.schema.createDb(config.database.name, config.database.engine);
        if (config.tables.length > 0) {
         
          config.tables.forEach(table => {
            
            if (table.query && table.name) {
              let myTable=config.database.name + '.' + table.name;
              this.schema.create(myTable, table.query);

/////////////////////////////////////ADD DEFAULT MENUS //////////////////////////

              if(table.name ==='menu'){
                if (config.defaultMenu.length > 0) {
                     this.insertDefaultData<Menu>(config.defaultMenu as Menu[],myTable);
                }
              }

/////////////////////////////////////ADD TYPES //////////////////////////

              if(table.name ==='types'){
                if (config.defaultType.length > 0) {
                     this.insertDefaultData(config.defaultType,myTable,'types');
                }
              }

            }


          });
        

          resolve();

        }else{

          reject();

        }
      }else{
        reject();
      }
      });
    });
  }

 
}
