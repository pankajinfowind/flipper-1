import { Component, OnInit, OnDestroy, ViewChild, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material';
import { PaginatedDataTableSource } from '../../../data-table/data/paginated-data-table-source';
import { UrlAwarePaginator } from '../../../common/pagination/url-aware-paginator.service';
import { Modal } from '../../../common/core/ui/dialogs/modal.service';
import { ApiReasonService } from '../api/api.service';
import { ConfirmModalComponent } from '../../../common/core/ui/confirm-modal/confirm-modal.component';
import { Reason } from '../api/reason';
import { CrupdateReasonModalComponent } from '../crupdate-reason-modal/crupdate-reason-modal.component';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { GlobalVariables } from '../../../common/core/global-variables';

@Component({
  selector: 'reason-data-table',
  templateUrl: './reason-data-table.component.html',
  styleUrls: ['./reason-data-table.component.scss'],
  providers: [UrlAwarePaginator],
  encapsulation: ViewEncapsulation.None,
})
export class ReasonDataTableComponent  implements OnInit, OnDestroy {
  @ViewChild(MatSort,{static:true}) matSort: MatSort;
  public dataSource: PaginatedDataTableSource<Reason>;
  @Input() public reasonName: string='Reason';
  @Input() public reasonType: string='stock_movements';
  @Input() public url: string='reason';
  public loading = new BehaviorSubject(false);
  @Input() public enableSelectButton:boolean=false;
  @Input() public selectedId:number=0;

  @Output() valueChange = new EventEmitter<Reason>();

   constructor(public v: GlobalVariables,public paginator: UrlAwarePaginator,private modal: Modal,private api:ApiReasonService) {

  }
   ngOnInit() {
    if(!this.enableSelectButton){
    this.v.webTitle('Manage Reasons');
    }
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
     * Delete currently selected users.
     */
    public deleteSelectedReasons() {
      const ids = this.dataSource.selectedRows.selected.map(cat => cat.id);
      this.loading.next(true);
      this.api.deleteMultiple(ids).pipe(finalize(() => this.loading.next(false))).subscribe(() => {
          this.paginator.refresh();
          this.dataSource.selectedRows.clear();
      });
  }
 /**
     * Ask user to confirm deletion of selected tags
     * and delete selected tags if user confirms.
     */
    public maybeDeleteSelectedReasons() {
      this.modal.show(ConfirmModalComponent, {
          title: 'Delete '+this.reasonName,
          body:  'Are you sure you want to delete selected Reason(s)?',
          ok:    'Delete'
      }).afterClosed().subscribe(confirmed => {
          if ( ! confirmed) return;
          this.deleteSelectedReasons();
      });
  }

    /**
     * Show modal for editing user if user is specified
     * or for creating a new user otherwise.
     */
    public showCrupdateReasonModal(reason?: Reason) {

      this.modal.open(
        CrupdateReasonModalComponent,
          {reason:reason,reasonType:this.reasonType,reasonName:this.reasonName},
          'crupdate-reason-modal-container'
      ).beforeClose().subscribe(data => {
          if ( ! data) return;
          this.paginator.refresh();
      });
  }

  selectReason(reason:Reason){
    return this.valueChange.emit(reason);
  }
}
