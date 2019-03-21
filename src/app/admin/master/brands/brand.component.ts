import { Component, OnInit, ViewChild,ViewEncapsulation, OnDestroy } from '@angular/core';
import {MatSort } from '@angular/material';
import { UrlAwarePaginator } from '../../../common/pagination/url-aware-paginator.service';
import { PaginatedDataTableSource } from '../../../data-table/data/paginated-data-table-source';
import { ConfirmModalComponent } from '../../../common/core/ui/confirm-modal/confirm-modal.component';
import { Modal } from '../../../common/core/ui/dialogs/modal.service';
import { ApiBrandService } from './api/api.service';
import { Brand } from './api/brand';
import { CrupdateBrandModalComponent } from './crupdate-brand-modal/crupdate-brand-modal.component';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss'],
  providers: [UrlAwarePaginator],
  encapsulation: ViewEncapsulation.None,
})
export class BrandComponent implements   OnInit,OnDestroy {
  @ViewChild(MatSort) matSort: MatSort;

  public dataSource: PaginatedDataTableSource<Brand>;

  constructor( public paginator: UrlAwarePaginator,private modal: Modal,private api:ApiBrandService) { }

  ngOnInit() {
    this.dataSource = new PaginatedDataTableSource<Brand>({
      uri: 'brand',
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
    public deleteSelectedBrands() {
      const ids = this.dataSource.selectedRows.selected.map(brand => brand.id);
      this.api.deleteMultiple(ids).subscribe(() => {
          this.paginator.refresh();
          this.dataSource.selectedRows.clear();
      });
  }
 /**
     * Ask user to confirm deletion of selected tags
     * and delete selected tags if user confirms.
     */
    public maybeDeleteSelectedBrands() {
      this.modal.show(ConfirmModalComponent, {
          title: 'Delete Brand(s)',
          body:  'Are you sure you want to delete selected brand(s)?',
          ok:    'Delete'
      }).afterClosed().subscribe(confirmed => {
          if ( ! confirmed) return;
          this.deleteSelectedBrands();
      });
  }

    /**
     * Show modal for editing user if user is specified
     * or for creating a new user otherwise.
     */
    public showCrupdateBrandModal(brand?: Brand) {
      this.modal.open(
        CrupdateBrandModalComponent,
          {brand},
          'crupdate-brand-modal-container'
      ).beforeClose().subscribe(data => {
          if ( ! data) return;
          this.paginator.refresh();
      });
  }
}
