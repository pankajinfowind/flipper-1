import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { Observable, BehaviorSubject, Subject } from "rxjs";
import { Pos } from "../pos";
import { PosModelService } from "../pos-model.service";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { OrderItems } from "../cart/order_items";
import { OrderItemsModelService } from "../cart/order-item-model.service";
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { Customer } from "../../customers/customer";
import { Toast } from '../../common/core/ui/toast.service';
import { ApiPosService } from '../api/api.service';
import { Orders } from '../../orders/orders';
import { MasterModelService } from '../../admin/master/master-model.service';
import { Master } from '../../admin/master/master';
import { Insurance } from '../../admin/master/insurance/api/insurance';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize, takeUntil } from 'rxjs/operators';
import { OrderModelService } from '../../orders/order-model.service';
import { CurrentUser } from '../../common/auth/current-user';
import { Business } from '../../business/api/business';
import { NgxService } from '../../common/ngx-db/ngx-service';
@Component({
  selector: "cart-dialog",
  templateUrl: './cart-dialog.html',
  styleUrls: ["./cart-item.component.scss"]
})
export class CartDialog implements OnInit {
  item_deleted = [];
  public loading = new BehaviorSubject(false);
  cart_item: OrderItems;
  status: string;
  order_items$: Observable<OrderItems[]>;
  master$: Observable<Master>;
  insurances: Insurance[] = [];
  insuranceForm: FormGroup;
  pos$: Observable<Pos>;

  centered = true;
  disabled = false;
  unbounded = false;

  radius: number=50;
  color: string='green';
default_qty:number=0;
  constructor(private posModelService: PosModelService,
    private msterModelService: MasterModelService,
    private api: ApiPosService,
    private orderItemModelService: OrderItemsModelService,
    private toast: Toast,
    public dialogRef: MatDialogRef<CartDialog>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
      const _data=this.data;
    this.default_qty=_data.data.qty as number;
    this.cart_item = _data.data as OrderItems;
    this.status = this.data.status;
    this.order_items$ = this.orderItemModelService.order_items$;
    this.master$ = this.msterModelService.master$;
    this.pos$ = this.posModelService.pos$;
  }
  ngOnInit() {
    this.master$.subscribe(res => {
      if (res.insurances.length > 0) {
        this.insurances = res.insurances;
      }
    });

    this.insuranceForm = new FormGroup({
      insurance_id: new FormControl(null, [Validators.required])
    });
  }

  keysClicked(nums) {
    if (this.status == 'Quantity') {
      if (nums == 'x') {
        this.cart_item.qty = 0;
      } else {
        const converted=parseInt(this.cart_item.qty + '' + nums);
        if ( converted > this.cart_item.available_qty) {
          alert('Quantity will create a negative stock level');
        } else {
          this.cart_item.qty = this.cart_item.qty == 0 ? nums : this.cart_item.qty + '' + nums;
        }
      }
    } else {
      if (nums == 'x') {
        //this.cart_item.discount = 0;
      } else {
       // this.cart_item.discount = this.cart_item.discount == 0 ? nums : this.cart_item.discount + '' + nums;
      }

    }
  }
  increaseDecrease(sign) {
    if (sign == '+') {
      //case of puls
      if (this.status == 'Quantity') {
        this.cart_item.qty += 1;
        if (this.cart_item.qty > this.cart_item.available_qty) {
          this.cart_item.qty -= 1;
          alert('Quantity will create a negative stock level');
        }
      }

    } else {
      // case of minus
      if (this.status == 'Quantity') {
        this.cart_item.qty -= 1;
        if (this.cart_item.qty < 0) {
          this.cart_item.qty += 1;
          alert('Quantity must be greater than 0');
        }
      }
    }
    this.cart_item.action=this.default_qty < this.cart_item.qty?'add':'remove';
  }


