import { TAXRATE } from './tax-rates/api/tax-rate';


export class SetUp {
  id?:number;
  loading:boolean;
  taxRates:TAXRATE[]=[];
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
