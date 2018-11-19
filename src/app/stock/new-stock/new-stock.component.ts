import { Component, OnInit, ChangeDetectorRef, ViewChild, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ApiItemService } from '../../admin/master/items/api/api.service';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Item } from '../../admin/master/items/api/item';
import { Toast } from '../../common/core/ui/toast.service';
import { ApiStockService } from '../api/api.service';

@Component({
  selector: 'app-new-stock',
  templateUrl: './new-stock.component.html',
  styleUrls: ['./new-stock.component.scss']
})
export class NewStockComponent implements OnInit {


  public loading = new BehaviorSubject(false);
  itemForm: FormGroup;
  constructor(private apiStock:ApiStockService,private toast: Toast,private _fb: FormBuilder,private api:ApiItemService,private ref: ChangeDetectorRef) { }
  units: string[] = ['unit','ltre','gms','kg'];
  data: Item[] = [];
  selection = new SelectionModel<Item>(true, []);
  displayedColumns: string[] = ['select','sku', 'item','category','available_stock_qty','weight','unit_of_measure','operation'];
  dataSource = new MatTableDataSource<Item>([]);

  rows: FormArray = this._fb.array([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() shared_output :Item;
  ngOnInit() {
    this.items();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
   // this.checkIncomingData();

   this.itemForm = new FormGroup({
    newStock: this.rows
  });

  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  addRow(d?: Item, noUpdate?: boolean) {
    const numberPatern = '^[0-9.,]+$';
    const row = new FormGroup({
      id:  new FormControl(d && d.id ? d.id : null,[Validators.required]),
      branch_id:  new FormControl(1,[Validators.required]),
      sku:  new FormControl(d && d.sku ? d.sku : null,[Validators.required]),
      item: new FormControl(d && d.item ? d.item : null,[Validators.required]),
      category: new FormControl(d && d.category.name  ? d.category.name  : null,[Validators.required]),
      qty: new FormControl(1, [Validators.required, Validators.pattern(numberPatern)]),
      weight: new FormControl(1, [Validators.required, Validators.pattern(numberPatern)]),
      unit_of_measure: new FormControl('gms', [Validators.required])
    });
    this.rows.push(row);
  }
  get sku() {
    return this.itemForm.get("sku");
  }

  items(){
      this.loading.next(true);
      this.api.get().pipe(finalize(() =>  this.loading.next(false))).subscribe(
        res => {
          this.data = res['items']['data'];
          this.data.forEach((d: Item) => this.addRow(d, false));
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
        if (this.itemForm.valid) {
          this.loading.next(true);
          console.log(this.itemForm.value.newStock);
          this.apiStock.create(this.itemForm.value.newStock).pipe(finalize(() =>  this.loading.next(false))).subscribe(
            res => {
            if(res.status=='success'){
                this.toast.open('Category recorded successfull!');
                this.removeSelectedRows();
              }
            },
            _error => {
            console.error(_error);
            }
          );

        }else{
          this.toast.open('Invalid some field(s) data');
        }
      }
    }
    removeSelectedRows() {
      this.selection.selected.forEach(item => {

        this.data=this.data.filter(function(ele){
          return ele != item;
      });
        this.dataSource = new MatTableDataSource<Item>(this.data);
      });
      this.selection = new SelectionModel<Item>(true, []);
    }
}

