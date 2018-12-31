import { Component, OnInit } from '@angular/core';
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
  public loading = new BehaviorSubject(false);
  types: SelectorBox[] = [
    {value: 'pharmacy', viewValue: 'Pharmacy'},
    {value: 'resto', viewValue: 'Restaurant'},
    {value: 'shop', viewValue: 'Shop'}
  ];
  constructor(private current:CurrentUser,
    private bootstrapper: Bootstrapper,
    public dialog: MatDialog,
    private api: ApiService,
     public v: GlobalVariables,
     private router: Router,
     private toast: Toast
  ) {
    this.v.webTitle("Create - Business");
  }

  ngOnInit() {
    this.businessForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      address: new FormControl("",[Validators.required]),
      description: new FormControl(""),
      tin: new FormControl(""),
      tax_charge: new FormControl(""),
      currency_code: new FormControl("Rwf")
    });
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

  get description() {
    return this.businessForm.get("description");
  }
  createBusiness() {
    this.v.errorMsg = "";
    if (this.businessForm.valid) {
      this.loading.next(true);
      this.v.response = [];
      this.businessForm.value.currency_code=this.businessForm.value.currency_code?this.businessForm.value.currency_code:'Rwf';
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
  }
}


