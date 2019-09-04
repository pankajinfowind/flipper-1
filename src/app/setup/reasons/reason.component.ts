import { Component, OnInit,ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-reason',
  templateUrl: './reason.component.html',
  styleUrls: ['./reason.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ReasonComponent implements OnInit{
  links: any[] = [
    {
      label:'Stock Movements',url:'reasons/stock_movements',reason_type:'stock_movements',
    },
    {
      label:'Discounts',url:'reasons/discount',reason_type:'discount',
    }
  ];
   constructor() {

  }
   ngOnInit() {

  }


}
