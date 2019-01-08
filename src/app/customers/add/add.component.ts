import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Customer } from '../customer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';
import { Sqlite3Service } from '../../common/sqlit3/sqlite3.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent {
  formValid: boolean = false;
  form: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddComponent>,
    private api: CustomerService,
    private customer: CustomerService,
    private sqlite3Db: Sqlite3Service,
    @Inject(MAT_DIALOG_DATA) public data: Partial<Customer>) {
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
} 
