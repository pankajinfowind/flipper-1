import { TAXRATE } from './tax-rates/api/tax-rate';
import { Reason } from './reasons/api/reason';
import { CustomerType } from './customerType/api/CustomerType';
import { ExpirationSetting } from './expiration_setting/api/expiration_setting';


export class SetUp {
  id?:number;
  loading:boolean;
  taxRates:TAXRATE[]=[];
  reasons:Reason[]=[];
  expirationSetting:ExpirationSetting[]=[]
  customertypes:CustomerType[]=[];
    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
