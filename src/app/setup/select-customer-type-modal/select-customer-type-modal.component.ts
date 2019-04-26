import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

export interface enableSelectButtonModalData {
  enabled?: boolean;
  customer_type_id:number;
}
@Component({
  selector: 'select-customer-type-modal',
  templateUrl: './select-customer-type-modal.component.html',
  styleUrls: ['./select-customer-type-modal.component.scss']
})
export class SelectCustomerTypeModalComponent implements OnInit {

  enableSelectButton:boolean=true;
  selectedId:number=0;
  constructor(  private dialogRef: MatDialogRef<SelectCustomerTypeModalComponent>,
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
