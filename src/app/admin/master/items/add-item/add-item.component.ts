import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Category } from '../../categories/api/category';
import { Observable } from 'rxjs';
import { Master } from '../../master';
import { Business } from '../../../../business/api/business';
import { CurrentUser } from '../../../../common/auth/current-user';
import { MasterModelService } from '../../master-model.service';
import { Toast } from '../../../../common/core/ui/toast.service';
import { ApiItemService } from '../api/api.service';
import { DetailsService } from '../../../../details/details.service';
import { Brand } from '../../brands/api/brand';
import { SetUpModelService } from '../../../../setup/setup-model.service';
import { SetUp } from '../../../../setup/setup';
import { TAXRATE } from '../../../../setup/tax-rates/api/tax-rate';
import { Details } from '../../../../details/details';
import { Pricing } from '../../pricing/api/pricing';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Branch } from '../../branch/api/branch';
import { Reason } from '../../../../setup/reasons/api/reason';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AddItemComponent implements OnInit {
  master$: Observable<Master>;
  setup$: Observable<SetUp>;
  subscription: Observable<Details>;
  details$: Observable<Details>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup:FormGroup;
  isOptional = false;
  categories: Category[] = [];
  brands: Brand[] = [];
  taxrates: TAXRATE[] = [];
  pricing: Pricing[] = [];
  reasons: Reason[] = [];
  item_id: number = 0;
  business: Business;

  barcode_tool_tips = "The Universal Product Code is a unique and standard identifier typically shown under the bar code symbol";
  sku_tool_tips = "The Stock Keeping Unit  is a unique identifier defined by your company. For example, your company may assign a gallon of Tropicana orange juice a SKU of TROPOJ100. Most times, the SKU is represented by the manufacturer’s UPC. Leave blank to auto generate SKU.";
  constructor(private _formBuilder: FormBuilder,public currentUser: CurrentUser, private setupModelService: SetUpModelService,private msterModelService: MasterModelService, private toast: Toast, private apiItem: ApiItemService, private detailsService: DetailsService) { }
  rows: FormArray = this._formBuilder.array([]);
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['name','cost_price_excluding_tax','sale_price_excluding_tax','cost_price_including_tax','sale_price_including_tax','margin','recommended_retail_price','is_default'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  branchList: Branch[] = [];
  branchs=new FormControl();
  ngOnInit() {
    this.master$ = this.msterModelService.master$;
    this.setup$ = this.setupModelService.setup$;
    this.subscription = this.details$ = this.detailsService.details$;
    this.getActiveCategories();
    this.getActiveBrands();
    this.getActiveTaxRates();
    this.getActivePricing();
    this.getBranches();
    this.getReasons();

    this.firstFormGroup = this._formBuilder.group({
      item: ['', Validators.required],
      summary:[''],
      manufacturer:[''],
      category_id:['', Validators.required],
      sku: [ 0, Validators.required],
      barcode: [ 0, Validators.required],
      brand_id: [0, Validators.required],
      tax_rate_id: [0, Validators.required],
      currency:['Rwf'],
      product_order_code:[0],
      article_code:[0]
    });
    const numberPatern = '^[0-9.,]+$';
    this.thirdFormGroup = new FormGroup({
      qty: new FormControl(0.00, [Validators.required,Validators.pattern(numberPatern)]),
      min_stock:new FormControl(0.00, [Validators.required,Validators.pattern(numberPatern)]),
      max_stock:new FormControl(0.00, [Validators.required,Validators.pattern(numberPatern)]),
      on_order:new FormControl(0.00, [Validators.required,Validators.pattern(numberPatern)]),
      show_alert:new FormControl(0),
      unit_of_sale:new FormControl(''),
      unit_of_volume:new FormControl(0),
      reason_id:new FormControl('', [Validators.required])
    });

    this.secondFormGroup = new FormGroup({
      price_setting: this.rows
    });
  }

  addRow(d?: Pricing, noUpdate?: boolean) {
    const numberPatern = '^[0-9.,]+$';
    const row = new FormGroup({
      //TODO:
      pricing_id:  new FormControl(d && d.pricing_id ? d.pricing_id : null,[Validators.required]),
      name:  new FormControl(d && d.name ? d.name : null,[Validators.required]),
      cost_price_excluding_tax: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
      sale_price_excluding_tax: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
      cost_price_including_tax: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
      sale_price_including_tax: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
      margin: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
      recommended_retail_price: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
      is_default: new FormControl(0, [Validators.required, Validators.pattern(numberPatern)]),
    });
    this.rows.push(row);
  }

  getActiveCategories() {
    this.master$.subscribe(res => {
      if (res.categories.length > 0) {
        this.categories = res.categories;
      }
    });

  }
  //
  getActiveBrands() {
    this.master$.subscribe(res => {
      if (res.brands.length > 0) {
        this.brands = res.brands;
      }
    });

  }
  getActiveTaxRates() {
    this.setup$.subscribe(res => {
      if (res.taxRates.length > 0) {
        this.taxrates = res.taxRates;
      }
    });

  }
  getReasons() {
    this.setup$.subscribe(res => {
      if (res.reasons.length > 0) {
        this.reasons = res.reasons.filter(res=>res.reason_type=='stock_movements');
      }
    });

  }
  getActivePricing() {
    this.master$.subscribe(res => {
      if (res.pricing.length > 0) {
        this.pricing = res.pricing;
        this.pricing.forEach((d: Pricing) => this.addRow(d, false));
        this.dataSource = new MatTableDataSource<Pricing>(this.pricing);
      }
    });

  }
  getBranches() {
    this.master$.subscribe(res => {
        if (res.branchs.length > 0) {
          this.branchList=res.branchs;
        }
    });

  }
   ///////////////////////////// Item
   get item() {
    return this.firstFormGroup.get("item");
  }
  get barcode() {
    return this.firstFormGroup.get("barcode");
  }
  get brand_id() {
    return this.firstFormGroup.get("brand_id");
  }
  //
  get tax_rate_id() {
    return this.firstFormGroup.get("tax_rate_id");
  }
    ///////////////////////////// Item
    get category_id() {
      return this.firstFormGroup.get("category_id");
    }
    get reason_id() {
      return this.thirdFormGroup.get("reason_id");
    }
    get sku() {
      return this.firstFormGroup.get("sku");
    }
    get product_order_code(){
      return this.firstFormGroup.get("product_order_code");
    }
    get article_code(){
      return this.firstFormGroup.get("article_code");
    }
    get manufacturer(){
      return this.firstFormGroup.get("manufacturer");
    }

    get unit_of_sale(){
      return this.thirdFormGroup.get("unit_of_sale");
    }
    get min_stock(){
      return this.thirdFormGroup.get("min_stock");
    }
    get max_stock(){
      return this.thirdFormGroup.get("max_stock");
    }
    get on_order(){
      return this.thirdFormGroup.get("on_order");
    }
    get show_alert(){
      return this.thirdFormGroup.get("show_alert");
    }
    get unit_of_volume(){
      return this.thirdFormGroup.get("unit_of_volume");
    }
    get qty(){
      return this.thirdFormGroup.get("qty");
    }


  close(){
    localStorage.setItem('add-item','No');
  }
  openDetails(title='New Category',action='new',component='app-categories',modules='app-master',obj){
    this.detailsService.update({title:title,sender_data:obj,module:modules,component:component,action:action,detailsVisible:true});
 }
 openDetailsForReasons(title='New Reason',action='new',obj,reason){
  this.detailsService.update({title:title,sender_data:obj,module:'app-setup',component:'app-reason',action:action,detailsVisible:true,reason});
}
 applyFilter(filterValue: string) {
  this.dataSource.filter = filterValue.trim().toLowerCase();
}

    calculateTax(tax,inputed_value,object,type='inc'){
      const value=inputed_value;
      if(type==="inc"){
        return value * tax;
        }else if(type==="exc"){
          return value / tax;
        }

    }
    getTax(tax_id){
      const tax=this.taxrates.filter(tax=>tax.tax_rate_id==tax_id);
      return tax.length > 0?tax[0].percentage:0;
    }

    saveComplete(){

      if(this.branchs.valid && this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid){
        const data={
          item:this.firstFormGroup.value,
          pricing:this.uniqueArray(this.secondFormGroup.value.price_setting),
          stock:this.thirdFormGroup.value,
          branchs:this.branchs.value
        }
      }else{
        alert('Invalid input!');
      }

    }

    uniqueArray (arr) {
      let obj = {};
      arr= Object.keys(arr.reduce((prev, next) => {
        if (!obj[next.pricing_id]) obj[next.pricing_id] = next;
        return obj;
      }, obj)).map((i) => obj[i]);
      return arr;
    }
}
