import { TAXRATE } from '../../setup/tax-rates/api/tax-rate';
import { Stock } from '../../stock/api/stock';
import { CustomerTypePrices } from '../../setup/customerType/api/CustomerTypePrices';

export class OrderItems {
  id?: number;
  order_id?: number;
  stock_id?: number;
  each?: any;
  currency?: any;
  qty?: number;
  price?: number;
  total_amount_discount?: number;
  total_amount?: number;
  taxable_amount?: number;
  discount_value?: number;
  tax_rate_percentage?:number;
  customer_type_discount_value?:number;
  customer_type_name?:string;
  taxable_vat?:number;
  discount_reason_id?:number;
  refund_reason_id?:number;
  item?: string;
  tax?: number;
  item_code?:string;
  note?: string;
  batch_no?:string;
  reason_id?:number;
  tax_rate_id?:number;
  sale_price_id?:number;
  tax_rate?:TAXRATE;
  stock?:Stock;
  action?:string;
  sale_price?:CustomerTypePrices;
  available_qty?:number;
  changed_price?:number;
  lastUpdated?:boolean;
  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
