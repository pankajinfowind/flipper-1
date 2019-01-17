import { Component, OnInit, ViewChild, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { SetUp } from '../setup';
import { Observable, BehaviorSubject } from 'rxjs';
import { Details } from '../../details/details';
import { SetUpModelService } from '../setup-model.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Reason } from './api/reason';
import { SelectionModel } from '@angular/cdk/collections';
import { DetailsService } from '../../details/details.service';
import { ApiReasonService } from './api/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.scss']
})
export class ReasonComponent implements OnInit {
  setup$: Observable<SetUp>;
  subscription: Observable<Details>;
  details$: Observable<Details>;
  public loading = new BehaviorSubject(false);
  can_delete=false;
  data:Reason[]=[];
  displayedColumns: string[];
  reason:string;
  constructor( private route: ActivatedRoute,private setupModelService:SetUpModelService,public dialog: MatDialog,private detailsService:DetailsService,private api:ApiReasonService,private ref: ChangeDetectorRef) {

   }

  dataSource = new MatTableDataSource<Reason>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  selection = new SelectionModel<Reason>(true, []);

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
    this.route.params.subscribe(params => {
      this.reason=params['reason'];
      this.changeReasons(params['reason']);
          this.setup$.subscribe(res=>{
            if(res.reasons.length  > 0){
              this.data=res.reasons.filter(res=>res.reason_type === params['reason']);
              this.dataSource.data=this.data;
            }
        });

    });



  }
  openDetails(title='New Reason',action='new',obj,reason){
     this.detailsService.update({title:title,sender_data:obj,module:'app-setup',component:'app-reason',action:action,detailsVisible:true,reason});
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  removeDialog(): void {
    if (this.selection.selected.length > 0) {
      // const dialogRef = this.dialog.open(RemovePricingDialog, {
      //   width: '400px',
      //   data: this.selection.selected
      // });

      // dialogRef.afterClosed().subscribe(result => {
      //   if(result.status=="success"){
      //     this.selection = new SelectionModel<Pricing>(true, []);
      //    }
      // });

    }

  }



  message(t){
    return ''+t.trim().toLowerCase()+' is empty';
  }
  subMessage(t){
    return 'There are no '+t.trim().toLowerCase()+' currently.';
  }
  changeReasons(reason){
    if(reason=='stock_movements'){
      this.displayedColumns=['select','name', 'description','stock_movements_status'];
      }else  if(reason=='discount'){
        this.displayedColumns=['select','name', 'description','discount_value'];
      }else  if(reason=='refund'){
        this.displayedColumns=['select','name', 'description','return_to_stock'];
      }
  }

}


