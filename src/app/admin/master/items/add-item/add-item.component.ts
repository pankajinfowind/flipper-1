import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Category } from '../../categories/api/category';
import {  BehaviorSubject } from 'rxjs';
import { Business } from '../../../../business/api/business';
import { CurrentUser } from '../../../../common/auth/current-user';
import { Toast } from '../../../../common/core/ui/toast.service';
import { ApiItemService } from '../api/api.service';
import { Brand } from '../../brands/api/brand';
import { TAXRATE } from '../../../../setup/tax-rates/api/tax-rate';
import { Branch } from '../../branch/api/branch';
import { finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Modal } from '../../../../common/core/ui/dialogs/modal.service';
import { SelectCategoryModelComponent } from '../../categories/select-category-model/select-category-model.component';
import { SelectBrandModalComponent } from '../../brands/select-brand-modal/select-brand-modal.component';
import { SelectTaxrateModalComponent } from '../../../../setup/tax-rates/select-taxrate-modal/select-taxrate-modal.component';
import { AttachItemCustomerTypesModelComponent } from '../../../../setup/customerType/attach-item-customer-types-model/attach-item-customer-types-model.component';
import { Item } from '../api/item';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface ModalData {
  item?:Item
}
@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AddItemComponent implements OnInit {
  formGroup: FormGroup;
  categories: Category[] = [];
  brands: Brand[] = [];
  taxrates: TAXRATE[] = [];
  business: Business;
  tax_rate_percentage=0.00;

  barcode_tool_tips = "The Universal Product Code is a unique and standard identifier typically shown under the bar code symbol";
  sku_tool_tips = "The Stock Keeping Unit  is a unique identifier defined by your company. For example, your company may assign a gallon of Tropicana orange juice a SKU of TROPOJ100. Most times, the SKU is represented by the manufacturer’s UPC. Leave blank to auto generate SKU.";
  public loading = new BehaviorSubject(false);
  errors: object;
  updating: boolean;
  constructor(private dialogRef: MatDialogRef<AddItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,private modal: Modal,private router: Router, private _formBuilder: FormBuilder, public currentUser: CurrentUser,  private toast: Toast, private apiItem: ApiItemService) {
    this.loadingFormGroup();
   }

  branchList: Branch[] = [];
  pricing:Array<any>=[];
  ngOnInit() {
    if (this.data.item) {
      this.updating = true;
  } else {
      this.updating = false;
  }
    this.loadingFormGroup();

  }
  filterItem(params){
    if(!this.updating){
      this.apiItem.filterItem(params).pipe(finalize(() => this.loading.next(false)))
      .subscribe(response => {
          if(response){
           this.data.item=response;
           this.loadingFormGroup();
           this.toast.open('Product already exists!');
          }else{
            this.data.item=null;
          }
       
      }, error => {
          this.handleErrors(error);
      });
    }
   
  }
loadPricing(){
  const items=this.data.item?this.data.item.customer_type_items.filter(p=>p.customer_type.active!=0):[];
  const arr=[];
  if(items.length >0){
    items.forEach(element => {
  arr.push({price_id:element.id,customer_type_id:element.customer_type.id,name:element.customer_type.name,sale_price_excluding_tax:element.sale_price_excluding_tax,sale_price_including_tax:element.sale_price_including_tax});
    });
  }
  return arr;
}
  loadingFormGroup() {
    const numberPatern = '^[0-9.,]+$';
    const retailPrice=this.data.item?this.data.item.customer_type_items.find(p=>p.customer_type.active==0):null;
    this.pricing=this.loadPricing();
    this.formGroup = this._formBuilder.group({
      item_id:[this.data.item?this.data.item.id:0],
      item: [this.data.item?this.data.item.item:'', Validators.required],
      summary: [this.data.item?this.data.item.summary:''],
      manufacturer: [this.data.item?this.data.item.manufacturer:''],
      category_id: [this.data.item && this.data.item.category?this.data.item.category.id:0, Validators.required],
      category:[this.data.item && this.data.item.category?this.data.item.category.name:'', Validators.required],
      sku: [this.data.item?this.data.item.sku:0, Validators.required],
      barcode: [this.data.item?this.data.item.barcode:0, Validators.required],
      brand_id: [this.data.item && this.data.item.brand?this.data.item.brand.id:0],
      brand:[this.data.item && this.data.item.brand?this.data.item.brand.name:''],
      tax_rate_id: [this.data.item && this.data.item.tax_rate?this.data.item.tax_rate.id:0],
      tax_rate:[this.data.item && this.data.item.tax_rate?this.data.item.tax_rate.name:''],
      product_order_code: [this.data.item?this.data.item.product_order_code:0],
      article_code: [this.data.item?this.data.item.article_code:0],
     
      min_stock: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
      max_stock: new FormControl(0.00, [Validators.required, Validators.pattern(numberPatern)]),
      cost_price_excluding_tax: new FormControl(this.data.item?this.data.item.cost_price_excluding_tax:0.00, [Validators.required, Validators.pattern(numberPatern)]),
      sale_price_excluding_tax: new FormControl(retailPrice && retailPrice.sale_price_excluding_tax?retailPrice.sale_price_excluding_tax:0.00, [Validators.required, Validators.pattern(numberPatern)]),
      cost_price_including_tax: new FormControl(this.data.item?this.data.item.cost_price_including_tax:0.00, [Validators.required, Validators.pattern(numberPatern)]),
      sale_price_including_tax: new FormControl(retailPrice && retailPrice.sale_price_including_tax?retailPrice.sale_price_including_tax:0.00, [Validators.required, Validators.pattern(numberPatern)]),
      retail_price_id:new FormControl(retailPrice?retailPrice.id:null)
    });
   
  }

  ngOnDestroy() {
  }


 
  get cost_price_excluding_tax() {
    return this.formGroup.get("cost_price_excluding_tax");
  }
  get sale_price_excluding_tax() {
    return this.formGroup.get("sale_price_excluding_tax");
  }
  get cost_price_including_tax() {
    return this.formGroup.get("cost_price_including_tax");
  }
  get sale_price_including_tax() {
    return this.formGroup.get("sale_price_including_tax");
  }
  get item_id() {
    return this.formGroup.get("item_id");
  }

  get item() {
    return this.formGroup.get("item");
  }
  get barcode() {
    return this.formGroup.get("barcode");
  }
  get brand_id() {
    return this.formGroup.get("brand_id");
  }
  get brand() {
    return this.formGroup.get("brand");
  }
  //
  get tax_rate_id() {
    return this.formGroup.get("tax_rate_id");
  }
  get tax_rate() {
    return this.formGroup.get("tax_rate");
  }

  ///////////////////////////// Item
  get category_id() {
    return this.formGroup.get("category_id");
  }
  get category() {
    return this.formGroup.get("category");
  }

 
  get sku() {
    return this.formGroup.get("sku");
  }
  get product_order_code() {
    return this.formGroup.get("product_order_code");
  }
  get article_code() {
    return this.formGroup.get("article_code");
  }
  get manufacturer() {
    return this.formGroup.get("manufacturer");
  }

 
  get min_stock() {
    return this.formGroup.get("min_stock");
  }
  get max_stock() {
    return this.formGroup.get("max_stock");
  }
  

calculateCostIncludingTax(event){
  const inputed_value=event.target.value;
  this.formGroup.get('cost_price_including_tax').setValue(this.calculateTax(this.getTax(), inputed_value, null,  'inc'));

}


calculateCostExcludingTax(event){
  const inputed_value=event.target.value;
  this.formGroup.get('cost_price_excluding_tax').setValue(this.calculateTax(this.getTax(), inputed_value, null,  'exc'));

}

calculateSaleIncludingTax(event){
  const inputed_value=event.target.value;
  this.formGroup.get('sale_price_including_tax').setValue(this.calculateTax(this.getTax(), inputed_value, null,  'inc'));

}
calculateSaleExcludingTax(event){
  const inputed_value=event.target.value;
  this.formGroup.get('sale_price_excluding_tax').setValue(this.calculateTax(this.getTax(), inputed_value, null,  'exc'));

}



  calculateTax(tax, inputed_value, object, type = 'inc') {
    const value:number = inputed_value;
    const taxs:number= parseFloat(1+'.'+parseInt(tax));

    if (type === "inc") {
      const res= (value * taxs).toString();
      return parseFloat(res).toFixed(2);
    } else if (type === "exc") {
      const res= (value / taxs).toString();
      return parseFloat(res).toFixed(2);
    }


  }


  getTax() {
    return this.data.item && this.data.item.tax_rate?this.data.item.tax_rate.percentage:this.tax_rate_percentage ;
  }

  saveComplete() {

    if (this.formGroup.valid && this.formGroup.valid && this.formGroup.valid) {
      this.formGroup.value.summary = this.formGroup.value.summary ? this.formGroup.value.summary : 'None';
      this.formGroup.value.manufacturer = this.formGroup.value.manufacturer ? this.formGroup.value.manufacturer : 'None';
      this.formGroup.value.tax_rate_id = this.formGroup.value.tax_rate_id ? this.formGroup.value.tax_rate_id : null;

      this.formGroup.value.cost_price_excluding_tax = this.formGroup.value.cost_price_excluding_tax;
      this.formGroup.value.cost_price_including_tax = this.formGroup.value.cost_price_including_tax;
      const active_branch = parseInt(localStorage.getItem('active_branch'));
      const data = {
        item: this.formGroup.value,
        pricing: this.pricing,
        main_branch: active_branch
      }
      this.loading.next(true);
      if(this.updating){
        return this.update(data);
      }else{
        return this.create(data);
      }
     
    } else {
      alert('Invalid input!');
    }

  }
  public close(data?: any) {
    this.dialogRef.close(data);
}

update(data) {
  this.apiItem.update(data,this.data.item.id).pipe(finalize(() => this.loading.next(false)))
  .subscribe(response => {
      if(response){
        this.toast.open('Product has been updated');
        this.close(response);
      }
         
  }, error => {
      this.handleErrors(error);
  });
}
  create(data) {
    this.apiItem.create(data).pipe(finalize(() => this.loading.next(false)))
    .subscribe(response => {
        if(response){
            this.toast.open('Product has been created');
            this.close(response);
        }
    }, error => {
        this.handleErrors(error);
    });
  }
  public handleErrors(response: {messages: object} = {messages: {}}) {
    this.errors = response.messages || {};
}

  uniqueArray(arr) {
    let obj = {};
    arr = Object.keys(arr.reduce((prev, next) => {
      if (!obj[next.customer_type_id]) obj[next.customer_type_id] = next;
      return obj;
    }, obj)).map((i) => obj[i]);
    return arr;
  }

  public showChooseCategoryModal() {
    this.modal.open(
      SelectCategoryModelComponent,
        {enabled:true,
          category_id:this.formGroup.value.category_id?this.formGroup.value.category_id:null},
          {
            width: '600px'
          }
    ).beforeClose().subscribe(data => {
        if ( ! data) return;
        this.formGroup.get('category_id').setValue(data.id);
        this.formGroup.get('category').setValue(data.name);
    });
}
  showChooseBrandModal() {
    this.modal.open(
      SelectBrandModalComponent,
        {enabled:true,
          brand_id:this.formGroup.value.brand_id?this.formGroup.value.brand_id:null},
          {
            width: '600px'
          }
    ).beforeClose().subscribe(data => {
        if ( ! data) return;
        this.formGroup.get('brand_id').setValue(data.id);
        this.formGroup.get('brand').setValue(data.name);
    });
  }
  showChooseTaxRateModal() {
    this.modal.open(
      SelectTaxrateModalComponent,
        {enabled:true,
          tax_rate_id:this.formGroup.value.tax_rate_id?this.formGroup.value.tax_rate_id:null},
          {
            width: '600px'
          }
    ).beforeClose().subscribe(data => {
        if ( ! data) return;
        this.formGroup.get('tax_rate_id').setValue(data.id);
        this.formGroup.get('tax_rate').setValue(data.name+'('+data.percentage+'%)');
        this.tax_rate_percentage=data.percentage;
    });
  }

  addorupdateCustomerTypePriceModal() {
    this.modal.open(
      AttachItemCustomerTypesModelComponent,
        {enabled:true,
          updated:this.update,
          pricing:this.pricing.length >0?this.pricing:[]
        },
        {
          width: '500px'
        }
    ).beforeClose().subscribe(data => {
        if ( ! data.details) return;
        this.pricing=data.details;
    });
  }
}
