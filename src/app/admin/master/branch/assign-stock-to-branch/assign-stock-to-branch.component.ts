import { Component, OnInit, ViewEncapsulation, Inject, ViewChild, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Branch } from '../api/branch';
import { MatDialogRef, MAT_DIALOG_DATA, MatSort } from '@angular/material';
import { Toast } from '../../../../common/core/ui/toast.service';
import { UrlAwarePaginator } from '../../../../common/pagination/url-aware-paginator.service';
import { PaginatedDataTableSource } from '../../../../data-table/data/paginated-data-table-source';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ApiStockService } from '../../../../stock/api/api.service';
export interface CrupdatBranchModalData {
  branch?: Branch;
}
@Component({
  selector: 'assign-stock-to-branch',
  templateUrl: './assign-stock-to-branch.component.html',
  styleUrls: ['./assign-stock-to-branch.component.scss'],
  providers: [UrlAwarePaginator],
  encapsulation: ViewEncapsulation.None,
})
export class AssignStockToBranchComponent implements OnInit,OnDestroy {
  @ViewChild(MatSort, {static:true}) matSort: MatSort;
  @Input() public enableSelectButton:boolean=false;
  @Input() public selectedId:number=0;

  @Output() valueChange = new EventEmitter<any>();
  public dataSource: PaginatedDataTableSource<any>;
  public loading = new BehaviorSubject(false);
  
  constructor(public paginator: UrlAwarePaginator, private dialogRef: MatDialogRef<AssignStockToBranchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CrupdatBranchModalData,
    private api:ApiStockService,
    private toast: Toast) { }

  ngOnInit() {
    this.dataSource = new PaginatedDataTableSource<any>({
      uri: 'list-stock-not-in-branch/'+this.data.branch.branch_id,
      dataPaginator: this.paginator,
      matSort: this.matSort
  });
  }
  ngOnDestroy() {
    this.paginator.destroy();
  }
  maybeAttachSelectedItems(){
    const items = this.dataSource.selectedRows.selected.map(item => item);
    const params:Array<{item_id:number,branch_id:number,category_id:number}>=[];
    if(items.length == 0){
      return;
    }
    items.forEach(el => {
      params.push({item_id:el.item.id,branch_id:this.data.branch.branch_id,category_id:el.category.id});
    });

    this.loading.next(true);
    this.api.createStockOnBranch(params).pipe(finalize(() => this.loading.next(false))).subscribe(data => {
      if(data){
        this.paginator.refresh();
        this.dataSource.selectedRows.clear();
      }
      
    });

  }
   /**
     * Close the modal.
     */
    public close(data?: any) {
      this.dialogRef.close(data);
  }
}
