import { Component, OnInit, ViewChild, EventEmitter, Input } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Stock } from '../api/stock';
import { Router } from '@angular/router';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { StockModelService } from '../stock-model.service';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-stock-table',
  templateUrl: './stock-table.component.html',
  styleUrls: ['./stock-table.component.scss']
})
export class StockTableComponent implements OnInit {

  cart: EventEmitter<Stock> = new EventEmitter();
  constructor(private modelService:StockModelService,private router: Router) {}
  displayedColumns: string[] = [
    'select',
    "sku",
    "stock",
    "category",
    "sale_price",
    "units",
    'entry_stock_qty',
    "available_stock_qty",
    'sold',
    "progress",
    "operation"
  ];

  dataSource = new MatTableDataSource<Stock>([]);
  selection = new SelectionModel<Stock>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() title: string='Manage Stock';
  @Input() loading=new BehaviorSubject(false);
  @Input() status:string;
  warn = 'warn';
  accent='accent';
  primary='primary';
  mode = 'determinate';
  stocks$: Observable<Stock[]>;
  data:Stock[]=[];

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.stocks$ = this.modelService.stocks$;

    this.stocks$.subscribe(res=>{
      if(this.status === 'available'){
        this.data=res['available'];
        this.dataSource.data=this.data;
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
    return Math.round(num *100)/num1;
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
}
