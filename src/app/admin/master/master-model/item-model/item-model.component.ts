import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Category } from '../../categories/api/category';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { Toast } from '../../../../common/core/ui/toast.service';
import { ApiItemService } from '../../items/api/api.service';
import { DetailsService } from '../../../../details/details.service';
import { Details } from '../../../../details/details';
import { MasterModelService } from '../../master-model.service';
import { Master } from '../../master';
import { CurrentUser } from '../../../../common/auth/current-user';
import { Business } from '../../../../business/api/business';
import { Brand } from '../../brands/api/brand';
import { TAXRATE } from '../../../../setup/tax-rates/api/tax-rate';
import { SetUp } from '../../../../setup/setup';
import { SetUpModelService } from '../../../../setup/setup-model.service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { CustomerType } from '../../../../setup/customerType/api/CustomerType';
import { CustomerTypePrices } from '../../../../setup/customerType/api/CustomerTypePrices';
import { Item } from '../../items/api/item';
import { ApiCustomerTypeService } from '../../../../setup/customerType/api/api.service';
import { SharedModelService } from '../../../../shared-model/shared-model-service';
import { Modal } from '../../../../common/core/ui/dialogs/modal.service';
import { SelectCategoryModelComponent } from '../../categories/select-category-model/select-category-model.component';
import { SelectBrandModalComponent } from '../../brands/select-brand-modal/select-brand-modal.component';
import { SelectTaxrateModalComponent } from '../../../../setup/tax-rates/select-taxrate-modal/select-taxrate-modal.component';


@Component({
  selector: "edit-item-dialog",
  templateUrl: './edit-item-dialog.html',
  styleUrls: ["./item-model.component.scss"]
})
export class EditItemDialog implements OnInit {
  item_deleted=[];
  public loading = new BehaviorSubject(false);
  isLinear = false;
  master$: Observable<Master>;
  setup$: Observable<SetUp>;
  subscription: Observable<Details>;
  details$: Observable<Details>;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup:FormGroup;
  taxrates: TAXRATE[] = [];
  customertypes: CustomerType[] = [];
  customer_type_sales_default: CustomerTypePrices = null
  rows: FormArray = this._formBuilder.array([]);
  update_cost:boolean;
  update_sale:boolean;
set updatecost(set:boolean){
  this.update_cost=set;
}
get updatecost():boolean{
  return this.update_cost;
}
set updatesale(set:boolean){
  this.update_sale=set;
}
get updatesale():boolean{
  return this.update_sale;
}
  constructor(private capi:ApiCustomerTypeService,private setupModelService: SetUpModelService,  private detailsService: DetailsService,private _formBuilder: FormBuilder,private msterModelService:MasterModelService,private toast: Toast,private api: ApiItemService,
    public dialogRef: MatDialogRef<EditItemDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }
    ngOnInit() {
    this.master$ = this.msterModelService.master$;
    this.setup$ = this.setupModelService.setup$;
    this.subscription = this.details$ = this.detailsService.details$;
    this.getActiveCustomerTypes();
      this.loadingFormGroup();
      this.secondFormGroup = this._formBuilder.group({
        secondCtrl: ['', Validators.required]
      });
      this.thirdFormGroup = this._formBuilder.group({
        thirdCtrl: ['', Validators.required]
      });

    }

    loadingFormGroup() {
      const numberPatern = '^[0-9.,]+$';
      this.customer_type_sales_default=this.data.customer_type_items.find(c => c.item_id === this.data.id && c.customer_type.active == 0);
      this.firstFormGroup = new FormGroup({
        cost_price_excluding_tax: new FormControl(this.data?this.data.cost_price_excluding_tax:0.00, [Validators.required, Validators.pattern(numberPatern)]),
        sale_price_excluding_tax: new FormControl(this.customer_type_sales_default?this.customer_type_sales_default.sale_price_excluding_tax:0.00, [Validators.required, Validators.pattern(numberPatern)]),
        cost_price_including_tax: new FormControl(this.data?this.data.cost_price_including_tax:0.00, [Validators.required, Validators.pattern(numberPatern)]),
        sale_price_including_tax: new FormControl(this.customer_type_sales_default?this.customer_type_sales_default.sale_price_including_tax:0.00, [Validators.required, Validators.pattern(numberPatern)]),
      });
    }

