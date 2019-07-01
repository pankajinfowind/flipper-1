import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../../../common/core/types/models/User';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface enableSelectButtonModalData {
  enabled?: boolean;
  user_id:number;
}
@Component({
  selector: 'select-user-model',
  templateUrl: './select-user-model.component.html',
  styleUrls: ['./select-user-model.component.scss']
})
export class SelectUserModelComponent implements OnInit {

  enableSelectButton:boolean=true;
  selectedId:number=0;
  hiddenCheckBox:boolean=true;
  constructor(  private dialogRef: MatDialogRef<SelectUserModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: enableSelectButtonModalData) { }

  ngOnInit() {
    this.enableSelectButton=this.data.enabled;
    this.selectedId=this.data.user_id;
  }
    public close(data?: any) {
      this.dialogRef.close(data);
  }
  checkChanges($event) {
    return this.close($event);
  }
}

