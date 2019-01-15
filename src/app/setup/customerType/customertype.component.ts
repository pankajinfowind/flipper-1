import { Component, OnInit, ViewChild, Input, ChangeDetectorRef, DoCheck, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize, isEmpty } from 'rxjs/operators';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SetUpModelService } from '../setup-model.service';
import { Toast } from '../../common/core/ui/toast.service';
import { MasterModelService } from '../../admin/master/master-model.service';
import { DetailsService } from '../../details/details.service';
import { Master } from '../../admin/master/master';
import { SelectionModel } from '@angular/cdk/collections';
import { ApiCustomerTypeService } from './api/api.service';
import { CustomerType } from './api/CustomerType';
import { Details } from '../../details/details';
import { SetUp } from '../setup';


@Component({
  selector: "remove-dialog",
  templateUrl: './remove-dialog.html',
  styleUrls: ["./customertype.component.scss"]
})
export class RemoveCustomertypeDialog {
  cat_deleted=[];
  public loading = new BehaviorSubject(false);
  constructor(private msterModelService:SetUpModelService,private toast: Toast,private api: ApiCustomerTypeService,
    public dialogRef: MatDialogRef<RemoveCustomertypeDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

    deletecustomertype(){
      this.loading.next(true);
        this.data.forEach(element => {
          this.api
          .delete(element.customertype_id).subscribe(
              res => {
                  if(res.status=='success'){
                    this.dialogRef.close({status:'success'});
                    this.msterModelService.update({loading: false, categories: res['customertype']['data']?res['customertype']['data']:[]});
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
  selector: 'app-customertype',
  templateUrl: './customertype.component.html',
  styleUrls: ['./customertype.component.scss']
})
export class CustomerTypeComponent implements   OnInit {

  public loading = new BehaviorSubject(false);
  can_delete=false;

  constructor(private setupModelService:SetUpModelService,public dialog: MatDialog,private detailsService:DetailsService,private api:ApiCustomerTypeService,private ref: ChangeDetectorRef) { }
  data: CustomerType[] = [];
  displayedColumns: string[] = ['select', 'name','discount','description'];
  dataSource = new MatTableDataSource<CustomerType>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  setup$: Observable<SetUp>;

  subscription: Observable<Details>;
  details$: Observable<Details>;
  selection = new SelectionModel<CustomerType>(true, []);

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

    this.setup$ = this.setupModelService.setup$;

        this.setup$.subscribe(res=>{
          if(res.customertypes.length  > 0){
            this.data=res.customertypes.filter(c=>c.is_active==1);
            this.dataSource.data=this.data;
          }
      });
  }

  openDetails(title='New Customer Type',action='new',obj){
     this.detailsService.update({title:title,sender_data:obj,module:'app-setup',component:'app-customertype',action:action,detailsVisible:true});
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeDialog(): void {
    if (this.selection.selected.length > 0) {
      const dialogRef = this.dialog.open(RemoveCustomertypeDialog, {
        width: '400px',
        data: this.selection.selected
      });

      dialogRef.afterClosed().subscribe(result => {
        if(result.status=="success"){
          this.selection = new SelectionModel<CustomerType>(true, []);
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
