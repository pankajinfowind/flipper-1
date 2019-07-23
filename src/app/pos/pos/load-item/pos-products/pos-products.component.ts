import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, Select } from '@ngxs/store';
import { OpenPosCategory } from '../../../../store/actions/pos-categories.action';
import { PosCateoriesState } from '../../../../store/states/PosCategoryStates';
import { Observable } from 'rxjs';
import { Category } from '../../../../admin/master/categories/api/category';
import { LocalStorage } from '../../../../common/core/services/local-storage.service';
import { PosStockStates } from '../../../../store/states/PosStockStates';
import { Stock } from '../../../../stock/api/stock';
import {  CreateOrder, OrderParms, UpdateOrderItems } from '../../../../store/actions/pos-Order.action';
import { PosOrderState } from '../../../../store/states/PosOrderStates';
import { Orders } from '../../../../orders/orders';
import { Business } from '../../../../business/api/business';
import { CurrentUser } from '../../../../common/auth/current-user';
import { BottomSheetOverviewStock } from '../../boottom-sheet-stock-movement/bottom-sheet-of-stock.componet';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { OrderItems } from '../../../cart/order_items';
import {  take } from 'rxjs/operators';
import { ApiPosService } from '../../../api/api.service';
import { Customer } from '../../../../customers/customer';

@Component({
  selector: 'app-pos-products',
  templateUrl: './pos-products.component.html',
  styleUrls: ['./pos-products.component.scss'],
})
export class PosProductsComponent implements OnInit {
  sub: any
  id: any;
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;
  warn = 'warn';
  accent='accent';
  primary='primary';
  mode = 'determinate';

  business: Business;

  @Select(PosStockStates.loading) loading$: Observable<boolean>;

  @Select(PosCateoriesState.category) category$: Observable<Category>;

  @Select(PosStockStates.entries) entries$: Observable<Stock[]>;

  @Select(PosStockStates.meta) meta$: Observable<any>;

  @Select(PosOrderState.selectedOrders) current_order$: Observable<Orders>;
  @Select(PosOrderState.customerOrder) customer$: Observable<Customer>;
  current_order:Orders=null;
  selectedItem=null;
  customer:Customer=null;
  bg_img: any=null;

  constructor( public dialog: MatDialog,private api: ApiPosService,private bottomSheet: MatBottomSheet,public currentUser: CurrentUser,private store:Store, private route:ActivatedRoute,private localStorage: LocalStorage) {
    this.bg_img=this.currentUser.getBusiness('category')=='Pharmacy'?this.localStorage.drug_item:this.localStorage.any_item;
  }
 

  ngOnInit() {
      //pos-categoryId
     this.store.dispatch(new OpenPosCategory(this.localStorage.get('pos-categoryId'),null));

  }
  openBottomSheet(stock_movemts,stock_name): any {
    return this.bottomSheet.open(BottomSheetOverviewStock,{
        data:{stock_movemts:stock_movemts,stock_name:stock_name}
    });
  }

  addItemToCart(stock: Stock) {
    this.selectedItem=stock;
    if(stock['stockMovmentsTransformable'].length > 1){
        this.openBottomSheet(stock['stockMovmentsTransformable'],stock.item.item).afterDismissed().subscribe(cart_data => {
          if(!cart_data) return;
          this.saveToCartWithOrder(cart_data,stock);
        });
    }else{
      this.saveToCartWithOrder(stock['stockMovmentsTransformable'][0],stock);
    }
  }

  saveToCartWithOrder(cart,stock:Stock){
  
    if (cart && cart.total_qty <= 0) {
      alert("Stock Quantity is unavailable");
    } else {
      this.current_order$.pipe(take(1)).subscribe(current_order => {
     const sale_price=stock.customer_price;
      const cart_data: OrderItems = {
        batch_no:cart.batch_no,
        note: null,
        reason_id: null,
        discount_value:stock.customer_type.discount_value,
        tax_rate_id: stock.tax_rate?stock.tax_rate.id:null,
        sale_price_id: sale_price?sale_price.id:null,
        order_id: current_order?current_order.id:null,
        stock_id: stock?stock.stock_id:null,
        discount_reason_id: null,
        refund_reason_id:null,
        qty: 1,
        action:'add',
        lastUpdated:true,
      };

      if (current_order) {
        this.updateOrderItems(cart_data);
      } else {
      this.createNewOrder({ status: 'pending',
        branch_id: parseInt(localStorage.getItem('active_branch')),
        user_id: this.currentUser.get('id'),
        business_id: this.currentUser.getBusiness('id'),
        customer_id:null,
        cart_data: cart_data });
      }
    });
    }
}
updateOrderItems(params) {
  return this.store.dispatch(new UpdateOrderItems(params));
}

createNewOrder(params:OrderParms) {
     return this.store.dispatch(new CreateOrder(params));
}
  percentage(num,num1) {
    let sum=Math.round(parseInt(num) *100)/parseInt(num1);
  return isNaN(sum)?0:sum.toFixed(1);
}

}