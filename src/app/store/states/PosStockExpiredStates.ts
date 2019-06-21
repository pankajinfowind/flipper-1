 import { Action, Selector, State, StateContext, Store } from '@ngxs/store';

import { tap } from 'rxjs/internal/operators/tap';
import { StockApiIndexParams } from '../model/pos-stock-state-model';
import { PosStockExpiredState } from '../model/pos-stock-expired-state-model';
import { PosStockStates } from './PosStockStates';
import { POS_STOCK_EXPIRED_STATE_MODEL_DEFAULTS } from '../model/pos-stock-expired-state';
import { LoadStockExpiredEntries, LoadMoreStockExpiredEntries, LoadStockEntriesAction } from '../actions/pos-Stock-Expired.action';
import { ApiExpiredItemService } from '../../stock/expired-stock/api/api.service';
import { StockExpired } from '../../stock/expired-stock/api/expired-stock';

@State<PosStockExpiredState>({
  name: 'STOCKEXPIRED',
  defaults: POS_STOCK_EXPIRED_STATE_MODEL_DEFAULTS,
})

export class PosStockExpiredStates {
  constructor(private api: ApiExpiredItemService,private store:Store) { }
  @Selector()
  static entries(state: PosStockExpiredState) {
    return state.data;
  }

  @Selector()
  static selectedStock(state: PosStockExpiredState) {
    return state.stock;
  }
  @Selector()
  static entriesEmpty(state: PosStockExpiredState) {
    // only return true if entries have already loaded
    return state.meta.current_page && !state.loading && state.data.length === 0;
  }
  @Selector()
  static meta(state: PosStockExpiredState) {
    return state.meta;
  }


  @Selector()
  static loading(state: PosStockExpiredState) {
    return state.loading;
  }
  @Selector()
  static currentPage(state: PosStockExpiredState) {
    return state.meta.current_page;
  }
  static nextPageUrl(state: PosStockExpiredState) {
    return state.meta.next_page_url;
  }

  @Selector()
  static sortColumn(state: PosStockExpiredState) {
    return state.meta.sort_column;
  }
  @Selector()
  static sortDirection(state: PosStockExpiredState) {
    return state.meta.sort_direction;
  }
  @Selector()
  static canLoadMoreEntries(state: PosStockExpiredState) {
    return state.meta.current_page < state.meta.last_page;
  }
  private transformQueryParams(params: StockApiIndexParams): StockApiIndexParams {
    const meta = this.store.selectSnapshot(PosStockExpiredStates.meta);
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

  @Action(LoadStockExpiredEntries)
  @Action(LoadMoreStockExpiredEntries)
  loadStockExpiredEntries(ctx: StateContext<PosStockExpiredState>, action: LoadStockEntriesAction) {
    const oldState = ctx.getState(), newState = { loading: true, meta: { ...oldState.meta } } as Partial<PosStockExpiredState>;
    newState.meta.sort_column = action.queryParams.order_by ;
    newState.meta.sort_direction = action.queryParams.order_dir;
   // if it's not search page, clear type and query
    newState.meta.query = action.queryParams.query || newState.meta.query;
    newState.meta.type = action.queryParams.type || newState.meta.type;
    ctx.patchState(newState);
    const params = this.transformQueryParams({
      ...action.queryParams
    });
    return this.api.get(params).pipe(tap(response => {
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
      } as Partial<PosStockExpiredState>;

      return ctx.patchState(state);
    }, () => {
      return ctx.patchState({ loading: false });
    }));
  }
  removeDups(data: StockExpired[]=[]) {
    let obj = {};
    data = Object.keys(data.reduce((prev, next) => {
      if (!obj[next.id]) obj[next.id] = next;
      return obj;
    }, obj)).map((i) => obj[i]);
    return data.reverse();
  };

 }
