import{Action} from'@ngrx/store';
import { Category } from '../../admin/master/categories/api/category';
import { CategoriesApiIndexParams } from '../model/pos-category-state-model';

export class LoadCategoriesEntries implements LoadCategoriesEntriesAction{
  static readonly type = '[CATEGORY] Load Categories Entries';
  constructor(public queryParams: CategoriesApiIndexParams = {}){  }
}

export class LoadMoreCategoriesEntries implements LoadCategoriesEntriesAction{
  static readonly type = '[CATEGORY] Load More Categories Entries';
  public loadMore = true;
  constructor(public queryParams: CategoriesApiIndexParams = {}){  }
}

export class OpenPosCategory implements CategoryIdAction{
  static readonly type = '[CATEGORY] Open Category Entries';
  constructor(public categoryId:number,public customerTypeId:number ){  }

}
export class ClosePosCategory implements CategoryAction{
  static readonly type = '[CATEGORY] Close Category Entries';


}

export interface LoadCategoriesEntriesAction {
  queryParams?: CategoriesApiIndexParams;
  category?: Category;
  loadMore?: boolean;
  type?:string;
  categoryId?:number;
}
export interface CategoryIdAction {
  customerTypeId:number
  categoryId:number;
}

export interface CategoryAction {
  category?:Category;
}


