import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CustomizeInvoice } from '../customize-invoice';
import { PopupImageCropperModelComponent } from '../../../image-cropper/popup-image-cropper-model/popup-image-cropper-model.component';
import { Modal } from '../../../common/core/ui/dialogs/modal.service';
import { ApiCustomerTypeService } from '../../../setup/customerType/api/api.service';
import { CustomerType } from '../../../setup/customerType/api/CustomerType';
import { CustomizeInvoicePreviewDataService } from '../customize-invoice-preview-data.service';
import { ApiCustomizeInvoiceService } from '../api-customize-invoice.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Toast } from '../../../common/core/ui/toast.service';
import { SharedModelService } from '../../../shared-model/shared-model-service';
@Component({
  selector: 'app-crupdate-invoice-customization',
  templateUrl: './crupdate-invoice-customization.component.html',
  styleUrls: ['./crupdate-invoice-customization.component.scss']
})
export class CrupdateInvoiceCustomizationComponent implements OnInit {
  customizeForm: FormGroup;
  font_sizes:any[]=[{
    value:12,valueName:'Smaller',
  },{
    value:16,valueName:'Medium',
  },{
    value:18,valueName:'Large',

  }];
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

  favoriteCode: string;
  codes: string[] = ['Code', 'Items No', 'Other'];
  favoriteItem:string;
  _items: string[] = ['Items', 'Products', 'Other'];
  favoriteUnit:string;
  _units: string[] = ['Quantity', 'Qty', 'Other'];
  favoritePrice:string;
  prices: string[] = ['Price', 'Unit Price', 'Other'];
  favoriteAmount:string;
  amounts: string[] = ['Amounts', 'Total', 'Other'];
  customerTypes: CustomerType[];

  public errors: any = {};
  public loading = new BehaviorSubject(false);
  /**
   * If we are updating existing ExpirationSetting or creating a new one.
   */
  public updating = false;
  invoiceSharedData$: Observable<any>;
  data:CustomizeInvoice=null;
  constructor(public shared:SharedModelService,private toast: Toast,private router: Router,private modal: Modal,private capi:ApiCustomerTypeService,private serviceModel:CustomizeInvoicePreviewDataService,private api:ApiCustomizeInvoiceService) { }

