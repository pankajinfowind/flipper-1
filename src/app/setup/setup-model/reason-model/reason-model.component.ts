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
import { ApiReasonService } from '../../reasons/api/api.service';

@Component({
  selector: 'app-reason-model',
  templateUrl: './reason-model.component.html',
  styleUrls: ['./reason-model.component.scss']
})
export class ReasonModelComponent implements OnInit {
  setup$: Observable<SetUp>;
  reasonForm: FormGroup;
  public loading = new BehaviorSubject(false);
  details$: Observable<Details>;
  need_to_add_new: boolean = true;
  business: Business;
  reason_id:number;
  numberPatern = '^[0-9.]+$';
  stock_reason_status: string[];
  reason:string='';
  constructor(public currentUser: CurrentUser, private setupModelService: SetUpModelService, private toast: Toast, private api: ApiReasonService, private detailsService: DetailsService) { }


  ngOnInit() {
    this.business = this.currentUser.get('business')[0];
    this.stock_reason_status = ['add','remove'];
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
      this.reason_id = res.sender_data ? res.sender_data.reason_id : 0;
      this.reason=res.reason;
      this.reasonForm = new FormGroup({
        name: new FormControl(res.sender_data ? res.sender_data.name : "", [Validators.required]),
        description: new FormControl(res.sender_data ? res.sender_data.description : ""),
        reason_type: new FormControl(res.sender_data ? res.sender_data.reason_type :res.reason),
        return_to_stock: new FormControl(res.sender_data ? res.sender_data.return_to_stock : false),
        stock_movements_status: new FormControl(res.sender_data ? res.sender_data.stock_movements_status : 'add'),
        discount_value: new FormControl(res.sender_data ? res.sender_data.discount_value : 0.00, [Validators.required, Validators.pattern(this.numberPatern)])
      });
    });
  }


  ///////////////////////////// Item
  get name() {
    return this.reasonForm.get("name");
  }

  get description() {
    return this.reasonForm.get("description");
  }

  get reason_type() {
    return this.reasonForm.get("reason_type");
  }
  get discount_value() {
    return this.reasonForm.get("discount_value");
  }
  get return_to_stock() {
    return this.reasonForm.get("return_to_stock");
  }
  get stock_movements_status() {
    return this.reasonForm.get("stock_movements_status");
  }

  saveReason() {
    if (this.reasonForm.valid) {
      this.loading.next(true)
      const data = {
        name: this.reasonForm.value.name,
        description: this.reasonForm.value.description,
        reason_type: this.reasonForm.value.reason_type,
        discount_value: this.reasonForm.value.discount_value?this.reasonForm.value.discount_value:0,
        return_to_stock: this.reasonForm.value.return_to_stock?this.reasonForm.value.return_to_stock:0,
        stock_movements_status: this.reasonForm.value.stock_movements_status?this.reasonForm.value.stock_movements_status:'add'
      };
      return this.need_to_add_new ? this.create(data) : this.update(data, this.reason_id);
    }
  }


  create(data) {
    this.api.create(data).pipe(finalize(() => this.loading.next(false))).subscribe(
      res => {

        // if (res.status == 'success') {
        //   this.toast.open('Reason added Successfully!');
        //   this.loadingFormGroup();

        //   this.setupModelService.update({ loading: false, reasons: res["reasons"]["data"] ? res["reasons"]["data"] : [] });
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
        //   this.toast.open('Reason  updated Successfully!');
        //   this.loadingFormGroup();
        //   this.setupModelService.update({ loading: false, reasons: res["reasons"]["data"] ? res["reasons"]["data"] : [] });
        //   this.close();
        // }
      },
      _error => {
        console.error(_error);
      }
    );
  }


  close() {
    this.detailsService.update({ title: null, receriver_data: null, sender_data: null, module: null, component: null, action: null, detailsVisible: false,reason:null });
  }

}
