import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Stock } from '../../api/stock';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Observable, BehaviorSubject } from 'rxjs';
import { Master } from '../../../admin/master/master';
import { MasterModelService } from '../../../admin/master/master-model.service';
import { Branch } from '../../../admin/master/branch/api/branch';
import { ApiStockService } from '../../api/api.service';
import { finalize } from 'rxjs/operators';
import { Toast } from '../../../common/core/ui/toast.service';
import { CurrentUser } from '../../../common/auth/current-user';
import { ArrayDataSource } from '@angular/cdk/collections';
import { Settings } from '../../../common/core/config/settings.service';
import { SetUp } from '../../../setup/setup';
import { SetUpModelService } from '../../../setup/setup-model.service';
import { Reason } from '../../../setup/reasons/api/reason';
import { StockModelService } from '../../stock-model.service';
import { filter } from 'bluebird';

@Component({
  selector: 'app-stock-advanced-options',
  templateUrl: './stock-advanced-options.component.html',
  styleUrls: ['./stock-advanced-options.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class StockAdvancedOptionsComponent implements OnInit, OnChanges {
  private _data: any;
  private _canAddNew: any;
  private _item_id=0;
  selected_row_id: number = 0;
  expandedElement: Stock | null;
  stockFormGroup: FormGroup;
  branchList: Branch[] = [];
  newStockForm: FormGroup;
  dataSource_new_stock = new MatTableDataSource < Branch > ([]);

  @Input()
  set entry(data: any) {
    this._data = data;
  }
  get entry(): any {
    return this._data;
  }
  @Input()
  set canAddNew(data: any) {
    this._canAddNew = data;
  }
  get canAddNew(): any {
    return this._canAddNew;
  }
  @Input()
  set item_id(data: any) {
    this._item_id = data;
  }
  get item_id(): any {
    return this._item_id;
  }

  displayedColumns: string[] = [
    "location",
    "currenty_qty",
    "min_stock",
    "max_stock",
    "on_order",
    "unit_sale",
    "show_alert",
    'action'
  ];
  displayedColumnsNewStock: string[] =
   [
  'name',
  'available_stock_qty',
  'stock_mvmts_reason',
  'expired_date',
  'transction_date',
  "min_stock",
  "max_stock",
  "on_order",
  "unit_sale",
  "show_alert",
   'operation'
  ];
  master$: Observable < Master > ;
  setup$: Observable<SetUp>;
  dataSource = new MatTableDataSource < any > ([]);
  public loading = new BehaviorSubject(false);
  reasons: Reason[] = [];
  min_stock_value_valid_value = 0;

  step = 0;

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  constructor(private setupModelService: SetUpModelService,protected settings: Settings,public currentUser: CurrentUser, private _fb: FormBuilder, private toast: Toast, private api: ApiStockService, private msterModelService: MasterModelService) {}
  rows: FormArray = this._fb.array([]);
  ngOnInit() {
    this.master$ = this.msterModelService.master$;
    this.setup$ = this.setupModelService.setup$;
    this.getBranches();
    this.getReasons();
    this.loadingFormGroup(null);
    this.getNewStockBranch(this.entry);
    this.loadNewStockFormGroup();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.entry = changes.entry.currentValue;
    this.dataSource.data = this.entry;


  }
  getReasons() {
    this.setup$.subscribe(res => {
      if (res.reasons.length > 0) {
        this.reasons = res.reasons.filter(res => res.reason_type == 'stock_movements' && res.stock_movements_status == 'add');
      }
    });

  }
  delete(element) {
    var r = confirm("Are you sure, you want to delete permantly this stock.");
    if (r == true) {

      this.loading.next(true);
      this.api.delete(element.id).pipe(finalize(() => this.loading.next(false))).subscribe(
        res => {
          if (res.status == 'success') {
            this.toast.open('Stock Deleted Successfully!');
              const el=this.dataSource.data.find(b=>b.id===element.id);
              const index= this.dataSource.data.indexOf(el);
              this.dataSource.data.slice(index,1);

          }
        },
        _error => {
          console.error(_error);
        }
      );
    }
  }


  getNewStockBranch(entry) {
    const arr = [];
    if (entry && entry.length === 0) {
      this.master$.subscribe(res => {
        if (res.branchs && res.branchs.length > 0) {
          res.branchs.forEach(branch => {
            if (branch) {
              this.addRow(branch, false);
              arr.push(branch);
            }
          });
        }
      });

    } else {
      for (var i = 0; i < entry.length; i++) {

        this.master$.subscribe(res => {
          if (res && res.branchs.length > 0) {
            res.branchs.forEach(branch => {
              if (branch && branch.branch_id !== entry[i].branch.id) {
                this.addRow(branch, false);
                arr.push(branch);
              }
            });

          }
        })

      }
    }
    this.dataSource_new_stock = new MatTableDataSource < Branch > (arr);

  }
  applyFilter(filterValue: string) {
    this.dataSource_new_stock.filter = filterValue.trim().toLowerCase();
  }
  loadNewStockFormGroup() {
    this.newStockForm = new FormGroup({
      newStock: this.rows
    });
  }
  addRow(d ? : Branch, noUpdate ? : boolean) {
    const numberPatern = '^[0-9.,]+$';
    const row = new FormGroup({
      item_id:new FormControl(this.item_id && this.item_id ? this.item_id : 0),
      branch_id: new FormControl(d && d.branch_id ? d.branch_id : null, [Validators.required]),
      name: new FormControl(d && d.name ? d.name : null, [Validators.required]),
      qty: new FormControl(1, [Validators.required, Validators.pattern(numberPatern)]),
      min_stock: new FormControl(0, [Validators.required, Validators.pattern(numberPatern)]),
      max_stock: new FormControl(0, [Validators.required, Validators.pattern(numberPatern)]),
      on_order: new FormControl(0, [Validators.required, Validators.pattern(numberPatern)]),
      show_alert: new FormControl(0),
      unit_of_sale: new FormControl('units'),
      unit_of_volume: new FormControl(0),
      reason_id: new FormControl('', [Validators.required]),
      transction_date: new FormControl(new Date(), [Validators.required]),
      expired_date: new FormControl(new Date()),
      currency: new FormControl(this.currentUser.get('business')[0].currency_code),
      comments: new FormControl('New stock'),
      unit_price: new FormControl(0.00)
    });
    this.rows.push(row);
  }

  loadingFormGroup(data: Stock = null) {
    const numberPatern = '^[0-9.,]+$';
    this.min_stock_value_valid_value = data ? data.max_stock : 0;
    this.stockFormGroup = new FormGroup({
      min_stock: new FormControl(data ? data.min_stock : 0.00, [Validators.required, Validators.pattern(numberPatern), Validators.max(this.min_stock_value_valid_value)]),
      max_stock: new FormControl(data ? data.max_stock : 0.00, [Validators.required, Validators.pattern(numberPatern)]),
      on_order: new FormControl(data ? data.on_order : 0.00, [Validators.required, Validators.pattern(numberPatern)]),
      show_alert: new FormControl(data ? data.show_alert : false),
      unit_of_sale: new FormControl(data ? data.unit_of_sale : 'units'),
      branch_id: new FormControl(data ? data.branch_id : 0)

    });
  }
  updateMinValue(event) {

    this.min_stock_value_valid_value = this.stockFormGroup.value.max_stock;
    // console.log(this.min_stock_value_valid_value);
    // this.stockFormGroup.get("max_stock").
    this.stockFormGroup.value.min_stock.max(this.min_stock_value_valid_value);
  }
  edit(element) {
    this.loadingFormGroup(element);
  }
  get branch_id() {
    return this.stockFormGroup.get("branch_id");
  }
  get unit_of_sale() {
    return this.stockFormGroup.get("unit_of_sale");
  }
  get min_stock() {
    return this.stockFormGroup.get("min_stock");
  }
  get max_stock() {
    return this.stockFormGroup.get("max_stock");
  }
  get on_order() {
    return this.stockFormGroup.get("on_order");
  }
  get show_alert() {
    return this.stockFormGroup.get("show_alert");
  }
  get unit_of_volume() {
    return this.stockFormGroup.get("unit_of_volume");
  }

  getBranches() {
    this.master$.subscribe(res => {
      if (res.branchs.length > 0) {
        this.branchList = res.branchs;
      }
    });

  }
  qty(){
    return this.newStockForm.get("qty");
  }
  saveStockUpdate(stock) {
    if (this.stockFormGroup.valid) {
      this.loading.next(true);
      this.api.update(this.stockFormGroup.value, stock.id).pipe(finalize(() => this.loading.next(false))).subscribe(
        res => {
          if (res.status == 'success') {

            this.toast.open('Stock updated Successfully!');
            const el=this.dataSource.data.find(c=>c.id==stock.id);
            el.min_stock=this.stockFormGroup.value.min_stock;
            el.max_stock=this.stockFormGroup.value.max_stock;
            el.unit_of_sale=this.stockFormGroup.value.unit_of_sale;
            el.show_alert=this.stockFormGroup.value.show_alert
            el.branch.name=this.branchList.find(b=>b.branch_id==this.stockFormGroup.value.branch_id).name;
          }
        },
        _error => {
          console.error(_error);
        }
      );
    } else {
      alert('Invalid input!');
    }

  }
  saveNewStock(element,all=false) {
    if (this.newStockForm.valid) {
      this.loading.next(true);
    const form_data:Stock[]=[];
    this.newStockForm.value.newStock.forEach(form_item=>{
        if(!all){
          if(form_item.id===element.id){
            form_data['_token']=this.settings.csrfToken;
            form_data.push(form_item);
          }
        }else{
          form_data['_token']=this.settings.csrfToken;
          form_data.push(form_item);
        }
    });
    this.api.create({data:form_data}).pipe(finalize(() =>  this.loading.next(false))).subscribe(
      res => {
      if(res.status=='success'){
        this.msterModelService.update({
          loading: false,
          items: res["items"]["data"].length > 0 ? res["items"]["data"] : []
        });
        if(res["items"]["data"].length > 0){
          this.dataSource.data=[];
          this.dataSource.data=res["items"]["data"].filter(item=>item.id===this.item_id)[0]['stocks'];
        }
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

  removeSelectedRows(form_data) {
    const data=this.dataSource_new_stock.data ;
// data.forEach(i=>{
//   form_data.forEach(e => {
//     if (i === e) {
//       data.shift(); ;
//    });
// });

    this.dataSource_new_stock.data = data;

  }
  removeElementInCollection(array_data,element){
    for (var i = 0; i < array_data.length; i++) {
      if (array_data[i] === element) {
        array_data.splice(i, 1);
      }
  }
  return array_data;
  }
}



