import { Component, OnInit, Inject } from '@angular/core';
import { Details } from '../../../details/details';
import { Observable } from 'rxjs';
import { DetailsService } from '../../../details/details.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Stock } from '../../api/stock';
import { UpdateStockModelComponent } from '../update-stock-model/update-stock-model.component';
@Component({
  selector: "advanced-option-dialog",
  templateUrl: './advanced-option.component.html',
  styleUrls: ["./info-stock-model.component.scss"]
})
export class AdvancedOptionDialog implements OnInit {
  entry:Stock[]=[];
  item_id:number=0;
  constructor(public dialogRef: MatDialogRef<AdvancedOptionDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  ngOnInit(): void {
    this.entry=this.data.data;
    this.item_id=this.data.item_id;
  }
  close(): void {
    this.dialogRef.close({status:'none'});
  }
}
@Component({
  selector: 'app-info-stock-model',
  templateUrl: './info-stock-model.component.html',
  styleUrls: ['./info-stock-model.component.scss']
})

export class InfoStockModelComponent implements OnInit {
  warn = 'warn';
  accent='accent';
  primary='primary';
  mode = 'determinate';

  subscription: Observable<Details>;
  details$: Observable<Details>;
  info:any={};
  constructor(public dialog: MatDialog,private detailsService:DetailsService) {
   }

    ngOnInit() {
      this.subscription = this.details$ = this.detailsService.details$;
      this.details$.subscribe(res=>{
        this.info=res.sender_data?res.sender_data:null;
      });
  }
  percentage(num,num1) {
    let sum=Math.round(parseInt(num) *100)/parseInt(num1);
  return isNaN(sum)?0:sum.toFixed(1);
}
openDetails(title='Stock Details',action='info',obj,component='app-info-stock-model'){
  this.detailsService.update({title:title,sender_data:obj,module:'app-stock',component:component,action:action,detailsVisible:true});
}
openAdvancedStockDialog(): void {
const convert_to_array=[];
    convert_to_array.push(this.info);
  this.dialog.open(AdvancedOptionDialog, {
    width: '900px',
    data: this.info?{data:convert_to_array,item_id:this.info.item.id}:null
  });
  }

  stockAdjustment(action){
    this.dialog.open(UpdateStockModelComponent, {
      width: '450px',
      data: action?action:null
    });
  }
}
