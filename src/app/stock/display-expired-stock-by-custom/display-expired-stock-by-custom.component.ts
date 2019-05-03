import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
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
  selector: 'app-display-expired-stock-by-custom',
  templateUrl: './display-expired-stock-by-custom.component.html',
  styleUrls: ['./display-expired-stock-by-custom.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DisplayExpiredStockByCustomComponent implements OnInit {

//entries
@ViewChild(MatSort) matSort: MatSort;
public dataSource=new MatTableDataSource<StockExpired>([]);
public loading = new BehaviorSubject(false);
searchForm: FormGroup;
@Select(PosStockExpiredStates.loading) loading$: Observable<boolean>;
@Select(PosStockExpiredStates.entries) entries$: Observable<StockExpired>;
@Select(PosStockExpiredStates.meta) meta$: Observable<any>;
@Select(PosStockExpiredStates.entriesEmpty) entriesEmpty$: Observable<boolean>;

displayedColumns = ['batch_no','sku', 'item', 'in_qty', 'out_qty','total_qty','expired_date','manufacture_date'];

selection = new SelectionModel<StockExpired>(true, []);
constructor(private localStorage: LocalStorage,private store:Store,private api:ApiStockService,private modal: Modal) {}
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: StockExpired): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.batch_no + 1}`;
  }


  ngOnInit() {
        this.loadingSearchForm();
        this.loadData();
}
loadData(){
  this.localStorage.set('stockExpiredUrl',"expired_item/custom/"+parseInt(localStorage.getItem('active_branch'))+'/'+this.searchForm.value.from+'/'+this.searchForm.value.to);
  this.store.dispatch(new LoadStockExpiredEntries());

}
loadingSearchForm(){
  this.searchForm = new FormGroup({
    from: new FormControl(new Date(), [Validators.required]),
    to:new FormControl(new Date(), [Validators.required])
  });
}
get from() {
  return this.searchForm.get("from");
}
get to() {
  return this.searchForm.get("to");
}

viewExpiredBySearch(){
  if (this.searchForm.valid) {
   this.loadData();

  }
}


public deleteSelectedStocks() {
  const ids = this.selection.selected.map(item=>item.id);
  this.loading.next(true);
  this.api.deleteMultipleStockMovement(ids).pipe(finalize(() => this.loading.next(false))).subscribe(() => {
      this.selection.clear();
      this.loadData();

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
