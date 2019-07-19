import {Component, Inject, ViewEncapsulation, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { finalize } from 'rxjs/operators';
import { Toast } from '../../../../common/core/ui/toast.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ApiBranchService } from '../api/api.service';
import { Branch } from '../api/branch';

export interface CrupdatBranchModalData {
    branch?: Branch;
}

@Component({
    selector: 'crupdate-branch-modal',
    templateUrl: './crupdate-branch-modal.component.html',
    styleUrls: ['./crupdate-branch-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CrupdateBranchModalComponent implements OnInit {
    public branchForm: FormGroup;
    public model:Branch;
    public errors: any = {};
    public loading = new BehaviorSubject(false);
    /**
     * If we are updating existing Branch or creating a new one.
     */
    public updating = false;

    /**
     * CrupdateBranchModalComponent Constructor.
     */


    constructor(
        private dialogRef: MatDialogRef<CrupdateBranchModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CrupdatBranchModalData,
        private api:ApiBranchService,
        private toast: Toast
    ) {
        this.resetState();
    }

    ngOnInit() {
        this.resetState();

        if (this.data.branch) {
            this.updating = true;
        } else {
            this.updating = false;
        }
        this.hydrateModel(this.data.branch);
    }

    /**
     * Create a new user or update existing one.
     */
    public confirm() {
        if (!this.branchForm.valid) return;
        let request, payload:Branch = this.getPayload();

        this.loading.next(true);

        if (this.updating) {
            request = this.api.update(this.data.branch.branch_id, payload);
        } else {
            request = this.api.create(payload);
        }

        request.pipe(finalize(() => this.loading.next(false)))
            .subscribe(response => {
                this.close(response);
                const action = this.updating ? 'updated' : 'created';
                this.toast.open('Branch has been ' + action);
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
        const payload:Branch ={
             name:this.branchForm.value.name
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
      this.branchForm = new FormGroup({
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
    return this.branchForm.get("name");
  }

}
