import { OrderItems } from '../pos/cart/order_items';
import { Customer } from '../customers/customer';
import { CustomerType } from '../setup/customerType/api/CustomerType';
import { Invoice } from '../invoices/invoice';
import { Supplier } from '../admin/master/suppliers/api/supplier';
import { Branch } from '../admin/master/branch/api/branch';

export class Orders {

  id?: number;
  created_at?: Date;
  updated_at?: Date;
  status?: string;
  customer_id?: number;
  is_currently_processing?: any;
  all?: string;
  user?: any;
  customer?: Customer;
  customer_type?:CustomerType;
  order_items?: OrderItems[] = [];
  branch_id?: number;
  business_id?: number;
  invoice?:Invoice;
  order_no?:string;
  reference?:string;
  order_status?:string;
  supplier_invoice?:string;
  order_due_date?:any;
  deliver_to_id?:number;
  transfer_to_id?:number;
  transfer_from_id?:number;
  order_from_id?:number;
  delicerTo?:Branch;
  supplier?:Supplier;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }

}
