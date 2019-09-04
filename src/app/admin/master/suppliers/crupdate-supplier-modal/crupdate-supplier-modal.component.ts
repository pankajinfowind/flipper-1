import {Component, Inject, ViewEncapsulation, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { finalize } from 'rxjs/operators';
import { Toast } from '../../../../common/core/ui/toast.service';
import { ApiSupplierService } from '../api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { Supplier } from '../api/supplier';

export interface CrupdateSupplierModalData {
    supplier?: Supplier;
}

@Component({
    selector: 'crupdate-supplier-modal',
    templateUrl: './crupdate-supplier-modal.component.html',
    styleUrls: ['./crupdate-supplier-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CrupdateSupplierModalComponent implements OnInit {
    public supplierForm: FormGroup;
    public model:Supplier;
    public errors: any = {};
    public loading = new BehaviorSubject(false);
    /**
     * If we are updating existing Supplier or creating a new one.
     */
    public updating = false;

    constructor(
        private dialogRef: MatDialogRef<CrupdateSupplierModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CrupdateSupplierModalData,
        private api:ApiSupplierService,
        private toast: Toast
    ) {
        this.resetState();
    }

    ngOnInit() {
        this.resetState();

        if (this.data.supplier) {
            this.updating = true;
        } else {
            this.updating = false;
        }
        this.hydrateModel(this.data.supplier);
    }

    /**
     * Create a new user or update existing one.
     */
    public confirm() {
        if (!this.supplierForm.valid) return;
        let request, payload:Supplier = this.getPayload();

        this.loading.next(true);

        if (this.updating) {
            request = this.api.update(this.data.supplier.id, payload);
        } else {
            request = this.api.create(payload);
        }

        request.pipe(finalize(() => this.loading.next(false)))
            .subscribe(response => {
                this.close(response);
                const action = this.updating ? 'updated' : 'created';
                this.toast.open('Supplier has been ' + action);
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
        const payload:Supplier ={
          full_name:this.supplierForm.value.full_name,
          email:this.supplierForm.value.email,
          supplier_no:this.supplierForm.value.supplier_no,
          city:this.supplierForm.value.city,
          country:this.supplierForm.value.country,
          address:this.supplierForm.value.address,
          phone:this.supplierForm.value.phone,
          company:this.supplierForm.value.company
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
    private hydrateModel(supplier) {
      this.supplierForm = new FormGroup({
        full_name: new FormControl(supplier?supplier.full_name:"", [Validators.required]),
        email: new FormControl(supplier?supplier.email:"", [Validators.required,Validators.email]),
        supplier_no: new FormControl(supplier?supplier.supplier_no:""),
        city: new FormControl(supplier?supplier.city:""),
        country: new FormControl(supplier?supplier.country:""),
        phone: new FormControl(supplier?supplier.phone:""),
        address: new FormControl(supplier?supplier.address:""),
        company: new FormControl(supplier?supplier.company:"")
      });
    }

    /**
     * Format errors received from backend.
     */
    public handleErrors(response: {messages: object} = {messages: {}}) {
        this.errors = response.messages || {};
    }
      ///////////////////////////// Supplier
  get full_name() {
    return this.supplierForm.get("full_name");
  }
  get supplier_no() {
    return this.supplierForm.get("supplier_no");
  }
  get city() {
    return this.supplierForm.get("city");
  }
  get country() {
    return this.supplierForm.get("country");
  }
  get phone() {
    return this.supplierForm.get("phone");
  }
  get address() {
    return this.supplierForm.get("address");
  }
  get company() {
    return this.supplierForm.get("company");
  }
  get email() {
    return this.supplierForm.get("email");
  }
}