    getActiveCustomerTypes() {

        if (this.data && this.data.customer_type_items.length > 0) {
          //this.customertype_default = res.customertypes.find(c => c.is_active == 0).customer_type_items.find(c=>c.item_id === this.data.id);
          this.customertypes = this.data.customer_type_items.filter(c => c.item_id === this.data.id && c.customer_type.active == 1);
          this.customertypes.forEach((d: CustomerType) => this.addRow(d, false));
        }

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

  close(): void {
    this.dialogRef.close({status:'none'});
  }
  get cost_price_excluding_tax() {
    return this.firstFormGroup.get("cost_price_excluding_tax");
  }
  get sale_price_excluding_tax() {
    return this.firstFormGroup.get("sale_price_excluding_tax");
  }
  get cost_price_including_tax() {
    return this.firstFormGroup.get("cost_price_including_tax");
  }
  get sale_price_including_tax() {
    return this.firstFormGroup.get("sale_price_including_tax");
  }
  calculateCostIncludingTax(event){
    const inputed_value=event.target.value;
    this.firstFormGroup.get('cost_price_including_tax').setValue(this.calculateTax(this.getTax(this.data.tax_rate.id), inputed_value, null,  'inc'));

  }


  calculateCostExcludingTax(event){
    const inputed_value=event.target.value;
    this.firstFormGroup.get('cost_price_excluding_tax').setValue(this.calculateTax(this.data.tax_rate.percentage, inputed_value, null,  'exc'));

  }

  calculateSaleIncludingTax(event){
    const inputed_value=event.target.value;
    this.firstFormGroup.get('sale_price_including_tax').setValue(this.calculateTax(this.data.tax_rate.percentage, inputed_value, null,  'inc'));

  }
  calculateSaleExcludingTax(event){
    const inputed_value=event.target.value;
    this.firstFormGroup.get('sale_price_excluding_tax').setValue(this.calculateTax(this.data.tax_rate.percentage, inputed_value, null,  'exc'));

  }



    calculateTax(tax, inputed_value, object, type = 'inc') {
      const value:number = inputed_value;
      const taxs:number= parseFloat(1+'.'+parseInt(this.data.tax_rate.percentage));
      if (type === "inc") {
        const res= (value * taxs).toString();
        return parseFloat(res).toFixed(2);
      } else if (type === "exc") {
        const res= (value / taxs).toString();
        return parseFloat(res).toFixed(2);
      }


    }


    getTax(tax_id) {
      const tax = this.taxrates.filter(tax => tax.tax_rate_id == tax_id);
      return tax.length > 0 ? tax[0].percentage : 0;
    }

    saveItemPrice(){
      this.saveCustomerTypePricing();
    }
    checkIfUpdated(){
      if(this.updatecost && this.updatesale)
      {
        this.toast.open('Item updated Successfully!');
        this.detailsService.receiverData({name:'none'},true);
        this.close();
      }
    }

    saveCustomerTypePricing(show_alert=false){
      const data:CustomerTypePrices={
        sale_price_excluding_tax:this.firstFormGroup.value.sale_price_excluding_tax,
        sale_price_including_tax:this.firstFormGroup.value.sale_price_including_tax,
      }
      this.loading.next(true);
      this.capi.updateItemPricesByCustomerType(data,this.customer_type_sales_default.id).pipe(finalize(() => this.loading.next(false))).subscribe(
          res => {
            if (res) {
              this.updatecost=true;
              this.saveProductDetails();
              if(show_alert){
                this.toast.open('Customer Specific Prices updated Successfully!');
              }
            }
          },
          _error => {
            console.error(_error);
          }
      );
    }
    updateModel(data,close=false){
      const g=this.detailsService.get();
      g.receriver_data=data;
      if(close){
        g.detailsVisible=false;
      }
      return this.detailsService.update(g);
    }
    saveProductDetails(){
      const data:Item={
        category_id:this.data.category.id,
        item:this.data.item,
        cost_price_excluding_tax:this.firstFormGroup.value.cost_price_excluding_tax,
        cost_price_including_tax:this.firstFormGroup.value.cost_price_including_tax
      }
      this.loading.next(true);
      this.api.update(data,this.data.id).pipe(finalize(() => this.loading.next(false))).subscribe(
          res => {
            if(res){
              this.updatesale=true;
              this.checkIfUpdated();
            }


          },
          _error => {
            console.error(_error);
          }
        );
    }
    checkChanges($event) {
      if($event){
         return this.close();
      }

    }
}

@Component({
  selector: 'app-item-model',
  templateUrl: './item-model.component.html',
  styleUrls: ['./item-model.component.scss']
})
export class ItemModelComponent implements OnInit {
  colors:any[]=[{
    value:'#0e0d0d',valueName:'Black',
  },{
    value:'#f44336',valueName:'Red',

  },{
    value:'#490f0f',valueName:'Red - Dark',

  },{
    value:'#4caf50',valueName:'Green',

  },{
    value:'#1da1f2',valueName:'Blue Sky',

  },{
    value:'#3b5998',valueName:'Blue',

  },{
    value:'#b57541',valueName:'Coffee',

  },{
    value:'#b541a6',valueName:'Violet',

  }];

