import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalVariables } from '../../common/core/global-variables';
import { ApiService } from '../api/api.service';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { CurrentUser } from '../../common/auth/current-user';
import { Bootstrapper } from '../../common/core/bootstrapper.service';
import { Router } from '@angular/router';
import { Toast } from '../../common/core/ui/toast.service';
import { Settings } from '../../common/core/config/settings.service';
import { Modal } from '../../common/core/ui/dialogs/modal.service';
import { PopupImageCropperModelComponent } from '../../image-cropper/popup-image-cropper-model/popup-image-cropper-model.component';

export interface SelectorBox {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-business',
  templateUrl: './new-business.component.html',
  styleUrls: ['./new-business.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewBusinessComponent implements OnInit {
  businessForm: FormGroup;
  view_more=false;
  error='';
  public updating = false;
  public settings:any;

  public loading = new BehaviorSubject(false);
  types: SelectorBox[] = [
    {value: 'Retail', viewValue: 'Retail'}
  ];
  @Input() columns="col-6 col-xs-offset-3 col-lg-offset-3 col-md-offset-3";
_currencies:any[]=[];
_countries:any[]=[];

  constructor(public current:CurrentUser,
    private bootstrapper: Bootstrapper,
    public dialog: MatDialog,
    private api: ApiService,
     public v: GlobalVariables,
     private router: Router,
     private toast: Toast,
     private setting:Settings,
     private modal: Modal
  ) {

    this.settings=this.setting.getAll();
    this._countries=this.countries();
    this._currencies=this.currencies();
  }
countries(){
return Object.values(this.setting.httpGet('assets/lists/countries.json'));
}
currencies(){
  return Object.values(this.setting.httpGet('assets/lists/currencies.json'));
  }
  ngOnInit() {
   
    if (this.current.getBusiness('id') > 0) {
      this.updating = true;
  } else {
      this.updating = false;
  }
  this.v.webTitle(this.updating?"Update - Business":"Create - Business");
    this._countries=this.countries();
    this._currencies=this.currencies();
    this.hydrateModel();

  }
  private hydrateModel() {
    this.businessForm = new FormGroup({
      name: new FormControl(this.current.getBusiness('name')?this.current.getBusiness('name'):"", [Validators.required]),
      type: new FormControl(this.current.getBusiness('type')?this.current.getBusiness('type'):"", [Validators.required]),
      address: new FormControl(this.current.getBusiness('address')?this.current.getBusiness('address'):"",[Validators.required]),
      category: new FormControl(this.current.getBusiness('category')?this.current.getBusiness('category'):"",[Validators.required]),
      description: new FormControl(this.current.getBusiness('description')?this.current.getBusiness('description'):""),
      tin: new FormControl(this.current.getBusiness('tin')?this.current.getBusiness('tin'):""),
      phone: new FormControl(this.current.getBusiness('phone')?this.current.getBusiness('phone'):""),
      email: new FormControl(this.current.getBusiness('email')?this.current.getBusiness('email'):"",[Validators.required, Validators.email]),
      city: new FormControl(this.current.getBusiness('city')?this.current.getBusiness('city'):""),
      country: new FormControl(this.current.getBusiness('country')?this.current.getBusiness('country'):"",[Validators.required]),
      street1: new FormControl(this.current.getBusiness('street1')?this.current.getBusiness('street1'):""),
      street2: new FormControl(this.current.getBusiness('street2')?this.current.getBusiness('street2'):""),
      street3: new FormControl(this.current.getBusiness('street3')?this.current.getBusiness('street3'):""),
      logo: new FormControl(this.current.getBusiness('logo')?this.current.getBusiness('logo'):"assets/logo/avatar.png"),
      tax_charge: new FormControl(this.current.getBusiness('tax_charge')?this.current.getBusiness('tax_charge'):"0.00"),
      currency_code: new FormControl(this.current.getBusiness('currency_code')?this.current.getBusiness('currency_code'):"Rwf")
    });
  }

  get phone() {
    return this.businessForm.get("phone");
  }
  get city() {
    return this.businessForm.get("city");
  }
  get country() {
    return this.businessForm.get("country");
  }
  get street1() {
    return this.businessForm.get("street1");
  }
  get logo() {
    return this.businessForm.get("logo");
  }
  get street2() {
    return this.businessForm.get("street2");
  }
  get street3() {
    return this.businessForm.get("street3");
  }
  get email() {
    return this.businessForm.get("email");
  }
  get name() {
    return this.businessForm.get("name");
  }
  get currency_code() {
    return this.businessForm.get("currency_code");
  }
  get tax_charge() {
    return this.businessForm.get("tax_charge");
  }
  get tin() {
    return this.businessForm.get("tin");
  }
  get address() {
    return this.businessForm.get("address");
  }
  get type() {
    return this.businessForm.get("type");
  }
  get category() {
    return this.businessForm.get("category");
  }

  get description() {
    return this.businessForm.get("description");
  }
  confirm(){
    this.v.errorMsg = "";
    if (this.businessForm.valid) {
      this.loading.next(true);
      this.v.response = [];
      this.businessForm.value.currency_code=this.businessForm.value.currency_code?this.businessForm.value.currency_code:'Rwf';
      this.businessForm.value.logo=this.businessForm.value.logo=="assets/logo/avatar.png"?null:this.businessForm.value.logo;
        if(!this.updating){
          return this.createBusiness();
        }else{
          return this.updateBusiness();
        }
    }
  }
  createBusiness() {
     this.api.create(this.businessForm.value) .pipe(finalize(() =>  this.loading.next(false)))
     .subscribe(res=>{
      this.bootstrapper.bootstrap(res.data);
         // TODO: Move this into auth service, so other components can re-use
         this.router.navigate(['admin']).then(navigated => {

          if (!navigated) {
              this.router.navigate(['admin']);
              this.v.webTitle('Admin -Flipper');
          }
          this.toast.open('Thank you for creating bussiness account on flipper!');
      });
     },error=>{
       if(error.status == 422){
           this.businessForm.setErrors({"wrong":"something wrong happened"});
        this.error='The business name already was taken!';
       }
     });

  }
  updateBusiness() {
   this.api.update(this.businessForm.value,this.current.getBusiness('id')) .pipe(finalize(() =>  this.loading.next(false)))
     .subscribe(res=>{
      this.bootstrapper.bootstrap(res.data);
      this.toast.open('Thank you for updating your bussiness!');
     },error=>{
       if(error.status == 422){
           this.businessForm.setErrors({"wrong":"something wrong happened"});
        this.error='The business name already was taken!';
       }
     });
    }
    uploadLogoModel() {
      this.modal.open(
        PopupImageCropperModelComponent,
          {title:'Logo'},
          'app-popup-image-cropper-model-container'
      ).beforeClose().subscribe(data => {
          if ( ! data) return;
          this.businessForm.get('logo').setValue(data);
      });
    }
}


