import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface enableSelectButtonModalData {
  enabled?: boolean;
  reason_id:number;
  reason_type:string;
  reason_name:string;
  url:string;
}
@Component({
  selector: 'select-reason-modal',
  templateUrl: './select-reason-modal.component.html',
  styleUrls: ['./select-reason-modal.component.scss']
})
export class SelectReasonModalComponent implements OnInit {

  enableSelectButton:boolean=true;
  selectedId:number=0;
  reasonType:string='stock_movements';
  reasonName:string='Reason';
  url:string='reason';
  constructor(  private dialogRef: MatDialogRef<SelectReasonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: enableSelectButtonModalData) { }

  ngOnInit() {
    this.enableSelectButton=this.data.enabled;
    this.selectedId=this.data.reason_id;
    this.reasonType=this.data.reason_type;
    this.reasonName=this.data.reason_name;
    this.url=this.data.url;
  }
    public close(data?: any) {
      this.dialogRef.close(data);
  }
  checkChanges($event) {
    return this.close($event);
  }
}
