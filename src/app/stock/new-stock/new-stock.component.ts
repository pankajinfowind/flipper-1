import { Component, OnInit, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiItemService } from '../../admin/master/items/api/api.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Item } from 'electron';
import { finalize } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-stock',
  templateUrl: './new-stock.component.html',
  styleUrls: ['./new-stock.component.scss']
})
export class NewStockComponent implements OnInit {


  public loading = new BehaviorSubject(false);
  itemForm: FormGroup;
  constructor(private api:ApiItemService,private ref: ChangeDetectorRef) { }
  units: string[] = ['unit','ltre','gms','kg'];
  data: Item[] = [];
  selection = new SelectionModel<Item>(true, []);
  displayedColumns: string[] = ['select','sku', 'item','category','current_stock_qty','weight','unit_of_measure','operation'];
  dataSource = new MatTableDataSource<Item>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() shared_output :Item;
  ngOnInit() {
    this.items();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   // this.checkIncomingData();
   this.itemForm = new FormGroup({
    name: new FormControl("", [Validators.required])
  });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  items(){
      this.loading.next(true);
      this.api.get().pipe(finalize(() =>  this.loading.next(false))).subscribe(
        res => {
          console.log(res);
          this.data = res['items']['data'];
          this.dataSource = new MatTableDataSource<Item>(this.data);
        },
        _error => {
        console.error(_error);
        }
      );
    }
    checkIncomingData(){
      // this.ref.detach();
      // setInterval(() => {
      //   if(this.shared_output){
      //     this.data.push(this.shared_output);
      //     this.shared_output=null;
      //   }
      //   this.ref.detectChanges();
      // }, 1000);

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

    addItem(){
      if (this.selection.selected.length > 0) {
        console.log(this.selection.selected);
      }
    }
}

