import { Component, OnInit } from '@angular/core';
import { Master } from '../../admin/master/master';
import { Observable } from 'rxjs';
import { MasterModelService } from '../../admin/master/master-model.service';
import { Category } from '../../admin/master/categories/api/category';
import { Stock } from '../../stock/api/stock';
import { StockModelService } from '../../stock/stock-model.service';
import { Pos } from '../pos';
import { OrderModelService } from '../orders/order-model.service';
import { ApiPosService } from '../api/api.service';
import { finalize } from 'rxjs/operators';
import { PosModelService } from '../pos-model.service';
import { Orders } from '../orders/orders';
import { OrderItemsModelService } from '../cart/order-item-model.service';
import { OrderItems } from '../cart/order_items';

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

    this.master$.subscribe(res=>{
      if(res.categories.length  > 0){
        this.categories=res.categories;
      }
  });

  this.stocks$ = this.modelService.stocks$;

  this.pos$ = this.posModelService.pos$;

  this.order$ = this.orderModelService.order$;

  this.order_items$=this.orderItemModelService.order_items$;

      this.getCurrentOrder();

  }

  getCurrentOrder(){
    this.order$.subscribe(res=>{
      if(res['orders'] !=undefined || null){
        this.current_order=res['orders'].filter(item=>item.status==='pending');
      }

 });
  }

  getCartItem(){
    this.order_items$.subscribe(res=>{
      console.log(res);
      if(res['order_items'] !=undefined || null){
       console.log(res);
      }

 });
  }


  addItemToCart(stock){
    this.getCurrentOrder();
      if(this.is_categry_clicked){
      if(stock.available_stock_qty === 0){
      alert("Stock Quantity is unavailable");
      }else{

          if(this.current_order!==undefined || null){
            this.updateCartItem(stock);
            //console.log(this.current_order);
          }else{

          }
      }

    }
  }

  updateCartItem(stock){
    const cart_data={id:stock.stock_id,Item:stock.name,order_id:this.current_order.id,order_item:stock.stock_id,Each:'',price:stock.item.unit_sale,currency:stock.item.currency,
      Qty:1,Total:''};
      cart_data.Total=cart_data.currency +' ' + (cart_data.Qty*cart_data.price);
      cart_data.Each=cart_data.currency +' ' + stock.item.unit_sale;
    this.orderItemModelService.update(cart_data);

this.getCartItem();
  }

  createNewOrder(params){
    this.posModelService.update({loading:true});
    this.api.createOrder(params).pipe(finalize(() =>  this.posModelService.update({loading:false}) )).subscribe(
      res => {
        this.orderModelService.update(res['orders'])
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
            this.currently_stocks=res['available'].filter(stock=>stock['category']['id']===this.category_selected.category_id);
          }

        });
      }
  }
}
