import { Component, OnInit, ViewChild, Input, ChangeDetectorRef, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Branch } from './api/branch';
import { Details } from '../../../details/details';
import { SelectionModel } from '@angular/cdk/collections';
import { DetailsService } from '../../../details/details.service';
import { Toast } from '../../../common/core/ui/toast.service';
import { Master } from '../master';
import { MasterModelService } from '../master-model.service';
import { ApiBranchService } from './api/api.service';

@Component({
  selector: "remove-dialog",
  templateUrl: './remove-dialog.html',
  styleUrls: ["./branch.component.scss"]
})
export class RemoveBranchDialog {
  cat_deleted=[];
  public loading = new BehaviorSubject(false);
  constructor(private msterModelService:MasterModelService,private toast: Toast,private api: ApiBranchService,
    public dialogRef: MatDialogRef<RemoveBranchDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    deleteBranch(){
      this.loading.next(true);
        this.data.forEach(element => {
          this.api
          .delete(element.Branch_id).subscribe(
              res => {
                  if(res.status=='success'){
                    this.dialogRef.close({status:'success'});
                    this.msterModelService.update({loading: false, categories: res['Branch']['data']?res['Branch']['data']:[]});
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
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {

  public loading = new BehaviorSubject(false);
  can_delete=false;

  constructor(private msterModelService:MasterModelService,public dialog: MatDialog,private detailsService:DetailsService,private api:ApiBranchService,private ref: ChangeDetectorRef) { }
  data: Branch[] = [];
  displayedColumns: string[] = ['select', 'name','description'];
  dataSource = new MatTableDataSource<Branch>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  master$: Observable<Master>;

  subscription: Observable<Details>;
  details$: Observable<Details>;
  selection = new SelectionModel<Branch>(true, []);

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
          if(res.branchs.length  > 0){
            this.data=res.branchs;
            this.dataSource.data=this.data;
          }
      });

  }
  openDetails(title='New Branch',action='new',obj){
     this.detailsService.update({title:title,sender_data:obj,module:'app-master',component:'app-Branch',action:action,detailsVisible:true});
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeDialog(): void {
    if (this.selection.selected.length > 0) {
      const dialogRef = this.dialog.open(RemoveBranchDialog, {
        width: '400px',
        data: this.selection.selected
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.status=="success"){
          this.selection = new SelectionModel<Branch>(true, []);
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
