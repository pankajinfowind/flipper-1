import { Category } from "../../admin/master/categories/api/category";

export class LoadCategories {
  static readonly type = '[Master] Load Categories';
}


export class AddCategories {
  static readonly type = '[Master] Add a category';
  constructor(public categories: Category[]) {}
}
