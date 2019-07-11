import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CurrentUser } from '../../common/auth/current-user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalVariables } from '../../common/core/global-variables';
import { BehaviorSubject } from 'rxjs';
import { Modal } from '../../common/core/ui/dialogs/modal.service';
import { PopupImageCropperModelComponent } from '../../image-cropper/popup-image-cropper-model/popup-image-cropper-model.component';
import { ApiService } from '../../business/api/api.service';
import { finalize } from 'rxjs/operators';
import { Bootstrapper } from '../../common/core/bootstrapper.service';
import { Toast } from '../../common/core/ui/toast.service';
export interface SelectorBox {
  value: string;
  viewValue?: string;
}
@Component({
  selector: 'app-receipt-setting',
  templateUrl: './receipt-setting.component.html',
  styleUrls: ['./receipt-setting.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReceiptSettingComponent implements OnInit {
  receiptForm: FormGroup;
  view_more=false;
  public updating = false;
  public loading = new BehaviorSubject(false);
  fontSizes: SelectorBox[] = [
    {value: '8px'},
    {value: '9px'},
    {value: '10px'},
    {value: '11px'},
    {value: '12px'},
    {value: '13px'},
    {value: '14px'},
    {value: '15px'},
    {value: '16px'},
    {value: '17px'},
    {value: '18px'},
    {value: '19px'},
    {value: '20px'},
    {value: '21px'},
    {value: '22px'},
    {value: '23px'},
    {value: '24px'},
  ];
  fontFamilies: SelectorBox[] =  [
    {value: '"Times New Roman", Times, serif'},
    {value: 'Helvetica, Arial, sans-serif'},
    {value: 'serif'},
    {value: 'sans-serif'},
    {value: 'monospace'},
    {value: 'cursive'},
    {value: 'fantasy'}
  ];
  fontStyles: SelectorBox[] =  [
    {value: 'italic'},
    {value: 'oblique'},
    {value: 'bold'},
    {value: 'normal'},
  ];
  fontWeights: SelectorBox[] =  [
    {value: 'normal'},
    {value: 'bold'},
    {value: '100'},
    {value: '200'},
    {value: '300'},
    {value: '400'},
    {value: '500'},
  ];
  letterSpacings: SelectorBox[] =  [
    {value: '.8px'},
    {value: '.9px'},
    {value: '1px'},
    {value: '1.1px'},
    {value: '1.2px'},
    {value: '1.3px'},
    {value: '1.4px'},
    {value: '1.5px'},
    {value: '2px'},
    {value: '2.5px'},
    {value: '-1px'},
  ];
  colors: SelectorBox[] =  [
    {value: 'black'},
    {value: 'red'},
    {value: 'green'},
    {value: 'gray'},
    {value: 'brown'},
    {value: 'dimgray'},
    {value: 'grey'},
    {value: 'lightslategray'},
    {value: 'SeaGreen'},
    {value: 'SlateGray '},
    {value: 'Teal'},
    {value:'SaddleBrown'}
  ];
  //
  constructor( private bootstrapper: Bootstrapper,private toast: Toast,public current:CurrentUser,public v: GlobalVariables,private modal: Modal, private api: ApiService) { }

  ngOnInit() {
    if (this.current.getReceipt('id') > 0) {
      this.updating = true;
  } else {
      this.updating = false;
  }
  this.v.webTitle(this.updating?"Update - Receipt Setting":"Create - Receipt Setting");
    this.hydrateModel();
  }
  private hydrateModel() {
    this.receiptForm = new FormGroup({
      company: new FormControl(this.current.getReceipt('company')?this.current.getReceipt('company'):"", [Validators.required]),
      address: new FormControl(this.current.getReceipt('address')?this.current.getReceipt('address'):"", [Validators.required]),
      pbox: new FormControl(this.current.getReceipt('pbox')?this.current.getReceipt('pbox'):"",[Validators.required]),
      tel: new FormControl(this.current.getReceipt('tel')?this.current.getReceipt('tel'):"",[Validators.required]),
      receipt_message: new FormControl(this.current.getReceipt('receipt_message')?this.current.getReceipt('receipt_message'):""),
      tax_number: new FormControl(this.current.getReceipt('tax_number')?this.current.getReceipt('tax_number'):""),
      show_tax_breakdown: new FormControl(this.current.getReceipt('show_tax_breakdown')?this.current.getReceipt('show_tax_breakdown'):false),
      email: new FormControl(this.current.getReceipt('email')?this.current.getReceipt('email'):"",[Validators.required, Validators.email]),
      business_id: new FormControl(this.current.getReceipt('business_id')?this.current.getReceipt('business_id'):this.current.getBusiness("id")),
      can_show_balance: new FormControl(this.current.getReceipt('can_show_balance')?this.current.getReceipt('can_show_balance'):false),
      can_show_customer_info: new FormControl(this.current.getReceipt('can_show_customer_info')?this.current.getReceipt('can_show_customer_info'):false),
      country_tax_vat: new FormControl(this.current.getReceipt('country_tax_vat')?this.current.getReceipt('country_tax_vat'):18),
      can_auto_print: new FormControl(this.current.getReceipt('can_auto_print')?this.current.getReceipt('can_auto_print'):false),
      company_logo: new FormControl(this.current.getReceipt('company_logo')?this.current.getReceipt('company_logo'):"assets/company_logo/avatar.png"),
      font_size: new FormControl(this.current.getReceipt('font_size')?this.current.getReceipt('font_size'):"12px"),
      font_style: new FormControl(this.current.getReceipt('font_style')?this.current.getReceipt('font_style'):"noraml"),
      font_family: new FormControl(this.current.getReceipt('font_family')?this.current.getReceipt('font_family'):'"Times New Roman", Times, serif'),
      font_weight: new FormControl(this.current.getReceipt('font_weight')?this.current.getReceipt('font_weight'):"normal"),
      letter_spacing: new FormControl(this.current.getReceipt('letter_spacing')?this.current.getReceipt('letter_spacing'):"1.2px"),
      color: new FormControl(this.current.getReceipt('color')?this.current.getReceipt('color'):"#000")
    });
  }

  get company() {
    return this.receiptForm.get("company");
  }
  get address() {
    return this.receiptForm.get("address");
  }
  get pbox() {
    return this.receiptForm.get("pbox");
  }
  get tel() {
    return this.receiptForm.get("tel");
  }
  get tax_number() {
    return this.receiptForm.get("tax_number");
  }
  get receipt_message() {
    return this.receiptForm.get("receipt_message");
  }
  get show_tax_breakdown() {
    return this.receiptForm.get("show_tax_breakdown");
  }
  get email() {
    return this.receiptForm.get("email");
  }
  get can_show_balance() {
    return this.receiptForm.get("can_show_balance");
  }
  get can_show_customer_info() {
    return this.receiptForm.get("can_show_customer_info");
  }
  get can_show_barcode_on_receipt() {
    return this.receiptForm.get("can_show_barcode_on_receipt");
  }
  get country_tax_vat() {
    return this.receiptForm.get("country_tax_vat");
  }
 
  get can_auto_print() {
    return this.receiptForm.get("can_auto_print");
  }
  get company_logo() {
    return this.receiptForm.get("company_logo");
  }

  get font_size() {
    return this.receiptForm.get("font_size");
  }
  get font_style() {
    return this.receiptForm.get("font_style");
  }
  get font_family() {
    return this.receiptForm.get("font_family");
  }
  get font_weight() {
    return this.receiptForm.get("font_weight");
  }
  get letter_spacing() {
    return this.receiptForm.get("letter_spacing");
  }
  get color() {
    return this.receiptForm.get("font_size");
  }
 
  confirm(){
    this.loading.next(true);
    this.api.updateReceipt(this.receiptForm.value,this.current.getReceipt('id')) .pipe(finalize(() =>  this.loading.next(false)))
    .subscribe(res=>{
     this.bootstrapper.bootstrap(res.data);
     this.toast.open('Thank you for updating your receipt info!');
    },error=>{
      console.log(error);
    });
  }

uploadLogoModel() {
  this.modal.open(
    PopupImageCropperModelComponent,
      {title:'Logo'},
      'app-popup-image-cropper-model-container'
  ).beforeClose().subscribe(data => {
      if ( ! data) return;
      this.receiptForm.get('company_logo').setValue(data);
  });
}
}
