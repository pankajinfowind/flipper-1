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


@Component({
  selector: "remove-dialog",
  templateUrl: './remove-dialog.html',
  styleUrls: ["./insurance.component.scss"]
})
export class RemoveInsuranceDialog {
  item_deleted=[];
  public loading = new BehaviorSubject(false);
  constructor(private toast: Toast,private api: ApiInsuranceService,
    public dialogRef: MatDialogRef<RemoveInsuranceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

    deleteInsurance(){
      this.loading.next(true);
        this.data.forEach(element => {
          this.api
          .delete(element['insurance_id']).subscribe(
              res => {
                  if(res.status=='success'){
                    this.item_deleted.push(res.data);
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
        if( this.item_deleted.length == this.data.length ){
             this.loading.next(false);
             this.dialogRef.close({status:'success',data:this.item_deleted});
             this.toast.open(this.item_deleted.length +' Deleted successfully!');
        }
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
  constructor(public dialog: MatDialog,private detailsService:DetailsService,private api:ApiInsuranceService,private ref: ChangeDetectorRef) { }
  data: Insurance[] = [];

  displayedColumns: string[] = ['select','logo_url','name', 'discount','country','address', 'action'];

  dataSource = new MatTableDataSource<Insurance>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

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
    this.insurances();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.subscription = this.details$ = this.detailsService.details$;
    this.checkIncomingData();
  }
  openDetails(title='New Insurance',action='new',obj){
     this.detailsService.update({title:title,sender_data:this.data,module:'app-master',component:'app-insurances',action:action,detailsVisible:true});
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  insurances(){
      this.loading.next(true);
      this.api.getBusinessInsurance().pipe(finalize(() =>  this.loading.next(false))).subscribe(
        res => {
          this.data = res['business_insurance'];
          this.dataSource = new MatTableDataSource<Insurance>(this.data);
        },
        _error => {
        console.error(_error);
        }
      );
  }

    checkIncomingData() {
      this.details$.subscribe(result=>{
        if(result.receriver_data){
          const _data = this.dataSource.data;
              if(result.receriver_data.length > 0){
                  result.receriver_data.forEach(row=>_data.unshift(row));
              }
            this.dataSource.data = _data;
            this.detailsService.update({receriver_data:null,sender_data:null});
        }
      });
    }

    removeDialog(): void {
      if (this.selection.selected.length > 0) {
        const dialogRef = this.dialog.open(RemoveInsuranceDialog, {
          width: '400px',
          data: this.selection.selected
        });

        dialogRef.afterClosed().subscribe(result => {
          if(result.status=="success"){
            const _data = this.dataSource.data;
            _data.filter(entry => {
              let i = result.data.findIndex(curr => curr.insurance_id === entry.insurance_id);
              _data.splice(i);
            });
            this.dataSource.data = _data;
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
