import { Component, OnInit, Inject, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
import {
  trigger,
  state,
  style,
  transition,
  animate
} from "@angular/animations";
import { OrderItems } from "../cart/order_items";
import { MatTableDataSource, MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatAutocompleteSelectedEvent } from "@angular/material";
import { Customer } from "../../customers/customer";
import { Orders } from '../../orders/orders';
import { CurrentUser } from '../../common/auth/current-user';
import { Router } from '@angular/router';
import { PosOrderState } from '../../store/states/PosOrderStates';
import { Select, Store } from '@ngxs/store';
import { CurrentOrder, UpdateOrderItems, OrderParms, CreateOrder, UpdateOrder, DeleteOrder, DeleteOrderItems } from '../../store/actions/pos-Order.action';
import { SelectCustomerModelComponent } from '../../customers/manage-customer/select-customer-model/select-customer-model.component';
import { OpenPosCategory } from '../../store/actions/pos-categories.action';
import { LocalStorage } from '../../common/core/services/local-storage.service';
import { SelectTaxrateModalComponent } from '../../setup/tax-rates/select-taxrate-modal/select-taxrate-modal.component';
import { Modal } from '../../common/core/ui/dialogs/modal.service';
import { take } from 'rxjs/operators';
@Component({
  selector: "cart-dialog",
  templateUrl: './cart-dialog.html',
  styleUrls: ["./cart-item.component.scss"]
})
export class CartDialog implements OnInit {
  public loading = new BehaviorSubject(false);
  cart_item: OrderItems;
  status: string;

  centered = true;
  disabled = false;
  unbounded = false;
  radius: number=50;
  color: string='green';
  default_qty:number=0;
  default_price:number=0;
  constructor(
    public dialogRef: MatDialogRef<CartDialog>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
            const _data=this.data;
            this.default_qty=_data.data.qty as number;
            this.default_price=_data.data.price;
            this.cart_item = _data.data as OrderItems;
            this.status = this.data.status;
  }
  ngOnInit() {
  }

updateInput(value){
if(this.status=='Quantity'){
this.cart_item.qty= parseInt(value);
this.cart_item.action="none";
}
if(this.status=='Price'){
  this.cart_item.changed_price= parseInt(value);
  this.cart_item.action="changePrice";
  }

if(this.status=='Note'){
  this.cart_item.action="note";
  this.cart_item.note=value;
}
}
  update() {
 return this.dialogRef.close(this.cart_item);
}
  close(): void {
    this.dialogRef.close();
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
  dataSource = new MatTableDataSource<OrderItems>([]);

  @Select(PosOrderState.selectedOrders) current_order$: Observable<Orders>;
  @Select(PosOrderState.loading) loading$: Observable<boolean>;

@Select(PosOrderState.customerOrder) customer$: Observable<Customer>;
  
  constructor(
    private localStorage: LocalStorage,
    private store:Store,
    private router: Router,
    public currentUser: CurrentUser,
    private modal: Modal,
    public dialog: MatDialog
  ) { }
  columnsToDisplay = ["item", "qty", "each", "total"];
  expandedElement: OrderItems | null;

  ngOnDestroy(): void {
  }
  ngOnInit() {
    this.store.dispatch(new CurrentOrder());
    if (this.current_order$) {
      this.loadData();
    }
  }
  

 loadData(){
    if(this.current_order$){
      this.current_order$.subscribe(current_order => {
        if(current_order){
          this.expandedElement=current_order.order_items.length >0?current_order.order_items.find(o=>o.lastUpdated):null;
        }
       
      });
    }
 }

  deleteOrdered() {
    this.current_order$.pipe(take(1)).subscribe(current_order => {
      let result = confirm("Are you sure,you want to delete this current transction?");
      if (result) {
        //DeleteOrder
        return this.store.dispatch(new DeleteOrder(current_order));
      }
    });
   
  }
  holdOrdered() {
    this.current_order$.pipe(take(1)).subscribe(current_order => {
      current_order.status = "hold";
      current_order.is_currently_processing = 0;
        return this.updateOrder(current_order);
      
    });
  }

  updateOrder(params:Orders) {
    return this.store.dispatch(new UpdateOrder(params));
  }

  createNewOrder(params:OrderParms) {
    return this.store.dispatch(new CreateOrder(params));
  }


  updateOrderItems(params) {
    params.lastUpdated=true;
    return this.store.dispatch(new UpdateOrderItems(params));
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
      action:action,
      lastUpdated:true
    };
    return this.updateOrderItems(cart_data);
  }



  deleteOrderedItem(element:OrderItems) {
    
   return this.store.dispatch(new DeleteOrderItems(element));
  }

  cartDialog(element:OrderItems, status): void {
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

  total(data=[],prop="total") {
    var total = 0.00;
    if (data.length > 0) {
      for (var i = 0, _len = data.length; i < _len; i++) {
        total += data[i][prop]
      }
    }
    return total;

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

  createOrUpdateOrderItem(customer){

      this.current_order$.pipe(take(1)).subscribe(current_order => {
          if(current_order){
            const order:Orders=current_order;
            order.customer_id=customer.id;
            order.is_currently_processing=1;
            order.status = "pending";
            this.updateOrder(order);

          }else{

            this.createNewOrder(
                          { 
                              status: 'pending',
                              branch_id: parseInt(localStorage.getItem('active_branch')),
                              user_id: this.currentUser.get('id'),
                              business_id: this.currentUser.getBusiness('id'),
                              customer_id:customer?customer.id:null,
                              cart_data: null 
                          }
                      );
          }

          const customer_type_id=customer.customer_type?customer.customer_type.id:null;
          this.localStorage.set('pos-customerTypeId', customer_type_id);
          this.store.dispatch(new OpenPosCategory(this.localStorage.get('pos-categoryId'),null));
    });
  }

  chooseCustomer() {
    let _customer:Customer=null;
    this.dialog.open(SelectCustomerModelComponent, {
      width: '1200px',
      data: {enabled:true,customer_id:_customer?_customer.id:null}
    }).afterClosed().subscribe(customer  => {
      if ( ! customer) return;
        
          _customer=customer;
          
      return this.createOrUpdateOrderItem(_customer);
    });
  }

  showChooseTaxRateModal(element:OrderItems) {
    this.modal.open(
      SelectTaxrateModalComponent,
        {enabled:true,
          tax_rate_id:element.tax_rate?element.tax_rate.id:null},
        'select-taxrate-modal-container'
    ).beforeClose().subscribe(data => {
        if ( ! data) return;
        element.tax_rate_id=data.id;
        return this.updateOrderItems(element);
    });
  }

}