  ngOnInit() {
    this.invoiceSharedData$ = this.shared.shared$;
    this.getCustomerType();
    this.invoiceSharedData$.subscribe(data=>{
      this.data=data?data.data as CustomizeInvoice :null;
      this.updating=this.data?true:false;
      this.hydrateModel(this.data);
    });
   
    this.updateModel();
  }
    getCustomerTypeIds(array:Array<CustomerType>){
      var lookup = [];
    for (var i = 0, len = array.length; i < len; i++) {
        lookup.push(array[i].id);
    }
    return lookup;
    }
  private hydrateModel(customize?:CustomizeInvoice) {
    this.customizeForm = new FormGroup({
      company_name: new FormControl(customize?customize.company_name:"", [Validators.required]),
      address: new FormControl(customize?customize.address:"", [Validators.required]),
      contact: new FormControl(customize?customize.contact:"",[Validators.required]),
      tax_number: new FormControl(customize?customize.tax_number:""),
      font_size: new FormControl(customize?customize.font_size:""),
      color: new FormControl(customize?customize.color:""),
      due_days: new FormControl(customize?customize.due_days:""),
      default_title: new FormControl(customize?customize.default_title:"",[Validators.required]),
      default_sub_title: new FormControl(customize?customize.default_sub_title:""),
      default_footer: new FormControl(customize?customize.default_footer:""),
      memo: new FormControl(customize?customize.memo:""),
      items: new FormControl(customize?customize.items:"Items"),
      logo: new FormControl(customize?customize.logo?customize.logo:"assets/logo/avatar.png":"assets/logo/avatar.png"),
      units: new FormControl(customize?customize.units:"Quantity"),
      price: new FormControl(customize?customize.price:"Price"),
      amount: new FormControl(customize?customize.amount:"Amount"),
      number: new FormControl(customize?customize.number:"Code"),
      adherent: new FormControl(customize?customize.adherent:""),
      customer_name: new FormControl(customize?customize.customer_name:"Name"),
      customer_number: new FormControl(customize?customize.customer_number:"Cust . N°"),
      customer_dob: new FormControl(customize?customize.customer_dob:"Birth Date"),
      beneficiary: new FormControl(customize?customize.beneficiary:"Beneficiary"),
      customer_address: new FormControl(customize?customize.customer_address:"Address"),
      customer_type_name: new FormControl(customize?customize.customer_type_name:null),
      hide_discount_table: new FormControl(customize?customize.hide_discount_table:false),
      hide_taxable_table: new FormControl(customize?customize.hide_taxable_table:false),
      hide_total_summary_table: new FormControl(customize?customize.hide_total_summary_table:false),
      hide_reception_table: new FormControl(customize?customize.hide_reception_table:false),
      hide_visa: new FormControl(customize?customize.hide_visa:true),
      hide_logo: new FormControl(customize?customize.hide_logo:false),
      is_default: new FormControl(customize?customize.is_default:false),
      has_customer_type: new FormControl(customize?customize.customerTypes?true:false:false),
      nom_signature_cachet: new FormControl(customize?customize.nom_signature_cachet:'Nom, Cashet et Signature'),
      done_title: new FormControl(customize?customize.done_title:null),
      done_on: new FormControl(customize?customize.done_on:'on '),
      done_at: new FormControl(customize?customize.done_at:'Done at '),
      business_id: new FormControl(customize?customize.business_id:null),
      customerTypeIds: new FormControl(customize?customize.customerTypes?this.getCustomerTypeIds(customize.customerTypes):null:null),
      customerTypes: new FormControl(customize?customize.customerTypes?customize.customerTypes:null:null),
      reception_field_a:new FormControl(customize?customize.reception_field_a:''),
      reception_title:new FormControl(customize?customize.reception_title:'By Receiption'),
      reception_field_b:new FormControl(customize?customize.reception_field_b:''),
      reception_field_c:new FormControl(customize?customize.reception_field_c:''),
      reception_field_d:new FormControl(customize?customize.reception_field_d:''),
      reception_field_e:new FormControl(customize?customize.reception_field_e:'')
    });
  }
  updatedcustomerTypeIds(){
    if(this.customizeForm.value.customerTypeIds && this.customizeForm.value.customerTypeIds.length > 0){
      if(this.customizeForm.value.customerTypeIds.length == 1){
        const name=this.customerTypes.find(c=>c.id==this.customizeForm.value.customerTypeIds[0]).name;
        this.customizeForm.get('customer_type_name').setValue(name);
        this.customizeForm.value.has_customer_type=true;
      }else if(this.customizeForm.value.customerTypeIds.length > 1){
       // this.customizeForm.get('customer_type_name').setValue(null);
        this.customizeForm.value.has_customer_type=true;
      }
   
    }else{
      this.customizeForm.value.has_customer_type=false;
    }
    this.updateModel();
  }

  hideVisa(){
  this.customizeForm.value.hide_visa=!this.customizeForm.value.hide_visa;
    return this.updateModel();
  }
  hideLogo(){
    this.customizeForm.value.hide_logo=!this.customizeForm.value.hide_logo;
      return this.updateModel();
    }
    hideDiscountTable(){
      this.customizeForm.value.hide_discount_table=!this.customizeForm.value.hide_discount_table;
        return this.updateModel();
      }
      hideReceptionTable(){
        this.customizeForm.value.hide_reception_table=!this.customizeForm.value.hide_reception_table;
          return this.updateModel();
        }
        hideTaxableTable(){
          this.customizeForm.value.hide_taxable_table=!this.customizeForm.value.hide_taxable_table;
            return this.updateModel();
          }
  updatedCode(s){
    this.favoriteCode=s;
    this.customizeForm.value.number=s;
    return  this.serviceModel.update(this.customizeForm.value);
  }
  updatedItem(s){
    this.favoriteItem=s;
    this.customizeForm.value.items=s;
    return  this.serviceModel.update(this.customizeForm.value);
  }
  updatedUnit(s){
    this.favoriteUnit=s;
    this.customizeForm.value.units=s;
    return  this.serviceModel.update(this.customizeForm.value);
  }
  updatedPrice(s){
    this.favoritePrice=s;
    this.customizeForm.value.price=s;
    return  this.serviceModel.update(this.customizeForm.value);
  }

  updatedAmount(s){
    this.favoriteAmount=s;
    this.customizeForm.value.amount=s;
    return  this.serviceModel.update(this.customizeForm.value);
  }
  updateModel(){
    this.customizeForm.value.adherent=this.customizeForm.value.customer_name;
   return  this.serviceModel.update(this.customizeForm.value);
  }

  get reception_title() {
    return this.customizeForm.get("reception_title");
  }

