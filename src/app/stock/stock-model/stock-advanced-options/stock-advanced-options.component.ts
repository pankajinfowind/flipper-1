import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
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
import { Settings } from '../../../common/core/config/settings.service';
import { SetUp } from '../../../setup/setup';
import { SetUpModelService } from '../../../setup/setup-model.service';
import { Reason } from '../../../setup/reasons/api/reason';
import { DetailsService } from '../../../details/details.service';
import { Details } from '../../../details/details';
import { Item } from '../../../admin/master/items/api/item';
import { ApiBranchService } from '../../../admin/master/branch/api/api.service';

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

  @Output() valueChange = new EventEmitter<boolean>();
  @Input()
  set canAddNew(data: any) {
    this._canAddNew = data;
  }
  get canAddNew(): any {
    return this._canAddNew;
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
  subscription: Observable<Details>;
  details$: Observable<Details>;
  dataSource = new MatTableDataSource < any > ([]);
  public loading = new BehaviorSubject(false);
  item:Item=null;
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

  constructor(private bapi:ApiBranchService,private detailsService: DetailsService,private setupModelService: SetUpModelService,protected settings: Settings,public currentUser: CurrentUser, private _fb: FormBuilder, private toast: Toast, private api: ApiStockService, private msterModelService: MasterModelService) {}
  rows: FormArray = this._fb.array([]);
  ngOnInit() {
    this.master$ = this.msterModelService.master$;
    this.setup$ = this.setupModelService.setup$;
    this.subscription = this.details$ = this.detailsService.details$;
    this.getBranches();
    this.loadingFormGroup(null);
    this.loadItemModelDetails();
  }
  ngOnChanges(changes: SimpleChanges) {
    // this.entry = changes.entry.currentValue;
    // this.dataSource.data = this.entry;


  }

  delete(element) {
    var r = confirm("Are you sure, you want to delete permantly this stock.");
    if (r == true) {

      this.loading.next(true);
      this.api.delete(element.id).pipe(finalize(() => this.loading.next(false))).subscribe(
        res => {
          this.detailsService.receiverData(res,true);
          this.loadItemModelDetails();
          this.toast.open('Stock deleted Successfully!');
        },
        _error => {
          console.error(_error);
        }
      );
    }
  }
  loadItemModelDetails(){
    this.details$.subscribe(res => {
      if(res.sender_data){
        this.item=res.sender_data;
        this.dataSource.data = res.sender_data.stocks;
        this.getNewStockAccordingToBranch(res.sender_data.stocks);
        this.loadNewStockFormGroup();
      }
    });
  }

  getNewStockAccordingToBranch(data){
    const arr:Branch[]=[];

    if(data.length == 0){
      this.bapi.get().subscribe(res => {
                if (res.branches.length > 0) {
                      res.branches.forEach(branch => {
                        if(!this.dataSource.data.find(b=>b.branch_id==branch.branch_id)){
                          if(!arr.find(b=>b.branch_id==branch.branch_id)){
                            this.addRow(branch, false);
                            arr.push(branch);
                          }
                        }
                  });
                }
          });

    }else{
      for (var i = 0; i <  data.length; i++) {
        this.bapi.get().subscribe(res => {
          if (res.branches.length > 0) {

            res.branches.forEach(branch => {
              if (branch && branch.branch_id !==  data[i].branch_id) {
                if(!this.dataSource.data.find(b=>b.branch_id==branch.branch_id)){
                  if(!arr.find(b=>b.branch_id==branch.branch_id)){

                    this.addRow(branch, false);
                    arr.push(branch);
                  }

                }
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
      item_id:new FormControl(this.item && this.item.id ? this.item.id : 0),
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
      min_stock: new FormControl(data ? data.min_stock : 0.00, [Validators.required, Validators.pattern(numberPatern)]),
      max_stock: new FormControl(data ? data.max_stock : 0.00, [Validators.required, Validators.pattern(numberPatern)]),
      on_order: new FormControl(data ? data.on_order : 0.00, [Validators.required, Validators.pattern(numberPatern)]),
      show_alert: new FormControl(data ? data.show_alert : false),
      unit_of_sale: new FormControl(data ? data.unit_of_sale : 'units'),
      branch_id: new FormControl(data ? data.branch_id : 0)

    });
  }

  uniqueObjectInArray(arr){
    let obj = {};
    arr = Object.keys(arr.reduce((prev, next) => {
      if (!obj[next.branch_id]) obj[next.branch_id] = next;
      return obj;
    }, obj)).map((i) => obj[i]);
    return arr;
  }
  updateMinValue(event) {

    this.min_stock_value_valid_value = this.stockFormGroup.value.max_stock;
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
    this.bapi.get().subscribe(res => {
      if (res.branches.length > 0) {
        this.branchList = res.branches;
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
          if(res){

            this.detailsService.receiverData(res,true);
            this.loadItemModelDetails();
            this.toast.open('Stock updated Successfully!');
            this.valueChange.next(true);
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
    const data= this.uniqueObjectInArray(form_data);
    this.api.create({data:data}).pipe(finalize(() =>  this.loading.next(false))).subscribe(
      res => {
        this.detailsService.receiverData(res,true);
        this.loadItemModelDetails();
        this.toast.open('Stock created Successfully!');
        this.valueChange.next(true);
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



