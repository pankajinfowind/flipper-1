import { Component, OnInit, Inject } from '@angular/core';
import { Customer } from '../customer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { finalize } from 'rxjs/operators';
import { CustomerService } from '../customer.service';
import { Toast } from '../../common/core/ui/toast.service';
import { Modal } from '../../common/core/ui/dialogs/modal.service';
import { SelectCustomerTypeModalComponent } from '../../setup/select-customer-type-modal/select-customer-type-modal.component';
export interface CrupdatCustomerModalData {
  customer?: Customer;
}

@Component({
  selector: 'crupdate-customer-modal',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class CrupdateCustomerModelComponent implements OnInit {
  dataForm: FormGroup;
  public model:Customer;
  public errors: any = {};
  public loading = new BehaviorSubject(false);
  /**
   * If we are updating existing customer or creating a new one.
   */
  public updating = false;
  statuss:string[]=['Single','Married'];
  genders:string[]=['Male','Female'];
  titles:string[]=['Mr','Mrs'];
  constructor(
    private api:CustomerService,
    private dialogRef: MatDialogRef<CrupdateCustomerModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CrupdatCustomerModalData,
    private toast: Toast,private modal: Modal) {
    this.resetState();
  }


  ngOnInit() {
    this.resetState();

    if (this.data.customer) {
        this.updating = true;
    } else {
        this.updating = false;
    }
    this.hydrateModel(this.data.customer);
}

 /**
     * Close the modal.
     */
    public close(data?: any) {
      this.resetState();
      this.dialogRef.close(data);
  }
  private getPayload() {
    const payload:Customer ={
      full_name:this.dataForm.value.full_name,
      title:this.dataForm.value.title,
      gender: this.dataForm.value.gender,
      status: this.dataForm.value.status,
      customer_type_id: this.dataForm.value.customer_type_id?this.dataForm.value.customer_type_id:null,
      customer_no: this.dataForm.value.customer_no,
      city: this.dataForm.value.city,
      state: this.dataForm.value.state,
      country: this.dataForm.value.country,
      phone: this.dataForm.value.phone,
      email: this.dataForm.value.email,
      address: this.dataForm.value.address,
      dob:this.dataForm.value.dob,
      beneficiary:this.dataForm.value.beneficiary,
      department:this.dataForm.value.department,
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
  private hydrateModel(customer) {
    this.dataForm = new FormGroup({
      full_name: new FormControl(customer?customer.full_name:"", [Validators.required]),
      title: new FormControl(customer?customer.title:"", [Validators.required]),
      gender: new FormControl(customer?customer.gender:"", [Validators.required]),
      status: new FormControl(customer?customer.status:"", [Validators.required]),
      customer_type_id: new FormControl(customer?customer.customer_type_id:null),
      customer_type: new FormControl(customer?customer.customer_type?customer.customer_type.name:null:null),
      customer_no: new FormControl(customer?customer.customer_no:""),
      city: new FormControl(customer?customer.city:""),
      state: new FormControl(customer?customer.state:""),
      country: new FormControl(customer?customer.country:""),
      phone: new FormControl(customer?customer.phone:""),
      email: new FormControl(customer?customer.email:""),
      address: new FormControl(customer?customer.address:""),
      dob:new FormControl(customer?customer.dob:""),
      beneficiary:new FormControl(customer?customer.beneficiary:""),
      department:new FormControl(customer?customer.department:""),
    });
  }

  /**
   * Format errors received from backend.
   */
  public handleErrors(response: {messages: object} = {messages: {}}) {
      this.errors = response.messages || {};
  }

  get beneficiary() {
    return this.dataForm.get("beneficiary");
  }
  get department() {
    return this.dataForm.get("department");
  }
  get full_name() {
    return this.dataForm.get("full_name");
  }
  get country() {
    return this.dataForm.get("country");
  }
  get gender() {
    return this.dataForm.get("gender");
  }
  get status() {
    return this.dataForm.get("status");
  }
  get customer_no() {
    return this.dataForm.get("customer_no");
  }
  get city() {
    return this.dataForm.get("city");
  }
  get state() {
    return this.dataForm.get("state");
  }
  get title() {
    return this.dataForm.get("title");
  }
  get phone() {
    return this.dataForm.get("phone");
  }
  get email() {
    return this.dataForm.get("email");
  }
  get customer_type_id(){
    return this.dataForm.get("customer_type_id");
  }
  get customer_type(){
    return this.dataForm.get("customer_type");
  }
  get address(){
    return this.dataForm.get("address");
  }
  get dob(){
    return this.dataForm.get("dob");
  }

  public confirm() {
    if (!this.dataForm.valid) return;
    let request, payload: Customer = this.getPayload();

    this.loading.next(true);

    if (this.updating) {
        request = this.api.update(this.data.customer.id, payload);
    } else {
        request = this.api.create(payload);
    }

    request.pipe(finalize(() => this.loading.next(false)))
        .subscribe(response => {
            this.close(response);
            const action = this.updating ? 'updated' : 'created';
            this.toast.open('Customer has been ' + action);
        }, error => {
            this.handleErrors(error);
        });
}
showChooseCustomerTypeModal() {
  this.modal.open(
    SelectCustomerTypeModalComponent,
      {enabled:true,
        customer_type_id:this.dataForm.value.customer_type_id?this.dataForm.value.customer_type_id:null},
      'select-customer-type-modal'
  ).beforeClose().subscribe(data => {
      if ( ! data) return;
      this.dataForm.get('customer_type_id').setValue(data.id);
      this.dataForm.get('customer_type').setValue(data.name+'('+data.discount_value+'%)');
  });
}
}
