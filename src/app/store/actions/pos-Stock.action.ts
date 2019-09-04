import { Stock } from '../../stock/api/stock';
import { StockApiIndexParams } from '../model/pos-stock-state-model';

export class LoadStockEntries implements LoadStockEntriesAction{
  static readonly type = '[STOCK] Load Stock Entries';
  constructor(public queryParams: StockApiIndexParams = {}){ }
}

export class LoadMoreStockEntries implements LoadStockEntriesAction{
  static readonly type = '[STOCK] Load More Stock Entries';
  public loadMore = true;
  constructor(public queryParams: StockApiIndexParams = {}){

    }
}
export class LoadSearchableStockEntries implements LoadStockEntriesAction{
  static readonly type = '[STOCK] Load Searchable Stock Entries';

  constructor(public queryParams: StockApiIndexParams = {}){

    }
}

export class OpenPosStock implements StockIdAction{
  static readonly type = '[STOCK] Open Stock Entries';
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
