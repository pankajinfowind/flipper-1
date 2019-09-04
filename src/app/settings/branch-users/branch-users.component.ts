import { Component, OnInit, Inject, ViewChild, ViewEncapsulation, OnDestroy} from '@angular/core';
import { Branch } from '../../admin/master/branch/api/branch';
import { MatDialogRef, MAT_DIALOG_DATA, MatSort } from '@angular/material';
import { CrupdateUserModalComponent } from '../users/crupdate-user-modal/crupdate-user-modal.component';
import { Toast } from '../../common/core/ui/toast.service';
import { UrlAwarePaginator } from '../../common/pagination/url-aware-paginator.service';
import { PaginatedDataTableSource } from '../../data-table/data/paginated-data-table-source';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../common/core/types/models/User';
import { Modal } from '../../common/core/ui/dialogs/modal.service';
import { ConfirmModalComponent } from '../../common/core/ui/confirm-modal/confirm-modal.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SelectUserModelComponent } from './select-user-model/select-user-model.component';
import { ApiBranchService } from '../../admin/master/branch/api/api.service';
import { finalize } from 'rxjs/operators';
export interface BranchModalData {
  branch?: Branch;
}
@Component({
  selector: 'branch-users',
  templateUrl: './branch-users.component.html',
  styleUrls: ['./branch-users.component.scss'],
  providers: [UrlAwarePaginator],
  encapsulation: ViewEncapsulation.None,
})
export class BranchUsersComponent implements OnInit,OnDestroy {
  @ViewChild(MatSort, {static:true}) matSort: MatSort;
  public dataSource: PaginatedDataTableSource<User>;
  public loading = new BehaviorSubject(false);
  public userForm: FormGroup;
  public errors: any = {};
  constructor(
    public paginator: UrlAwarePaginator,
    private api:ApiBranchService,
    private dialogRef: MatDialogRef<BranchUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BranchModalData,
    private modal: Modal,
    private toast: Toast
) {
   
}

  ngOnInit() {
    this.userForm = new FormGroup({
      names: new FormControl("", [Validators.required]),
      branch_id: new FormControl(this.data.branch.branch_id, [Validators.required]),
      role_id: new FormControl("", [Validators.required]),
      user_id: new FormControl("", [Validators.required]),
      email:new FormControl("")
    });
    this.dataSource = new PaginatedDataTableSource<User>({
      uri: 'branch-users/'+this.data.branch.branch_id,
      dataPaginator: this.paginator,
      matSort: this.matSort
  });
  }
  ngOnDestroy() {
    this.paginator.destroy();
  }

  public close(data?: any) {
    this.dialogRef.close(data);
}
public maybeDetachSelectedUsers() {
  this.modal.show(ConfirmModalComponent, {
      title: 'Delete User(s)',
      body:  'Are you sure you want to detach selected User(s)?',
      ok:    'Delete'
  }).afterClosed().subscribe(confirmed => {
      if ( ! confirmed) return;
      this.detachSelectedUsers();
  });
}

public detachSelectedUsers() {
  const users = this.dataSource.selectedRows.selected.map(user =>user);
  this.loading.next(true);
  this.api.detachMultipleUsers(users).pipe(finalize(() => this.loading.next(false))).subscribe(() => {
      this.paginator.refresh();
      this.dataSource.selectedRows.clear();
  });
}
public showCrupdateUsersModal(user?: User) {
  this.modal.open(
    CrupdateUserModalComponent,
      {user},
      {panelClass:'be-modal',width:'600px'}
  ).beforeClose().subscribe(data => {
      if ( ! data) return;
      this.paginator.refresh();
  });
}

  get names() {
    return this.userForm.get("names");
  }
  get branch_id() {
    return this.userForm.get("branch_id");
  }
  get user_id() {
    return this.userForm.get("user_id");
  }

  get role_id(){
    return this.userForm.get("role_id");
  }
  get email(){
    return this.userForm.get("email");
  }
  

  public confirm() {
    if (!this.userForm.valid) return;
    let payload:{user_id:number,role_id:number,email:string,branch_id:number} = {
      user_id:this.userForm.value.user_id,
      role_id:this.userForm.value.role_id,
      email:this.userForm.value.email,
      branch_id:this.userForm.value.branch_id
    };
    this.loading.next(true);
    this.api.attachUserBranch(payload).pipe(finalize(() => this.loading.next(false)))
    .subscribe(response => {
      if(response){
        this.toast.open('User has been assigned');
        this.paginator.refresh();
      }
       
    }, error => {
        this.handleErrors(error);
    });
  }
  public handleErrors(response: {messages: object} = {messages: {}}) {
    this.errors = response.messages || {};
}
  public showChooseUserModal() {
    this.modal.open(
      SelectUserModelComponent,
        {enabled:true,
          user_id:this.userForm.value.user_id?this.userForm.value.user_id:null},
        'select-user-modal-container'
    ).beforeClose().subscribe(data  => {
        if ( ! data) return;
        const user=data as User;
        this.userForm.get('user_id').setValue(user.id);
        this.userForm.get('names').setValue(user.first_name+ ' '+user.last_name);
        this.userForm.get('role_id').setValue(user.role.id);
        this.userForm.get('email').setValue(user.email);
        //
    });
}
}
