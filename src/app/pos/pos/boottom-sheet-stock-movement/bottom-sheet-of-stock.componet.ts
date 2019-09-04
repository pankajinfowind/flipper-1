import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Component, Inject } from '@angular/core';
@Component({
  selector: 'bottom-sheet-of-stock',
  templateUrl: 'bottom-sheet-of-stock.componet.html',
  styleUrls: ['../../sale-point/sale-point.component.scss'],
})
export class BottomSheetOverviewStock {
stocks:any[]=[];
stock_name:string='';
centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;
  constructor(private bottomSheetRef: MatBottomSheetRef<BottomSheetOverviewStock>,@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.stocks=data['stock_movemts'].filter(d=>!d['is_expired']);
    this.stock_name=data['stock_name'];
  }


  openLink(data,event: MouseEvent): void {
    this.bottomSheetRef.dismiss(data);
    event.preventDefault();
  }
}
