import { Component, OnInit, Input, ViewChild, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper/index';

@Component({
  selector: 'app-stock-datails-table',
  templateUrl: './stock-datails-table.component.html',
  styleUrls: ['./stock-datails-table.component.scss'],
  providers: [{
    provide: MAT_STEPPER_GLOBAL_OPTIONS, useValue: {displayDefaultIndicatorType: false}
  }]
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
   private _entry:any;

   @Input()
   set entry(data :any) {
     this._entry = data;
   }

   get entry(): any {
     return this._entry;
    }

   isLinear = false;
   formGroup: FormGroup [];
   trasctions:any[]=[];
  constructor(private _formBuilder: FormBuilder) { }

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

  ngOnChanges(changes: SimpleChanges) {
    this.data=changes.data.currentValue;
    this.entry=changes.entry.currentValue
 }


}
