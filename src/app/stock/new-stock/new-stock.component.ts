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
import { Stock } from '../api/stock';
import { StockModelService } from '../stock-model.service';
import { Settings } from '../../common/core/config/settings.service';
import { CurrentUser } from '../../common/auth/current-user';

@Component({
  selector: 'app-new-stock',
  templateUrl: './new-stock.component.html',
  styleUrls: ['./new-stock.component.scss']
})
export class NewStockComponent implements OnInit {


  public loading = new BehaviorSubject(false);
  itemForm: FormGroup;
  constructor(private currentUser:CurrentUser, protected settings: Settings,private modelStockService: StockModelService,private api:ApiStockService,private toast: Toast,private _fb: FormBuilder,private ref: ChangeDetectorRef) { }
  data: Item[] = [];
  selection = new SelectionModel<Item>(true, []);
  displayedColumns: string[] = ['select','item','available_stock_qty','unit_cost','expired_date','transction_date','comments','operation'];
  dataSource = new MatTableDataSource<Item>([]);

  rows: FormArray = this._fb.array([]);


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input() shared_output :Item;
  ngOnInit() {
    if(this.currentUser.get('business'))
        this.items();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

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
      //TODO:
      id:  new FormControl(d && d.id ? d.id : null,[Validators.required]),
      branch_id:  new FormControl(parseInt(localStorage.getItem('active_branch')),[Validators.required]),
      sku:  new FormControl(d && d.sku ? d.sku : null,[Validators.required]),
      item: new FormControl(d && d.item ? d.item : null,[Validators.required]),
      qty: new FormControl(1, [Validators.required, Validators.pattern(numberPatern), Validators.min(1)]),
      unit_cost: new FormControl(d && d.item ? '('+d.currency+') '+d.unit_cost:null, [Validators.required]),
      transction_date: new FormControl(new Date(), [Validators.required]),
      expired_date: new FormControl(null),
      comments:new FormControl('no comments'),
    });
    this.rows.push(row);
  }
  get sku() {
    return this.itemForm.get("sku");
  }
  qty(){
    return this.itemForm.get("qty");
  }

  items(){
      this.loading.next(true);
      this.api.getNewStockItem(parseInt(localStorage.getItem('active_branch'))).pipe(finalize(() =>this.loading.next(false))).subscribe(
        res => {
          this.data = res['items'];
          this.data.forEach((d: Item) => this.addRow(d, false));
          this.dataSource = new MatTableDataSource<Item>(this.data);

        },
        _error => {
        console.error(_error);
        }
      );
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
        const form_data:Stock[]=[];

        if (this.itemForm.valid) {
          this.loading.next(true);

          this.selection.selected.forEach(selected_item => {
            this.itemForm.value.newStock.forEach(form_item=>{
              if(form_item.id===selected_item.id){
                form_data['_token']=this.settings.csrfToken;
                form_data.push(form_item);
              }
            });
          });
          this.api.create({data:form_data}).pipe(finalize(() =>  this.loading.next(false))).subscribe(
            res => {
            if(res.status=='success'){
              this.modelStockService.update({loading:false, available:res["stocks"]["data"]});
              this.removeSelectedRows(form_data);
                this.toast.open('Stock created successfully!');
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
    removeSelectedRows(form_data) {
      const _data=this.dataSource.data;
      form_data.forEach((item) => {
        let index= _data.findIndex(i => i.id===item.id);
        _data.splice(index,1);
      });
      this.dataSource.data= _data;
     this.selection = new SelectionModel<Item>(true, []);
    }
    message(){
      return 'No new items';
    }
    subMessage(){
      return 'There are no new items to add in your stock currently.';
    }
}

