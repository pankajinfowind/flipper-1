import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, BehaviorSubject} from 'rxjs';
import {map, startWith, debounceTime, distinctUntilChanged, switchMap, filter, take} from 'rxjs/operators';
import { Select, Store } from '@ngxs/store';
import { PosStockStates } from '../../store/states/PosStockStates';
import { Stock } from '../../stock/api/stock';
import { LoadSearchableStockEntries } from '../../store/actions/pos-Stock.action';
import { PosSearchStockStates } from '../../store/states/PosSearchStockStates';
import { CurrentUser } from '../../common/auth/current-user';
import { Business } from '../../business/api/business';
import { ApiPosService } from '../api/api.service';
import { MatBottomSheet, MatAutocompleteSelectedEvent } from '@angular/material';
import { CurrentOrder, OrderParms, CreateOrder, UpdateOrderItems } from '../../store/actions/pos-Order.action';
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
  @ViewChild('trigger', {static:true, read: ElementRef}) trigger: ElementRef;
  formControl = new FormControl();
  //public results: BehaviorSubject<State[]> = new BehaviorSubject([]);
  public results: Observable<any>;
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
  selectedItem=null;
  constructor(private bottomSheet: MatBottomSheet,private store:Store,public currentUser: CurrentUser) {

   }


  ngOnInit() {
    this.searchableResults();
  }
 

  percentage(num,num1) {
    let sum=Math.round(parseInt(num) *100)/parseInt(num1);
  return isNaN(sum)?0:sum.toFixed(1);
}
  private searchableResults(){
    this.store.dispatch(new LoadSearchableStockEntries());
  }
 
  public openSearchPage(params){
    this.store.dispatch(new LoadSearchableStockEntries(params));
  }


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

  if (cart.total_qty <= 0) {
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
                action:'add'
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
        }
      );
  }
}

  updateOrderItems(params) {
    params.lastUpdated=true;
    return this.store.dispatch(new UpdateOrderItems(params));
  }

  createNewOrder(params:OrderParms) {
    return this.store.dispatch(new CreateOrder(params));
  }

}
