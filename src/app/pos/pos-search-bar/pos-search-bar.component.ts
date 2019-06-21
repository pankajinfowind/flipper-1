import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, BehaviorSubject} from 'rxjs';
import {map, startWith, debounceTime, distinctUntilChanged, switchMap, filter} from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { PosStockStates } from '../../store/states/PosStockStates';
import { Stock } from '../../stock/api/stock';
import { LoadSearchableStockEntries } from '../../store/actions/pos-Stock.action';
import { PosSearchStockStates } from '../../store/states/PosSearchStockStates';
import { CurrentUser } from '../../common/auth/current-user';
import { Business } from '../../business/api/business';
import { ApiPosService } from '../api/api.service';
import { MatBottomSheet, MatAutocompleteSelectedEvent } from '@angular/material';
import { CurrentOrder } from '../../store/actions/pos-Order.action';
import { Orders } from '../../orders/orders';
import { BottomSheetOverviewStock } from '../pos/boottom-sheet-stock-movement/bottom-sheet-of-stock.componet';
import { OrderItems } from '../cart/order_items';
import { PosOrderState } from '../../store/states/PosOrderStates';
import { Customer } from '../../customers/customer';

@Component({
  selector: 'pos-search-bar',
  templateUrl: './pos-search-bar.component.html',
  styleUrls: ['./pos-search-bar.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PosSearchBarComponent implements OnInit
{
  @ViewChild('trigger', {read: ElementRef}) trigger: ElementRef;
  formControl = new FormControl();
  //public results: BehaviorSubject<State[]> = new BehaviorSubject([]);
  public results: Observable<any>;
  private lastQuery: string;
  public dispaly_autocomplete:boolean=false;
  states: Stock[] = [
];
states2: Stock[] = [
];
  @Select(PosSearchStockStates.entries) entries$: Observable<Stock[]>;
  @Select(PosSearchStockStates.loading) loading$: Observable<boolean>;
  @Select(PosStockStates.entries) items_entries$: Observable<Stock[]>;

  @Select(PosOrderState.selectedOrders) current_order$: Observable<Orders>;
  @Select(PosOrderState.customerOrder) customer$: Observable<Customer>;

  business: Business;
  centered = false;
  disabled = false;
  unbounded = false;

  radius: number;
  color: string;
  warn = 'warn';
  accent='accent';
  primary='primary';
  mode = 'determinate';
  current_order:Orders=null;
  selectedItem=null;
  customer:Customer=null;
  constructor(private api: ApiPosService,private bottomSheet: MatBottomSheet,private store:Store,public currentUser: CurrentUser) {
    this.searchableResults();
    this.allItems();
   }


  ngOnInit() {
    if (this.currentUser.user) {
      this.business = this.currentUser.get('business')[0];
      this.store.dispatch(new CurrentOrder());

      this.current_order$.subscribe(current=>{
        if(current){
          this.current_order=current as Orders;
        }else{
          this.current_order=null;
        }
      });
    }
    this.formControl.valueChanges
    .pipe(
      debounceTime(300),
      distinctUntilChanged(),
      startWith(''),
      map(state => state ? this.openSearchPage(state): this.searchableResults())
    );
  }
  public executeAction(e: MatAutocompleteSelectedEvent) {
    this.trigger.nativeElement.blur();
  }

  percentage(num,num1) {
    let sum=Math.round(parseInt(num) *100)/parseInt(num1);
  return isNaN(sum)?0:sum.toFixed(1);
}
  private searchableResults(){
    this.store.dispatch(new LoadSearchableStockEntries());
  }
  private allItems(){
    this.items_entries$.subscribe(res=>this.states2.push(...res));
  }
  public openSearchPage(params){
    this.store.dispatch(new LoadSearchableStockEntries(params));
  }

  removeDups(data: Stock[]=[]) {
    let obj = {};
    if(data && data.length==0) return [];
    data = Object.keys(data.reduce((prev, next) => {
      if (!obj[next.id]) obj[next.id] = next;
      return obj;
    }, obj)).map((i) => obj[i]);
    return data.reverse();
  };

  public resetForm() {
    this.formControl.reset();
    this.searchableResults();
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
        this.saveToCartWithOrder(cart_data,stock);
      });
  }else{
    this.saveToCartWithOrder(stock['stockMovmentsTransformable'][0],stock);
  }
}

saveToCartWithOrder(cart,stock:Stock){
  if (!this.business) return;

  if (cart.total_qty <= 0) {
    alert("Stock Quantity is unavailable");
  } else {
   const sale_price=stock.customer_price;
    const cart_data: OrderItems = {
      batch_no:cart.batch_no,
      note: null,
      reason_id: null,
      discount_value:stock.customer_type.discount_value,
      tax_rate_id: stock.tax_rate?stock.tax_rate.id:null,
      sale_price_id: sale_price?sale_price.id:null,
      order_id: this.current_order?this.current_order.id:null,
      stock_id: stock?stock.stock_id:null,
      discount_reason_id: null,
      refund_reason_id:null,
      qty: 1,
      action:'add'
    };

    if (this.current_order) {
      this.updateOrder(cart_data);
    } else {
    this.createNewOrder({ status: 'pending',
      branch_id: parseInt(localStorage.getItem('active_branch')),
      user_id: this.currentUser.get('id'),
      business_id: this.currentUser.get('business')[0].id,
      customer_id:this.customer?this.customer.id:null,
      cart_data: cart_data });
    }
  }
}
updateOrder(params) {
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

}
