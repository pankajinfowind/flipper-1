import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface enableSelectButtonModalData {
  enabled?: boolean;
  customer_id:number;
}
@Component({
  selector: 'app-select-customer-model',
  templateUrl: './select-customer-model.component.html',
  styleUrls: ['./select-customer-model.component.scss']
})
export class SelectCustomerModelComponent implements OnInit {

  enableSelectButton:boolean=true;
  selectedId:number=0;
  constructor(private dialogRef: MatDialogRef<SelectCustomerModelComponent>,@Inject(MAT_DIALOG_DATA) public data: enableSelectButtonModalData) { }

  ngOnInit() {
    this.enableSelectButton=this.data.enabled;
    this.selectedId=this.data.customer_id;
  }
    public close(data?: any) {
      this.dialogRef.close(data);
  }
  checkChanges($event) {
    return this.close($event);
  }
}
