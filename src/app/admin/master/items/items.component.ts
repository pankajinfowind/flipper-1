import {
  Component,
  OnInit,
  ViewEncapsulation,
  ViewChild,
  OnDestroy
} from "@angular/core";
import { ApiItemService } from "./api/api.service";
import { DetailsService } from "../../../details/details.service";
import { Router } from '@angular/router';
import { UrlAwarePaginator } from '../../../common/pagination/url-aware-paginator.service';
import { MatSort } from '@angular/material';
import { PaginatedDataTableSource } from '../../../data-table/data/paginated-data-table-source';
import { Item } from './api/item';
import { Modal } from '../../../common/core/ui/dialogs/modal.service';
import { ConfirmModalComponent } from '../../../common/core/ui/confirm-modal/confirm-modal.component';
import { SharedModelService } from '../../../shared-model/shared-model-service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GlobalVariables } from '../../../common/core/global-variables';
import { AddItemComponent } from './add-item/add-item.component';
import { ImportItemsComponent } from '../import-items/import-items.component';

@Component({
  selector: "app-items",
  templateUrl: "./items.component.html",
  styleUrls: ["./items.component.scss"],
  providers: [UrlAwarePaginator],
  encapsulation: ViewEncapsulation.None,
})
export class ItemsComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, { static: true }) matSort: MatSort;

  public dataSource: PaginatedDataTableSource<Item>;
  public loading = new BehaviorSubject(false);
  constructor(public v: GlobalVariables, public shared: SharedModelService, public paginator: UrlAwarePaginator, private modal: Modal, private router: Router, private detailsService: DetailsService, private api: ApiItemService) {
  }

  ngOnInit() {
    this.v.webTitle('Manage Products');
    this.dataSource = new PaginatedDataTableSource<Item>({
      uri: 'item',
      dataPaginator: this.paginator,
      matSort: this.matSort
    });
    this.viewUpCommingData();
  }

  ngOnDestroy() {
    this.paginator.destroy();
  }
  openDetails(title = 'New Items', action = 'new', obj) {
    this.shared.update(obj);
    this.detailsService.update({ title: title, sender_data: obj, module: 'app-master', component: 'app-items', action: action, detailsVisible: true });
  }
  viewUpCommingData() {
    this.detailsService.details$.subscribe(response => {
      if (response.receriver_data) {
        this.paginator.refresh();
        const g = this.detailsService.get();
        g.receriver_data = null;
        this.detailsService.update(g);
      }
    })

  }

  public addItemModal(item?) {
    this.modal.open(
      AddItemComponent,
      {
        enabled: true,
        item: item ? item : null
      },
      {
        width: '1200px'
      }
    ).beforeClose().subscribe(data => {
      if (!data) return;
      this.paginator.refresh();
    });
  }

  public importItemModal() {
    this.modal.open(
      ImportItemsComponent,
        {data:null},
        'import-items-modal-container'
    ).beforeClose().subscribe(data => {
        if ( ! data) return;
        this.paginator.refresh();
    });
  }
  /**
       * Delete currently selected users.
       */
  public deleteSelectedProducts() {
    const ids = this.dataSource.selectedRows.selected.map(item => item.id);
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
  public maybeDeleteSelectedProducts() {
    this.modal.show(ConfirmModalComponent, {
      title: 'Delete Product(s)',
      body: 'Are you sure you want to delete selected product(s)? the stock related will be deleted too! ',
      ok: 'Delete'
    }).afterClosed().subscribe(confirmed => {
      if (!confirmed) return;
      this.deleteSelectedProducts();
    });
  }
}

