import { Category } from '../../admin/master/categories/api/category';

export interface PosCategoryState {
  data: Category[];
  loaded: boolean;
  loading: boolean;
  payload?:any;
  success?:boolean;
  categoryId:number | 0;
  category:Category;
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
  queryParams?: CategoriesApiIndexParams;

}

export const VIEW_MODE_KEY = 'bedesk.viewMode';

export const AVAILABLE_SORTS: PosSortOption[] = [
  {name: 'item', viewName: 'Item'},
  {name: 'name', viewName: 'Name'},
  {name: 'updated_at', viewName: 'Last Modified'},
  {name: 'created_at', viewName: 'Created Date'},
];

export interface CategoryModel {
  entries:Category[];
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

export interface CategoriesApiIndexParams {
  order_by?: SortColumn;
  order_dir?: SortDirection;
  categoryId?: number | '0';
  branch_id?: number | '0';
  query?: string;
  type?: string;
  per_page?: number;
  page?: number;
}
