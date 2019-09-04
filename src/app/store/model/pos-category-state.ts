import { PosCategoryState, SortColumn, SortDirection } from './pos-category-state-model';

export const SET_POS_CAT_ORDERBY=localStorage.getItem('PosCatSortColumn') as SortColumn;
export const SET_POS_CAT_ORDERDIR=localStorage.getItem('PosCatSortDirection') as SortDirection;
export const POS_CATEGORY_STATE_MODEL_DEFAULTS: PosCategoryState = {
    data: [],
  loaded: false,
  loading: false,
  payload:null,
  success:false,
  category:null,
  categoryId:0,
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
  order_by:SET_POS_CAT_ORDERBY?SET_POS_CAT_ORDERBY:'updated_at',
  order_dir: SET_POS_CAT_ORDERDIR?SET_POS_CAT_ORDERDIR:'desc',
  categoryId:  '0',
  query: null,
  type: null,
  per_page: 50,
  page: 0
  }
};


