import { Component, OnInit, Inject } from '@angular/core';
import { Master } from '../../admin/master/master';
import { Observable } from 'rxjs';
import { MasterModelService } from '../../admin/master/master-model.service';
import { Category } from '../../admin/master/categories/api/category';
import { Stock } from '../../stock/api/stock';
import { Pos } from '../pos';
import { ApiPosService } from '../api/api.service';
import { finalize } from 'rxjs/operators';
import { PosModelService } from '../pos-model.service';
import { OrderItemsModelService } from '../cart/order-item-model.service';
import { OrderItems } from '../cart/order_items';
import { OrderModelService } from '../../orders/order-model.service';
import { Orders } from '../../orders/orders';
import { CurrentUser } from '../../common/auth/current-user';
import { Business } from '../../business/api/business';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { SetUpModelService } from '../../setup/setup-model.service';
import { CustomerType } from '../../setup/customerType/api/CustomerType';
import { SetUp } from '../../setup/setup';

@Component({
  selector: 'app-sale-point',
  templateUrl: './sale-point.component.html',
  styleUrls: ['./sale-point.component.scss']
})
export class SalePointComponent implements OnInit {
  master$: Observable<Master>;
  categories: Category[] = [];
  currently_stocks: Stock[] = [];
  pos$: Observable<Pos>;
  is_order_currently = false;
  current_order = null; //TODO: why this has no type?
  ordered_items = [];
  order$: Observable<Orders[]>;
  order_items$: Observable<OrderItems[]>;
  setup$: Observable<SetUp>;

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
  constructor(private setupModelService:SetUpModelService,private bottomSheet: MatBottomSheet,private currentUser: CurrentUser, private orderItemModelService: OrderItemsModelService, private orderModelService: OrderModelService, private api: ApiPosService, private posModelService: PosModelService, private msterModelService: MasterModelService) {

   }

  category_selected: Category;
  is_categry_clicked = false;
  customer_type:CustomerType=null;

  ngOnInit() {
    if (this.currentUser.user) {
      this.business = this.currentUser.user[0]; // ?
    }
//modelSetUpService
    this.master$ = this.msterModelService.master$;
    this.pos$ = this.posModelService.pos$;
    this.order_items$ = this.orderItemModelService.order_items$;
    this.setup$ = this.setupModelService.setup$;
    this.checkingCustomerTypeExist();
    this.getDefaultCustomerPrice();
    this.getCurrentOrder();
    this.getCategories();

  }
checkingCustomerTypeExist(){
  if (!this.pos$) return;
  this.pos$.subscribe(res => {
    if (res) {
        if(res.customer_type_price===null){
          this.updatePosSetPrice();
        }
    }
  });
}
updatePosSetPrice(){
  if (!this.setup$) return;
  this.setup$.subscribe(res => {
    if (res) {
    if(res.customertypes.find(p=>p.is_active==0)){
        const pos= this.posModelService.get();
          pos.customer_type_price=res.customertypes.find(p=>p.is_active==0);
          this.posModelService.update(pos);

      }

    }
  });
}
  getCategories() {
    if (!this.pos$) return;
    this.pos$.subscribe(res => {
      if (res) {
        this.categories = this.getRows(this.updateSalesPrices(res.stocks));
      }
    });
  }

getDefaultCustomerPrice(){
  if (!this.pos$) return;
      this.pos$.subscribe(res => {
        if (res && res.customer_type_price) {
          this.customer_type =res.customer_type_price?res.customer_type_price:null;
        }
      });
}
updateSalesPrices(stocks:Array<Stock>):Stock[]{
const updated:Stock[]=[];
if(stocks.length > 0){
  stocks.forEach(el=>{
    if(el.customer_type_items.length > 0){
        const prices=el.customer_type_items.find(p=>p['customer_type_id']==this.customer_type.id);
              el.item.unit_sale=prices.sale_price_including_tax;
              el.customer_type=prices.customer_type;
          if (el) {
            updated.push(el);
          }

    }else{
      if (el) {
        el.customer_type=null;
        updated.push(el);
     }
    }

  });
  return updated;
}else{

  return updated;
}
}

