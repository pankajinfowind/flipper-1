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
import { ApiTaxRateService } from '../../tax-rates/api/api.service';

@Component({
  selector: 'app-tax-rate-model',
  templateUrl: './tax-rate-model.component.html',
  styleUrls: ['./tax-rate-model.component.scss']
})
export class TaxRateModelComponent implements OnInit {
  setup$: Observable<SetUp>;
  taxtRateForm: FormGroup;
  public loading = new BehaviorSubject(false);
  details$: Observable<Details>;
  need_to_add_new: boolean = true;
  business: Business;
  tax_rate_id:number;
  numberPatern = '^[0-9.]+$';
  tax_types: string[];

  constructor(public currentUser: CurrentUser, private setupModelService: SetUpModelService, private toast: Toast, private api: ApiTaxRateService, private detailsService: DetailsService) { }


  ngOnInit() {
    this.business = this.currentUser.get('business')[0];
    this.tax_types = ['Standard'];
    this.setup$ = this.setupModelService.setup$;
    this.details$ = this.detailsService.details$;

    this.loadingFormGroup();
  }

  loadingFormGroup() {
    this.details$.subscribe(res => {
      if (res.action == 'new') {
        this.need_to_add_new = true;
      } else {
        this.need_to_add_new = false;
      }
      this.tax_rate_id = res.sender_data ? res.sender_data.tax_rate_id : 0;
      this.taxtRateForm = new FormGroup({
        name: new FormControl(res.sender_data ? res.sender_data.name : "", [Validators.required]),
        description: new FormControl(res.sender_data ? res.sender_data.description : ""),
        tax_type: new FormControl(res.sender_data ? res.sender_data.tax_type :"", [Validators.required]),
        tax_code: new FormControl(res.sender_data ? res.sender_data.tax_code : "", [Validators.required]),
        percentage: new FormControl(res.sender_data ? res.sender_data.percentage : 0.00, [Validators.required, Validators.pattern(this.numberPatern)])
      });
    });
  }


  ///////////////////////////// Item
  get name() {
    return this.taxtRateForm.get("name");
  }

  get description() {
    return this.taxtRateForm.get("description");
  }

  get tax_type() {
    return this.taxtRateForm.get("tax_type");
  }
  get tax_code() {
    return this.taxtRateForm.get("tax_code");
  }
  get percentage() {
    return this.taxtRateForm.get("percentage");
  }

  saveTaxRate() {
    if (this.taxtRateForm.valid) {
      this.loading.next(true)
      const data = {
        name: this.taxtRateForm.value.name,
        description: this.taxtRateForm.value.description,
        tax_type: this.taxtRateForm.value.tax_type,
        tax_code: this.taxtRateForm.value.tax_code,
        percentage: this.taxtRateForm.value.percentage
      };
      return this.need_to_add_new ? this.create(data) : this.update(data, this.tax_rate_id);
    }
  }


  create(data) {
    this.api.create(data).pipe(finalize(() => this.loading.next(false))).subscribe(
      res => {

        // if (res.status == 'success') {
        //   this.toast.open('Tax rate added Successfully!');
        //   this.loadingFormGroup();

        //   this.setupModelService.update({ loading: false, taxRates: res["taxrates"]["data"] ? res["taxrates"]["data"] : [] });
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
        //   this.toast.open('Tax rate  updated Successfully!');
        //   this.loadingFormGroup();
        //   this.setupModelService.update({ loading: false, taxRates: res["taxrates"]["data"] ? res["taxrates"]["data"] : [] });
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
