import { Customer } from '../customers/customer';
import { Orders } from '../orders/orders';
import { Stock } from '../stock/api/stock';
import { CustomerType } from '../setup/customerType/api/CustomerType';


export class Pos {
  id?: number;
  loading: boolean;
  currently_ordered?: Orders;
  choose_customer?: Customer;
  panel_content?: string;
  stocks?:Stock[]=[];
  orders?:Orders[]=[];

  customer_type_price?:CustomerType;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
