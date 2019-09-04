import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
export interface enableSelectButtonModalData {
  enabled?: boolean;
  category_id:number;
}
@Component({
  selector: 'select-category-model',
  templateUrl: './select-category-model.component.html',
  styleUrls: ['./select-category-model.component.scss']
})
export class SelectCategoryModelComponent implements OnInit {
  enableSelectButton:boolean=true;
  selectedId:number=0;
  constructor(  private dialogRef: MatDialogRef<SelectCategoryModelComponent>,
    @Inject(MAT_DIALOG_DATA) public data: enableSelectButtonModalData) { }

  ngOnInit() {
    this.enableSelectButton=this.data.enabled;
    this.selectedId=this.data.category_id;
  }
    public close(data?: any) {
      this.dialogRef.close(data);
  }
  checkChanges($event) {
    return this.close($event);
  }
}
