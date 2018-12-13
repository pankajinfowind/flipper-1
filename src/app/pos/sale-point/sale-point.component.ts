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
  is_order_currently=false;
  current_order=null;
  ordered_items=[];
  order$: Observable<Orders[]>;
  order_items$: Observable<OrderItems[]>;
  constructor(private orderItemModelService:OrderItemsModelService,private orderModelService:OrderModelService,private api:ApiPosService,private posModelService:PosModelService,private modelService:StockModelService,private msterModelService:MasterModelService) { }
  category_selected:Category;
  is_categry_clicked=false;
  ngOnInit() {
    this.master$ = this.msterModelService.master$;

  this.stocks$ = this.modelService.stocks$;

  this.pos$ = this.posModelService.pos$;

  this.order$ = this.orderModelService.order$;

  this.order_items$=this.orderItemModelService.order_items$;

      this.getCurrentOrder();
      this.getCategories();

  }
  getCategories(){
    this.stocks$.subscribe(res=>{
      if(res){
        const cat=this.getRows(res['available']);
        this.categories=this.pushCat(cat);
      }
    });
  }
  getRows(data){
    const cat=[];
    data.forEach(stock => {
          if(stock['category']){
            cat.push(stock['category']);
          }
    });
  return cat;
  }
  pushCat(cat){
    const cats=[];
        if(cat.length > 0){
          for (let i=0; i<cat.length; i++) {
            if (!cats.includes(cat[i])) {
              cats.push(cat[i]);
            }
        }
      }
  return cats;

  }
  updatePosLayout(panel='home'){
    this.posModelService.update({panel_content:panel});
  }
  homeDir(){
    this.is_categry_clicked=!this.is_categry_clicked;
    this.updatePosLayout('home');
  }

  getCurrentOrder(){
    this.pos$.subscribe(res=>{
      if(res){
        this.current_order=res.currently_ordered;
        return;
      }
    });
  }




  addItemToCart(stock){
    this.getCurrentOrder();

       if(this.is_categry_clicked){
      if(stock.available_stock_qty === 0){
      alert("Stock Quantity is unavailable");
      }else{
        const cart_data:OrderItems={total_amount:0,note:null,discount:0,tax:18,total_discount:0,total_tax:0,available_qty:stock.available_stock_qty, id:stock.id,item:stock.name,order_id:this.current_order?this.current_order.id:0,stock_id:stock.stock_id,each:'',price:stock.item.unit_sale,currency:stock.item.currency,
        qty:1,total:''};
        cart_data.total=cart_data.currency +' ' + (cart_data.qty*cart_data.price);

        cart_data.total_amount=(cart_data.qty*cart_data.price);

        cart_data.each=cart_data.currency +' ' + stock.item.unit_sale;

        cart_data.total_tax=this.orderItemModelService.calcalTax(cart_data);

        cart_data.total_discount=this.orderItemModelService.calculateDiscount(cart_data);

          if(this.current_order){
            this.updateCartItemModel(cart_data);
          }else{
             this.createNewOrder({status:'pending',user_id:2,business_id:14,cart_data:cart_data});
          }
      }

     }
  }

  updateCartItemModel(cart_data){
    this.orderItemModelService.update(cart_data);
    this.findCartItemModelChanged(cart_data);
  }

findCartItemModelChanged(cart_data){
  this.order_items$.subscribe(ordered=>{
    if(ordered){
      const check_ordered=ordered.filter(order_item=>order_item.order_id===cart_data.order_id && order_item.stock_id===cart_data.stock_id);
      if(check_ordered.length > 0){
        this. updateOrderItemApi(check_ordered[0]);
      }
    }
  });
}
  updateOrderItemApi(params){
    this.api.updateOrderItem(params).subscribe(
      res => {
        console.log(res)
      },
      _error => {
      console.error(_error);
      }
    );
  }
  createNewOrder(params){
    this.posModelService.update({loading:true});
    this.api.createOrder(params).pipe(finalize(() =>  this.posModelService.update({loading:false}) )).subscribe(
      res => {
        if(res['order']){
          this.posModelService.update({currently_ordered:res['order']})
          this.updateOrderItemApi(res['order']['order_items']);
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
    return color=='#ffffff' || color == '#303f9f'?this.getRandomColor():color;
  }
  //[style.color]="'#ffff'" [style.background-color]="getRandomColor()"
  categoriesClicked(category){
    this.category_selected=category;
    this.is_categry_clicked=true;
      if(this.is_categry_clicked){
        this.stocks$.subscribe(res=>{
          if(res['available']){
            this.currently_stocks=res['available'].filter(stock=>stock['category']['id']===this.category_selected.id);
          }

        });
      }
  }
}




