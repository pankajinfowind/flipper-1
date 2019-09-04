import { Category } from "../../admin/master/categories/api/category";
import { Details } from "../../details/details";

export class LoadCategories {
  static readonly type = '[Master] Load Categories';
}

export class ToggleDetailsSidebar {
  static readonly type = '[Master] Toggle Details';
}
export class SetViewDetails {
  static readonly type = '[Drive] Set View Details';
  constructor(public details?: Details) {}
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
