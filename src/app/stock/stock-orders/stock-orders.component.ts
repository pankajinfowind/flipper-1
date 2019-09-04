import { Component, OnInit, ViewEncapsulation, OnDestroy, ViewChild, EventEmitter } from '@angular/core';
import { UrlAwarePaginator } from '../../common/pagination/url-aware-paginator.service';
import { GlobalVariables } from '../../common/core/global-variables';
import { Modal } from '../../common/core/ui/dialogs/modal.service';
import { ApiStockService } from '../api/api.service';
import { MatSort } from '@angular/material';
import { PaginatedDataTableSource } from '../../data-table/data/paginated-data-table-source';
import { Stock } from '../api/stock';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../common/core/ui/confirm-modal/confirm-modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Orders } from '../../orders/orders';
import { CurrentUser } from '../../common/auth/current-user';
export interface SelectorBox {
  value: string;
  viewValue?: string;
}
@Component({
  selector: 'app-stock-orders',
  templateUrl: './stock-orders.component.html',
  styleUrls: ['./stock-orders.component.scss'],
  providers: [UrlAwarePaginator],
  encapsulation: ViewEncapsulation.None,
})
export class StockOrdersComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, {static:true}) matSort: MatSort;
  public dataSource: PaginatedDataTableSource<Orders>;
  public loading = new BehaviorSubject(false);
  cart: EventEmitter<Stock> = new EventEmitter();
  orderTypes: SelectorBox[] =  [
    {value: 'Open',viewValue:'Open orders'},
    {value: 'All',viewValue:'All Orders'},
    {value: 'Sent',viewValue:'Sent Orders'},
    {value: 'Sold',viewValue:'Sold Orders'},
    {value: 'Overdue',viewValue:'Overdue Orders'},
    {value: 'Received',viewValue:'Received Orders'},
    
  ];
  dataForm: FormGroup;
  constructor(public currentUser: CurrentUser,public v: GlobalVariables,public paginator: UrlAwarePaginator,private api:ApiStockService,private modal: Modal) {

  }

  ngOnInit() {
    this.v.webTitle('Manage Stock Orders');

    this.dataForm = new FormGroup({
      status:new FormControl('Open', [Validators.required]),
      dateFrom: new FormControl(''),
      dateTo:new FormControl('')
    });

    this.dataSource = new PaginatedDataTableSource<Orders>({
      uri: "stock-order",
      dataPaginator: this.paginator,
      matSort: this.matSort,
      staticParams:{branch_id:parseInt(localStorage.getItem('active_branch'))}
  });


  }
  get dateFrom() {
    return this.dataForm.get("dateFrom");
  }
  get dateTo() {
    return this.dataForm.get("dateTo");
  }
  get status(){
    return this.dataForm.get("status");
  }
  ngOnDestroy() {
    this.paginator.destroy();
  }

  total(data, arg) {
    var total = 0;
    if (data.length > 0) {
      for (var i = 0, _len = data.length; i < _len; i++) {
        total += data[i][arg];
      }
    }

    return total;

  }
  orderParams(event?,isSelectBox=false){
    const params={dateFrom:null,dateTo:null,status};
    if(isSelectBox && event.isUserInput) {
      this.dataForm.value.status=event.source.value;
      params.dateFrom= this.dataForm.value.dateFrom?this.dataForm.value.dateFrom.getDate() + "-" + (this.dataForm.value.dateFrom.getMonth() + 1) + "-" + this.dataForm.value.dateFrom.getFullYear():null;
      params.dateTo= this.dataForm.value.dateTo?this.dataForm.value.dateTo.getDate() + "-" + (this.dataForm.value.dateTo.getMonth() + 1) + "-" + this.dataForm.value.dateTo.getFullYear():null;
      params.status=this.dataForm.value.status;
      this.dataSource.setParams(params);
    }else{
      params.dateFrom= this.dataForm.value.dateFrom?this.dataForm.value.dateFrom.getDate() + "-" + (this.dataForm.value.dateFrom.getMonth() + 1) + "-" + this.dataForm.value.dateFrom.getFullYear():null;
      params.dateTo= this.dataForm.value.dateTo?this.dataForm.value.dateTo.getDate() + "-" + (this.dataForm.value.dateTo.getMonth() + 1) + "-" + this.dataForm.value.dateTo.getFullYear():null;
      params.status=this.dataForm.value.status;
      this.dataSource.setParams(params);
    }
     
  }
  /**
     * Delete currently selected users.
     */
    public deleteSelectedOrders() {
      const ids = this.dataSource.selectedRows.selected.map(item => item.id);
      this.loading.next(true);
      this.api.deleteMultiple(ids).pipe(finalize(() => this.loading.next(false))).subscribe(() => {
          this.paginator.refresh();
          this.dataSource.selectedRows.clear();
      });
  }
  public maybeDeleteSelectedOrders() {
    this.modal.show(ConfirmModalComponent, {
        title: 'Delete Stock(s)',
        body:  'Are you sure you want to delete selected orders',
        ok:    'Delete'
    }).afterClosed().subscribe(confirmed => {
        if ( ! confirmed) return;
        this.deleteSelectedOrders();
    });
}
}
