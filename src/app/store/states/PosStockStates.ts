import { ApiPosService } from '../../pos/api/api.service';
 import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { tap } from 'rxjs/internal/operators/tap';
import { POS_STOCK_STATE_MODEL_DEFAULTS } from '../model/pos-stock-state';
import { LoadStockEntries, LoadMoreStockEntries, LoadStockEntriesAction } from '../actions/pos-Stock.action';
import { PosStockState, StockApiIndexParams } from '../model/pos-stock-state-model';
import { Stock } from '../../stock/api/stock';

@State<PosStockState>({
  name: 'STOCK',
  defaults: POS_STOCK_STATE_MODEL_DEFAULTS,
})

export class PosStockStates {
  constructor(private api: ApiPosService,private store:Store) { }
  @Selector()
  static entries(state: PosStockState) {
    return state.data;
  }


  @Selector()
  static selectedStock(state: PosStockState) {
    return state.stock;
  }
  @Selector()
  static entriesEmpty(state: PosStockState) {
    // only return true if entries have already loaded
    return state.meta.current_page && !state.loading && state.data.length === 0;
  }
  @Selector()
  static meta(state: PosStockState) {
    return state.meta;
  }


  @Selector()
  static loading(state: PosStockState) {
    return state.loading;
  }
  @Selector()
  static currentPage(state: PosStockState) {
    return state.meta.current_page;
  }

  @Selector()
  static sortColumn(state: PosStockState) {
    return state.meta.sort_column;
  }
  @Selector()
  static sortDirection(state: PosStockState) {
    return state.meta.sort_direction;
  }
  @Selector()
  static canLoadMoreEntries(state: PosStockState) {
    return state.meta.current_page < state.meta.last_page;
  }
  private transformQueryParams(params: StockApiIndexParams): StockApiIndexParams {
    const meta = this.store.selectSnapshot(PosStockStates.meta);
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

  @Action(LoadStockEntries)
  @Action(LoadMoreStockEntries)
  loadStockEntries(ctx: StateContext<PosStockState>, action: LoadStockEntriesAction) {
    const oldState = ctx.getState(), newState = { loading: true, meta: { ...oldState.meta } } as Partial<PosStockState>;
    newState.meta.sort_column = action.queryParams.order_by ;
    newState.meta.sort_direction = action.queryParams.order_dir;
   // if it's not search page, clear type and query
    newState.meta.query = action.queryParams.query || newState.meta.query;
    newState.meta.type = action.queryParams.type || newState.meta.type;
    ctx.patchState(newState);
    const params = this.transformQueryParams({
      ...action.queryParams
    });
    return this.api.getStockEntries(params).pipe(tap(response => {
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
      } as Partial<PosStockState>;

      return ctx.patchState(state);
    }, () => {
      return ctx.patchState({ loading: false });
    }));
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
