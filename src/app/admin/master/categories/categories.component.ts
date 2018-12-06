import { Component, OnInit, ViewChild, Input, ChangeDetectorRef, DoCheck, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiCategoryService } from './api/api.service';
import { finalize, isEmpty } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Category } from './api/category';
import { Select } from '@ngxs/store';
import { MasterState } from '../../../state/master-state';
import { AsyncPipe } from '@angular/common';
import { Details } from '../../../details/details';
import { SelectionModel } from '@angular/cdk/collections';
import { DetailsService } from '../../../details/details.service';
import { Toast } from '../../../common/core/ui/toast.service';
import { Master } from '../master';
import { MasterModelService } from '../master-model.service';

@Component({
  selector: "remove-dialog",
  templateUrl: './remove-dialog.html',
  styleUrls: ["./categories.component.scss"]
})
export class RemoveCategoryDialog {
  cat_deleted=[];
  public loading = new BehaviorSubject(false);
  constructor(private msterModelService:MasterModelService,private toast: Toast,private api: ApiCategoryService,
    public dialogRef: MatDialogRef<RemoveCategoryDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    deleteCategory(){
      this.loading.next(true);
        this.data.forEach(element => {
          this.api
          .delete(element.category_id).subscribe(
              res => {
                  if(res.status=='success'){
                    this.dialogRef.close({status:'success'});
                    this.msterModelService.update({loading: false, categories: res['categories']['data']?res['categories']['data']:[]});
                  }
              },
              _error => {
                this.toast.open('Nothing deleted!');
                this.dialogRef.close({status:'failed'});
                console.error(_error);
              }
          );
        });

    }



  close(): void {
    this.dialogRef.close({status:'none'});
  }
}
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements   OnInit {

  public loading = new BehaviorSubject(false);
  can_delete=false;

  constructor(private msterModelService:MasterModelService,public dialog: MatDialog,private detailsService:DetailsService,private api:ApiCategoryService,private ref: ChangeDetectorRef) { }
  data: Category[] = [];
  displayedColumns: string[] = ['select', 'name', 'action'];
  dataSource = new MatTableDataSource<Category>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  master$: Observable<Master>;

  subscription: Observable<Details>;
  details$: Observable<Details>;
  selection = new SelectionModel<Category>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  ngOnInit() {

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.subscription = this.details$ = this.detailsService.details$;

    this.master$ = this.msterModelService.master$;

        this.master$.subscribe(res=>{
          if(res.categories.length  > 0){
            this.data=res.categories;
            this.dataSource.data=this.data;
          }
      });

  }
  openDetails(title='New Category',action='new',obj){
     this.detailsService.update({title:title,sender_data:obj,module:'app-master',component:'app-categories',action:action,detailsVisible:true});
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeDialog(): void {
    if (this.selection.selected.length > 0) {
      const dialogRef = this.dialog.open(RemoveCategoryDialog, {
        width: '400px',
        data: this.selection.selected
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.status=="success"){
          this.selection = new SelectionModel<Category>(true, []);
         }
      });

    }

  }



  message(t){
    return ''+t.trim().toLowerCase()+' is empty';
  }
  subMessage(t){
    return 'There are no '+t.trim().toLowerCase()+' currently.';
  }
}
