import { Component, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Customer } from '../customer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Sqlite3Service } from '../../common/sqlit3/sqlite3.service';
import {Store} from '@ngrx/store';
import * as fromStore from '../../store';
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  formValid: boolean = false;
  form: FormGroup;
  @Output("close")
  closed: EventEmitter<boolean> = new EventEmitter(false);

  constructor(
    private store:Store<fromStore.FlipperState>,
    public dialogRef: MatDialogRef<AddComponent>,
    private api: CustomerService,
    private customer: CustomerService,
    private sqlite3Db: Sqlite3Service) {
    // this.checkInternet();
    this.form = new FormBuilder().group({
      'full_name': [undefined, Validators.required],
      'email': [undefined, Validators.required],
      'phone': [undefined, Validators.required]
    });
    this.form.valueChanges.subscribe(() => {
      this.formValid = this.form.valid;
    });
  }


  onNoClick(): void {
    this.dialogRef.close();
  }
  // online$: Observable<boolean>;
  // checkInternet() {
  //       this.online$ = merge(
  //           of(navigator.onLine),
  //           fromEvent(window, 'online').pipe(mapTo(true)),
  //           fromEvent(window, 'offline').pipe(mapTo(false))
  //       );
  // }
  addCustomer() {
    if (this.form.valid) {
      const customer = this.form.value;
      //TODO: should not invoke online api directly save locally then push to saver later at convenient time
      this.api.createCustomer(customer).subscribe(res => {
        this.sqlite3Db.saveSqliteData(res.customer_created, "users");
        this.customer.getCustomers(); //update list of customers UI
      });
    }
  }

  saveCustomer(){
const customer:Partial<Customer>={
    full_name:'respice',
    email:'resp@gmail.com',
    customer_type_id:1,
    branch_id:1,
    title:'Mr',
    gender:'Male',
    state:'single',


}
    this.store.dispatch(new fromStore.AddCustomer(customer));
  }

  close(element: boolean) {
    this.closed.emit(element!=element);
  }
}
