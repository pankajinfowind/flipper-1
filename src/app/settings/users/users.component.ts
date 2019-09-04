import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ViewEncapsulation, OnDestroy } from '@angular/core';
import { MatSort } from '@angular/material';
import { User } from '../../common/core/types/models/User';
import { PaginatedDataTableSource } from '../../data-table/data/paginated-data-table-source';
import { BehaviorSubject } from 'rxjs';
import { GlobalVariables } from '../../common/core/global-variables';
import { UrlAwarePaginator } from '../../common/pagination/url-aware-paginator.service';
import { Modal } from '../../common/core/ui/dialogs/modal.service';
import { finalize } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../common/core/ui/confirm-modal/confirm-modal.component';
import { CrupdateUserModalComponent } from './crupdate-user-modal/crupdate-user-modal.component';
import { ApiUserService } from './api/api.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UrlAwarePaginator],
  encapsulation: ViewEncapsulation.None,
})
export class UsersComponent implements OnInit,OnDestroy {

 
  @ViewChild(MatSort, {static:true}) matSort: MatSort;
  @Input() public enableSelectButton:boolean=false;
  @Input() public selectedId:number=0;

  @Output() valueChange = new EventEmitter<User>();
  public dataSource: PaginatedDataTableSource<User>;
  public loading = new BehaviorSubject(false);
   @Input() public hiddenCheckBox:boolean=false;
  constructor(public v: GlobalVariables,public paginator: UrlAwarePaginator,private modal: Modal,private api:ApiUserService) { }

  ngOnInit() {
    if(!this.enableSelectButton){
      this.v.webTitle('Manage Users');
    }

    this.dataSource = new PaginatedDataTableSource<User>({
      uri: 'user',
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
    public deleteSelectedUsers() {
      const ids = this.dataSource.selectedRows.selected.map(user => user.id);
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
    
    public maybeDeleteSelectedUsers() {
      this.modal.show(ConfirmModalComponent, {
          title: 'Delete User(s)',
          body:  'Are you sure you want to delete selected User(s)?',
          ok:    'Delete'
      }).afterClosed().subscribe(confirmed => {
          if ( ! confirmed) return;
          this.deleteSelectedUsers();
      });
  }
  
  /**
     * Show modal for editing user if user is specified
     * or for creating a new user otherwise.
     */
    public showCrupdateUsersModal(user?: User) {
      this.modal.open(
        CrupdateUserModalComponent,
          {user},
          'crupdate-user-modal-container'
      ).beforeClose().subscribe(data => {
          if (!data) return;
          this.paginator.refresh();
      });
  }
  selectUser(user:User){
    return this.valueChange.emit(user);
  }
}
