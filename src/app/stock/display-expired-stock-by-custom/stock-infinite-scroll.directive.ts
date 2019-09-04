import { Directive, ElementRef } from '@angular/core';
import { InfiniteScroll } from '../../common/core/ui/infinite-scroll/infinite.scroll';
import { Store } from '@ngxs/store';
import { LocalStorage } from '../../common/core/services/local-storage.service';
import { PosStockExpiredStates } from '../../store/states/PosStockExpiredStates';
import { LoadMoreStockExpiredEntries } from '../../store/actions/pos-Stock-Expired.action';

@Directive({
  selector: '[stockInfiniteScroll]'
})
export class StockInfiniteScrollDirective extends InfiniteScroll {
  constructor(
      protected el: ElementRef,
      protected store: Store,
      private localStorage: LocalStorage
  ) {

      super();
  }


  protected loadMoreItems() {

      const page = this.store.selectSnapshot(PosStockExpiredStates.currentPage) + 1;
      this.store.dispatch(new LoadMoreStockExpiredEntries({page}));

  }

  protected isLoading(): boolean {
      return this.store.selectSnapshot(PosStockExpiredStates.loading);


  }

  protected canLoadMore(): boolean {
      return this.store.selectSnapshot(PosStockExpiredStates.canLoadMoreEntries);

  }
}
