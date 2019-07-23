import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation, ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Observable } from 'rxjs';
import { Category } from '../../../../admin/master/categories/api/category';
import { Select, Store } from '@ngxs/store';
import { PosCateoriesState } from '../../../../store/states/PosCategoryStates';
import { LocalStorage } from '../../../../common/core/services/local-storage.service';
import { Router } from '@angular/router';
import { CategoriesApiIndexParams } from '../../../../store/model/pos-category-state-model';
import { SET_POS_CAT_ORDERBY, SET_POS_CAT_ORDERDIR } from '../../../../store/model/pos-category-state';
import { LoadCategoriesEntries, ClosePosCategory } from '../../../../store/actions/pos-categories.action';
import { CurrentUser } from '../../../../common/auth/current-user';

@Component({
  selector: 'app-item-categories',
  templateUrl: './item-categories.component.html',
  styleUrls: ['./item-categories.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ItemCategoriesComponent implements OnInit {
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;
  warn = 'warn';
  accent='accent';
  primary='primary';
  mode = 'determinate';

  @Select(PosCateoriesState.entries) entries$: Observable<Category[]>;
  @Select(PosCateoriesState.meta) meta$: Observable<any>;
  @Select(PosCateoriesState.loading) loading$: Observable<boolean>;
  bg_img: any=null;
  
  constructor(public currentUser:CurrentUser,private localStorage: LocalStorage,  private router: Router,private store:Store) {
this.bg_img=this.currentUser.getBusiness('category')=='Pharmacy'?this.localStorage.drug_item:this.localStorage.any_item;
  }
 
  ngOnInit() {
    this.localStorage.set('pos-load-data', 'ofCategories');
    this.store.dispatch(new ClosePosCategory());
    const queryParams:Partial<CategoriesApiIndexParams>={
      order_by:SET_POS_CAT_ORDERBY?SET_POS_CAT_ORDERBY:'updated_at',
      order_dir: SET_POS_CAT_ORDERDIR?SET_POS_CAT_ORDERDIR:'desc',
      categoryId:  '0',
      query: null,
      type: null,
      per_page: 30,
      page: 0
      };
      this.store.dispatch(new LoadCategoriesEntries(queryParams));
  }
  loadItemsOfCategory(category:Category){
    this.localStorage.set('pos-categoryId', category.id);
    return this.router.navigate(['/admin/pos/till-category-items',category.id]);
  }

}
