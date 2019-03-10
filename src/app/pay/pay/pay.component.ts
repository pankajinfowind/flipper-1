import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PosModelService } from '../../pos/pos-model.service';
import { Pos } from '../../pos/pos';
import { OrderItemsModelService } from '../../pos/cart/order-item-model.service';
import { Business } from '../../business/api/business';
import { CurrentUser } from '../../common/auth/current-user';
import { OrderItems } from '../../pos/cart/order_items';
import { Pay } from '../pay';
import { Orders } from '../../orders/orders';
import { Insurance } from '../../admin/master/insurance/api/insurance';

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {
  business: Business;
  pos$: Observable<Pos>;
  order_items$: Observable<OrderItems[]>;
  data: OrderItems[] = [];
  numeric_selector:any=0;
  amount_return:number=0;
  amount_return_color:string='black';
  currently_ordered:Orders=null;
  choosen_insurance:Insurance=null;
  constructor(
    private orderItemModelService: OrderItemsModelService,
    private posModelService: PosModelService,
    public currentUser: CurrentUser
  ){ }

  ngOnInit() {
    this.pos$ = this.posModelService.pos$;
    this.order_items$ = this.orderItemModelService.order_items$;
    if (this.currentUser.user) {
      this.business = this.currentUser.get('business')[0];
    }

    if (this.order_items$) {
      this.order_items$.subscribe(res => {
        if (res) {
          console.log(res);
          this.data = res;
        }

      });

    }
    if (!this.pos$) {
      return;
    } else {
      this.pos$.subscribe(p => {
        if (p) {
          this.currently_ordered = p.currently_ordered;
          this.choosen_insurance = p.currently_ordered ? p.currently_ordered.insurance : null;
        }
      });
    }
  }

  _total(prop) {
    var total = 0;
    if (this.data.length > 0) {
      for (var i = 0, _len = this.data.length; i < _len; i++) {
        total += this.data[i][prop]
      }
    }

    return total;

  }


  total(prop) {
    var total = 0;
    if (this.data.length > 0) {
      for (var i = 0, _len = this.data.length; i < _len; i++) {
        total += this.data[i][prop]
      }
    }
    const s=total.toString();
    return  parseFloat(s).toFixed(2);

  }
  keysClicked(key) {
      if (key == 'x') {
        this.numeric_selector=this.numeric_selector == 0?0:this.numeric_selector.slice(0, -1);
        if(!this.numeric_selector){
             this.numeric_selector=0;
        }
      } else {
        this.numeric_selector=this.numeric_selector==0?key:this.numeric_selector+''+key;
        this.numeric_selector =this.numeric_selector.replace('..', ".");
      }
      this.displayBalanceChangesDue();
    }
    mainKeyClicked(key){
      this.numeric_selector=0;
      this.numeric_selector=key;
      this.displayBalanceChangesDue();
    }
    displayBalanceChangesDue(){
      this.amount_return=0;
      this.amount_return= this.numeric_selector == 0?0:this.numeric_selector - this._total('total_amount');
      if(this.amount_return > 0){
        this.amount_return_color='green';
      }else if(this.amount_return == 0){
        this.amount_return_color='black';
      }else{
        this.amount_return_color='red';
      }
    }

    payingInvoice(payment_method){
      if(this.amount_return_color =='red'){
          alert('Amount entered is less than amount due.');
      }else{
        const forming_invoice:Pay={
          invoice_no:'',
          invoice_date:new Date(),
          insurance_id:this.choosen_insurance?this.choosen_insurance.id:0,
          discounts:this._total('total_discount'),
          total_items:this._total('qty'),
          tax:this._total('total_tax'),
          amount:this._total('total_amount'),
          amount_given:this.numeric_selector==0?this.total('total_amount'):this.numeric_selector,
          amount_return:this.amount_return,
          currency:this.business.currency_code,
          status:'complete',
          pos_session_id:0,
          branch_id: parseInt(localStorage.getItem('active_branch')),
          customer_id:0,
          payment_method:payment_method,
          order:this.currently_ordered?this.currently_ordered:null,
          order_items:this.data
        }
        console.log(forming_invoice);
      }
    }
}
