import { Orders } from '../orders/orders';
import { OrderItems } from '../pos/cart/order_items';
import { TAXRATE } from '../setup/tax-rates/api/tax-rate';
import { Branch } from '../admin/master/branch/api/branch';
import { Customer } from '../customers/customer';
import { CustomerType } from '../setup/customerType/api/CustomerType';
import { CustomizeInvoice } from '../settings/customize-invoice/customize-invoice';
import { Business } from '../business/api/business';
import { User } from '../common/core/types/models/User';


export class Invoice {
  id?: number;
  invoice_id?: number;
  invoice_no?: any;
  invoice_date?:Date;
  payment_method?:PaymentMethod;
  status?:Status;
  total_discounts?:number;
  taxable_vat?:number;
  total_items?:number;
  total_amount?:number;
  amount_given?:number;
  amount_return?:number;
  branch_id?:number;
  tax_rate_id?:number;
  order_id?:number;
  business_id?:number;
  customer_id?:number;
  customer_type_id?:number;
  currency?:string;
  created_at?:Date;
  updated_at?:Date;
  order?:Orders;
  orderItems?:OrderItems[]=[];
  taxRate?:TAXRATE;
  branch?:Branch;
  customer?:Customer;
  customer_type?:CustomerType;
  company_total_amount_discount?:any;
  company_discount_value?:any;
  customer_type_discount_value?:any;
  printFormat?:Array<CustomizeInvoice>;
  business?:Business;
  user?:User;
  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
export enum PaymentMethod{
  CASH = 'Cash',
  CARD = 'Card',
  OTHER = 'Other'
}
export enum Status{
  COMPLETE = 'complete',
  PENDING = 'pending',
  CANCEL = 'cancel'
}
