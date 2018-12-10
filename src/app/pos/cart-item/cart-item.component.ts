import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Pos } from '../pos';
import { PosModelService } from '../pos-model.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { OrderItems } from '../cart/order_items';
import { OrderItemsModelService } from '../cart/order-item-model.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html',
  styleUrls: ['./cart-item.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class CartItemComponent implements OnInit {
  pos$: Observable<Pos>;
  order_items$: Observable<OrderItems[]>;
  data: OrderItems[];
  dataSource = new MatTableDataSource<OrderItems>([]);
  constructor(private orderItemModelService:OrderItemsModelService,private posModelService:PosModelService,) { }
  columnsToDisplay = ['Item', 'Qty', 'Each', 'Total'];
  expandedElement: OrderItems | null;

  ngOnInit() {
    this.pos$ = this.posModelService.pos$;
    this.order_items$=this.orderItemModelService.order_items$;
    this.getCartItem();
  }
 getCartItem(){
        this.order_items$.subscribe(res=>{
          this.data=res;
          this.dataSource.data=this.data;
          this.expandedElement=this.data?this.data[this.data.length-1]:null;
          console.log(this.expandedElement);
    });
  }

  update(element,status){
    return this.orderItemModelService.update(element,status);
  }

}

