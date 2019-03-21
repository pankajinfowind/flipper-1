import {Component, Inject, ViewEncapsulation, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { finalize } from 'rxjs/operators';
import { Toast } from '../../../../common/core/ui/toast.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Brand } from '../api/brand';
import { ApiBrandService } from '../api/api.service';

export interface CrupdatBrandModalData {
    brand?: Brand;
}

@Component({
    selector: 'crupdate-brand-modal',
    templateUrl: './crupdate-brand-modal.component.html',
    styleUrls: ['./crupdate-brand-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CrupdateBrandModalComponent implements OnInit {
    public brandForm: FormGroup;
    public model:Brand;
    public errors: any = {};
    public loading = new BehaviorSubject(false);
    /**
     * If we are updating existing brand or creating a new one.
     */
    public updating = false;

    /**
     * CrupdateBrandModalComponent Constructor.
     */


    constructor(
        private dialogRef: MatDialogRef<CrupdateBrandModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CrupdatBrandModalData,
        private api:ApiBrandService,
        private toast: Toast
    ) {
        this.resetState();
    }

    ngOnInit() {
        this.resetState();

        if (this.data.brand) {
            this.updating = true;
        } else {
            this.updating = false;
        }
        this.hydrateModel(this.data.brand);
    }

    /**
     * Create a new user or update existing one.
     */
    public confirm() {
        if (!this.brandForm.valid) return;
        let request, payload:Brand = this.getPayload();

        this.loading.next(true);

        if (this.updating) {
            request = this.api.update(this.data.brand.id, payload);
        } else {
            request = this.api.create(payload);
        }

        request.pipe(finalize(() => this.loading.next(false)))
            .subscribe(response => {
                this.close(response);
                const action = this.updating ? 'updated' : 'created';
                this.toast.open('Brand has been ' + action);
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
        const payload:Brand ={
             name:this.brandForm.value.name
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
    private hydrateModel(category) {
      this.brandForm = new FormGroup({
        name: new FormControl(category?category.name:"", [Validators.required])
      });
    }

    /**
     * Format errors received from backend.
     */
    public handleErrors(response: {messages: object} = {messages: {}}) {
        this.errors = response.messages || {};
    }
      ///////////////////////////// Category
  get name() {
    return this.brandForm.get("name");
  }

}