  update() {
    if(this.default_qty == this.cart_item.qty && this.status=='Quantity'){
        alert("Nothing Updated. Quantity didn't changed");
    }
    const params:OrderItems=this.cart_item;
    this.cart_item
    const cart_data: OrderItems = {
      batch_no:params.batch_no,
      note: params.note,
      reason_id: params.reason_id,
      discount_value:params.customer_type_discount_value || 0.00,
      tax_rate_id:params.tax_rate.id || null,
      sale_price_id: params.sale_price_id || null,
      order_id: params.order_id || null,
      stock_id: params.stock_id || null,
      discount_reason_id: params.discount_reason_id || null,
      refund_reason_id:params.refund_reason_id || null,
      qty: this.cart_item.qty,
      action:params.action
    };
if(this.status=='Note'){
  cart_data.action="note";
}

//console.log(cart_data);
    this.posModelService.update(this.posModelService.get().loading=true);

    this.api.updateOrderItem(cart_data).pipe(finalize(() =>
    this.posModelService.update(this.posModelService.get().loading=false))).subscribe(
      res => {
      const order_item=res['order_item'] as OrderItems || null ;

        if(order_item){
          const ordered_items:OrderItems[]=this.orderItemModelService.get();

              if(ordered_items && ordered_items.length > 0){

                    ordered_items.forEach((item, i)=> {

                          if (item.id===order_item.id){
                               ordered_items[i] = order_item;
                          }else{
                            if (!ordered_items.includes(order_item)) {
                                    ordered_items.push(order_item);
                            }
                          }
                    });

              }else{
                ordered_items.push(order_item);
              }
              let _ordered_items: OrderItems[] = this.removeDuplicate(ordered_items,'id');
              this.orderItemModelService.update(_ordered_items,"all");

            }

      },
      _error => {
        console.error(_error);
      }
    );
  }

  removeDuplicate(ordered_items:OrderItems[]= [],id){
    let obj = {};
    let _ordered_items: OrderItems[] = [];
    _ordered_items = Object.keys(ordered_items.reduce((prev, next) => {
      if (!obj[next[id]]) obj[next[id]] = next;
      return obj;
    }, obj)).map((i) => obj[i]);
    return _ordered_items;
  }

  close(): void {
    this.dialogRef.close({ status: 'none' });
  }
}

@Component({
  selector: "app-cart-item",
  templateUrl: "./cart-item.component.html",
  styleUrls: ["./cart-item.component.scss"],
  animations: [
    trigger("detailExpand", [
      state(
        "collapsed",
        style({ height: "0px", minHeight: "0", display: "none" })
      ),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      )
    ])
  ]
})
export class CartItemComponent implements OnInit, OnDestroy {

  pos$: Observable<Pos>;
  order_items$: Observable<OrderItems[]>;
  data: OrderItems[] = [];
  all_total = { num_item: 0, total_tax: 0, total_amount: 0, total_due: 0, total_discount: 0 };
  dataSource = new MatTableDataSource<OrderItems>([]);
  currently_ordered: Orders;
  choosen_insurance: Insurance;
  business: Business;
  constructor(
    public currentUser: CurrentUser,
    private orderModelService: OrderModelService,
    private api: ApiPosService,
    private orderItemModelService: OrderItemsModelService,
    private posModelService: PosModelService,
    public dialog: MatDialog,
    public db: NgxService //TODO: this line no unit test for it
  ) { }
  columnsToDisplay = ["item", "qty", "each", "total"];
  expandedElement: OrderItems | null;

