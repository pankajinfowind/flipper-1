import { Component, OnInit, OnDestroy } from '@angular/core';
import { Orders } from '../orders';
import { Observable, Subject } from 'rxjs';
import { OrderModelService } from '../order-model.service';
import { PosModelService } from '../../pos/pos-model.service';
import { Pos } from '../../pos/pos';
import { OrderItemsModelService } from '../../pos/cart/order-item-model.service';
import { OrderItems } from '../../pos/cart/order_items';
import { ApiPosService } from '../../pos/api/api.service';
import { takeUntil } from 'rxjs/operators';
import { NgxService } from '../../common/ngx-db/ngx-service';
import { CurrentUser } from '../../common/auth/current-user';
import { Business } from '../../business/api/business';

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
  constructor(public currentUser: CurrentUser,private api: ApiPosService, private orderItemModelService: OrderItemsModelService, private orderModelService: OrderModelService, private posModelService: PosModelService, private db: NgxService) { }

  private unsubscribe$: Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngOnInit() {
    if (this.currentUser.user) {
      this.business = this.currentUser.get('business')[0];
    }
    this.pos$ = this.posModelService.pos$;
    this.getOrders();
  }
  getOrders(){
    if (!this.pos$) return;
    this.pos$.subscribe(res => {
        if (res.orders && res.orders.length > 0) {
          this.held_orders = res.orders.filter(order => order.status == 'hold');
          this.pending_orders = res.orders.filter(order => order.status == 'pending');
          this.ordered_orders = res.orders.filter(order => order.status == 'ordered');
          this.complete_orders = res.orders.filter(order => order.status == 'complete');

        }
      });
  }
  updatePosLayout(panel = 'home') {
    this.posModelService.update({ panel_content: panel });
  }
  total(data, arg) {
    var total = 0;
    if (data.length > 0) {
      for (var i = 0, _len = data.length; i < _len; i++) {
        total += data[i][arg];
      }
    }

    return total;

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
                pos.customer_type_price=currently_ordered.customer.customer_type;
              }else{
                pos.choose_customer=null;
                pos.customer_type_price=null;
              }

          this.posModelService.update(pos);

          this.orderItemModelService.update([], 'all');
          this.orderItemModelService.update(currently_ordered['order_items'], 'all');

          this.updatePosLayout('home');
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

  // callGetFormData(event:Event){
  //   event.preventDefault();
  //   let form=event.target as HTMLFormElement;
  //   let d=this.getFormData(form);
  //     console.log(d);
  // }

  // getFormData(ele:HTMLFormElement){
  //     return ele.elements;
  // }
}
