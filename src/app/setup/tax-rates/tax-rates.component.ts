import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { SetUp } from '../setup';
import { Observable, BehaviorSubject } from 'rxjs';
import { Details } from '../../details/details';
import { SetUpModelService } from '../setup-model.service';
import { MatDialog, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { TAXRATE } from './api/tax-rate';
import { SelectionModel } from '@angular/cdk/collections';
import { DetailsService } from '../../details/details.service';
import { ApiTaxRateService } from './api/api.service';

@Component({
  selector: 'app-tax-rate',
  templateUrl: './tax-rates.component.html',
  styleUrls: ['./tax-rates.component.scss']
})
export class TaxRatesComponent implements OnInit {
  setup$: Observable<SetUp>;
  subscription: Observable<Details>;
  details$: Observable<Details>;
  public loading = new BehaviorSubject(false);
  can_delete=false;
  data:TAXRATE[]=[];
  constructor(private setupModelService:SetUpModelService,public dialog: MatDialog,private detailsService:DetailsService,private api:ApiTaxRateService,private ref: ChangeDetectorRef) { }
  displayedColumns: string[] = ['select','name', 'description','tax_type','tax_code','percentage'];
  dataSource = new MatTableDataSource<TAXRATE>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  selection = new SelectionModel<TAXRATE>(true, []);

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
          if(res.taxRates.length  > 0){
            this.data=res.taxRates;
            this.dataSource.data=this.data;
            this.detailsService.close();
          }else{
            this.canUserAddTaxRates();
          }
      });


  }
  openDetails(title='New Tax Rate',action='new',obj){
     this.detailsService.update({title:title,sender_data:obj,module:'app-setup',component:'app-tax-rate',action:action,detailsVisible:true});
  }
  canUserAddTaxRates(){
    if(this.data && this.data.length == 0){
        return this.openDetails('New Tax Rate','new',null);
     }
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
}


