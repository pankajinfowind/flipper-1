import { TAXRATE } from './tax-rates/api/tax-rate';
import { Reason } from './reasons/api/reason';
import { CustomerType } from './customerType/api/CustomerType';


export class SetUp {
  id?:number;
  loading:boolean;
  taxRates:TAXRATE[]=[];
  reasons:Reason[]=[];
  customertypes:CustomerType[]=[];
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
