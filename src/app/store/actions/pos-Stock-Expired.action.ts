
import { Stock } from '../../stock/api/stock';
import { StockApiIndexParams } from '../model/pos-stock-expired-state-model';

export class LoadStockExpiredEntries implements LoadStockEntriesAction{
  static readonly type = '[STOCKEXPIRED] Load Stock Expired Entries';
  constructor(public queryParams: StockApiIndexParams = {}){ }
}

export class LoadMoreStockExpiredEntries implements LoadStockEntriesAction{
  static readonly type = '[STOCKEXPIRED] Load More Stock Expired Entries';
  public loadMore = true;
  constructor(public queryParams: StockApiIndexParams = {}){

    }
}

export class OpenPosStock implements StockIdAction{
  static readonly type = '[STOCKEXPIRED] Open Stock Entries';
  constructor(public itemId:null ){  }

}


export interface LoadStockEntriesAction {
  queryParams?: StockApiIndexParams;
  stock?: Stock;
  loadMore?: boolean;
  type?:string;
  itemId?:number;
}
export interface StockIdAction {
  itemId?:number;
}
