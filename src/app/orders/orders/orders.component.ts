import { Component, OnInit } from '@angular/core';
import { Orders } from '../orders';
import { Observable } from 'rxjs';
import { OrderModelService } from '../order-model.service';
import { PosModelService } from '../../pos/pos-model.service';
import { Pos } from '../../pos/pos';
import { OrderItemsModelService } from '../../pos/cart/order-item-model.service';
import { OrderItems } from '../../pos/cart/order_items';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  order$: Observable<Orders[]>;
  pos$: Observable<Pos>;
  held_orders:Orders[]=[];
  pending_orders:Orders[]=[];
  complete_orders:Orders[]=[];
  ordered_orders:Orders[]=[];
  panelOpenState = false;
  order_items$: Observable<OrderItems[]>;
  constructor(private orderItemModelService:OrderItemsModelService,private orderModelService:OrderModelService,private posModelService:PosModelService) { }

  ngOnInit() {
    this.pos$ = this.posModelService.pos$;
    this.order$ = this.orderModelService.order$;
    this.order_items$=this.orderItemModelService.order_items$;
    this.order$.subscribe(res=>{
        if(res['orders'].length > 0){
        this.held_orders    = res['orders'].filter(order=>order.status=='hold');
        this.pending_orders = res['orders'].filter(order=>order.status=='pending');
        this.ordered_orders = res['orders'].filter(order=>order.status=='ordered');
        this.complete_orders= res['orders'].filter(order=>order.status=='complete');

        console.log(this.held_orders);

        }
    });
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
    orderedItem(order_id){
      const ordered_item=[];
       this.order_items$.forEach(orders=>{
         orders.filter(o=>{
              if(o.order_id==order_id){
                ordered_item.push(o);
              }
         }
         );
      });
      return ordered_item;
    }
}
