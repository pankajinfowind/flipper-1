import { Category } from "../../admin/master/categories/api/category";

export class LoadCategories {
  static readonly type = '[Master] Load Categories';
}

export class LoadProgress {
  static readonly type = '[Master] Load';
}


export class AddCategoryAction {
  static readonly type = '[Master] Add a category';
  constructor(public categories: Category[]) {}
}

export class LoadingAction {
  static readonly type = '[Master] Add Lading';
  constructor(public loading: boolean) {}
}
