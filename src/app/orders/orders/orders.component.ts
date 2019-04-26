import { Component, OnInit, OnDestroy } from '@angular/core';
import { Orders } from '../orders';
import { Observable, Subject } from 'rxjs';
import { OrderModelService } from '../order-model.service';
import { PosModelService } from '../../pos/pos-model.service';
import { Pos } from '../../pos/pos';
import { OrderItemsModelService } from '../../pos/cart/order-item-model.service';
import { OrderItems } from '../../pos/cart/order_items';
import { ApiPosService } from '../../pos/api/api.service';
import { NgxService } from '../../common/ngx-db/ngx-service';
import { CurrentUser } from '../../common/auth/current-user';
import { Business } from '../../business/api/business';
import { Router } from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit, OnDestroy {

  order$: Observable<Orders[]>;
  pos$: Observable<Pos>;
  held_orders: Orders[] = [];
  pending_orders: Orders[] = [];
  complete_orders: Orders[] = [];
  ordered_orders: Orders[] = [];
  panelOpenState = false;
  order_items$: Observable<OrderItems[]>;
  business: Business;
  routeLinks: any[];
  activeLinkIndex = -1;
  constructor(public currentUser: CurrentUser,private api: ApiPosService, private orderItemModelService: OrderItemsModelService, private orderModelService: OrderModelService, private posModelService: PosModelService, private db: NgxService,private router: Router) {
    this.routeLinks = [
        {
            label: 'PENDING',
            link: './order-pending',
            index: 0
        },
        {
          label: 'HELD',
          link: './order-held',
          index: 1
      },
         {
            label: 'COMPLETE',
            link: './order-complete',
            index: 1
        }
    ];
}
  ngOnDestroy(): void {
  }
  ngOnInit() {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.routeLinks.indexOf(this.routeLinks.find(tab => tab.link === '.' + this.router.url));
      });

  }


  orderedItem(order_id) {
    const ordered_item = [];
    this.order_items$.forEach(orders => {
      orders.filter(o => {
        if (o.order_id == order_id) {
          ordered_item.push(o);
        }
      }
      );
    });
    return ordered_item;
  }

  updateOrdered(currently_ordered) {
    currently_ordered.status = "ordered";
    currently_ordered.is_currently_processing = '1';
    this.api.updateOrder(currently_ordered, currently_ordered.id).subscribe(
      res => {
        if (res.status == 'success') {

          const pos=this.posModelService.get();
          pos.orders=res["orders"].length > 0 ? res['orders'] as Orders[]:[];
          pos.currently_ordered=currently_ordered;

              if(currently_ordered.customer){
                pos.choose_customer=currently_ordered.customer;
                pos.customer_type_price=currently_ordered.customer_type;
              }else{
                pos.choose_customer=null;
                pos.customer_type_price=null;
              }

          this.posModelService.update(pos);

          this.orderItemModelService.update([], 'all');
          this.orderItemModelService.update(currently_ordered['order_items'], 'all');

        }


      },
      _error => {
        console.error(_error);
      }
    );
  }

  deleteOrdered(order) {
    let result = confirm("Are you sure,you want to delete this order?");
    if (result) {
      this.api.deleteOrder(order.id).subscribe(
        res => {
          if (res.status == 'success') {
            if(res['deleted']){
              const pos= this.posModelService.get();
              const orders = pos.orders.filter(obj => {
                    return obj.id !== order.id;
              });
                pos.currently_ordered=null;
                pos.choose_customer=null;
                pos.customer_type_price=null;
                pos.loading=false;
                pos.panel_content='home';
                pos.orders=orders;
                this.posModelService.update(pos);
                this.orderItemModelService.update([], 'all');

            }
          }

        },
        _error => {
          console.error(_error);
        }
      );
    }
  }

}
