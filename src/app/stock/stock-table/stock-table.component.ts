import { Component, OnInit, ViewChild, EventEmitter, Input, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Stock } from '../api/stock';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { StockModelService } from '../stock-model.service';
import { SelectionModel } from '@angular/cdk/collections';
import { DetailsService } from '../../details/details.service';
import { Details } from '../../details/details';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class StockTableComponent implements OnInit {

  cart: EventEmitter<Stock> = new EventEmitter();
  constructor(private detailsService:DetailsService,private modelService:StockModelService,private router: Router) {}
  displayedColumns: string[] = [
    'select',
    "sku",
    "barcode",
    "stock",
    "category",
    "tax_rate",
    "available_stock_qty",
    "progress"
  ];
  upc_tool_tips="The Universal Product Code is a unique and standard identifier typically shown under the bar code symbol on retail packaging in the United States.";
  sku_tool_tips="The Stock Keeping Unit  is a unique identifier defined by your company. For example, your company may assign a gallon of Tropicana orange juice a SKU of TROPOJ100. Most times, the SKU is represented by the manufacturer’s UPC";
  dataSource = new MatTableDataSource<Stock>([]);
  selection = new SelectionModel<Stock>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() title: string='Manage Stock';
  @Input() status:string;
  warn = 'warn';
  accent='accent';
  primary='primary';
  mode = 'determinate';
  stocks$: Observable<Stock[]>;
  data:Stock[]=[];
  subscription: Observable<Details>;
  details$: Observable<Details>;
  ngOnInit() {
    this.subscription = this.details$ = this.detailsService.details$;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.stocks$ = this.modelService.stocks$;

    this.stocks$.subscribe(res=>{

      if(this.status === 'available'){
        this.data=res['available'];
        this.dataSource.data=res['available'];

      }else if(this.status === 'stockout'){
        this.data=res['stockout'];
        this.dataSource.data=this.data;
      }else if(this.status === 'damaged'){
        this.data=res['damaged'];
        this.dataSource.data=this.data;
      }
    });

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  percentage(num,num1) {
      let sum=Math.round(parseInt(num) *100)/parseInt(num1);
    return isNaN(sum)?0:sum.toFixed(1);
}
  newStck(){
    this.router.navigate(['stock/new']);
  }
  message(t){
    return ''+t.trim().toLowerCase()+' is empty';
  }
  subMessage(t){
    return 'There are no '+t.trim().toLowerCase()+' in your stock currently.';
  }


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

  openDetails(title='Stock Details',action='info',obj,component='app-info-stock-model'){
    this.detailsService.update({title:title,sender_data:obj,module:'app-stock',component:component,action:action,detailsVisible:true});
 }
}


