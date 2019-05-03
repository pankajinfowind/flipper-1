import { Component, OnInit, ViewChild, ViewEncapsulation, Input } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { BehaviorSubject, Observable } from 'rxjs';
import { UrlAwarePaginator } from '../../common/pagination/url-aware-paginator.service';
import { ApiStockService } from '../api/api.service';
import { Modal } from '../../common/core/ui/dialogs/modal.service';
import { finalize } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../common/core/ui/confirm-modal/confirm-modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Select, Store } from '@ngxs/store';
import { PosStockExpiredStates } from '../../store/states/PosStockExpiredStates';
import { StockExpired } from '../expired-stock/api/expired-stock';
import { LoadStockExpiredEntries } from '../../store/actions/pos-Stock-Expired.action';
import { StockApiIndexParams } from '../../store/model/pos-stock-expired-state-model';
import { SelectionModel } from '@angular/cdk/collections';
import { LocalStorage } from '../../common/core/services/local-storage.service';

@Component({
  selector: 'app-display-expired-stock-by-period',
  templateUrl: './display-expired-stock-by-period.component.html',
  styleUrls: ['./display-expired-stock-by-period.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DisplayExpiredStockByPeriodComponent implements OnInit {

//entries
@ViewChild(MatSort) matSort: MatSort;
public dataSource=new MatTableDataSource<StockExpired>([]);
public loading = new BehaviorSubject(false);

@Select(PosStockExpiredStates.loading) loading$: Observable<boolean>;
@Select(PosStockExpiredStates.meta) meta$: Observable<any>;
@Select(PosStockExpiredStates.entriesEmpty) entriesEmpty$: Observable<boolean>;
@Select(PosStockExpiredStates.entries) entries$: Observable<StockExpired>;

displayedColumns = ['batch_no','sku','item', 'in_qty', 'out_qty','total_qty','expired_date','manufacture_date'];

selection = new SelectionModel<StockExpired>(true, []);
constructor(private api:ApiStockService,private modal: Modal) {}


  ngOnInit() {
    this.entries$.subscribe(e=>console.log(e));
}




public deleteSelectedStocks() {
  const ids = this.selection.selected.map(item=>item.id);
  this.loading.next(true);
  this.api.deleteMultipleStockMovement(ids).pipe(finalize(() => this.loading.next(false))).subscribe(() => {
      this.selection.clear();

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
