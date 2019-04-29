import { Component, OnInit, ViewChild, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatSort, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PaginatedDataTableSource } from '../../../../data-table/data/paginated-data-table-source';
import { Reason } from '../../../../setup/reasons/api/reason';
import { BehaviorSubject } from 'rxjs';
import { UrlAwarePaginator } from '../../../../common/pagination/url-aware-paginator.service';
import { Modal } from '../../../../common/core/ui/dialogs/modal.service';
import { ApiReasonService } from '../../../../setup/reasons/api/api.service';

export interface enableSelectButtonModalData {
  enabled?: boolean;
  reason_id:number;
  reason_type:string;
  reason_name:string;
  url:string;
}
@Component({
  selector: 'app-select-reason-model',
  templateUrl: './select-reason-model.component.html',
  styleUrls: ['./select-reason-model.component.scss']
})
export class SelectReasonModelComponent implements OnInit {

  @ViewChild(MatSort) matSort: MatSort;
  public dataSource: PaginatedDataTableSource<Reason>;
  @Input() public reasonName: string='Reason';
  @Input() public reasonType: string='stock_movements';
  @Input() public url: string='reason';
  public loading = new BehaviorSubject(false);
  @Input() public selectedId:number=0;

  @Output() valueChange = new EventEmitter<Reason>();
  @Input() public enableSelectButton:boolean=false;

   constructor(public paginator: UrlAwarePaginator,private dialogRef: MatDialogRef<SelectReasonModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: enableSelectButtonModalData) { }
   ngOnInit() {
    this.enableSelectButton=this.data.enabled;
    this.selectedId=this.data.reason_id;
    this.reasonType=this.data.reason_type;
    this.reasonName=this.data.reason_name;
    this.url=this.data.url;

    this.dataSource = new PaginatedDataTableSource<Reason>({
        uri: this.url,
        dataPaginator: this.paginator,
        matSort: this.matSort
    });
  }
ngOnDestroy() {
  this.paginator.destroy();
}


    /**
     * Show modal for editing user if user is specified
     * or for creating a new user otherwise.
     */


  selectReason(reason:Reason){
    return this.close(reason);
  }
  public close(data?: any) {
    this.dialogRef.close(data);
}

}
