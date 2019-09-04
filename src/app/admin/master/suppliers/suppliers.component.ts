import { Component, OnInit, ViewEncapsulation, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { UrlAwarePaginator } from '../../../common/pagination/url-aware-paginator.service';
import { MatSort } from '@angular/material';
import { PaginatedDataTableSource } from '../../../data-table/data/paginated-data-table-source';
import { BehaviorSubject } from 'rxjs';
import { Supplier } from './api/supplier';
import { ApiSupplierService } from './api/api.service';
import { GlobalVariables } from '../../../common/core/global-variables';
import { Modal } from '../../../common/core/ui/dialogs/modal.service';
import { finalize } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../../common/core/ui/confirm-modal/confirm-modal.component';
import { CrupdateSupplierModalComponent } from './crupdate-supplier-modal/crupdate-supplier-modal.component';

@Component({
  selector: 'app-suppliers',
  templateUrl: './suppliers.component.html',
  styleUrls: ['./suppliers.component.scss'],
  providers: [UrlAwarePaginator],
  encapsulation: ViewEncapsulation.None,
})
export class SuppliersComponent implements OnInit {
  @ViewChild(MatSort,{static:true}) matSort: MatSort;
  @Input() public enableSelectButton:boolean=false;
  @Input() public selectedId:number=0;

  @Output() valueChange = new EventEmitter<Supplier>();
  public dataSource: PaginatedDataTableSource<Supplier>;
  public loading = new BehaviorSubject(false);
  constructor(public v: GlobalVariables, public paginator: UrlAwarePaginator,private modal: Modal,private api:ApiSupplierService) { }

  ngOnInit() {
    if(!this.enableSelectButton){
      this.v.webTitle('Manage Suppliers');
    }
    this.dataSource = new PaginatedDataTableSource<Supplier>({
      uri: 'supplier',
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
    public deleteSelectedSuppliers() {
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
    public maybeDeleteSelectedSuppliers() {
      this.modal.show(ConfirmModalComponent, {
          title: 'Delete Suppliers',
          body:  'Are you sure you want to delete selected suppliers?',
          ok:    'Delete'
      }).afterClosed().subscribe(confirmed => {
          if ( ! confirmed) return;
          this.deleteSelectedSuppliers();
      });
  }

    /**
     * Show modal for editing user if user is specified
     * or for creating a new user otherwise.
     */
    public showCrupdateSupplierModal(supplier?: Supplier) {
      this.modal.open(
        CrupdateSupplierModalComponent,
          {supplier},
          'crupdate-supplier-modal-container'
      ).beforeClose().subscribe(data => {
          if ( ! data) return;
          this.paginator.refresh();
      });
  }

  selectSupplier(Supplier:Supplier){
    return this.valueChange.emit(Supplier);
  }


}