  itemForm: FormGroup;
  categories: Category[] = [];
  brands: Brand[] = [];
  taxrates: TAXRATE[] = [];
  numberPatern = '^[0-9.]+$';
  public loading = new BehaviorSubject(false);
  details$: Observable<Details>;
  currencies: string[];
  need_to_add_new: boolean = true;
  category_placeholder = 'Choose Item Category';
  item_id: number = 0;
  business: Business;
  barcode_tool_tips = "The Universal Product Code is a unique and standard identifier typically shown under the bar code symbol";
  sku_tool_tips = "The Stock Keeping Unit  is a unique identifier defined by your company. For example, your company may assign a gallon of Tropicana orange juice a SKU of TROPOJ100. Most times, the SKU is represented by the manufacturer’s UPC. Leave blank to auto generate SKU.";
  data: Item=null;
constructor(private modal: Modal,public shared:SharedModelService,public dialog: MatDialog,public currentUser: CurrentUser, private msterModelService: MasterModelService, private toast: Toast, private apiItem: ApiItemService, private detailsService: DetailsService) { }


  ngOnInit() {
    this.business = this.currentUser.get('business')[0];
    this.currencies = [this.business.currency_code];
    this.details$ = this.detailsService.details$;
    this.loadingFormGroup();
  }

  openEditItemDialog(): void {
    this.loadingFormGroup();
    this.dialog.open(EditItemDialog, {
      width: '1200px',
      data: this.data?this.data:null
    });
    }



  loadingFormGroup() {

    this.details$.subscribe(res => {
      if (res.action == 'new') {
        this.need_to_add_new = true;
      } else {
        this.need_to_add_new = false;
      }
      this.data=res.sender_data ? res.sender_data : null;
      this.category_placeholder = res.sender_data.category ? res.sender_data.category.name : 'Choose Item Category';
      this.item_id = res.sender_data ? res.sender_data.id : 0;
      this.itemForm = new FormGroup({
        item: new FormControl(res.sender_data ? res.sender_data.item : "", [Validators.required]),
        sku: new FormControl(res.sender_data ? res.sender_data.sku : 0, [Validators.required]),
        summary: new FormControl(res.sender_data ? res.sender_data.summary : 'null'),
        manufacturer: new FormControl(res.sender_data ? res.sender_data.manufacturer : 'null'),
        product_order_code: new FormControl(res.sender_data ? res.sender_data.product_order_code : 0),
        article_code: new FormControl(res.sender_data ? res.sender_data.article_code : 0),
        category_id: new FormControl(res.sender_data.category? res.sender_data.category.id : null),
        category: new FormControl(res.sender_data.category? res.sender_data.category.name : null),
        brand_id: new FormControl( res.sender_data.brand ? res.sender_data.brand.id : null),
        brand: new FormControl( res.sender_data.brand ? res.sender_data.brand.name : null,),
        tax_rate_id:new FormControl(res.sender_data.tax_rate? res.sender_data.tax_rate.id : null),
        tax_rate:new FormControl(res.sender_data.tax_rate? res.sender_data.tax_rate.name : null),
        barcode: new FormControl(res.sender_data ? res.sender_data.barcode : 0),
        color:new FormControl(res.sender_data ? res.sender_data.color : '#0e0d0d'),
      });
    });
  }



  ///////////////////////////// Item
  get item() {
    return this.itemForm.get("item");
  }
 get barcode(){
  return this.itemForm.get("barcode");
 }
 get color(){
  return this.itemForm.get("color");
 }

