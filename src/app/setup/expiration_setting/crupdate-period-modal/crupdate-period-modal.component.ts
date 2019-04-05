import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ExpirationSetting } from '../api/expiration_setting';
import { BehaviorSubject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Toast } from '../../../common/core/ui/toast.service';
import { finalize } from 'rxjs/operators';
import { ApiExpirationSettingService } from '../api/api.service';

export interface CrupdatePeriodModalData {
  period?: ExpirationSetting;
}
@Component({
  selector: 'crupdate-period-modal',
  templateUrl: './crupdate-period-modal.component.html',
  styleUrls: ['./crupdate-period-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CrupdatePeriodModalComponent  implements OnInit {
  public dataForm: FormGroup;
  public model:ExpirationSetting;
  public errors: any = {};
  public loading = new BehaviorSubject(false);
  /**
   * If we are updating existing ExpirationSetting or creating a new one.
   */
  public updating = false;
  /**
   * CrupdateCategoryModalComponent Constructor.
   */
  selectedValue: string;

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

  constructor(
      private dialogRef: MatDialogRef<CrupdatePeriodModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: CrupdatePeriodModalData,
      private api:ApiExpirationSettingService,
      private toast: Toast
  ) {
      this.resetState();
  }

  ngOnInit() {
      this.resetState();
      if (this.data.period) {
          this.updating = true;
      } else {
          this.updating = false;
      }
      this.hydrateModel(this.data.period);
  }

  /**
   * Create a new user or update existing one.
   */
  public confirm() {
      if (!this.dataForm.valid) return;
      let request, payload:ExpirationSetting = this.getPayload();

      this.loading.next(true);

      if (this.updating) {
          request = this.api.update(this.data.period.id, payload);
      } else {
          request = this.api.create(payload);
      }

      request.pipe(finalize(() => this.loading.next(false)))
          .subscribe(response => {
              this.close(response);
              const action = this.updating ? 'updated' : 'created';
              this.toast.open('Period has been ' + action);
          }, error => {
              this.handleErrors(error);
          });
  }

  /**
   * Close the modal.
   */
  public close(data?: any) {
      this.resetState();
      this.dialogRef.close(data);
  }

  /**
   * Get payload for updating or creating a user.
   */
  private getPayload() {
      const payload:ExpirationSetting ={
        name: this.dataForm.value.name?this.dataForm.value.name:'today',
        description: this.dataForm.value.description,
        color: this.dataForm.value.color?this.dataForm.value.color:'',
        period: this.dataForm.value.period?this.dataForm.value.period:'today',
        period_value: this.dataForm.value.period_value?this.dataForm.value.period_value:0
      }
      return payload;
  }

  /**
   * Reset all modal state to default.
   */
  private resetState() {
      this.errors = {};
  }

  /**
   * Populate user model with given data.
   */
  private hydrateModel(period) {
    const numberPatern = '^[0-9.,]+$';
    this.dataForm = new FormGroup({
      name: new FormControl(period ? period.name : "today"),
      description: new FormControl(period ? period.description : ""),
      period: new FormControl(period ? period.period :"today", [Validators.required]),
      color: new FormControl(period ? period.color : ""),
      period_value: new FormControl(period ? period.period_value : 0, [Validators.required, Validators.pattern(numberPatern)])
    });
  }

  /**
   * Format errors received from backend.
   */
  public handleErrors(response: {messages: object} = {messages: {}}) {
      this.errors = response.messages || {};
  }
    ///////////////////////////// ExpirationSetting
    get name() {
      return this.dataForm.get("name");
    }

    get description() {
      return this.dataForm.get("description");
    }

    get period() {
      return this.dataForm.get("period");
    }
    get period_value() {
      return this.dataForm.get("period_value");
    }
    get color() {
      return this.dataForm.get("color");
    }
    autoChange(period){
      if(!this.dataForm.get('name').valid){
        this.dataForm.get('name').setValue(period);
      }

    }
}
