import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderModelService } from '../pay-model.service';
import { PosModelService } from '../../pos/pos-model.service';
import { Pos } from '../../pos/pos';
import { OrderItemsModelService } from '../../pos/cart/order-item-model.service';
import { Pay } from '../pay';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  pay$: Observable<Pay>;
  pos$: Observable<Pos>;
  panelOpenState = false;
  constructor(private orderItemModelService:OrderItemsModelService,private orderModelService:OrderModelService,private posModelService:PosModelService) { }

  ngOnInit() {
    this.pos$ = this.posModelService.pos$;
    this.pay$ = this.orderModelService.pay$;

  }
  updatePosLayout(panel='home'){
    this.posModelService.update({panel_content:panel});
  }
  total(data){
    var total=0;
      if(data.length > 0){
          for ( var i = 0, _len = data.length; i < _len; i++ ) {
            total += data[i]['total_amount'];
          }
      }

      return total;

    }
    // orderedItem(order_id){
    //   const ordered_item=[];
    //    this.order_items$.forEach(orders=>{
    //      orders.filter(o=>{
    //           if(o.order_id==order_id){
    //             ordered_item.push(o);
    //           }
    //      }
    //      );
    //   });
    //   return ordered_item;
    // }
}
