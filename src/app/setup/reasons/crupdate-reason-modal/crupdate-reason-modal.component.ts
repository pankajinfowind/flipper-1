import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Reason } from '../api/reason';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Toast } from '../../../common/core/ui/toast.service';
import { finalize } from 'rxjs/operators';
import { ApiReasonService } from '../api/api.service';

export interface CrupdatReasonTypeModalData {
    reason?: Reason;
    reasonType?:string;
    reasonName?:string

}


@Component({
  selector: 'crupdate-reason-modal',
  templateUrl: './crupdate-reason-modal.component.html',
  styleUrls: ['./crupdate-reason-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CrupdateReasonModalComponent  implements OnInit {
  public dataForm: FormGroup;
  public model:Reason;
  public errors: any = {};
  public loading = new BehaviorSubject(false);
  /**
   * If we are updating existing Reason or creating a new one.
   */
  public updating = false;
  /**
   * CrupdateCategoryModalComponent Constructor.
   */
  stock_reason_status: string[];
  reason:string='stock_movements';
  reasonName:string='Reason';
  constructor(
      private dialogRef: MatDialogRef<CrupdateReasonModalComponent>,
      @Inject(MAT_DIALOG_DATA) public data: CrupdatReasonTypeModalData,
      private api:ApiReasonService,
      private toast: Toast
  ) {
      this.resetState();
  }

  ngOnInit() {
      this.resetState();
      if (this.data.reason) {
          this.updating = true;
      } else {
          this.updating = false;
      }
      this.hydrateModel(this.data.reason);
  }

  /**
   * Create a new user or update existing one.
   */
  public confirm() {
      if (!this.dataForm.valid) return;
      let request, payload:Reason = this.getPayload();

      this.loading.next(true);

      if (this.updating) {
          request = this.api.update(this.data.reason.id, payload);
      } else {
          request = this.api.create(payload);
      }

      request.pipe(finalize(() => this.loading.next(false)))
          .subscribe(response => {
              this.close(response);
              const action = this.updating ? 'updated' : 'created';
              this.toast.open('Reason has been ' + action);
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
      const payload:Reason ={
        name:this.dataForm.value.name,
        return_to_stock:this.dataForm.value.return_to_stock?this.dataForm.value.return_to_stock:0,
        description:this.dataForm.value.description,
        stock_movements_status:this.dataForm.value.stock_movements_status?this.dataForm.value.stock_movements_status:'add',
        discount_value:this.dataForm.value.discount_value?this.dataForm.value.discount_value:0,
        reason_type:this.dataForm.value.reason_type?this.dataForm.value.reason_type:this.data.reasonType,
      }
      return payload;
  }

  /**
   * Reset all modal state to default.
   */
  private resetState() {
      this.errors = {};
      this.stock_reason_status = ['add','remove'];
      this.reason=this.data.reasonType;
      this.reasonName=this.data.reasonName;
  }

  /**
   * Populate user model with given data.
   */
  private hydrateModel(reason) {
    const numberPatern = '^[0-9.,]+$';
    this.dataForm = new FormGroup({
      name: new FormControl(reason ? reason.name : "", [Validators.required]),
      description: new FormControl(reason ? reason.description : ""),
      reason_type: new FormControl(reason ? reason.reason_type :this.data.reasonType),
      return_to_stock: new FormControl(reason ? reason.return_to_stock : false),
      stock_movements_status: new FormControl(reason ? reason.stock_movements_status : 'add'),
      discount_value: new FormControl(reason ? reason.discount_value : 0.00, [Validators.required, Validators.pattern(numberPatern)])
    });
  }

  /**
   * Format errors received from backend.
   */
  public handleErrors(response: {messages: object} = {messages: {}}) {
      this.errors = response.messages || {};
  }
  get name() {
    return this.dataForm.get("name");
  }

  get description() {
    return this.dataForm.get("description");
  }

  get reason_type() {
    return this.dataForm.get("reason_type");
  }
  get discount_value() {
    return this.dataForm.get("discount_value");
  }
  get return_to_stock() {
    return this.dataForm.get("return_to_stock");
  }
  get stock_movements_status() {
    return this.dataForm.get("stock_movements_status");
  }
}

