import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { Modal } from '../../../common/core/ui/dialogs/modal.service';
import { SelectCustomerTypeModelComponent } from '../select-customer-type-model/select-customer-type-model.component';
export interface enableSelectButtonModalData {
  enabled?: boolean;
  updated:boolean;
  pricing?:Array<any>
}
@Component({
  selector: 'app-attach-item-customer-types-model',
  templateUrl: './attach-item-customer-types-model.component.html',
  styleUrls: ['./attach-item-customer-types-model.component.scss']
})
export class AttachItemCustomerTypesModelComponent implements OnInit {
  updating:boolean=false;
  formData: FormGroup;
  public carForm: FormGroup;
   numberPatern = '^[0-9.,]+$';
  constructor(private fb: FormBuilder,private modal: Modal,  private dialogRef: MatDialogRef<AttachItemCustomerTypesModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: enableSelectButtonModalData) {
          this.initItems();
     }

     getControls() {
      return (this.carForm.get('details') as FormArray).controls;
    }
     initItems(){
      const items = [];
      if(this.data.pricing.length > 0){
        this.data.pricing.forEach(el=>{
          items.push(this.fb.group({
            price_id:[el.price_id?el.price_id:null],
            customer_type_id: [el.customer_type_id?el.customer_type_id:null],
            name: [el.name?el.name:null,Validators.required],
            sale_price_including_tax: new FormControl(el.sale_price_including_tax?el.sale_price_including_tax:'', [Validators.required, Validators.pattern(this.numberPatern)]),
            sale_price_excluding_tax: new FormControl(el.sale_price_excluding_tax?el.sale_price_excluding_tax:'', [Validators.required, Validators.pattern(this.numberPatern)])
          }));
        });

      }else{
        items.push(this.fb.group({
          price_id:[null],
          customer_type_id: [],
          name: ['',Validators.required],
          sale_price_including_tax: new FormControl('', [Validators.required, Validators.pattern(this.numberPatern)]),
          sale_price_excluding_tax: new FormControl('', [Validators.required, Validators.pattern(this.numberPatern)])
        }));
      }

      this.carForm = this.fb.group({
        details: this.fb.array(items)
      });
     }
     addRow() {
      const details = this.carForm.get('details') as FormArray;
      details.push(this.createItem());
    }
  
    createItem(): FormGroup {

      return this.fb.group({
        price_id:[null],
        customer_type_id: [],
        name: ['',Validators.required],
        sale_price_including_tax: new FormControl('', [Validators.required, Validators.pattern(this.numberPatern)]),
        sale_price_excluding_tax: new FormControl('', [Validators.required, Validators.pattern(this.numberPatern)])
      });
    }
  
    doSubmit() {
      if (this.carForm.valid) {
        return this.close(this.carForm.value);
      }
    }
  
    _v() {
      return this.carForm.value;
    }
  ngOnInit() {
        if (this.data.updated) {
            this.updating = true;
        } else {
            this.updating = false;
        }
        
    
  }


  showChooseCustomerTypeModal(field) {
    this.modal.open(
      SelectCustomerTypeModelComponent,
        {enabled:true,
          customer_type_id:this.carForm.value.customer_type_id?this.carForm.value.customer_type_id:null},
          {
            width: '600px'
          }
    ).beforeClose().subscribe(data => {
        if ( ! data) return;
        field.get('customer_type_id').setValue(data.id);
        field.get('name').setValue(data.name);
    });
  }
  updatePrice(field){
    field.get('sale_price_including_tax').setValue(field.value.sale_price_excluding_tax);
  }
  public close(data?: any) {
    this.dialogRef.close(data);
}
}
