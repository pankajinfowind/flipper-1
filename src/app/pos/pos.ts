import { Insurance } from '../admin/master/insurance/api/insurance';
import { Customer } from '../customers/customer';
import { Orders } from '../orders/orders';


export class Pos {
  id?: number;
  loading: boolean;
  choosen_insurance?: Insurance;
  currently_ordered?: Orders;
  choose_customer?: Customer;
  panel_content?: string;

  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
