import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Customer } from '../customer';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from '../customer.service';

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
    @Inject(MAT_DIALOG_DATA) public data: Partial<Customer>) {
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
  addCustomer() {
    if (this.form.valid) {
      const customer = this.form.value;
      this.api.createCustomer(customer).subscribe(res => {
        // this.customers.push(res.customer_created);
      });
    }
  }
} 
