import { Item } from './items/api/item';
import { Category } from './categories/api/category';
import { Insurance } from './insurance/api/insurance';
import { Pricing } from './pricing/api/pricing';
import { Brand } from './brands/api/brand';

export class Master {
  id?:number;
  loading:boolean;
  items:Item[]=[];
  categories:Category[]=[];
  insurances:Insurance[]=[];
  pricing:Pricing[]=[];
  brands:Brand[]=[];
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
