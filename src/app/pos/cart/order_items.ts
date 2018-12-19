
export class OrderItems {
  id?: number;
  order_id?: number;
  stock_id?: number;
  each?: any;
  currency?: any;
  qty?: number;
  total?: any;
  price?: string;
  total_discount?: number;
  total_amount?: number;
  total_tax?: number;
  discount?: number;
  available_qty?: number;
  item?: string;
  tax?: number;
  note?: string;
  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
