import { ApiPosService } from '../../pos/api/api.service';
 import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { tap } from 'rxjs/internal/operators/tap';
import { LoadStockEntriesAction, LoadSearchableStockEntries } from '../actions/pos-Stock.action';
import { PosSearchStockState, StockApiIndexParams } from '../model/pos-search-stock-state-model';
import { POS_SEARCH_STOCK_STATE_MODEL_DEFAULTS } from '../model/pos-search-stock-state';
import { Stock } from '../../stock/api/stock';

@State<PosSearchStockState>({
  name: 'STOCKSEARCH',
  defaults: POS_SEARCH_STOCK_STATE_MODEL_DEFAULTS,
})

export class PosSearchStockStates {
  constructor(private api: ApiPosService,private store:Store) { }
  @Selector()
  static entries(state: PosSearchStockState) {
    return state.data;
  }


  @Selector()
  static selectedStock(state: PosSearchStockState) {
    return state.stock;
  }
  @Selector()
  static entriesEmpty(state: PosSearchStockState) {
    // only return true if entries have already loaded
    return state.meta.current_page && !state.loading && state.data.length === 0;
  }
  @Selector()
  static meta(state: PosSearchStockState) {
    return state.meta;
  }


  @Selector()
  static loading(state: PosSearchStockState) {
    return state.loading;
  }
  @Selector()
  static currentPage(state: PosSearchStockState) {
    return state.meta.current_page;
  }

  @Selector()
  static sortColumn(state: PosSearchStockState) {
    return state.meta.sort_column;
  }
  @Selector()
  static sortDirection(state: PosSearchStockState) {
    return state.meta.sort_direction;
  }
  @Selector()
  static canLoadMoreEntries(state: PosSearchStockState) {
    return state.meta.current_page < state.meta.last_page;
  }
  private transformQueryParams(params: StockApiIndexParams): StockApiIndexParams {
    const meta = this.store.selectSnapshot(PosSearchStockStates.meta);
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


@Action(LoadSearchableStockEntries)
loadSearchabletockEntries(ctx: StateContext<PosSearchStockState>, action: LoadStockEntriesAction) {
  const oldState = ctx.getState(), newState = { loading: true, meta: { ...oldState.meta } } as Partial<PosSearchStockState>;
  newState.meta.sort_column = action.queryParams.order_by ;
  newState.meta.sort_direction = action.queryParams.order_dir;
 // if it's not search page, clear type and query
  newState.meta.query = action.queryParams.query || newState.meta.query;
  newState.meta.type = action.queryParams.type || newState.meta.type;
  ctx.patchState(newState);
  const params = this.transformQueryParams({
    ...action.queryParams
  });

if(params.query){
  return this.api.searchStockEntries(params).pipe(tap(response => {
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
    } as Partial<PosSearchStockState>;

    return ctx.patchState(state);
  }, () => {
    return ctx.patchState({ loading: false });
  }));
}else{
  return this.api.getMostSoldStockEntries(params).pipe(tap(response => {
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
    } as Partial<PosSearchStockState>;

    return ctx.patchState(state);
  }, () => {
    return ctx.patchState({ loading: false });
  }));
}

}

removeDups(data: Stock[]=[]) {
  let obj = {};
  data = Object.keys(data.reduce((prev, next) => {
    if (!obj[next.id]) obj[next.id] = next;
    return obj;
  }, obj)).map((i) => obj[i]);
  return data.reverse();
};
 }
