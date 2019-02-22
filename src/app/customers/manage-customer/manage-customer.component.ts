import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Customer } from '../customer';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-customer',
  templateUrl: './manage-customer.component.html',
  styleUrls: ['./manage-customer.component.scss']
})
export class ManageCustomerComponent implements OnInit {
  @Output()
  closed: EventEmitter<boolean> = new EventEmitter(false);
@Input()
 data:Customer;
 @Input()
 action='add';
  need_to_add_new: boolean;
  cusomer_id=0;
  customerForm: FormGroup;
  titles:string[]=['Mr','Mrs'];
  constructor() { }

  ngOnInit() {
    this.customerFormData();
  }

  close(element: boolean) {
    this.closed.emit(element);
  }

  customerFormData(){
    if(this.action=='add'){
      this.need_to_add_new=true;
    }else{
      this.need_to_add_new=false;
    }

    this.cusomer_id=this.data.id?this.data.id:0;

    this.customerForm = new FormGroup({
      full_name: new FormControl(this.data?this.data.full_name:"", [Validators.required]),
      title: new FormControl(this.data?this.data.title:"", [Validators.required]),
      gender: new FormControl(this.data?this.data.gender:"", [Validators.required]),
      status: new FormControl(this.data?this.data.status:"", [Validators.required]),
      customer_no: new FormControl(this.data?this.data.customer_no:""),
      city: new FormControl(this.data?this.data.city:""),
      state: new FormControl(this.data?this.data.state:""),
      phone: new FormControl(this.data?this.data.phone:""),
      email: new FormControl(this.data?this.data.email:"")
    });
  }
  get full_name() {
    return this.customerForm.get("full_name");
  }
  get gender() {
    return this.customerForm.get("gender");
  }
  get status() {
    return this.customerForm.get("status");
  }
  get customer_no() {
    return this.customerForm.get("customer_no");
  }
  get city() {
    return this.customerForm.get("city");
  }
  get state() {
    return this.customerForm.get("state");
  }
  get title() {
    return this.customerForm.get("title");
  }
  get phone() {
    return this.customerForm.get("phone");
  }
  get email() {
    return this.customerForm.get("email");
  }

  onSubmitCustomer(){
    if (this.customerForm.valid) {

    }
  }
}
