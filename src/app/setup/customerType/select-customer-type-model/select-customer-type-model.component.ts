import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface enableSelectButtonModalData {
  enabled?: boolean;
  customer_type_id:number;
}
@Component({
  selector: 'app-select-customer-type-model',
  templateUrl: './select-customer-type-model.component.html',
  styleUrls: ['./select-customer-type-model.component.scss']
})
export class SelectCustomerTypeModelComponent implements OnInit {

  enableSelectButton:boolean=true;
  selectedId:number=0;
  constructor(  private dialogRef: MatDialogRef<SelectCustomerTypeModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: enableSelectButtonModalData) { }

  ngOnInit() {
    this.enableSelectButton=this.data.enabled;
    this.selectedId=this.data.customer_type_id;
  }
    public close(data?: any) {
      this.dialogRef.close(data);
  }
  checkChanges($event) {
    return this.close($event);
  }
}
