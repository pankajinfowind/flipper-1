export class Item {
  id?: number;
  item: string;
  item_id?: number;
  sku: string;
  upc?: number;
  summary?: string;
  manufacturer?: string;
  unit_cost: string;
  category_id?: number;
  cover: string;
  business_id: number;
  created_at: string;
  updated_at: string;

  category?: { id: number, active: number, parent_id: number, business_id: number, created_at: string, updated_at: string, name: string };
  barcode?: string;
  unit_sale?: string;
  currency?: string;


  constructor(params: Object = {}) {
    for (let name in params) {
      this[name] = params[name];
    }
  }
}
