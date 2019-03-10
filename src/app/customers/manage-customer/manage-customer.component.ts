import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Customer } from '../customer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SetUpModelService } from '../../setup/setup-model.service';
import { Observable } from 'rxjs';
import { SetUp } from '../../setup/setup';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';

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
  statuss:string[]=['Single','Married'];
  genders:string[]=['Male','Female'];
  setup$: Observable<SetUp>;
  loading$:Observable<boolean>;
  loaded$:Observable<boolean>;
  isSuccess$:Observable<boolean>;
  constructor(private setupModelService: SetUpModelService,private store:Store<fromStore.FlipperState>,) {
    this.customerFormData();
  }

  ngOnInit() {
    this.setup$ = this.setupModelService.setup$;
    this.loading$=this.store.select(fromStore.getCustomersLoading);
    this.loaded$=this.store.select(fromStore.getCustomersLoaded);
     this.isSuccess$=this.store.select(fromStore.isCustomerSuccess);
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

     this.cusomer_id=this.data?this.data.id:0;

    this.customerForm = new FormGroup({
      full_name: new FormControl(this.data?this.data.full_name:"", [Validators.required]),
      title: new FormControl(this.data?this.data.title:"", [Validators.required]),
      gender: new FormControl(this.data?this.data.gender:"", [Validators.required]),
      status: new FormControl(this.data?this.data.status:"", [Validators.required]),
      customer_type_id: new FormControl(this.data?this.data.customer_type_id:0, [Validators.required]),
      customer_no: new FormControl(this.data?this.data.customer_no:""),
      city: new FormControl(this.data?this.data.city:""),
      state: new FormControl(this.data?this.data.state:""),
      country: new FormControl(this.data?this.data.country:""),
      phone: new FormControl(this.data?this.data.phone:""),
      email: new FormControl(this.data?this.data.email:""),
      address: new FormControl(this.data?this.data.address:"")
    });
  }
  get full_name() {
    return this.customerForm.get("full_name");
  }
  get country() {
    return this.customerForm.get("country");
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
  get customer_type_id(){
    return this.customerForm.get("customer_type_id");
  }
  get address(){
    return this.customerForm.get("address");
  }

  onSubmitCustomer(){
    if (this.customerForm.valid) {
      return this.need_to_add_new?this.create(this.customerForm.value):this.update(this.customerForm.value);
    }
  }

  create(form_data:Partial<Customer>){
     this.store.dispatch(new fromStore.AddCustomer(form_data));
      return this.IsCreateOrUpdateSuccess();
    }
    update(form_data:Partial<Customer>){
      return this.store.dispatch(new fromStore.AddCustomer(form_data));
  }

  IsCreateOrUpdateSuccess(){
  this.isSuccess$.subscribe(issuccess=>{
  if(issuccess){
      return this.close(true);
  }
  });
 }
}
