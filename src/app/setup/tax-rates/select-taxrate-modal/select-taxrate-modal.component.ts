import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface enableSelectButtonModalData {
  enabled?: boolean;
  tax_rate_id:number;
}
@Component({
  selector: 'select-taxrate-modal',
  templateUrl: './select-taxrate-modal.component.html',
  styleUrls: ['./select-taxrate-modal.component.scss']
})
export class SelectTaxrateModalComponent implements OnInit {

  enableSelectButton:boolean=true;
  selectedId:number=0;
  constructor(  private dialogRef: MatDialogRef<SelectTaxrateModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: enableSelectButtonModalData) { }

  ngOnInit() {
    this.enableSelectButton=this.data.enabled;
    this.selectedId=this.data.tax_rate_id;
  }
    public close(data?: any) {
      this.dialogRef.close(data);
  }
  checkChanges($event) {
    return this.close($event);
  }
}

