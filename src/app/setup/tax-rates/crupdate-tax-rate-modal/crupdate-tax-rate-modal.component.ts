import {Component, Inject, ViewEncapsulation, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Toast } from '../../../common/core/ui/toast.service';
import { TAXRATE } from '../api/tax-rate';
import { ApiTaxRateService } from '../api/api.service';

export interface CrupdatTaxRateModalData {
  taxrate?: TAXRATE;
}

@Component({
  selector: 'crupdate-tax-rate-modal',
  templateUrl: './crupdate-tax-rate-modal.component.html',
  styleUrls: ['./crupdate-tax-rate-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CrupdateTaxRateModalComponent implements OnInit {
    public dataForm: FormGroup;
    public model:TAXRATE;
    public errors: any = {};
    public loading = new BehaviorSubject(false);
    /**
     * If we are updating existing TAXRATE or creating a new one.
     */
    public updating = false;
    /**
     * CrupdateCategoryModalComponent Constructor.
     */

    constructor(
        private dialogRef: MatDialogRef<CrupdateTaxRateModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CrupdatTaxRateModalData,
        private api:ApiTaxRateService,
        private toast: Toast
    ) {
        this.resetState();
    }

    ngOnInit() {
    
        this.resetState();
        if (this.data.taxrate) {
            this.updating = true;
        } else {
            this.updating = false;
        }
        this.hydrateModel(this.data.taxrate);
    }

    /**
     * Create a new user or update existing one.
     */
    public confirm() {
        if (!this.dataForm.valid) return;
        let request, payload:TAXRATE = this.getPayload();

        this.loading.next(true);

        if (this.updating) {
            request = this.api.update(this.data.taxrate.id, payload);
        } else {
            request = this.api.create(payload);
        }

        request.pipe(finalize(() => this.loading.next(false)))
            .subscribe(response => {
                this.close(response);
                const action = this.updating ? 'updated' : 'created';
                this.toast.open('Tax rate has been ' + action);
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
        const payload:TAXRATE ={
          name:this.dataForm.value.name,
          percentage:this.dataForm.value.percentage,
          description:this.dataForm.value.description,
          tax_code:this.dataForm.value.tax_code,
          tax_type:this.dataForm.value.tax_type
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
    private hydrateModel(taxrate) {
      const numberPatern = '^[0-9.,]+$';
      this.dataForm = new FormGroup({
        name: new FormControl(taxrate ? taxrate.name : "", [Validators.required]),
        description: new FormControl(taxrate ? taxrate.description : ""),
        tax_type: new FormControl(taxrate ? taxrate.tax_type :"Standard"),
        tax_code: new FormControl(taxrate ? taxrate.tax_code : "0"),
        percentage: new FormControl(taxrate ? taxrate.percentage : 0.00, [Validators.required, Validators.pattern(numberPatern)])
      });
    }

    /**
     * Format errors received from backend.
     */
    public handleErrors(response: {messages: object} = {messages: {}}) {
        this.errors = response.messages || {};
    }
      ///////////////////////////// TAXRATE
      get description() {
        return this.dataForm.get("description");
      }
      get name() {
        return this.dataForm.get("name");
      }

      get tax_type() {
        return this.dataForm.get("tax_type");
      }
      get tax_code() {
        return this.dataForm.get("tax_code");
      }
      get percentage() {
        return this.dataForm.get("percentage");
      }
}

