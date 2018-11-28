import { Component, OnInit, Input, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-stock-datails-table',
  templateUrl: './stock-datails-table.component.html',
  styleUrls: ['./stock-datails-table.component.scss']
})
export class StockDatailsTableComponent implements OnInit,OnChanges {
  @Input() title:string;
  dataSource = new MatTableDataSource<any>([]);
  selection = new SelectionModel<any>(true, []);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    'select',
    "weight",
    "qty",
    "date"
  ];

  private _data:any;

  @Input()
  set data(data :any) {
    this._data = data;
  }

  get data(): any {
    return this._data;
   }

  constructor() { }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  message(t){
    return ''+t.trim().toLowerCase()+' is empty';
  }
  subMessage(t){
    return 'There are no '+t.trim().toLowerCase()+' in your stock currently.';
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
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
  ngOnChanges(changes: SimpleChanges) {
    this.dataSource = new MatTableDataSource<any>(changes.data.currentValue);
}
}
