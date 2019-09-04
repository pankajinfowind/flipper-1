import {Component, Inject, ViewEncapsulation, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { finalize } from 'rxjs/operators';
import { ApiCustomerTypeService } from '../api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { CustomerType } from '../api/CustomerType';
import { Toast } from '../../../common/core/ui/toast.service';

export interface CrupdatCustomerTypeModalData {
  customertype?: CustomerType;
}

@Component({
    selector: 'crupdate-customer-type-modal',
    templateUrl: './crupdate-customer-type-modal.component.html',
    styleUrls: ['./crupdate-customer-type-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CrupdateCustomerTypeModalComponent implements OnInit {
    public dataForm: FormGroup;
    public model:CustomerType;
    public errors: any = {};
    public loading = new BehaviorSubject(false);
    /**
     * If we are updating existing CustomerType or creating a new one.
     */
    public updating = false;
    /**
     * CrupdateCategoryModalComponent Constructor.
     */

    constructor(
        private dialogRef: MatDialogRef<CrupdateCustomerTypeModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CrupdatCustomerTypeModalData,
        private api:ApiCustomerTypeService,
        private toast: Toast
    ) {
        this.resetState();
    }

    ngOnInit() {
        this.resetState();
        if (this.data.customertype) {
            this.updating = true;
        } else {
            this.updating = false;
        }
        this.hydrateModel(this.data.customertype);
    }

    /**
     * Create a new user or update existing one.
     */
    public confirm() {
        if (!this.dataForm.valid) return;
        let request, payload:CustomerType = this.getPayload();

        this.loading.next(true);

        if (this.updating) {
            request = this.api.update(this.data.customertype.id, payload);
        } else {
            request = this.api.create(payload);
        }

        request.pipe(finalize(() => this.loading.next(false)))
            .subscribe(response => {
                this.close(response);
                const action = this.updating ? 'updated' : 'created';
                this.toast.open('Customer type has been ' + action);
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
        const payload:CustomerType ={
          name:this.dataForm.value.name,
          discount_value:this.dataForm.value.discount_value,
          description:this.dataForm.value.description
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
    private hydrateModel(customertype) {
      const numberPatern = '^[0-9.,]+$';
      this.dataForm = new FormGroup({
        name: new FormControl(customertype?customertype.name:"", [Validators.required]),
        description: new FormControl(customertype?customertype.description:""),
        discount_value: new FormControl(customertype?customertype.discount_value:0.00, [Validators.required,Validators.pattern(numberPatern)]),
      });
    }

    /**
     * Format errors received from backend.
     */
    public handleErrors(response: {messages: object} = {messages: {}}) {
        this.errors = response.messages || {};
    }
      ///////////////////////////// CustomerType
  get name() {
    return this.dataForm.get("name");
  }
  get description() {
    return this.dataForm.get("description");
  }
  get discount_value() {
    return this.dataForm.get("discount_value");
  }
}
