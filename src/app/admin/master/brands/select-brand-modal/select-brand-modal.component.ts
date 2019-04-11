import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface enableSelectButtonModalData {
  enabled?: boolean;
  brand_id:number;
}
@Component({
  selector: 'select-brand-modal',
  templateUrl: './select-brand-modal.component.html',
  styleUrls: ['./select-brand-modal.component.scss']
})
export class SelectBrandModalComponent implements OnInit {
  enableSelectButton:boolean=true;
  selectedId:number=0;
  constructor(  private dialogRef: MatDialogRef<SelectBrandModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: enableSelectButtonModalData) { }

  ngOnInit() {
    this.enableSelectButton=this.data.enabled;
    this.selectedId=this.data.brand_id;
  }
    public close(data?: any) {
      this.dialogRef.close(data);
  }
  checkChanges($event) {
    return this.close($event);
  }
}
