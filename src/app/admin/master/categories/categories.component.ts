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

@Component({
  selector: "remove-dialog",
  templateUrl: './remove-dialog.html',
  styleUrls: ["./categories.component.scss"]
})
export class RemoveCategoryDialog {
  cat_deleted=[];
  public loading = new BehaviorSubject(false);
  constructor(private toast: Toast,private api: ApiCategoryService,
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
                    this.cat_deleted.push(res.data);
                    this.checking();
                  }
              },
              _error => {
                this.toast.open('Nothing deleted!');
                console.error(_error);
              }
          );
        });

    }

    checking(){
        if( this.cat_deleted.length == this.data.length ){
             this.loading.next(false);
             this.dialogRef.close({status:'success',data:this.cat_deleted});
             this.toast.open(this.cat_deleted.length +' Deleted successfully!');
        }
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
  constructor(public dialog: MatDialog,private detailsService:DetailsService,private api:ApiCategoryService,private ref: ChangeDetectorRef) { }
  data: Category[] = [];
  displayedColumns: string[] = ['select','category_id', 'name', 'action'];
  dataSource = new MatTableDataSource<Category>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Select(MasterState.categories) categories$: Observable<Category[]>;

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
    this.categories();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.subscription = this.details$ = this.detailsService.details$;
    this.checkIncomingData();
  }
  openDetails(title='New Category',action='new',obj){
     this.detailsService.update({title:title,sender_data:obj,module:'app-master',component:'app-categories',action:action,detailsVisible:true});
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  categories() {
    this.loading.next(true);
    this.api
      .get()
      .pipe(finalize(() => this.loading.next(false)))
      .subscribe(
        res => {
          console.log(res);
          this.data = res['categories']['data'];
          this.dataSource = new MatTableDataSource<Category>(this.data);
        },
        _error => {
          console.error(_error);
        }
      );
  }
  removeDialog(): void {
    if (this.selection.selected.length > 0) {
      const dialogRef = this.dialog.open(RemoveCategoryDialog, {
        width: '400px',
        data: this.selection.selected
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.status=="success"){
          const _data = this.dataSource.data;
          _data.filter(entry => {
            let i = result.data.findIndex(curr => curr.id === entry.id);
            _data.splice(i);
          });
          this.dataSource.data = _data;
          this.selection = new SelectionModel<Category>(true, []);
         }
      });

    }

  }

  checkIncomingData() {
    this.details$.subscribe(result=>{
      if(result.receriver_data){
        const _data = this.dataSource.data;
        if(result.action=='edit'){
          for( var i =0 ;i <_data.length; i++){
                if(_data[i]['id'] === result.sender_data['id']){
                  _data.splice(i, 1);
                }
            }
        }
          _data.unshift(result.receriver_data);
          this.dataSource.data = _data;
          this.detailsService.update({receriver_data:null,sender_data:null});
      }
    });
  }
}
