import { Component, OnInit, ViewChild, ViewEncapsulation, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MatSort } from '@angular/material';
import { ExpirationSetting } from './api/expiration_setting';
import { ApiExpirationSettingService } from './api/api.service';
import { UrlAwarePaginator } from '../../common/pagination/url-aware-paginator.service';
import { PaginatedDataTableSource } from '../../data-table/data/paginated-data-table-source';
import { Modal } from '../../common/core/ui/dialogs/modal.service';
import { finalize } from 'rxjs/operators';
import { ConfirmModalComponent } from '../../common/core/ui/confirm-modal/confirm-modal.component';
import { CrupdatePeriodModalComponent } from './crupdate-period-modal/crupdate-period-modal.component';
import { GlobalVariables } from '../../common/core/global-variables';

@Component({
  selector: 'app-expiration_setting',
  templateUrl: './expiration_setting.component.html',
  styleUrls: ['./expiration_setting.component.scss'],
  providers: [UrlAwarePaginator],
  encapsulation: ViewEncapsulation.None,
})
export class ExpirationSettingComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, {static:true}) matSort: MatSort;

  public dataSource: PaginatedDataTableSource<ExpirationSetting>;
  public loading = new BehaviorSubject(false);
  constructor(public v: GlobalVariables,public paginator: UrlAwarePaginator,private modal: Modal,private api:ApiExpirationSettingService) { }

  ngOnInit() {
    this.v.webTitle('Manage Periods');
    this.dataSource = new PaginatedDataTableSource<ExpirationSetting>({
      uri: 'expiration_setting',
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
    public deleteSelectedPeriods() {
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
    public maybeDeleteSelectedPeriods() {
      this.modal.show(ConfirmModalComponent, {
          title: 'Delete Periods',
          body:  'Are you sure you want to delete selected period(s)?',
          ok:    'Delete'
      }).afterClosed().subscribe(confirmed => {
          if ( ! confirmed) return;
          this.deleteSelectedPeriods();
      });
  }

    /**
     * Show modal for editing user if user is specified
     * or for creating a new user otherwise.
     */
    public showCrupdatePeriodModal(period?: ExpirationSetting) {
      this.modal.open(
        CrupdatePeriodModalComponent,
          {period},
          'crupdate-period-modal-container'
      ).beforeClose().subscribe(data => {
          if ( ! data) return;
          this.paginator.refresh();
      });
  }


}
