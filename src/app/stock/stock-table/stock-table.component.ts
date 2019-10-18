import { Component, OnInit, ViewChild, EventEmitter, Input, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Stock } from '../api/stock';
import { MatSort } from '@angular/material';

import { DetailsService } from '../../details/details.service';
import { UrlAwarePaginator } from '../../common/pagination/url-aware-paginator.service';
import { PaginatedDataTableSource } from '../../data-table/data/paginated-data-table-source';
import { ApiStockService } from '../api/api.service';
import { Modal } from '../../common/core/ui/dialogs/modal.service';
import { ConfirmModalComponent } from '../../common/core/ui/confirm-modal/confirm-modal.component';
import{SharedModelService} from "../../shared-model/shared-model-service";
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GlobalVariables } from '../../common/core/global-variables';
import { StockButtonModelComponent } from '../stock-model/stock-button-model/stock-button-model.component';
import { AppConfig } from '../../../environments/environment';
export interface SelectorBox {
  value: string;
  viewValue?: string;
}
@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss'],
  providers: [UrlAwarePaginator],
  encapsulation: ViewEncapsulation.None,
})
export class StockTableComponent implements OnInit,OnDestroy {
  @ViewChild(MatSort, {static:true}) matSort: MatSort;
  public dataSource: PaginatedDataTableSource<Stock>;
  public loading = new BehaviorSubject(false);
  cart: EventEmitter<Stock> = new EventEmitter();
  stockTypes: SelectorBox[] =  [
    {value: 'stockout',viewValue:'Stock Out'},
    {value: 'available',viewValue:'Current Stock'},
    {value: 'lowerstock',viewValue:'Lower Stock'}
  ];
  default_status='stockout';
  constructor(public v: GlobalVariables,public shared:SharedModelService,public paginator: UrlAwarePaginator,private detailsService:DetailsService,private api:ApiStockService,private modal: Modal) {

  }
  upc_tool_tips="The Universal Product Code is a unique and standard identifier typically shown under the bar code symbol on retail packaging in the United States.";
  sku_tool_tips="The Stock Keeping Unit  is a unique identifier defined by your company. For example, your company may assign a gallon of Tropicana orange juice a SKU of TROPOJ100. Most times, the SKU is represented by the manufacturer’s UPC";

  @Input() title: string='Manage Stock';
  @Input() url:string;
  warn = 'warn';accent='accent';primary='primary';mode = 'determinate';

  ngOnInit() {
    this.v.webTitle(this.title);
      this.dataSource = new PaginatedDataTableSource<Stock>({
        uri: "stock",
        dataPaginator: this.paginator,
        matSort: this.matSort,
        staticParams:{branch_id:parseInt(localStorage.getItem('active_branch'))}
    });
    this.viewUpCommingData();
  }

  ngOnDestroy() {
    this.paginator.destroy();
  }

  stockParams(event?){
    if(event.isUserInput) {
      this.default_status=event.source.value;
      this.dataSource.setParams({status:event.source.value});
    }
 
  }

  export(){
   // let q=this.dataSource.searchQuery?'&query='+this.dataSource.searchQuery:'';
    return this.v.downloadFile(AppConfig.url+"/secure/export-stock-control?&branch_id="+parseInt(localStorage.getItem('active_branch'))+"&status="+this.default_status);
  }
  viewUpCommingData(){
    this.detailsService.details$.subscribe(response=>{
      if(response.receriver_data){
        this.paginator.refresh();
        const g=this.detailsService.get();
        g.receriver_data=null;
        this.detailsService.update(g);
      }
    })

    }
  percentage(num,num1) {
      let sum=Math.round(parseInt(num) *100)/parseInt(num1);
    return isNaN(sum)?0:sum.toFixed(1);
}



  openOperationBtn(stock:Stock){
  this.modal.open(
    StockButtonModelComponent,
      {stock:stock?stock:null,
    },
      'select-reason-modal'
  ).beforeClose().subscribe(data => {
      if ( ! data) return;
      this.paginator.refresh();
  });
 }
 /**
     * Delete currently selected users.
     */
    public deleteSelectedStocks() {
      const ids = this.dataSource.selectedRows.selected.map(item => item.id);
      this.loading.next(true);
      this.api.deleteMultiple(ids).pipe(finalize(() => this.loading.next(false))).subscribe(() => {
          this.paginator.refresh();
          this.dataSource.selectedRows.clear();
      });
  }
  public maybeDeleteSelectedStocks() {
    this.modal.show(ConfirmModalComponent, {
        title: 'Delete Stock(s)',
        body:  'Are you sure you want to delete selected stock(s)? the stock movements(in and out stock) related will be deleted too! ',
        ok:    'Delete'
    }).afterClosed().subscribe(confirmed => {
        if ( ! confirmed) return;
        this.deleteSelectedStocks();
    });
}
}


