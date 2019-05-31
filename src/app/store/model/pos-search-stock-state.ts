import { SortColumn } from './pos-category-state-model';
import { SortDirection } from '@angular/material';
import { PosSearchStockState } from './pos-search-stock-state-model';

export const SET_POS_STOCK_ORDERBY=localStorage.getItem('PosStockSortColumn') as SortColumn;
export const SET_POS_STOCK_ORDERDIR=localStorage.getItem('PosStockSortDirection') as SortDirection;
export const POS_SEARCH_STOCK_STATE_MODEL_DEFAULTS: PosSearchStockState = {
  data: [],
  loaded: false,
  loading: false,
  payload:null,
  success:false,
  stock:null,
  itemId:0,
 meta:{
  from: 0,
  to: 0,
  total: 0,
  per_page: 0,
  current_page: 0,
  last_page: 0,
  path: null,
  query: null,
  type:null,
  next_page_url: null,
  prev_page_url:null,
  sort_column:null,
  sort_direction:null,

 },
 queryParams:{
  order_by:SET_POS_STOCK_ORDERBY?SET_POS_STOCK_ORDERBY:'updated_at',
  order_dir: SET_POS_STOCK_ORDERDIR?SET_POS_STOCK_ORDERDIR:'desc',
  categoryId:  '0',
  query: null,
  type: null,
  per_page: 50,
  page: 0
  }
};


