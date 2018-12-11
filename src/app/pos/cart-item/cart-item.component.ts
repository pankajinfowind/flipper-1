import { Component, OnInit, Inject } from "@angular/core";
import { Observable, BehaviorSubject } from "rxjs";
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
import { CustomerService } from "../../customers/customer.service";
import { Customer } from "../../customers/customer";
import { Toast } from '../../common/core/ui/toast.service';


@Component({
  selector: "cart-dialog",
  templateUrl: './cart-dialog.html',
  styleUrls: ["./cart-item.component.scss"]
})
export class CartDialog {
  item_deleted=[];
  public loading = new BehaviorSubject(false);
  cart_item:any;
  status:string;
  constructor(private orderItemModelService: OrderItemsModelService,private toast: Toast,
    public dialogRef: MatDialogRef<CartDialog>,
    @Inject(MAT_DIALOG_DATA) private data: any) {
      this.cart_item=this.data.data;
      this.status=this.data.status;
    }



    displays(nums){
      if(this.status=='Quantity'){
          if(nums=='x'){
            this.cart_item.Qty=0;
          }else{
            if(this.cart_item.Qty+''+nums > this.cart_item.available_qty ){
              alert('Quantity will create a negative stock level');
            }else{
              this.cart_item.Qty=this.cart_item.Qty==0?nums:this.cart_item.Qty+''+nums;
            }
          }
        }else{
          if(nums=='x'){
            this.cart_item.discount=0;
          }else{
            this.cart_item.discount=this.cart_item.discount==0?nums:this.cart_item.discount+''+nums;
          }

        }
    }
    increseDescrise(sign){
      if(sign== '+'){
        //case of puls
        if(this.status=='Quantity'){
          this.cart_item.Qty+=1;
          if(this.cart_item.Qty > this.cart_item.available_qty){
            this.cart_item.Qty-=1;
            alert('Quantity will create a negative stock level');
          }
        }else{
          this.cart_item.discount+=1;
        }

      }else{
        // case of minus
            if(this.status=='Quantity'){
            this.cart_item.Qty-=1;
            if(this.cart_item.Qty < 0){
              this.cart_item.Qty+=1;
              alert('Quantity must be greater than 0');
            }
          }else{
            this.cart_item.discount-=1;
          }
      }
    }

    update(cart_item,status){
      cart_item.discount=parseInt(cart_item.discount);
      cart_item.Qty=parseInt(cart_item.Qty);
      const cart=cart_item;
      return this.orderItemModelService.update(cart,status);
   }

  close(): void {
    this.dialogRef.close({status:'none'});
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
export class CartItemComponent implements OnInit {
  pos$: Observable<Pos>;
  order_items$: Observable<OrderItems[]>;
  data: OrderItems[] = [];
  all_total={num_item:0,total_tax:0,total_amount:0,total_due:0,total_discount:0};
  dataSource = new MatTableDataSource<OrderItems>([]);
  constructor(
    private orderItemModelService: OrderItemsModelService,
    private posModelService: PosModelService,
    private customer: CustomerService,
    public dialog: MatDialog
  ) { }
  columnsToDisplay = ["Item", "Qty", "Each", "Total"];
  expandedElement: OrderItems | null;

  getCartItem() {
    if (this.order_items$) {
      this.order_items$.subscribe(res => {
        this.data = res;
        this.dataSource.data = this.data;
        this.expandedElement = this.data
          ? this.data[this.data.length - 1]
          : null;
      });

    }
  }
  customers: Observable<Customer[]>;

  ngOnInit() {
    this.pos$ = this.posModelService.pos$;
    this.order_items$ = this.orderItemModelService.order_items$;
    this.getCartItem();
    if (this.getCustomers()) {
      this.getCustomers().subscribe(customer => {
        this.customer.create(customer);
      });
    }
  }
  getCustomers(): Observable<Customer[]> {
    this.customers = this.customer.getCustomers();
    return this.customers;
  }
  updatePosLayout(panel='home'){
    this.posModelService.update({panel_content:panel});
  }

  update(element,status){
     return this.orderItemModelService.update(element,status);
     //return this.expandedElement = element;
  }

  cartDialog(element,status): void {
    if (element) {
      const dialogRef = this.dialog.open(CartDialog, {
        width: '300px',
        data: {status:status,data:element}
      });

      dialogRef.afterClosed().subscribe(result => {
        // if(result.status=="success"){
        //   this.selection = new SelectionModel<Item>(true, []);
        //  }
      });

    }

  }

  total(prop){
    var total=0;
      if(this.data.length > 0){
          for ( var i = 0, _len = this.data.length; i < _len; i++ ) {
            total += this.data[i][prop]
          }
      }

      return total;

    }


}
