import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GlobalVariables } from '../../common/core/global-variables';
import { ApiService } from '../api/api.service';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

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
  public loading = new BehaviorSubject(false);
  types: SelectorBox[] = [
    {value: 'pharamcy', viewValue: 'Pharamcy'},
    {value: 'resto', viewValue: 'Restaurant'},
    {value: 'shop', viewValue: 'Shop'}
  ];
  constructor(
    public dialog: MatDialog,
    private api: ApiService,
     public v: GlobalVariables
  ) {
    this.v.webTitle("Create - Business");
  }

  ngOnInit() {
    this.businessForm = new FormGroup({
      name: new FormControl("", [Validators.required]),
      type: new FormControl("", [Validators.required]),
      address: new FormControl(""),
      description: new FormControl(""),
      tin: new FormControl(""),
      tax_charge: new FormControl(""),
      currency_code: new FormControl("")
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
     this.api.create(this.businessForm.value) .pipe(finalize(() =>  this.loading.next(false)))
     .subscribe(res=>{
       console.log(res);
     });
    }
  }
}


