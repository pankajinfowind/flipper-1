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
  constructor(private api: ApiPosService, private orderItemModelService: OrderItemsModelService, private orderModelService: OrderModelService, private posModelService: PosModelService, private db: NgxService) { }

  private unsubscribe$: Subject<void> = new Subject<void>();
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngOnInit() {
    this.pos$ = this.posModelService.pos$;
    this.order$ = this.orderModelService.order$;
    this.order_items$ = this.orderItemModelService.order_items$;
    this.order$
      .pipe(
        takeUntil(this.unsubscribe$) // declarative unsubscription
      ).subscribe(res => {
        if (res['orders'].length > 0) {
          this.held_orders = res['orders'].filter(order => order.status == 'hold');
          this.pending_orders = res['orders'].filter(order => order.status == 'pending');
          this.ordered_orders = res['orders'].filter(order => order.status == 'ordered');
          this.complete_orders = res['orders'].filter(order => order.status == 'complete');

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
          if (res['orders'].customer) {
            this.db.addItem(res['orders'].customer);
          }
          this.posModelService.update({ currently_ordered: currently_ordered });
          this.orderModelService.update({ orders: res["orders"].length > 0 ? res['orders'] : [] });
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

  deleteOrdered(id) {
    let result = confirm("Are you sure,you want to delete this order?");
    if (result) {
      this.api.deleteOrder(id).subscribe(
        res => {
          if (res.status == 'success') {
            this.posModelService.update({ currently_ordered: null });
            this.orderModelService.update({ orders: res["orders"].length > 0 ? res['orders'] : [] });
            this.orderItemModelService.update([], 'all');
            this.updatePosLayout('home');
          }

        },
        _error => {
          console.error(_error);
        }
      );
    }
  }
}
