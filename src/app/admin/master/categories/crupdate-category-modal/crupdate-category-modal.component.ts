import {Component, Inject, ViewEncapsulation, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import { finalize } from 'rxjs/operators';
import { Category } from '../api/category';
import { Toast } from '../../../../common/core/ui/toast.service';
import { ApiCategoryService } from '../api/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

export interface CrupdatCategoryModalData {
    category?: Category;
}

@Component({
    selector: 'crupdate-category-modal',
    templateUrl: './crupdate-category-modal.component.html',
    styleUrls: ['./crupdate-category-modal.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class CrupdateCategoryModalComponent implements OnInit {
    public cateogryForm: FormGroup;
    public model:Category;
    public errors: any = {};
    public loading = new BehaviorSubject(false);
    /**
     * If we are updating existing category or creating a new one.
     */
    public updating = false;


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

    /**
     * CrupdateCategoryModalComponent Constructor.
     */

    constructor(
        private dialogRef: MatDialogRef<CrupdateCategoryModalComponent>,
        @Inject(MAT_DIALOG_DATA) public data: CrupdatCategoryModalData,
        private api:ApiCategoryService,
        private toast: Toast
    ) {
        this.resetState();
    }

    ngOnInit() {
        this.resetState();

        if (this.data.category) {
            this.updating = true;
        } else {
            this.updating = false;
        }
        this.hydrateModel(this.data.category);
    }

    /**
     * Create a new user or update existing one.
     */
    public confirm() {
        if (!this.cateogryForm.valid) return;
        let request, payload:Category = this.getPayload();

        this.loading.next(true);

        if (this.updating) {
            request = this.api.update(this.data.category.id, payload);
        } else {
            request = this.api.create(payload);
        }

        request.pipe(finalize(() => this.loading.next(false)))
            .subscribe(response => {
                this.close(response);
                const action = this.updating ? 'updated' : 'created';
                this.toast.open('Category has been ' + action);
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
        const payload:Category ={
          name:this.cateogryForm.value.name,
          color:this.cateogryForm.value.color
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
      this.cateogryForm = new FormGroup({
        name: new FormControl(category?category.name:"", [Validators.required]),
        color: new FormControl(category?category.color:"", [Validators.required])
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
    return this.cateogryForm.get("name");
  }
  get color() {
    return this.cateogryForm.get("color");
  }
}
