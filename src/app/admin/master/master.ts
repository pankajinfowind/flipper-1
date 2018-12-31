import { Item } from './items/api/item';
import { Category } from './categories/api/category';
import { Insurance } from './insurance/api/insurance';
import { Pricing } from './pricing/api/pricing';

export class Master {
  id?:number;
  loading:boolean;
  items:Item[]=[];
  categories:Category[]=[];
  insurances:Insurance[]=[];
  pricing:Pricing[]=[];
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