  removeDups(names) {
    let unique = {};
    names.forEach(function (i) {
      if (!unique[i]) {
        unique[i] = true;
      }
    });
    return Object.keys(unique);
  }
  getRows(data: Array<any>) {
    //console.log(data);
    let cat: Category[] = [];
    if (!data) {
      return [];
    } else {
      data.forEach(stock => {
        if (stock['category']) {
          cat.push(stock['category']);
        }
      });
      let obj = {};
      cat = Object.keys(cat.reduce((prev, next) => {
        if (!obj[next.id]) obj[next.id] = next;
        return obj;
      }, obj)).map((i) => obj[i]);
      return cat;
    };
  }
  //TODO:Ithink this function is not useful check with Ganza
  pushCat(cat) {
    const cats = [];
    if (cat.length > 0) {
      for (let i = 0; i < cat.length; i++) {
        if (!cats.includes(cat[i])) {
          cats.push(cat[i]);
        }
      }
    }
    return cats;

  }
  updatePosLayout(panel = 'home') {
    this.posModelService.update({ panel_content: panel });
  }
  homeDir() {
    this.is_categry_clicked = false
    this.updatePosLayout('home');
  }

  getCurrentOrder() {
    if (!this.pos$) return;
    this.current_order=null;
    this.pos$.subscribe(res => {
      if (res) {
        if(res.currently_ordered){
          this.current_order = res.currently_ordered;
        }
      }
    });
  }




saveToCartWithOrder(cart,stock:Stock){
      if (!this.business) return;
    this.getCurrentOrder();

    if (this.is_categry_clicked) {

      if (cart.total_qty === 0) {
        alert("Stock Quantity is unavailable");
      } else {
       const sale_price=stock.customer_type_items.find(p=>p.customer_type_id==stock.customer_type.id);
        const cart_data: OrderItems = {
          batch_no:cart.batch_no,
          note: null,
          reason_id: null,
          discount_value:this.customer_type?this.customer_type.discount_value:0.00,
          tax_rate_id: stock?stock.tax_rate.id:null,
          sale_price_id: sale_price?sale_price.id:null,
          order_id: this.current_order?this.current_order.id:null,
          stock_id: stock?stock.stock_id:null,
          discount_reason_id: null,
          refund_reason_id:null,
          qty: 1,
          action:'add'
        };

        if (this.current_order) {
          this.updateOrderItem(cart_data);
        } else {
          const pos=this.posModelService.get();
        this.createNewOrder({ status: 'ordered',
          branch_id: parseInt(localStorage.getItem('active_branch')),
          user_id: this.currentUser.get('id'),
          business_id: this.currentUser.get('business')[0].id,
          customer_id:pos.choose_customer?pos.choose_customer.customer_id:null,
          cart_data: cart_data });
        }
      }
  }
}

  updateOrderItem(params) {

    this.api.updateOrderItem(params).pipe(finalize(() =>
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
                                    ordered_items.unshift(order_item);
                            }
                          }
                    });

              }else{
                ordered_items.unshift(order_item);
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
  createNewOrder(params) {
    this.posModelService.update({ loading: true });
    this.api.createOrder(params).pipe(finalize(() => this.posModelService.update({ loading: false }))).subscribe(
      res => {
        if(res['order']){

            const order: Orders = res['order'] as Orders;
            const pos=this.posModelService.get();

            pos.currently_ordered=order;
            pos.loading=false;
            pos.orders.unshift(res['order']);

            if(order && order.customer){
              pos.choose_customer=order.customer;
              pos.customer_type_price=order.customer_type;
            }else{
              pos.choose_customer=null;
              pos.customer_type_price=null;
            }

            this.posModelService.update(pos);
              if(pos){
                this.orderItemModelService.update(order['order_items'], 'all');
              }


          }
      },
      _error => {
        console.error(_error);
      }
    );
  }

  // getRandomColor() {
  //   var letters = '0123456789ABCDEF';
  //   var color = '#';
  //   for (var i = 0; i < 6; i++) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color == '#ffffff' || color == '#303f9f' ? this.getRandomColor() : color;
  // }
  //[style.color]="'#ffff'" [style.background-color]="getRandomColor()"
  categoriesClicked(category) {
    this.category_selected = category;
    this.is_categry_clicked = true;
    if (this.is_categry_clicked) {
      this.pos$.subscribe(res => {
        if (res.stocks) {
          this.currently_stocks = this.updateSalesPrices(res.stocks).filter(stock => stock['category']['id'] === this.category_selected.id);
        }

      });
    }
  }
  percentage(num,num1) {
    let sum=Math.round(parseInt(num) *100)/parseInt(num1);
  return isNaN(sum)?0:sum.toFixed(1);
}
}




