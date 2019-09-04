import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { SetUp } from '../../setup';
import { Details } from '../../../details/details';
import { Business } from '../../../business/api/business';
import { CurrentUser } from '../../../common/auth/current-user';
import { Toast } from '../../../common/core/ui/toast.service';
import { DetailsService } from '../../../details/details.service';
import { SetUpModelService } from '../../setup-model.service';
import { ApiExpirationSettingService } from '../../expiration_setting/api/api.service';

@Component({
  selector: 'app-expiration-setting-model',
  templateUrl: './expiration-setting-model.component.html',
  styleUrls: ['./expiration-setting-model.component.scss']
})
export class ExpirationSettingModelComponent implements OnInit {
  setup$: Observable<SetUp>;
  expirationSettingForm: FormGroup;
  public loading = new BehaviorSubject(false);
  details$: Observable<Details>;
  need_to_add_new: boolean = true;
  business: Business;
  expiration_setting_id:number;
  numberPatern = '^[0-9.]+$';
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

  periods:any = [
    {value:'today',valueName:'Today'},
    {value:'yestarday',valueName:'Yestarday'},
    {value:'tomorrow',valueName:'Tomorrow'}
    ,{value:'day',valueName:'Day'}
    ,{value:'week',valueName:'week'}
    ,{value:'month',valueName:'Month'}
    ,{value:'year',valueName:'Year'}
  ];

  constructor(public currentUser: CurrentUser, private setupModelService: SetUpModelService, private toast: Toast, private api:ApiExpirationSettingService, private detailsService: DetailsService) { }


  ngOnInit() {
    this.setup$ = this.setupModelService.setup$;
    this.details$ = this.detailsService.details$;

    this.loadingFormGroup();
  }

autoChange(event){
  const inputed_value=event.target.value;
  if(!this.expirationSettingForm.get('name').valid){
    this.expirationSettingForm.get('name').setValue(inputed_value);
  }

}

  loadingFormGroup() {
    this.details$.subscribe(res => {
      if (res.action == 'new') {
        this.need_to_add_new = true;
      } else {
        this.need_to_add_new = false;
      }
      this.expiration_setting_id = res.sender_data ? res.sender_data.id : 0;
      this.expirationSettingForm = new FormGroup({
        name: new FormControl(res.sender_data ? res.sender_data.name : "", [Validators.required]),
        description: new FormControl(res.sender_data ? res.sender_data.description : ""),
        period: new FormControl(res.sender_data ? res.sender_data.period :"", [Validators.required]),
        color: new FormControl(res.sender_data ? res.sender_data.tax_code : "", [Validators.required]),
        period_value: new FormControl(res.sender_data ? res.sender_data.period_value : 0, [Validators.required, Validators.pattern(this.numberPatern)])
      });
    });
  }


  ///////////////////////////// Item
  get name() {
    return this.expirationSettingForm.get("name");
  }

  get description() {
    return this.expirationSettingForm.get("description");
  }

  get period() {
    return this.expirationSettingForm.get("period");
  }
  get period_value() {
    return this.expirationSettingForm.get("period_value");
  }
  get color() {
    return this.expirationSettingForm.get("color");
  }


  saveExpirationSetting() {
    if (this.expirationSettingForm.valid) {
      this.loading.next(true)
      const data = {
        name: this.expirationSettingForm.value.name,
        description: this.expirationSettingForm.value.description,
        color: this.expirationSettingForm.value.color,
        period: this.expirationSettingForm.value.period,
        period_value: this.expirationSettingForm.value.period_value
      };
      return this.need_to_add_new ? this.create(data) : this.update(data, this.expiration_setting_id);
    }
  }


  create(data) {
    this.api.create(data).pipe(finalize(() => this.loading.next(false))).subscribe(
      res => {

        // if (res.status == 'success') {
        //   this.toast.open(' Added Successfully!');
        //   this.loadingFormGroup();

        //   this.setupModelService.update({ loading: false, expirationSetting: res["expiration_setting"]["data"] ? res["expiration_setting"]["data"] : [] });
        // }
      },
      _error => {
        console.error(_error);
      }
    );
  }
  update(data, id) {
    this.api.update(data, id).pipe(finalize(() => this.loading.next(false))).subscribe(
      res => {
        // if (res.status == 'success') {
        //   this.toast.open('Updated Successfully!');
        //   this.loadingFormGroup();
        //   this.setupModelService.update({ loading: false, expirationSetting: res["expiration_setting"]["data"] ? res["expiration_setting"]["data"] : [] });
        //   this.close();
        // }
      },
      _error => {
        console.error(_error);
      }
    );
  }


  close() {
    this.detailsService.update({ title: null, receriver_data: null, sender_data: null, module: null, component: null, action: null, detailsVisible: false });
  }

}
