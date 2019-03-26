import { Item } from './items/api/item';
import { Category } from './categories/api/category';
import { Brand } from './brands/api/brand';
import { Branch } from './branch/api/branch';

export class Master {
  id?:number;
  loading:boolean;
  items:Item[]=[];
  categories:Category[]=[];
  brands:Brand[]=[];
  branchs:Branch[]=[]
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
