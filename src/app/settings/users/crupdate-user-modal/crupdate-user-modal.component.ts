import {Component, Inject, ViewEncapsulation, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { finalize } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ApiUserService } from '../api/api.service';
import { User } from '../../../common/core/types/models/User';
import { Toast } from '../../../common/core/ui/toast.service';
import { CurrentUser } from '../../../common/auth/current-user';

export interface CrupdatUserModalData {
    user?: User;
}

@Component({
    selector: 'crupdate-user-modal',
    templateUrl: './crupdate-user-modal.component.html',
    styleUrls: ['./crupdate-user-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CrupdateUserModalComponent implements OnInit {
    public userForm: FormGroup;
    public model:User;
    public errors: any = {};
    public loading = new BehaviorSubject(false);
    /**
     * If we are updating existing User or creating a new one.
     */
    public updating = false;

    /**
     * CrupdateUserModalComponent Constructor.
     */


    constructor(
        public current: CurrentUser,
        private dialogRef: MatDialogRef<CrupdateUserModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CrupdatUserModalData,
        private api:ApiUserService,
        private toast: Toast
    ) {
        this.resetState();
    }

    ngOnInit() {
        this.resetState();

        if (this.data.user) {
            this.updating = true;
        } else {
            this.updating = false;
        }
        this.hydrateModel(this.data.user);
    }

    /**
     * Create a new user or update existing one.
     */
    public confirm() {
        if (!this.userForm.valid) return;
        let request, payload:User = this.getPayload();

        this.loading.next(true);

        if (this.updating) {
            request = this.api.update(this.data.user.id, payload);
        } else {
            request = this.api.create(payload);
        }

        request.pipe(finalize(() => this.loading.next(false)))
            .subscribe(response => {
                const action = this.updating ? 'updated' : 'created';
                this.toast.open('User has been ' + action);
                return this.close("response");
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
        const payload:User ={
            first_name:this.userForm.value.first_name,
            last_name:this.userForm.value.last_name,
            email:this.userForm.value.email,
            phone:this.userForm.value.phone,
            role_id:this.userForm.value.role_id,
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
    private hydrateModel(user) {
      this.userForm = new FormGroup({
        first_name: new FormControl(user?user.first_name:"", [Validators.required]),
        last_name: new FormControl(user?user.last_name:"", [Validators.required]),
        email: new FormControl(user?user.email:"", [Validators.required,Validators.email]),
        phone: new FormControl(user?user.phone:"", [Validators.required]),
        role_id: new FormControl(user?user.role.id:"", [Validators.required])
      });
    }

    /**
     * Format errors received from backend.
     */
    public handleErrors(response: {messages: object} = {messages: {}}) {
        this.errors = response.messages || {};
    }
      ///////////////////////////// Phone

  get first_name() {
    return this.userForm.get("first_name");
  }
  get last_name() {
    return this.userForm.get("last_name");
  }

  get email() {
    return this.userForm.get("email");
  }
  get phone() {
    return this.userForm.get("phone");
  }
  get role_id(){
    return this.userForm.get("role_id");
  }
}
