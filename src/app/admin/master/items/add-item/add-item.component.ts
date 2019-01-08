import { Component, OnInit, ViewChild } from '@angular/core';
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
  isOptional = false;
  categories: Category[] = [];
  brands: Brand[] = [];
  taxrates: TAXRATE[] = [];
  item_id: number = 0;
  business: Business;

  barcode_tool_tips = "The Universal Product Code is a unique and standard identifier typically shown under the bar code symbol";
  sku_tool_tips = "The Stock Keeping Unit  is a unique identifier defined by your company. For example, your company may assign a gallon of Tropicana orange juice a SKU of TROPOJ100. Most times, the SKU is represented by the manufacturer’s UPC. Leave blank to auto generate SKU.";
  constructor(private _formBuilder: FormBuilder,public currentUser: CurrentUser, private setupModelService: SetUpModelService,private msterModelService: MasterModelService, private toast: Toast, private apiItem: ApiItemService, private detailsService: DetailsService) { }
  rows: FormArray = this._formBuilder.array([]);
  selection = new SelectionModel<any>(true, []);
  displayedColumns: string[] = ['select','name','cost_price_excluding_tax','sale_price_excluding_tax','cost_price_including_tax','cost_price_including_tax','sale_price_including_tax','margin','recommended_retail_price','is_default'];
  dataSource = new MatTableDataSource<any>([]);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    this.master$ = this.msterModelService.master$;
    this.setup$ = this.setupModelService.setup$;
    this.subscription = this.details$ = this.detailsService.details$;
    this.getActiveCategories();
    this.getActiveBrands();
    this.getActiveTaxRates();
    this.firstFormGroup = this._formBuilder.group({
      item: ['', Validators.required],
      summary:[''],
      manufacturer:[''],
      category_id:['', Validators.required],
      sku: [ 0, Validators.required],
      barcode: [ 0, Validators.required],
      brand_id: ['', Validators.required],
      tax_rate_id: ['', Validators.required],
      currency:['Rwf'],
      product_order_code:[0],
      article_code:[0]
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
      cost_price_excluding_tax: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern), Validators.min(1)]),
      sale_price_excluding_tax: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern), Validators.min(1)]),
      cost_price_including_tax: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern), Validators.min(1)]),
      sale_price_including_tax: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern), Validators.min(1)]),
      margin: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern), Validators.min(1)]),
      recommended_retail_price: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern), Validators.min(1)]),
      is_default: new FormControl(0, [Validators.required, Validators.pattern(numberPatern), Validators.min(1)]),
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

  close(){
    localStorage.setItem('add-item','No');
  }
  openDetails(title='New Category',action='new',component='app-categories',modules='app-master',obj){
    this.detailsService.update({title:title,sender_data:obj,module:modules,component:component,action:action,detailsVisible:true});
 }
}
