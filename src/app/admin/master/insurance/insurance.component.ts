import { Component, OnInit, ChangeDetectorRef, ViewChild, Input, Inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiInsuranceService } from './api/ap.service';
import { Insurance } from './api/insurance';
import { MatTableDataSource, MatPaginator, MatSort, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { Details } from '../../../details/details';
import { SelectionModel } from '@angular/cdk/collections';
import { DetailsService } from '../../../details/details.service';
import { Toast } from '../../../common/core/ui/toast.service';
import { Master } from '../master';
import { MasterModelService } from '../master-model.service';


@Component({
  selector: "remove-dialog",
  templateUrl: './remove-dialog.html',
  styleUrls: ["./insurance.component.scss"]
})
export class RemoveInsuranceDialog {
  item_deleted=[];
  public loading = new BehaviorSubject(false);
  constructor(private msterModelService:MasterModelService,private toast: Toast,private api: ApiInsuranceService,
    public dialogRef: MatDialogRef<RemoveInsuranceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    deleteInsurance(){
      this.loading.next(true);
          this.api
              .delete({data:this.data}).subscribe(
                res => {
                    if(res.status=='success'){
                      this.dialogRef.close({status:'success'});
                          this.msterModelService.update({loading: false, insurances: res['business_insurance'].length > 0?res['business_insurance']:[]});
                    }
                },
                _error => {
                  this.dialogRef.close({status:'failed'});
                  this.toast.open('Nothing deleted!');
                    console.error(_error);
                }
            );

    }


  close(): void {
    this.dialogRef.close({status:'none'});
  }
}

@Component({
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss']
})
export class InsuranceComponent implements OnInit {


  public loading = new BehaviorSubject(false);
  constructor(private msterModelService:MasterModelService, public dialog: MatDialog,private detailsService:DetailsService,private api:ApiInsuranceService,private ref: ChangeDetectorRef) { }
  data: Insurance[] = [];

  displayedColumns: string[] = ['select','logo_url','name', 'discount','country','address', 'action'];

  dataSource = new MatTableDataSource<Insurance>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  master$: Observable<Master>;
  subscription: Observable<Details>;
  details$: Observable<Details>;
  selection = new SelectionModel<Insurance>(true, []);

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
            if(res.insurances.length  > 0){
              this.data=res.insurances;
              this.dataSource.data=this.data;
            }
        });

  }
  openDetails(title='New Insurance',action='new',obj){
     this.detailsService.update({title:title,sender_data:this.data,module:'app-master',component:'app-insurances',action:action,detailsVisible:true});
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }




    removeDialog(): void {
      if (this.selection.selected.length > 0) {
        const dialogRef = this.dialog.open(RemoveInsuranceDialog, {
          width: '400px',
          data: this.selection.selected
        });

        dialogRef.afterClosed().subscribe(result => {
          if(result.status=="success"){
            this.selection = new SelectionModel<Insurance>(true, []);
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