  get sku() {
    return this.itemForm.get("sku");
  }

  get category_id() {
    return this.itemForm.get("category_id");
  }
  get category() {
    return this.itemForm.get("category");
  }
  get product_order_code() {
    return this.itemForm.get("product_order_code");
  }
  get tax_rate() {
    return this.itemForm.get("tax_rate");
  }
  get article_code() {
    return this.itemForm.get("article_code");
  }
  get brand_id() {
    return this.itemForm.get("brand_id");
  }
  get brand() {
    return this.itemForm.get("brand");
  }
  //
  get tax_rate_id() {
    return this.itemForm.get("tax_rate_id");
  }

  get summary() {
    return this.itemForm.get("summary");
  }

  get manufacturer() {
    return this.itemForm.get("manufacturer");
  }
  saveItem() {
    if (this.itemForm.valid) {
      this.loading.next(true)
      const data = {
        item: this.itemForm.value.item,
        sku: this.itemForm.value.sku,
        summary: this.itemForm.value.summary,
        manufacturer: this.itemForm.value.manufacturer == '' ? 'null' : this.itemForm.value.manufacturer,
        tax_rate_id: this.itemForm.value.tax_rate_id,
        brand_id: this.itemForm.value.brand_id,
        category_id: this.itemForm.value.category_id,
        barcode: this.itemForm.value.barcode,
        color:this.itemForm.value.color,
        product_order_code:this.itemForm.value.product_order_code,
        article_code:this.itemForm.value.article_code,
      };
      return this.update(data, this.item_id);
    }
  }

  create(data) {
    this.apiItem.create(data).pipe(finalize(() => this.loading.next(false))).subscribe(
      res => {

        if (res.status == 'success') {
          this.toast.open('Item added Successfully!');
          this.loadingFormGroup();

          this.msterModelService.update({ loading: false, items: res["items"]["data"] ? res["items"]["data"] : [] });
        }
      },
      _error => {
        console.error(_error);
      }
    );
  }
  update(data, id) {
    this.apiItem.update(data, id).pipe(finalize(() => this.loading.next(false))).subscribe(
      res => {
          this.toast.open('Item updated Successfully!');
          this.loadingFormGroup();
          this.detailsService.receiverData(res,true);
         // this.shared.remove();
      },
      _error => {
        console.error(_error);
      }
    );
  }
updateModel(data,close=false){
  const g=this.detailsService.get();
  g.receriver_data=data;
  if(close){
    g.detailsVisible=false;
  }
  return this.detailsService.update(g);
}

  close() {
    this.detailsService.update({ title: null, receriver_data: null, sender_data: null, module: null, component: null, action: null, detailsVisible: false });
  }
  openDetails(title='New Category',action='new',component='app-categories',modules='app-master',obj){
    this.detailsService.update({title:title,sender_data:obj,module:modules,component:component,action:action,detailsVisible:true});
 }

 public showChooseCategoryModal() {
  this.modal.open(
    SelectCategoryModelComponent,
      {enabled:true,
        category_id:this.itemForm.value.category_id?this.itemForm.value.category_id:null},
      'select-category-modal-container'
  ).beforeClose().subscribe(data => {
      if ( ! data) return;
      this.itemForm.get('category_id').setValue(data.id);
      this.itemForm.get('category').setValue(data.name);
  });
}
showChooseBrandModal() {
  this.modal.open(
    SelectBrandModalComponent,
      {enabled:true,
        brand_id:this.itemForm.value.brand_id?this.itemForm.value.brand_id:null},
      'select-brand-modal-container'
  ).beforeClose().subscribe(data => {
      if ( ! data) return;
      this.itemForm.get('brand_id').setValue(data.id);
      this.itemForm.get('brand').setValue(data.name);
  });
}
showChooseTaxRateModal() {
  this.modal.open(
    SelectTaxrateModalComponent,
      {enabled:true,
        tax_rate_id:this.itemForm.value.tax_rate_id?this.itemForm.value.tax_rate_id:null},
      'select-taxrate-modal-container'
  ).beforeClose().subscribe(data => {
      if ( ! data) return;
      this.itemForm.get('tax_rate_id').setValue(data.id);
      this.itemForm.get('tax_rate').setValue(data.name+'('+data.percentage+'%)');
  });
}

}
