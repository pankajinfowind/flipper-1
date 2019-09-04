import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy, Input, ChangeDetectorRef } from '@angular/core';
import {BehaviorSubject } from 'rxjs';
import { MatSort } from '@angular/material';
import { UrlAwarePaginator } from '../../common/pagination/url-aware-paginator.service';
import { PaginatedDataTableSource } from '../../data-table/data/paginated-data-table-source';
import { StockMovements } from '../api/stock';
import { Modal } from '../../common/core/ui/dialogs/modal.service';
import { ApiStockService } from '../api/api.service';
import { finalize } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../common/core/ui/confirm-modal/confirm-modal.component';

@Component({
  selector: 'app-diplay-expired-stock',
  templateUrl: './diplay-expired-stock.component.html',
  styleUrls: ['./diplay-expired-stock.component.scss'],
  providers: [UrlAwarePaginator],
  encapsulation: ViewEncapsulation.None
})
export class DiplayExpiredStockComponent implements OnInit,OnDestroy {
//entries
@ViewChild(MatSort, {static:true}) matSort: MatSort;
public dataSource: PaginatedDataTableSource<StockMovements>;
public loading = new BehaviorSubject(false);

@Input() type: string='all';
@Input() url:string;
constructor(private cd: ChangeDetectorRef,public paginator: UrlAwarePaginator,private api:ApiStockService,private modal: Modal) {}


  ngOnInit() {
        this.dataSource = new PaginatedDataTableSource<StockMovements>({
          uri: this.url,
          dataPaginator: this.paginator,
          matSort: this.matSort
      });
      this.cd.detectChanges();
}

ngOnDestroy() {
  this.paginator.destroy();
}
public deleteSelectedStocks() {
  const ids = this.dataSource.selectedRows.selected.map(item => item.id);
  this.loading.next(true);
  this.api.deleteMultipleStockMovement(ids).pipe(finalize(() => this.loading.next(false))).subscribe(() => {
      this.paginator.refresh();
      this.dataSource.selectedRows.clear();
  });
}
public maybeDeleteSelectedStocks() {
this.modal.show(ConfirmModalComponent, {
    title: 'Delete Stock Expired',
    body:  'Are you sure you want to delete selected stock expired?',
    ok:    'Delete'
}).afterClosed().subscribe(confirmed => {
    if ( ! confirmed) return;
    this.deleteSelectedStocks();
});
}
}
