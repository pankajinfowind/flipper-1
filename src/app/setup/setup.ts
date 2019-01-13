import { TAXRATE } from './tax-rates/api/tax-rate';
import { Reason } from './reasons/api/reason';


export class SetUp {
  id?:number;
  loading:boolean;
  taxRates:TAXRATE[]=[];
  reasons:Reason[]=[];
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
