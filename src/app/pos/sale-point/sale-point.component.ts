import { Component, OnInit } from '@angular/core';
import { Master } from '../../admin/master/master';
import { Observable } from 'rxjs';
import { MasterModelService } from '../../admin/master/master-model.service';
import { Category } from '../../admin/master/categories/api/category';
import { Stock } from '../../stock/api/stock';
import { StockModelService } from '../../stock/stock-model.service';
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
import { Bootstrapper } from '../../stock/bootstrapper.service';
import { BootstrapperPos } from '../bootstrapper.service';

@Component({
  selector: 'app-sale-point',
  templateUrl: './sale-point.component.html',
  styleUrls: ['./sale-point.component.scss']
})
export class SalePointComponent implements OnInit {
  master$: Observable<Master>;
  categories: Category[] = [];
  currently_stocks: Stock[] = [];
  stocks$: Observable<Stock[]>;
  pos$: Observable<Pos>;
  is_order_currently = false;
  current_order = null; //TODO: why this has no type?
  ordered_items = [];
  order$: Observable<Orders[]>;
  order_items$: Observable<OrderItems[]>;
  business: Business;
  constructor(private bootstrapper_pos: BootstrapperPos,private bootstrapper_stock: Bootstrapper,private currentUser: CurrentUser, private orderItemModelService: OrderItemsModelService, private orderModelService: OrderModelService, private api: ApiPosService, private posModelService: PosModelService, private modelService: StockModelService, private msterModelService: MasterModelService) {
    this.init_stock();
    this.init_pos();
   }
   init_stock() {
    return this.bootstrapper_stock.bootstrap();
    }
    init_pos() {
      return this.bootstrapper_pos.bootstrap();
      }
  category_selected: Category;
  is_categry_clicked = false;
  customer_type_id=13;
  ngOnInit() {
    if (this.currentUser.user) {
      this.business = this.currentUser.user[0]; // ?
    }
    this.master$ = this.msterModelService.master$;
    this.stocks$ = this.modelService.stocks$;
    this.pos$ = this.posModelService.pos$;
    this.order$ = this.orderModelService.order$;
    this.order_items$ = this.orderItemModelService.order_items$;
    this.getCurrentOrder();
    this.getCategories();
  }
  getCategories() {
    if (!this.stocks$) return;
    this.stocks$.subscribe(res => {
      if (res) {
        ;
        this.categories = this.getRows(this.updateSalesPrices(res['available']));
      }
    });
  }

updateSalesPrices(stocks:Array<Stock>){
//customer_id
const updated:Stock[]=[];
if(stocks.length > 0){
  stocks.forEach(el=>{
    //console.log(el);
    if(el.customer_type_items.length > 0){
        const prices=el.customer_type_items.filter(p=>p['customer_type_id']==this.customer_type_id)[0];
           el.item.unit_sale=prices.sale_price_including_tax;

          if (el) {
            updated.push(el);
          }

    }else{
      if (el) {
        updated.push(el);
     }
    }

  });
  console.log(updated);
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
    this.pos$.subscribe(res => {
      if (res) {
        this.current_order = res.currently_ordered;
        return;
      }
    });
  }




  addItemToCart(stock: Stock) {

    if (!this.business) return;
    this.getCurrentOrder();
    if (this.is_categry_clicked) {
      if (stock.available_stock_qty === 0) {
        alert("Stock Quantity is unavailable");
      } else {
        const cart_data: OrderItems = {
          total_amount: 0, note: null, discount: 0, tax: 18, total_discount: 0, total_tax: 0, available_qty: stock.available_stock_qty, id: stock.id, item: stock.name, order_id: this.current_order ? this.current_order.id : 0, stock_id: stock.stock_id, each: '', price: stock.item.unit_sale, currency: stock.item.currency,
          qty: 1, total: ''
        };
        cart_data.total = this.business.currency_code + ' ' + (cart_data.qty * cart_data.price);

        cart_data.total_amount = (cart_data.qty * cart_data.price);

        cart_data.each = this.business.currency_code + ' ' + stock.item.unit_sale;

        cart_data.total_tax = this.orderItemModelService.calcalTax(cart_data);

        cart_data.total_discount = this.orderItemModelService.calculateDiscount(cart_data);

        if (this.current_order) {
          this.updateCartItemModel(cart_data);
        } else {
          this.createNewOrder({ status: 'ordered', branch_id: parseInt(localStorage.getItem('active_branch')), user_id: this.currentUser.get('id'), business_id: this.currentUser.get('business')[0].id, cart_data: cart_data });
        }
      }

    }
  }

  updateCartItemModel(cart_data) {
    this.orderItemModelService.update(cart_data);
    this.findCartItemModelChanged(cart_data);
  }

  findCartItemModelChanged(cart_data) {
    this.order_items$.subscribe(ordered => {
      if (ordered) {
        const check_ordered = ordered.filter(order_item => order_item.order_id === cart_data.order_id && order_item.stock_id === cart_data.stock_id);
        if (check_ordered.length > 0) {
          this.updateOrderItemApi(check_ordered[0]);
        }
      }
    });
  }
  updateOrderItemApi(params) {
    this.api.updateOrderItem(params).subscribe(
      res => {
        console.log(res)
      },
      _error => {
        console.error(_error);
      }
    );
  }
  createNewOrder(params) {
    this.posModelService.update({ loading: true });
    this.api.createOrder(params).pipe(finalize(() => this.posModelService.update({ loading: false }))).subscribe(
      res => {
        if (res['order']) {
          this.posModelService.update({ currently_ordered: res['order'] });
          this.orderItemModelService.update(res['order']['order_items'][0]);
          // this.updateOrderItemApi(res['order']['order_items']);
        }
      },
      _error => {
        console.error(_error);
      }
    );
  }

  getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color == '#ffffff' || color == '#303f9f' ? this.getRandomColor() : color;
  }
  //[style.color]="'#ffff'" [style.background-color]="getRandomColor()"
  categoriesClicked(category) {
    this.category_selected = category;
    this.is_categry_clicked = true;
    if (this.is_categry_clicked) {
      this.stocks$.subscribe(res => {
        if (res['available']) {
          this.currently_stocks = this.updateSalesPrices(res['available']).filter(stock => stock['category']['id'] === this.category_selected.id);
        }

      });
    }
  }
}