  getCartItem() {
    if (this.order_items$) {
      this.order_items$.subscribe(res => {
        if (res) {
          this.data = res;
          this.dataSource.data = this.data;
          this.expandedElement = this.data
            ? this.data[this.data.length - 1]
            : null;
        }

      });

    }
  }
  customers: Customer=null;
  private unsubscribe$: Subject<void> = new Subject<void>();
  //TODO:use this strategy of unsubscribing to orders.components
  ngOnDestroy(): void {
    // for declarative unsubscription
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngOnInit() {

    if (this.currentUser.user) {
      this.business = this.currentUser.get('business')[0];
    }
    this.pos$ = this.posModelService.pos$;
    this.order_items$ = this.orderItemModelService.order_items$;
    this.getCartItem();
    if (!this.pos$) {
      return;
    } else {
      this.pos$.subscribe(p => {
        if (p) {
          this.currently_ordered = p.currently_ordered;
          this.choosen_insurance = p.currently_ordered ? p.currently_ordered.insurance : null;
          this.customers=p.choose_customer;
        }
      });
    }

  }
  updatePosLayout(panel = 'home') {
    this.posModelService.update({ panel_content: panel });
  }


  payOrdered() {

    //TODO: ask ganza the service that complete payment action
    this.posModelService.update({ panel_content: 'pay' });
  }

  deleteOrdered() {
    let result = confirm("Are you sure,you want to delete this current transction?");
    if (result) {
      this.api.deleteOrder(this.currently_ordered.id).subscribe(
        res => {
          if (res.status == 'success') {
            if(res['deleted']){
              const pos= this.posModelService.get();
              const orders = pos.orders.filter(obj => {
                    return obj.id !== this.currently_ordered.id;
              });

                pos.currently_ordered=null;
                pos.choose_customer=null;
                pos.customer_type_price=null;
                pos.loading=false;
                pos.panel_content='home';
                pos.orders=orders;
                this.posModelService.update(pos);
                this.orderItemModelService.update([], 'all');
                this.currently_ordered=null;
            }
          }
        },
        _error => {
          console.error(_error);
        }
      );
    }
  }
  holdOrdered() {
    this.db.addItem([]); //reset our customer object.
    this.currently_ordered.status = "hold";
    this.currently_ordered.is_currently_processing = '0';
    //TODO: when order is unholded remember to get associated customer re-add him on our ngx db again
    //TODO: do this on pay action
    if (this.customers) {
      this.currently_ordered.customer_id = this.customers.customer_id;
    }
    this.api.updateOrder(this.currently_ordered, this.currently_ordered.id).subscribe(
      res => {
        if (res.status == 'success') {

          const pos=this.posModelService.get();

            pos.currently_ordered=null;
            pos.orders=res["orders"].length > 0 ? res['orders'] as Orders[]:[];
            pos.choose_customer=null;
            pos.customer_type_price=null;
            pos.panel_content='home';
          this.posModelService.update(pos);

          this.orderItemModelService.update([], 'all');

        }
      },
      _error => {
        console.error(_error);
      }
    );
  }
  update(element, status) {
    if (status == 'delete') {
      this.deleteOrderedItem(element.id);
    }
    return this.orderItemModelService.update(element, status);

    //return this.expandedElement = element;
  }

  updateQty(params:OrderItems,action) {
    const cart_data: OrderItems = {
      batch_no:params.batch_no,
      note: params.note,
      reason_id: params.reason_id,
      discount_value:params.customer_type_discount_value || 0.00,
      tax_rate_id:params.tax_rate.id || null,
      sale_price_id: params.sale_price_id || null,
      order_id: params.order_id || null,
      stock_id: params.stock_id || null,
      discount_reason_id: params.discount_reason_id || null,
      refund_reason_id:params.refund_reason_id || null,
      qty: 1,
      action:action
    };

    this.posModelService.update(this.posModelService.get().loading=true);

    this.api.updateOrderItem(cart_data).pipe(finalize(() =>
    this.posModelService.update(this.posModelService.get().loading=false))).subscribe(
      res => {
      const order_item=res['order_item'] as OrderItems || null ;

        if(order_item){
          const ordered_items:OrderItems[]=this.orderItemModelService.get();

              if(ordered_items && ordered_items.length > 0){

                    ordered_items.forEach((item, i)=> {

                          if (item.id===order_item.id){
                               ordered_items[i] = order_item;
                          }else{
                            if (!ordered_items.includes(order_item)) {
                                    ordered_items.push(order_item);
                            }
                          }
                    });

              }else{
                ordered_items.push(order_item);
              }
              let _ordered_items: OrderItems[] = this.removeDuplicate(ordered_items,'id');
              this.orderItemModelService.update(_ordered_items,"all");

            }

      },
      _error => {
        console.error(_error);
      }
    );
  }

  removeDuplicate(ordered_items:OrderItems[]= [],id){
    let obj = {};
    let _ordered_items: OrderItems[] = [];
    _ordered_items = Object.keys(ordered_items.reduce((prev, next) => {
      if (!obj[next[id]]) obj[next[id]] = next;
      return obj;
    }, obj)).map((i) => obj[i]);
    return _ordered_items;
  }

  deleteOrderedItem(element) {
    this.api.deleteOrderedItem(element.id).subscribe(res => {

        if(res['deleted']){
            const data=this.dataSource.data;
          const index: number = this.dataSource.data.indexOf(element);
            if (index !== -1) {
              data.splice(index, 1);
            }
            this.dataSource.data=data;
        }
    });
  }

  cartDialog(element, status): void {
    if (element) {
      const dialogRef = this.dialog.open(CartDialog, {
        width: '300px',
        data: { status: status, data: element }
      });

      dialogRef.afterClosed().subscribe(result => {
      });

    }

  }

  total(prop) {
    var total = 0;
    if (this.data.length > 0) {
      for (var i = 0, _len = this.data.length; i < _len; i++) {
        total += this.data[i][prop]
      }
    }
    const s=total.toString();
    return  parseFloat(s).toFixed(2);

  }
convertToDecimal(total:number){
  const s=total.toString();
  return  parseFloat(s).toFixed(2);
}
 textEllipsis(str, maxLength, { side = "end", ellipsis = "..." } = {}) {
  if (str.length > maxLength) {
    switch (side) {
      case "start":
        return ellipsis + str.slice(-(maxLength - ellipsis.length));
      case "end":
      default:
        return str.slice(0, maxLength - ellipsis.length) + ellipsis;
    }
  }
  return str;
}


}
