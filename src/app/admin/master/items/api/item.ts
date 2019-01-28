import { Brand } from '../../brands/api/brand';
import { TAXRATE } from '../../../../setup/tax-rates/api/tax-rate';
import { CustomerType } from '../../../../setup/customerType/api/CustomerType';

export class Item {
  id?: number;
  item?: string;
  item_id?: number;
  sku?: string;
  summary?: string;
  manufacturer?: string;
  product_order_code?: number;
  category_id?: number;
  cover?: string;
  business_id?: number;
  created_at?: string;
  updated_at?: string;
  brand?:Brand;
  tax_rate?:TAXRATE;
  category?: { id: number, active: number, parent_id: number, business_id: number, created_at: string, updated_at: string, name: string };
  barcode?: string;
  article_code?: number;
  currency?: string;
  unit_sale?:number;
  unit_cost?:number;
  upc?:number;
  customer_type_items?:CustomerType;
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
