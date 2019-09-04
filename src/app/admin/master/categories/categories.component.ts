import { Component, OnInit, ViewChild,ViewEncapsulation, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ApiCategoryService } from './api/api.service';
import {MatSort } from '@angular/material';
import { Category } from './api/category';
import { UrlAwarePaginator } from '../../../common/pagination/url-aware-paginator.service';
import { PaginatedDataTableSource } from '../../../data-table/data/paginated-data-table-source';
import { ConfirmModalComponent } from '../../../common/core/ui/confirm-modal/confirm-modal.component';
import { Modal } from '../../../common/core/ui/dialogs/modal.service';
import { CrupdateCategoryModalComponent } from './crupdate-category-modal/crupdate-category-modal.component';
import { SharedModelService } from '../../../shared-model/shared-model-service';
import { BehaviorSubject } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { GlobalVariables } from '../../../common/core/global-variables';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  providers: [UrlAwarePaginator],
  encapsulation: ViewEncapsulation.None,
})
export class CategoriesComponent implements OnInit, OnDestroy {
  @ViewChild(MatSort, {static:true}) matSort: MatSort;
  @Input() public enableSelectButton:boolean=false;
  @Input() public selectedId:number=0;

  @Output() valueChange = new EventEmitter<Category>();
  public dataSource: PaginatedDataTableSource<Category>;
  public loading = new BehaviorSubject(false);
  constructor(public v: GlobalVariables,public shared:SharedModelService, public paginator: UrlAwarePaginator,private modal: Modal,private api:ApiCategoryService) { }

  ngOnInit() {
    if(!this.enableSelectButton){
      this.v.webTitle('Manage Categories');
    }
    this.dataSource = new PaginatedDataTableSource<Category>({
      uri: 'category',
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
    public deleteSelectedCategories() {
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
    public maybeDeleteSelectedCategories() {
      this.modal.show(ConfirmModalComponent, {
          title: 'Delete Categories',
          body:  'Are you sure you want to delete selected categories?',
          ok:    'Delete'
      }).afterClosed().subscribe(confirmed => {
          if ( ! confirmed) return;
          this.deleteSelectedCategories();
      });
  }

    /**
     * Show modal for editing user if user is specified
     * or for creating a new user otherwise.
     */
    public showCrupdateCategoryModal(category?: Category) {
      this.shared.update(category);
      this.modal.open(
        CrupdateCategoryModalComponent,
          {category},
          'crupdate-category-modal-container'
      ).beforeClose().subscribe(data => {
        this.shared.remove();
          if ( ! data) return;
          this.paginator.refresh();
      });
  }

  selectCategory(category:Category){
    return this.valueChange.emit(category);
  }
}
