import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { Category } from '../../categories/api/category';
import { Observable, BehaviorSubject } from 'rxjs';
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
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Branch } from '../../branch/api/branch';
import { Reason } from '../../../../setup/reasons/api/reason';
import { finalize } from 'rxjs/operators';
import { CustomerType } from '../../../../setup/customerType/api/CustomerType';
import { StockModelService } from '../../../../stock/stock-model.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {
  master$: Observable<Master>;
  setup$: Observable<SetUp>;
  subscription: Observable<Details>;
  details$: Observable<Details>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  isOptional = false;
  categories: Category[] = [];
  brands: Brand[] = [];
  taxrates: TAXRATE[] = [];
  customertypes: CustomerType[] = [];
  customertype_default: CustomerType = null
  reasons: Reason[] = [];
  item_id: number = 0;
  business: Business;

  barcode_tool_tips = "The Universal Product Code is a unique and standard identifier typically shown under the bar code symbol";
  sku_tool_tips = "The Stock Keeping Unit  is a unique identifier defined by your company. For example, your company may assign a gallon of Tropicana orange juice a SKU of TROPOJ100. Most times, the SKU is represented by the manufacturer’s UPC. Leave blank to auto generate SKU.";
  public loading = new BehaviorSubject(false);
  constructor(private router: Router,private modelStockService: StockModelService, private _formBuilder: FormBuilder, public currentUser: CurrentUser, private setupModelService: SetUpModelService, private msterModelService: MasterModelService, private toast: Toast, private apiItem: ApiItemService, private detailsService: DetailsService) {
    this.loadingFormGroup();
   }
  rows: FormArray = this._formBuilder.array([]);
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['name', 'sale_price_including_tax'];
  dataSource = new MatTableDataSource<any>([]);
  panelOpenState = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  branchList: Branch[] = [];
  branchs = new FormControl();
  ngOnInit() {
    this.master$ = this.msterModelService.master$;
    this.setup$ = this.setupModelService.setup$;
    this.subscription = this.details$ = this.detailsService.details$;

    this.getActiveCategories();
    this.getActiveBrands();
    this.getActiveTaxRates();
    this.getActiveCustomerTypes();
    this.getBranches();
    this.getReasons();
    this.loadingFormGroup();

  }

  loadingFormGroup() {
    this.firstFormGroup = this._formBuilder.group({
      item: ['', Validators.required],
      summary: [''],
      manufacturer: [''],
      category_id: ['', Validators.required],
      sku: [0, Validators.required],
      barcode: [0, Validators.required],
      brand_id: [0, Validators.required],
      tax_rate_id: [0, Validators.required],
      product_order_code: [0],
      article_code: [0],
      currency: this.currentUser.get('business')[0].currency_code,
      recommended_retail_price: new FormControl(0.00),
      cost_price_excluding_tax: new FormControl(0.00),
      cost_price_including_tax: new FormControl(0.00),
      margin: new FormControl(0.00),

    });
    const numberPatern = '^[0-9.,]+$';
    this.thirdFormGroup = new FormGroup({
      qty: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
      min_stock: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
      max_stock: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
      on_order: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
      show_alert: new FormControl(0),
      unit_of_sale: new FormControl(''),
      unit_of_volume: new FormControl(0),
      reason_id: new FormControl('', [Validators.required]),
      transction_date: new FormControl(new Date()),
      expired_date: new FormControl(null),
      currency: new FormControl(this.currentUser.get('business')[0].currency_code),
      comments: new FormControl('New stock'),
      unit_price: new FormControl(0.00),
      tax_rate_id: new FormControl(0)
    });

    this.secondFormGroup = new FormGroup({
      recommended_retail_price: new FormControl(0.00),
      cost_price_excluding_tax: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
      sale_price_excluding_tax: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
      cost_price_including_tax: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
      sale_price_including_tax: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
      margin: new FormControl(0.00),
      price_setting: this.rows
    });
  }

  addRow(d?: CustomerType, noUpdate?: boolean) {
    const numberPatern = '^[0-9.,]+$';
    const row = new FormGroup({
      //TODO:
      customer_type_id: new FormControl(d && d.customer_type_id ? d.customer_type_id : null, [Validators.required]),
      name: new FormControl(d && d.name ? d.name : null, [Validators.required]),
      sale_price_including_tax: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
      sale_price_excluding_tax: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
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
        this.reasons = res.reasons.filter(res => res.reason_type == 'stock_movements' && res.stock_movements_status == 'add');
      }
    });

  }
  getActiveCustomerTypes() {
    this.setup$.subscribe(res => {
      if (res.customertypes.length > 0) {
        this.customertype_default = res.customertypes.filter(c => c.is_active == 0)[0];
        this.customertypes = res.customertypes.filter(c => c.is_active == 1);
        this.customertypes.forEach((d: CustomerType) => this.addRow(d, false));
        this.dataSource = new MatTableDataSource<CustomerType>(this.customertypes);
      }
    });

  }
  getBranches() {
    this.master$.subscribe(res => {
      if (res.branchs.length > 0) {
        this.branchList = res.branchs;
      }
    });

  }
  ///////////////////////////// Item
  // get recommended_retail_price() {
  //   return this.secondFormGroup.get("recommended_retail_price");
  // }
  get cost_price_excluding_tax() {
    return this.secondFormGroup.get("cost_price_excluding_tax");
  }
  get sale_price_excluding_tax() {
    return this.secondFormGroup.get("sale_price_excluding_tax");
  }
  get cost_price_including_tax() {
    return this.secondFormGroup.get("cost_price_including_tax");
  }
  get sale_price_including_tax() {
    return this.secondFormGroup.get("sale_price_including_tax");
  }
  // get margin() {
  //   return this.secondFormGroup.get("margin");
  // }

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
  get product_order_code() {
    return this.firstFormGroup.get("product_order_code");
  }
  get article_code() {
    return this.firstFormGroup.get("article_code");
  }
  get manufacturer() {
    return this.firstFormGroup.get("manufacturer");
  }

  get unit_of_sale() {
    return this.thirdFormGroup.get("unit_of_sale");
  }
  get min_stock() {
    return this.thirdFormGroup.get("min_stock");
  }
  get max_stock() {
    return this.thirdFormGroup.get("max_stock");
  }
  get on_order() {
    return this.thirdFormGroup.get("on_order");
  }
  get show_alert() {
    return this.thirdFormGroup.get("show_alert");
  }
  get unit_of_volume() {
    return this.thirdFormGroup.get("unit_of_volume");
  }
  get qty() {
    return this.thirdFormGroup.get("qty");
  }


  close() {
    this.router.navigate(["/admin/master/item"]);
    //localStorage.setItem('add-item', 'No');
  }
  openDetails(title = 'New Category', action = 'new', component = 'app-categories', modules = 'app-master', obj) {
    this.detailsService.update({ title: title, sender_data: obj, module: modules, component: component, action: action, detailsVisible: true });
  }
  openDetailsForReasons(title = 'New Reason', action = 'new', obj, reason) {
    this.detailsService.update({ title: title, sender_data: obj, module: 'app-setup', component: 'app-reason', action: action, detailsVisible: true, reason });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


calculateCostIncludingTax(event){
  const inputed_value=event.target.value;
  this.secondFormGroup.get('cost_price_including_tax').setValue(this.calculateTax(this.getTax(this.tax_rate_id.value), inputed_value, null,  'inc'));

}


calculateCostExcludingTax(event){
  const inputed_value=event.target.value;
  this.secondFormGroup.get('cost_price_excluding_tax').setValue(this.calculateTax(this.getTax(this.tax_rate_id.value), inputed_value, null,  'exc'));

}

calculateSaleIncludingTax(event){
  const inputed_value=event.target.value;
  this.secondFormGroup.get('sale_price_including_tax').setValue(this.calculateTax(this.getTax(this.tax_rate_id.value), inputed_value, null,  'inc'));

}
calculateSaleExcludingTax(event){
  const inputed_value=event.target.value;
  this.secondFormGroup.get('sale_price_including_tax').setValue(this.calculateTax(this.getTax(this.tax_rate_id.value), inputed_value, null,  'exc'));

}



  calculateTax(tax, inputed_value, object, type = 'inc') {
    const value:number = inputed_value;
    const taxs:number= parseFloat(1+'.'+parseInt(tax));

    if (type === "inc") {
      return value * taxs;
    } else if (type === "exc") {
      return  value / taxs;
    }

  }


  getTax(tax_id) {
    const tax = this.taxrates.filter(tax => tax.tax_rate_id == tax_id);
    return tax.length > 0 ? tax[0].percentage : 0;
  }

  saveComplete() {

    if (this.branchs.valid && this.firstFormGroup.valid && this.secondFormGroup.valid && this.thirdFormGroup.valid) {
      this.firstFormGroup.value.summary = this.firstFormGroup.value.summary ? this.firstFormGroup.value.summary : 'None';
      this.firstFormGroup.value.manufacturer = this.firstFormGroup.value.manufacturer ? this.firstFormGroup.value.manufacturer : 'None';
      this.thirdFormGroup.value.tax_rate_id = this.firstFormGroup.value.tax_rate_id ? this.firstFormGroup.value.tax_rate_id : 0;

      // this.firstFormGroup.value.margin = this.secondFormGroup.value.margin;
      // this.firstFormGroup.value.recommended_retail_price = this.secondFormGroup.value.recommended_retail_price;
      this.firstFormGroup.value.cost_price_excluding_tax = this.secondFormGroup.value.cost_price_excluding_tax;
      this.firstFormGroup.value.cost_price_including_tax = this.secondFormGroup.value.cost_price_including_tax;
      this.formCustomerPriceType();

      const data = {
        item: this.firstFormGroup.value,
        pricing: this.uniqueArray(this.secondFormGroup.value.price_setting),
        stock: this.thirdFormGroup.value,
        branchs: this.branchs.value,
        main_branch: this.currentUser.get('business')[0]['branches'][0]['id']
      }
      this.loading.next(true);
      return this.create(data);
    } else {
      alert('Invalid input!');
    }

  }
  formCustomerPriceType() {
    //this.customertype_default;
    this.secondFormGroup.value.price_setting.push(
      {
        customer_type_id: this.customertype_default.customer_type_id,
        name: this.customertype_default.name,
        sale_price_including_tax: this.secondFormGroup.value.sale_price_including_tax,
        sale_price_excluding_tax_tax: this.secondFormGroup.value.sale_price_excluding_tax,
      });
  }

  create(data) {
    this.apiItem.create(data).pipe(finalize(() => this.loading.next(false))).subscribe(
      res => {
        if (res.status == 'success') {
          this.toast.open('Item added Successfully!');
          this.thirdFormGroup.reset();
          this.loadingFormGroup();
          this.msterModelService.update({ loading: false, items: res['item']['original']["items"]["data"] ? res['item']['original']["items"]["data"] : [] });
          this.modelStockService.update({ loading: false, available: res['stock']['original']["stocks"]['data'] ? res['stock']['original']["stocks"]['data'] : [] });
        }
      },
      _error => {
        console.error(_error);
      }
    );
  }

  uniqueArray(arr) {
    let obj = {};
    arr = Object.keys(arr.reduce((prev, next) => {
      if (!obj[next.customer_type_id]) obj[next.customer_type_id] = next;
      return obj;
    }, obj)).map((i) => obj[i]);
    return arr;
  }
}
