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
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import { Customer } from "../../customers/customer";
import { ApiPosService } from '../api/api.service';
import { Orders } from '../../orders/orders';
import { CurrentUser } from '../../common/auth/current-user';
import { Business } from '../../business/api/business';
import { NgxService } from '../../common/ngx-db/ngx-service';
import { Router, ActivatedRoute } from '@angular/router';
import { PosOrderState } from '../../store/states/PosOrderStates';
import { Select, Store } from '@ngxs/store';
import { CurrentOrder } from '../../store/actions/pos-Order.action';
import { SelectCustomerModelComponent } from '../../customers/manage-customer/select-customer-model/select-customer-model.component';
import { OpenPosCategory } from '../../store/actions/pos-categories.action';
import { LocalStorage } from '../../common/core/services/local-storage.service';
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

  centered = true;
  disabled = false;
  unbounded = false;
  radius: number=50;
  color: string='green';
default_qty:number=0;
  constructor(
    public dialogRef: MatDialogRef<CartDialog>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
      const _data=this.data;
    this.default_qty=_data.data.qty as number;
    this.cart_item = _data.data as OrderItems;
    this.status = this.data.status;
  }
  ngOnInit() {

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
    const cart_data: OrderItems = {
      batch_no:params.batch_no,
      note: params.note,
      reason_id: params.reason_id,
      discount_value:params.customer_type_discount_value || 0.00,
      tax_rate_id:params.tax_rate?params.tax_rate.id:null || null,
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
return this.dialogRef.close(cart_data);
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
  order_items$: Observable<OrderItems[]>;
  data: OrderItems[] = [];
  all_total = { num_item: 0, total_tax: 0, total_amount: 0, total_due: 0, total_discount: 0 };
  dataSource = new MatTableDataSource<OrderItems>([]);
  business: Business;
  @Select(PosOrderState.selectedOrders) current_order$: Observable<Orders>;
  @Select(PosOrderState.loading) loading$: Observable<boolean>;
  current_order:Orders=null;

@Select(PosOrderState.customerOrder) customer$: Observable<Customer>;
customer:Customer=null;
  sub: any;
  id: any;

  constructor(
    private localStorage: LocalStorage,
    private route:ActivatedRoute,
    private store:Store,
    private router: Router,
    public currentUser: CurrentUser,
    private api: ApiPosService,
    private posModelService: PosModelService,
    public dialog: MatDialog,
    public db: NgxService //TODO: this line no unit test for it
  ) { }
  columnsToDisplay = ["item", "qty", "each", "total"];
  expandedElement: OrderItems | null;

  private unsubscribe$: Subject<void> = new Subject<void>();
  //TODO:use this strategy of unsubscribing to orders.components
  ngOnDestroy(): void {
    // for declarative unsubscription
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['categoryId'];
 });
    this.store.dispatch(new CurrentOrder());

    if (this.currentUser.user) {
      this.business = this.currentUser.get('business')[0];
    }
    if (this.current_order$) {
      this.loadCartItem();
    }
    this.customer$.subscribe(customer=>{
      if(customer){
        this.customer= customer as Customer;
      }else{
        this.customer=null;
      }
});
  }
  loadCartItem(){
    this.current_order$.subscribe(res => {
      if (res) {
        this.current_order=res?res:null;
        console.log(this.current_order);
        this.data = res.order_items.length > 0?res.order_items:[];
        this.expandedElement = this.data
          ? this.data[this.data.length - 1]
          : null;
      }else{
        this.data=[];
        this.current_order=null;
        this.total('qty');
        this.total('total_amount_discount');
        this.total('total_amount');
        this.total('taxable_vat');
      }

    });
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
      this.api.deleteOrder(this.current_order.id).subscribe(
        res => {
          if (res.status == 'success') {
            if(res['deleted']){
              this.store.dispatch(new CurrentOrder());
              this.current_order=null;
              this.loadCartItem();
              this.data=[];
              this.total('qty');
              this.total('total_amount_discount');
              this.total('total_amount');
              this.total('taxable_vat');
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
    this.current_order.status = "hold";
    this.current_order.is_currently_processing = 0;
    this.updateOrder(this.current_order);
    this.loadCartItem();
    this.data=[];
    this.total('qty');
    this.total('total_amount_discount');
    this.total('total_amount');
    this.total('taxable_vat');
    this.current_order=null;
  }

  updateOrder(params:Orders) {
    this.api.updateOrder(params, params.id).subscribe(
      res => {

          this.store.dispatch(new CurrentOrder());
      },
      _error => {
        console.error(_error);
      }
    );
  }
  createNewOrder(params) {
    this.api.createOrder(params).subscribe(
      res => {
        if(res['order']){
          this.store.dispatch(new CurrentOrder());
         }
      },
      _error => {
        console.error(_error);
      }
    );
  }


  updateOrderItems(params) {
    this.api.updateOrderItem(params).subscribe(
      res => {
          if(res['status']){
             this.store.dispatch(new CurrentOrder());
          }
      },
      _error => {
        console.error(_error);
      }
    );
  }

  updateQty(params:OrderItems,action) {
    const cart_data: OrderItems = {
      batch_no:params.batch_no,
      note: params.note,
      reason_id: params.reason_id,
      discount_value:params.customer_type_discount_value,
      tax_rate_id:params.tax_rate?params.tax_rate.id:null,
      sale_price_id: params.sale_price_id?params.sale_price_id:null,
      order_id: params.order_id || null,
      stock_id: params.stock_id || null,
      discount_reason_id: params.discount_reason_id || null,
      refund_reason_id:params.refund_reason_id || null,
      qty: 1,
      action:action
    };
    return this.updateOrderItems(cart_data);
  }



  deleteOrderedItem(element) {
    this.api.deleteOrderedItem(element.id).subscribe(res => {
        if(res['deleted']){
          this.store.dispatch(new CurrentOrder());

        }
    });
  }

  cartDialog(element, status): void {
    if (element) {
      const dialogRef = this.dialog.open(CartDialog, {
        width: '300px',
        data: { status: status, data: element }
      });

      dialogRef.afterClosed().subscribe(cart_data => {
        if ( ! cart_data) return;
        return this.updateOrderItems(cart_data);

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
    return total;

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
//till-pay
goto(r){
  return this.router.navigate(["/admin/pos/"+r]);
}
  chooseCustomer() {
    this.dialog.open(SelectCustomerModelComponent, {
      width: '1200px',
      data: {enabled:true,customer_id:this.customer?this.customer.id:null}
    }).afterClosed().subscribe(customer  => {
      if ( ! customer) return;
           const _customer=customer as Customer;
              if(this.current_order){
                const order:Orders=this.current_order;
                order.customer_id=customer.id;
                order.is_currently_processing=1;
                order.status = "pending";
                this.updateOrder(order);
              }else{
                this.createNewOrder({ status: 'pending',
                branch_id: parseInt(localStorage.getItem('active_branch')),
                user_id: this.currentUser.get('id'),
                business_id: this.currentUser.get('business')[0].id,
                customer_id:_customer?_customer.id:null,
                cart_data: [] });
              }
              const customer_type_id=_customer.customer_type?_customer.customer_type.id:null;
              this.localStorage.set('pos-customerTypeId', customer_type_id);
              this.store.dispatch(new OpenPosCategory(this.localStorage.get('pos-categoryId'),null));



    });
  }

}
