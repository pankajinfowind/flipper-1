import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
import { Business } from '../api/business';
import { Modal } from '../../common/core/ui/dialogs/modal.service';
import { PopupImageCropperModelComponent } from '../../image-cropper/popup-image-cropper-model/popup-image-cropper-model.component';

export interface SelectorBox {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-new-business',
  templateUrl: './new-business.component.html',
  styleUrls: ['./new-business.component.scss']
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
  business: Business;

  constructor(private current:CurrentUser,
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
    this.business=this.current.get('business')[0];
    if (this.business) {
      this.updating = true;
  } else {
      this.updating = false;
  }
  this.v.webTitle(this.updating?"Update - Business":"Create - Business");
    this._countries=this.countries();
    this._currencies=this.currencies();
    this.hydrateModel(this.business);

  }
  private hydrateModel(business) {
    this.businessForm = new FormGroup({
      name: new FormControl(business?business.name:"", [Validators.required]),
      type: new FormControl(business?business.type:"", [Validators.required]),
      address: new FormControl(business?business.address:"",[Validators.required]),
      category: new FormControl(business?business.category:"",[Validators.required]),
      description: new FormControl(business?business.description:""),
      tin: new FormControl(business?business.tin:""),
      phone: new FormControl(business?business.phone:""),
      email: new FormControl(business?business.email:"",[Validators.required, Validators.email]),
      city: new FormControl(business?business.city:""),
      country: new FormControl(business?business.country:"",[Validators.required]),
      street1: new FormControl(business?business.street1:""),
      street2: new FormControl(business?business.street2:""),
      street3: new FormControl(business?business.street3:""),
      logo: new FormControl(business?business.logo?business.logo:"assets/logo/avatar.png":"assets/logo/avatar.png"),
      tax_charge: new FormControl(business?business.tax_charge:"0.00"),
      currency_code: new FormControl(business?business.currency_code:"Rwf")
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
   this.api.update(this.businessForm.value, this.business.id) .pipe(finalize(() =>  this.loading.next(false)))
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


