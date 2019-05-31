import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmModalComponent } from '../../common/core/ui/confirm-modal/confirm-modal.component';
import { finalize } from 'rxjs/operators';
import { PaginatedDataTableSource } from '../../data-table/data/paginated-data-table-source';
import { BehaviorSubject } from 'rxjs';
import { SharedModelService } from '../../shared-model/shared-model-service';
import { UrlAwarePaginator } from '../../common/pagination/url-aware-paginator.service';
import { Modal } from '../../common/core/ui/dialogs/modal.service';
import { MatSort } from '@angular/material';
import {CustomizeInvoice} from './customize-invoice';
import { ApiCustomizeInvoiceService } from './api-customize-invoice.service';
import { Router } from '@angular/router';
import { GlobalVariables } from '../../common/core/global-variables';

@Component({
  selector: 'app-customize-invoice',
  templateUrl: './customize-invoice.component.html',
  styleUrls: ['./customize-invoice.component.scss']
})
export class CustomizeInvoiceComponent implements OnInit {
  @ViewChild(MatSort) matSort: MatSort;
  public dataSource: PaginatedDataTableSource<CustomizeInvoice>;
  public loading = new BehaviorSubject(false);
  constructor(public v: GlobalVariables,private router: Router,public shared:SharedModelService, public paginator: UrlAwarePaginator,private modal: Modal,private api:ApiCustomizeInvoiceService) { }

  ngOnInit() {
    this.v.webTitle("Invoice Customization");
    this.dataSource = new PaginatedDataTableSource<CustomizeInvoice>({
      uri: 'customize-invoice',
      dataPaginator: this.paginator,
      matSort: this.matSort
  });
}

ngOnDestroy() {
  this.paginator.destroy();
}

newInvoiceCustomization(){
  this.router.navigate(["/admin/settings/new-customize-invoice"]);
}
updateInvoiceCustomization(data){
this.shared.update(data);
this.router.navigate(["/admin/settings/new-customize-invoice"]);
}
/**
     * Delete currently selected users.
     */
    public deleteSelectedCustomizeInvoice() {
      const ids = this.dataSource.selectedRows.selected.map(c => c.id);

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
    public maybeDeleteSelectedCustomizeInvoice() {
      this.modal.show(ConfirmModalComponent, {
          title: 'Delete Customize Invoices',
          body:  'Are you sure you want to delete selected Customize Invoice(s)?',
          ok:    'Delete'
      }).afterClosed().subscribe(confirmed => {
          if ( ! confirmed) return;
          this.deleteSelectedCustomizeInvoice();
      });
  }

    /**
     * Show modal for editing user if user is specified
     * or for creating a new user otherwise.
     */
    public showCrupdateCustomizeInvoiceModal(customize?: CustomizeInvoice) {
      console.log(customize);
      // this.modal.open(
      //   CrupdateCategoryModalComponent,
      //     {customize},
      //     'crupdate-category-modal-container'
      // ).beforeClose().subscribe(data => {
      //   this.shared.remove();
      //     if ( ! data) return;
      //     this.paginator.refresh();
      // });
  }


}
