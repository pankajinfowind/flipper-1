
import { PosOrdersState, SortColumn, SortDirection } from './pos-order-state-model';


export const SET_POS_ORDER_ORDERBY=localStorage.getItem('PosOrderSortColumn') as SortColumn;
export const SET_POS_ORDER_ORDERDIR=localStorage.getItem('PosOrderSortDirection') as SortDirection;
export const POS_ORDER_STATE_MODEL_DEFAULTS: PosOrdersState = {
    data: [],
  loaded: false,
  loading: false,
  payload:null,
  success:false,
  order:null,
  invoice:null,
  customer:null,
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
  order_by:SET_POS_ORDER_ORDERBY?SET_POS_ORDER_ORDERBY:'updated_at',
  order_dir: SET_POS_ORDER_ORDERDIR?SET_POS_ORDER_ORDERDIR:'desc',
  categoryId:  '0',
  query: null,
  type: null,
  per_page: 50,
  page: 0,
  url:null
  }
};