  get reception_field_a() {
    return this.customizeForm.get("reception_field_a");
  }
  get reception_field_b() {
    return this.customizeForm.get("reception_field_b");
  }
  get reception_field_c() {
    return this.customizeForm.get("reception_field_c");
  }
  get reception_field_d() {
    return this.customizeForm.get("reception_field_d");
  }
  get reception_field_e() {
    return this.customizeForm.get("reception_field_e");
  }
  get company_name() {
    return this.customizeForm.get("company_name");
  }
  get customerTypeIds(){
    return this.customizeForm.get("customerTypeIds");
  }
   get address() {
    return this.customizeForm.get("address");
  }
  get contact() {
    return this.customizeForm.get("contact");
  }
  get font_size() {
    return this.customizeForm.get("font_size");
  }

  get color() {
    return this.customizeForm.get("color");
  }
  get due_days() {
    return this.customizeForm.get("due_days");
  }
  get default_title() {
    return this.customizeForm.get("default_title");
  }
  get default_sub_title() {
    return this.customizeForm.get("default_sub_title");
  }
  get default_footer() {
    return this.customizeForm.get("default_footer");
  }
  get memo() {
    return this.customizeForm.get("memo");
  }
  get items() {
    return this.customizeForm.get("items");
  }
  get logo() {
    return this.customizeForm.get("logo");
  }
  get units() {
    return this.customizeForm.get("units");
  }
  get price() {
    return this.customizeForm.get("price");
  }
  get amount() {
    return this.customizeForm.get("amount");
  }
  get number() {
    return this.customizeForm.get("number");
  }
  get adherent() {
    return this.customizeForm.get("adherent");
  }
  get customer_name() {
    return this.customizeForm.get("customer_name");
  }
  get customer_number() {
    return this.customizeForm.get("customer_number");
  }
  get customer_dob() {
    return this.customizeForm.get("customer_dob");
  }
  get beneficiary() {
    return this.customizeForm.get("beneficiary");
  }
  get customer_address(){
    return this.customizeForm.get("customer_address");
  }
  get customer_type_name() {
    return this.customizeForm.get("customer_type_name");
  }
  get hide_discount_table() {
    return this.customizeForm.get("hide_discount_table");
  }
  get hide_taxable_table() {
    return this.customizeForm.get("hide_taxable_table");
  }
  get hide_total_summary_table() {
    return this.customizeForm.get("hide_total_summary_table");
  }
  get hide_reception_table() {
    return this.customizeForm.get("hide_reception_table");
  }
  get hide_visa() {
    return this.customizeForm.get("hide_visa");
  }
  get hide_logo() {
    return this.customizeForm.get("hide_logo");
  }
  get is_default() {
    return this.customizeForm.get("is_default");
  }
  get has_customer_type() {
    return this.customizeForm.get("has_customer_type");
  }
  get nom_signature_cachet() {
    return this.customizeForm.get("nom_signature_cachet");
  }
  get done_title() {
    return this.customizeForm.get("done_title");
  }
  get done_on() {
    return this.customizeForm.get("done_on");
  }
  get done_at() {
    return this.customizeForm.get("done_at");
  }
  get business_id() {
    return this.customizeForm.get("business_id");
  }
  get tax_number() {
    return this.customizeForm.get("tax_number");
  }


  close() {
    this.shared.update(null);
    this.router.navigate(["/admin/settings/customize-invoice"]);
  }
  public confirm() {
    if (!this.customizeForm.valid) return;
    let request, payload:CustomizeInvoice = this.customizeForm.value;

    this.loading.next(true);
    payload.logo=="assets/logo/avatar.png"?null:payload.logo;
    if (this.updating) {
      request = this.api.update(this.data.id, payload);
    } else {
        request = this.api.create(payload);
    }

    request.pipe(finalize(() => this.loading.next(false)))
        .subscribe(response => {
            const action = this.updating ? 'updated' : 'created';
            this.toast.open('Invoice customization has been ' + action);
            this.shared.update(response);
        }, error => {
            this.handleErrors(error);
        });
}

public handleErrors(response: {messages: object} = {messages: {}}) {
  this.errors = response.messages || {};
}

  uploadLogoModel() {
    this.modal.open(
      PopupImageCropperModelComponent,
        {title:'Logo'},
        'app-popup-image-cropper-model-container'
    ).beforeClose().subscribe(data => {
        if ( ! data) return;
        this.customizeForm.get('logo').setValue(data);
        this.customizeForm.value.hide_logo=false;
        this.updateModel();
    });
  }
  getCustomerType() {
    this.capi.get().subscribe(res => {
      if (res.data.length > 0) {
        this.customerTypes = res.data;
      }
    });

  }
}
