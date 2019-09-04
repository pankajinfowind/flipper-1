import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import {  MatSort } from '@angular/material';
import { ApiTaxRateService } from './api/api.service';
import { UrlAwarePaginator } from '../../common/pagination/url-aware-paginator.service';
import { PaginatedDataTableSource } from '../../data-table/data/paginated-data-table-source';
import { Modal } from '../../common/core/ui/dialogs/modal.service';
import { TAXRATE } from './api/tax-rate';
import { ConfirmModalComponent } from '../../common/core/ui/confirm-modal/confirm-modal.component';
import { CrupdateTaxRateModalComponent } from './crupdate-tax-rate-modal/crupdate-tax-rate-modal.component';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GlobalVariables } from '../../common/core/global-variables';

@Component({
  selector: 'app-tax-rate',
  templateUrl: './tax-rates.component.html',
  styleUrls: ['./tax-rates.component.scss'],
  providers: [UrlAwarePaginator],
  encapsulation: ViewEncapsulation.None,
})
export class TaxRatesComponent implements  OnInit, OnDestroy {
  @ViewChild(MatSort, {static:true}) matSort: MatSort;
  public dataSource: PaginatedDataTableSource<TAXRATE>;
  @Input() public enableSelectButton:boolean=false;
  @Input() public selectedId:number=0;

  @Output() valueChange = new EventEmitter<TAXRATE>();
  public loading = new BehaviorSubject(false);
  constructor(public v: GlobalVariables,public paginator: UrlAwarePaginator,private modal: Modal,private api:ApiTaxRateService) { }


  ngOnInit() {
    if(!this.enableSelectButton){
    this.v.webTitle('Manage Tax Rates');
    }
    this.dataSource = new PaginatedDataTableSource<TAXRATE>({
        uri: 'taxrate',
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
    public deleteSelectedTaxRates() {
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
    public maybeDeleteSelectedTaxRates() {
      this.modal.show(ConfirmModalComponent, {
          title: 'Delete Tax Rate',
          body:  'Are you sure you want to delete selected tax rate(s)?',
          ok:    'Delete'
      }).afterClosed().subscribe(confirmed => {
          if ( ! confirmed) return;
          this.deleteSelectedTaxRates();
      });
  }

    /**
     * Show modal for editing user if user is specified
     * or for creating a new user otherwise.
     */
    public showCrupdateTaxRateModal(taxrate?: TAXRATE) {

      this.modal.open(
        CrupdateTaxRateModalComponent,
          {taxrate},
          'crupdate-tax-rate-modal-container'
      ).beforeClose().subscribe(data => {
          if ( ! data) return;
          this.paginator.refresh();
      });
  }

  selectTaxRate(taxrate:TAXRATE){
    return this.valueChange.emit(taxrate);
  }
}


