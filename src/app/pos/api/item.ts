import { CustomerType } from '../../setup/customerType/api/CustomerType';
import { Brand } from '../../admin/master/brands/api/brand';
import { TAXRATE } from '../../setup/tax-rates/api/tax-rate';

export class Item {
  id?:number;
  item:string;
  item_id?:number;
  sku:string;
  upc?:number;
  summary?:string;
  manufacturer?:string;
  unit_cost:number;
  category_id?:number;
  category?:{name:string};
  barcode?:string;
  unit_sale?:number;
  currency?:string;
  customer_type_items?:CustomerType;
  brand?:Brand;
  tax_rate?:TAXRATE;
  cost_price_excluding_tax?:number;
  cost_price_including_tax?:number;
  margin?:number;
  recommended_retail_price?:number;

    constructor(params: Object = {}) {
      for (let name in params) {
          this[name] = params[name];
      }
    }
}
