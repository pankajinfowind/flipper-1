import { Component, OnInit,ViewChild, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { CustomerService } from '../customer.service';
import { Customer } from '../customer';
import { MatSort } from '@angular/material';
import { PaginatedDataTableSource } from '../../data-table/data/paginated-data-table-source';
import { BehaviorSubject } from 'rxjs';
import { UrlAwarePaginator } from '../../common/pagination/url-aware-paginator.service';
import { Modal } from '../../common/core/ui/dialogs/modal.service';
import { finalize } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../common/core/ui/confirm-modal/confirm-modal.component';
import { CrupdateCustomerModelComponent } from '../manage-customer/manage-customer.component';
import { GlobalVariables } from '../../common/core/global-variables';
import { LocalStorage } from '../../common/core/services/local-storage.service';
@Component({
  selector: 'app-customers',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
  providers: [UrlAwarePaginator],
  encapsulation: ViewEncapsulation.None,
})
export class CustomersComponent implements OnInit {

  @ViewChild(MatSort) matSort: MatSort;
  @Input() public enableSelectButton:boolean=false;

  @Input() public hiddenCheckBox:boolean=false;

  @Input() public selectedId:number=0;

  @Output() valueChange = new EventEmitter<Customer>();

  public dataSource: PaginatedDataTableSource<Customer>;
  public loading$ = new BehaviorSubject(false);
  constructor(private localStorage: LocalStorage,public v: GlobalVariables,public paginator: UrlAwarePaginator,private modal: Modal,private api:CustomerService) { }

  ngOnInit() {
    if(!this.enableSelectButton){
      this.v.webTitle('Manage Customers');
      this.localStorage.set('sales-path', 'customers');
    }
    this.dataSource = new PaginatedDataTableSource<Customer>({
      uri: 'customer',
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
    public deleteSelectedCustomers() {
      const ids = this.dataSource.selectedRows.selected.map(cat => cat.id);

      this.loading$.next(true);
      this.api.deleteMultiple(ids).pipe(finalize(() => this.loading$.next(false))).subscribe(() => {
          this.paginator.refresh();
          this.dataSource.selectedRows.clear();
      });
  }
 /**
     * Ask user to confirm deletion of selected tags
     * and delete selected tags if user confirms.
     */
    public maybeDeleteSelectedCustomers() {
      this.modal.show(ConfirmModalComponent, {
          title: 'Delete Customers',
          body:  'Are you sure you want to delete selected customers?',
          ok:    'Delete'
      }).afterClosed().subscribe(confirmed => {
          if ( ! confirmed) return;
          this.deleteSelectedCustomers();
      });
  }

    /**
     * Show modal for editing user if user is specified
     * or for creating a new user otherwise.
     */
    public showCrupdateCustomerModal(customer?: Customer) {
      this.modal.open(
        CrupdateCustomerModelComponent,
          {customer},
          'crupdate-customer-modal-container'
      ).beforeClose().subscribe(data => {
          if ( ! data) return;
          this.paginator.refresh();
      });
  }

  selectCustomer(customer:Customer){
    return this.valueChange.emit(customer);
  }
}
