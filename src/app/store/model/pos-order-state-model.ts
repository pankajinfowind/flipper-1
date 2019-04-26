
import { Orders } from '../../orders/orders';
import { Customer } from '../../customers/customer';
import { Invoice } from '../../invoices/invoice';
export interface PosOrdersState {
  data: Orders[];
  loaded: boolean;
  loading: boolean;
  payload?:any;
  success?:boolean;
  order:Orders;
  invoice:Invoice;
  customer?:Customer;
  itemId:number | 0;
  meta:{
  from: number;
  to: number;
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  path: string;
  query: string;
  type: string;
  next_page_url: string|null;
  prev_page_url: string|null;
  sort_column: SortColumn;
  sort_direction: SortDirection;

  },
  queryParams?: OrdersApiIndexParams;

}


export const AVAILABLE_SORTS: PosSortOption[] = [
  {name: 'item', viewName: 'Item'},
  {name: 'updated_at', viewName: 'Last Modified'},
  {name: 'created_at', viewName: 'Created Date'},
];

export interface OrdersModel {
  entries:Orders[];
  meta: {
    currentPage: number;
    lastPage: number;
    sortColumn: SortColumn;
    sortDirection: SortDirection;
    type?: string|null,
    query?: string|null
};
}

export interface PosSortOption {
  name: SortColumn;
  viewName: string;

}

export type SortColumn = 'item' | 'name' | 'updated_at' | 'created_at';
export type SortDirection = 'desc'|'asc';

export interface OrdersApiIndexParams {
  order_by?: SortColumn;
  order_dir?: SortDirection;
  categoryId?: number | '0';
  query?: string;
  type?: string;
  per_page?: number;
  page?: number;
  url?:string
}
