import { PosCategoryState, CategoriesApiIndexParams } from '../model/pos-category-state-model';
import { ApiPosService } from '../../pos/api/api.service';
import { POS_CATEGORY_STATE_MODEL_DEFAULTS } from '../model/pos-category-state';
 import { Action, Selector, State, StateContext, Store } from '@ngxs/store';
import { LoadCategoriesEntriesAction, LoadMoreCategoriesEntries, LoadCategoriesEntries, OpenPosCategory, CategoryIdAction, ClosePosCategory } from '../actions/pos-categories.action';
import { tap } from 'rxjs/internal/operators/tap';import { Category } from '../../admin/master/categories/api/category';
import { LoadStockEntries } from '../actions/pos-Stock.action';
import { SET_POS_STOCK_ORDERBY, SET_POS_STOCK_ORDERDIR } from '../model/pos-stock-state';
import { StockApiIndexParams } from '../model/pos-stock-state-model';
;
@State<PosCategoryState>({
  name: 'CATEGORY',
  defaults: POS_CATEGORY_STATE_MODEL_DEFAULTS,
})

export class PosCateoriesState {
  constructor(private api: ApiPosService,private store:Store) { }
  @Selector()
  static entries(state: PosCategoryState) {
    return state.data;
  }

  @Selector()
  static category(state: PosCategoryState) {
    return state.category;
  }
  @Selector()
  static entriesEmpty(state: PosCategoryState) {
    // only return true if entries have already loaded
    return state.meta.current_page && !state.loading && state.data.length === 0;
  }
  @Selector()
  static meta(state: PosCategoryState) {
    return state.meta;
  }


  @Selector()
  static loading(state: PosCategoryState) {
    return state.loading;
  }
  @Selector()
  static currentPage(state: PosCategoryState) {
    return state.meta.current_page;
  }

  @Selector()
  static sortColumn(state: PosCategoryState) {
    return state.meta.sort_column;
  }
  @Selector()
  static sortDirection(state: PosCategoryState) {
    return state.meta.sort_direction;
  }
  @Selector()
  static canLoadMoreEntries(state: PosCategoryState) {
    return state.meta.current_page < state.meta.last_page;
  }
  private transformQueryParams(params: CategoriesApiIndexParams): CategoriesApiIndexParams {
    const meta = this.store.selectSnapshot(PosCateoriesState.meta);
    const queryParams = {
      order_by: meta.sort_column,
      order_dir: meta.sort_direction,
      ...params
    };
    if (meta.query)
      queryParams.query = meta.query;
    if (meta.type)
      queryParams.type = meta.type;
    return queryParams;
  }

  @Action(LoadCategoriesEntries)
  @Action(LoadMoreCategoriesEntries)
  loadCategoriesEntries(ctx: StateContext<PosCategoryState>, action: LoadCategoriesEntriesAction) {
    const oldState = ctx.getState(), newState = { loading: true, meta: { ...oldState.meta } } as Partial<PosCategoryState>;
    newState.meta.sort_column = action.queryParams.order_by ;
    newState.meta.sort_direction = action.queryParams.order_dir;
   // if it's not search page, clear type and query
    newState.meta.query = action.queryParams.query || newState.meta.query;
    newState.meta.type = action.queryParams.type || newState.meta.type;
    ctx.patchState(newState);
    const params = this.transformQueryParams({
      ...action.queryParams
    });
    return this.api.getCategoriesEntries(params).pipe(tap(response => {
      const entries = action.loadMore ? oldState.data : [];
      const state = {
        data: this.removeDups(entries.concat(response.data)),
        meta: {
          ...newState.meta,
          last_page: response.last_page,
          current_page: response.current_page,
          from:response.from,
          to:response.to,
          total: response.total,
          per_page: response.per_page,
          path: response.path,
          next_page_url: response.next_page_url,
          prev_page_url:response.prev_page_url
        },
        loading: false
      } as Partial<PosCategoryState>;

      return ctx.patchState(state);
    }, () => {
      return ctx.patchState({ loading: false });
    }));
  }

  @Action(ClosePosCategory)
  closePosCategory(ctx: StateContext<PosCategoryState>) {
    const currentState= ctx.getState();
    currentState.category=null;
    ctx.patchState(currentState as Partial<PosCategoryState>);
  }
  @Action(OpenPosCategory)
  openPosCategory(ctx: StateContext<PosCategoryState>, action:CategoryIdAction) {
    const currentState= ctx.getState();
    ctx.patchState({ loading: true });

    if (currentState.data.length > 0){
      currentState.category=currentState.data.find(category=>category.id==action.categoryId);
      currentState.loading=false;
         ctx.patchState(currentState as Partial<PosCategoryState>);

         return this.store.dispatch(new LoadStockEntries(
          {
             order_by:SET_POS_STOCK_ORDERBY?SET_POS_STOCK_ORDERBY:'updated_at',
             order_dir: SET_POS_STOCK_ORDERDIR?SET_POS_STOCK_ORDERDIR:'desc',
             categoryId:  action.categoryId,
             customerTypeId:action.customerTypeId,
             query: null,
             type: null,
             per_page: 35,
             page: 0
             } as Partial<StockApiIndexParams>
          ));
    }else{
      return this.api.showCategoriesEntries(action.categoryId).pipe(tap(response => {
          currentState.category=response as Category;
          currentState.loading=false;
         ctx.patchState(currentState as Partial<PosCategoryState>);
         return this.store.dispatch(new LoadStockEntries(
         {
            order_by:SET_POS_STOCK_ORDERBY?SET_POS_STOCK_ORDERBY:'updated_at',
            order_dir: SET_POS_STOCK_ORDERDIR?SET_POS_STOCK_ORDERDIR:'desc',
            categoryId:  action.categoryId,
            customerTypeId:action.customerTypeId,
            query: null,
            type: null,
            per_page: 35,
            page: 0
            } as Partial<StockApiIndexParams>
         ));
      }, () => {
        return ctx.patchState({ loading: false });
      }));
    }

  }

  removeDups(data: Category[]=[]) {
      let obj = {};
      data = Object.keys(data.reduce((prev, next) => {
        if (!obj[next.id]) obj[next.id] = next;
        return obj;
      }, obj)).map((i) => obj[i]);
      return data.reverse();
    };
 }
