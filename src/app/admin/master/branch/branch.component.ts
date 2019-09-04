import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation, OnDestroy} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Branch } from './api/branch';
import { MatSort, MatDialog } from '@angular/material';
import { PaginatedDataTableSource } from '../../../data-table/data/paginated-data-table-source';
import { GlobalVariables } from '../../../common/core/global-variables';
import { UrlAwarePaginator } from '../../../common/pagination/url-aware-paginator.service';
import { Modal } from '../../../common/core/ui/dialogs/modal.service';
import { ApiBranchService } from './api/api.service';
import { finalize } from 'rxjs/operators';
import { CrupdateBranchModalComponent } from './crupdate-branch-modal/crupdate-branch-modal.component';
import { ConfirmModalComponent } from '../../../common/core/ui/confirm-modal/confirm-modal.component';
import { BranchUsersComponent } from '../../../settings/branch-users/branch-users.component';
import { AssignStockToBranchComponent } from './assign-stock-to-branch/assign-stock-to-branch.component';
import { Bootstrapper } from '../../../common/core/bootstrapper.service';
@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss'],
  providers: [UrlAwarePaginator],
  encapsulation: ViewEncapsulation.None,
})
export class BranchComponent implements OnInit,OnDestroy {

  @ViewChild(MatSort, {static:true}) matSort: MatSort;
  @Input() public enableSelectButton:boolean=false;
  @Input() public selectedId:number=0;

  @Output() valueChange = new EventEmitter<Branch>();
  public dataSource: PaginatedDataTableSource<Branch>;
  public loading = new BehaviorSubject(false);
  constructor(private bootstrapper: Bootstrapper,public v: GlobalVariables,public paginator: UrlAwarePaginator,private modal: Modal,private api:ApiBranchService) { }

  ngOnInit() {
    if(!this.enableSelectButton){
      this.v.webTitle('Manage Branches');
    }

    this.dataSource = new PaginatedDataTableSource<Branch>({
      uri: 'branch',
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
    public deleteSelectedBranchs() {
      const ids = this.dataSource.selectedRows.selected.map(branch => branch.branch_id);
      this.loading.next(true);
      this.api.deleteMultiple(ids).pipe(finalize(() => this.loading.next(false))).subscribe(response =>  {
        this.bootstrapper.bootstrap(response.data);
          this.paginator.refresh();
          this.dataSource.selectedRows.clear();
      });
  }
 /**
     * Ask user to confirm deletion of selected tags
     * and delete selected tags if user confirms.
     */
    public maybeDeleteSelectedBranchs() {
      this.modal.show(ConfirmModalComponent, {
          title: 'Delete Branch(s)',
          body:  'Are you sure you want to delete selected Branch(s)?',
          ok:    'Delete'
      }).afterClosed().subscribe(confirmed => {
          if ( ! confirmed) return;
          this.deleteSelectedBranchs();
      });
  }
  

    /**
     * Show modal for editing user if user is specified
     * or for creating a new user otherwise.
     */
    public showCrupdateBranchModal(branch?: Branch) {
      this.modal.open(
        CrupdateBranchModalComponent,
          {branch},
          'crupdate-branch-modal-container'
      ).beforeClose().subscribe(response => {
          if ( ! response) return;
          this.bootstrapper.bootstrap(response.data);
          this.paginator.refresh();
      });
  }
  // showUsersModal
  public showUsersModal(branch?: Branch) {
    this.modal.open(
      BranchUsersComponent,
        {branch},
        {panelClass:'be-modal',width:'600px'}
    ).beforeClose().subscribe(data => {
        if ( ! data) return;
        this.paginator.refresh();
    });
}
  selectBranch(branch:Branch){
    return this.valueChange.emit(branch);
  }

}
