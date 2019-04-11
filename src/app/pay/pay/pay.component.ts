import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PosModelService } from '../../pos/pos-model.service';
import { Pos } from '../../pos/pos';
import { OrderItemsModelService } from '../../pos/cart/order-item-model.service';
import { Business } from '../../business/api/business';
import { CurrentUser } from '../../common/auth/current-user';
import { OrderItems } from '../../pos/cart/order_items';
import { Orders } from '../../orders/orders';
import { Store } from '@ngrx/store';
import * as fromStore from '../../store';
import { Invoice, Status, PaymentMethod } from '../../invoices/invoice';
import { randomString } from '../../common/core/utils/random-string';
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
  d_amount_return:number=0;
  amount_return_color:string='black';
  d_amount_return_color:string='black';
  currently_ordered:Orders=null;

  loading$:Observable<boolean>;
  loaded$:Observable<boolean>;
  isSuccess$:Observable<boolean>;


  constructor(private store:Store<fromStore.FlipperState>,
    private orderItemModelService: OrderItemsModelService,
    private posModelService: PosModelService,
    public currentUser: CurrentUser,
  ){ }

  ngOnInit() {
    this.loading$=this.store.select(fromStore.getInvoicesLoading);
    this.loaded$=this.store.select(fromStore.getInvoicesLoaded);
     this.isSuccess$=this.store.select(fromStore.isInvoiceSuccess);

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

    return total?total:0.00;

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
      //discount
      this.d_amount_return=0;
      this.d_amount_return= this.numeric_selector == 0?0:this.numeric_selector - this._total('total_amount_discount');
      if(this.d_amount_return > 0){
        this.d_amount_return_color='green';
      }else if(this.d_amount_return == 0){
        this.d_amount_return_color='black';
      }else{
        this.d_amount_return_color='red';
      }
    }

    payingInvoice(){
      if(this.amount_return_color =='red'){
          alert('Amount entered is less than amount due.');
      }else{
        const forming_invoice:Invoice={
          invoice_no:randomString(6),
          invoice_date:new Date(),
          total_discounts:this._total('total_amount_discount'),
          total_items:this._total('qty'),
          taxable_vat:this._total('taxable_vat'),
          total_amount:this._total('total_amount'),
          amount_given:parseInt(this.numeric_selector==0?this.total('total_amount'):this.numeric_selector),
          amount_return:this.amount_return,
          status:Status.COMPLETE,
          branch_id: parseInt(localStorage.getItem('active_branch')),
          payment_method:PaymentMethod.CASH,
          order:this.currently_ordered?this.currently_ordered:null,
          orderItems:this.data,
          tax_rate_id:null,
          order_id:this.currently_ordered.id,
          customer_id:this.currently_ordered.customer?this.currently_ordered.customer.id:null,
          customer_type_id:this.currently_ordered.customer_type?this.currently_ordered.customer_type.id:null
        }
      return this.create(forming_invoice);
      }
    }


    create(form_data:Partial<Invoice>){
      this.store.dispatch(new fromStore.AddInvoice(form_data));
       return this.IsCreateOrUpdateSuccess();
     }

   IsCreateOrUpdateSuccess(){
   this.isSuccess$.subscribe(issuccess=>{
   if(issuccess){
     console.log('success invoice');
     const pos=this.posModelService.get();
     pos.currently_ordered=null;
     const objIndex = pos.orders.findIndex((obj => obj.is_currently_processing == '1'));
     pos.orders[objIndex].is_currently_processing='0';
     pos.orders[objIndex].status='complete';
     pos.choose_customer=null;
     pos.panel_content='home';

     this.posModelService.update(pos);
     this.orderItemModelService.update([], 'all');
   }
   });
  }
  printHtml (data) {
    var template=
    '<md-dialog  class="printSection">' +
    '    <md-dialog-content style="min-width:600px;">' +
    '        <md-content flex="" layout-padding="">' +
    ' <div class="invoice-box">  ' +
    '  <table cellpadding="0" cellspacing="0"> ' +
    '  <tr class="top"> ' +
    '  <td colspan="2"> ' +
    '  <table> ' +
    '  <tr> ' +
    '  <td class="title"> ' +
    '  <img src="http://nextstepwebs.com/images/logo.png" style="width:100%; max-width:300px;"> ' +
    '  </td> ' +
    '  <td> ' +
    '  Invoice #: 123<br> ' +
    '  Created: January 1, 2015<br> ' +
    '  Due: February 1, 2015 ' +
    '  </td> ' +
    '  </tr> ' +
    '  </table> ' +
    '  </td> ' +
    '  </tr> ' +
    '  <tr class="information"> ' +
    '  <td colspan="2"> ' +
    '  <table> ' +
    '  <tr> ' +
    '  <td> ' +
    '  Next Step Webs, Inc.<br> ' +
    '  12345 Sunny Road<br> ' +
    '  Sunnyville, TX 12345 ' +
    '  </td> ' +
    '  <td> ' +
    '  Acme Corp.<br> ' +
    '  John Doe<br> ' +
    '  john@example.com ' +
    '  </td> ' +
    '  </tr> ' +
    '  </table> ' +
    '  </td> ' +
    '  </tr> ' +
    '  <tr class="heading"> ' +
    '  <td> ' +
    '  Payment Method ' +
    '  </td> ' +
    '  <td> ' +
    '  Check # ' +
    '  </td> ' +
    '  </tr> ' +
    '  <tr class="details"> ' +
    '  <td> ' +
    '  Check ' +
    '  </td> ' +
    '  <td> ' +
    '  1000 ' +
    '  </td> ' +
    '  </tr> ' +
    '  <tr class="heading"> ' +
    '  <td> ' +
    '  Item ' +
    '  </td> ' +
    '  <td> ' +
    '  Price ' +
    '  </td> ' +
    '  </tr> ' +
    '  <tr class="item"> ' +
    '  <td> ' +
    '  Website design ' +
    '  </td> ' +
    '  <td> ' +
    '  300 ' +
    '  </td> ' +
    '  </tr> ' +
    '  <tr class="item"> ' +
    '  <td> ' +
    '  Hosting (3 months) ' +
    '  </td> ' +
    '  <td> ' +
    '  75 ' +
    '  </td> ' +
    '  </tr> ' +
    '  <tr class="item last"> ' +
    '  <td> ' +
    '  Domain name (1 year) ' +
    '  </td> ' +
    '  <td> ' +
    '  10 ' +
    '  </td> ' +
    '  </tr> ' +
    '  <tr class="total"> ' +
    '  <td></td> ' +
    '  <td> ' +
    '  Total: $385.00 ' +
    '  </td> ' +
    '  </tr> ' +
    '  </table> ' +
    ' </div>  ' +

    '        </md-content>' +
    '    </md-dialog-content>' +
    '    <md-dialog-actions layout="row">' +
    '     Murakoze!' +
    '    </md-dialog-actions>' +
    '</md-dialog>';
    return  document.getElementById("print-section").innerHTML=template;
};



        print(){
          this.printHtml (null);
          var contents = document.getElementById("print-section").innerHTML;
          var frame1 = document.createElement('iframe');
          frame1.name = "frame3";
          frame1.style.position = "absolute";
          frame1.style.top = "-1000000px";
          document.body.appendChild(frame1);
          var frameDoc = frame1.contentWindow ;
          //? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
          frameDoc.document.open();
          frameDoc.document.write('<html><head> <style>md-dialog-actions{display:none}.invoice-box{max-width:800px;margin:auto;padding:30px;border:1px solid #eee;box-shadow:0 0 10px rgba(0,0,0,.15);font-size:16px;line-height:24px;color:#555}.invoice-box table{width:100%;line-height:inherit;text-align:left}.invoice-box table td{padding:5px;vertical-align:top}.invoice-box table tr td:nth-child(2){text-align:right}.invoice-box table tr.top table td{padding-bottom:20px}.invoice-box table tr.top table td.title{font-size:45px;line-height:45px;color:#333}.invoice-box table tr.information table td{padding-bottom:40px}.invoice-box table tr.heading td{background:#eee;border-bottom:1px solid #ddd;font-weight:700}.invoice-box table tr.details td{padding-bottom:20px}.invoice-box table tr.item td{border-bottom:1px solid #eee}.invoice-box table tr.item.last td{border-bottom:none}.invoice-box table tr.total td:nth-child(2){border-top:2px solid #eee;font-weight:700} </style>');
          frameDoc.document.write('</head><body>');
          frameDoc.document.write(contents);
          frameDoc.document.write('</body></html>');
          frameDoc.document.close();
          setTimeout(function () {
              window.frames["frame3"].focus();
              window.frames["frame3"].print();
              document.body.removeChild(frame1);
          }, 500);
          return false;
        }
}
