import { Component, OnInit, Input,  ChangeDetectorRef } from '@angular/core';
import { Invoice } from '../../invoices/invoice';
import { OrderItems } from '../../pos/cart/order_items';
import { ChangeDetectionStrategy } from '@angular/compiler/src/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { PosOrderState } from '../../store/states/PosOrderStates';
import { CustomizeInvoice } from '../../settings/customize-invoice/customize-invoice';
import { Customer } from '../../customers/customer';
import { CustomerType } from '../../setup/customerType/api/CustomerType';
import { Business } from '../../business/api/business';
import { Branch } from '../../admin/master/branch/api/branch';

@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PrintInvoiceComponent implements OnInit {
  orderItems: OrderItems[] = [];
  @Select(PosOrderState.currentInvoice) invoice$: Observable<Invoice>;
  invoice_fields:CustomizeInvoice=null;
  customer:Customer=null;
  customer_type:CustomerType=null;
  business:Business=null;
  branch:Branch=null;
  invoice:Invoice=null;
  today=new Date();
  @Input() preview:boolean=true;
  constructor(private cdr: ChangeDetectorRef) {
   }

  ngOnInit() {
    if(this.invoice$){
      this.invoice$.subscribe(invoice=>{
        if(invoice){
          const inv=invoice['invoice'] as Invoice;
          this.invoice=inv;
          this.orderItems=inv.orderItems.length > 0?inv.orderItems:[];
          this.invoice_fields=inv.printFormat[0];
          this.business=inv.business;
          this.customer=inv.customer;
          this.branch=inv.branch;
          this.customer_type=inv.customer_type;
          
        }
      });
       
    }

    
    this.cdr.markForCheck();
  }

  total(array:Array<OrderItems>,prop) {
    var total = 0;
    if (array.length > 0) {
      for (var i = 0, _len = array.length; i < _len; i++) {
        total += array[i][prop]
      }
    }
    return total;

  }
   

  printInvoice(divName) {
    var contents = document.getElementById(divName).innerHTML;
    var frame1 = document.createElement('iframe');
    frame1.name = "frame3";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow ;
    //? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Print Invoice</title> <style>@media print{body{color:#000;background-color:#fff}}.invoice-box{max-width:850px;margin:auto;padding:5px;font-size:12px;line-height:15px;color:#000;text-align:left}.invoice-box table{width:100%;table-layout:fixed;text-align:left}.invoice-box table td{padding:2px;vertical-align:top}.invoice-box tr,td,th{border:thin solid #000;white-space:-o-pre-wrap;word-wrap:break-word;white-space:pre-wrap;white-space:-moz-pre-wrap;white-space:-pre-wrap}.th-border,.tr-border{border:none!important}.invoice-box table tr td:nth-child(2){text-align:right}.invoice-box table tr.top table td{padding-bottom:7px}.invoice-box table tr.top table td.title{font-size:45px;line-height:45px;color:#000}.heading{background:#eee;border-bottom:thin solid #ddd;font-weight:700}.percentage_total{display:inline-flex;width:100%}.signature{width:60%}.table-none{width:30%;color:#fff}.table-tax{width:50%;font-size:13px}.table-percentage_total{width:50%}.table-signature_done{width:60%;font-size:14pt}.table-reception{width:40%}.no-bottom-border{border-bottom:0;border-left:0}.border-none{padding:0!important;border:none!important}.small{font-size:9.5px!important}.small-md{font-size:15px!important;align-items:center;align-content:center;text-align:center}.text-center{text-align:center!important}</style> ');
    frameDoc.document.write('</head><body>');
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout( () =>{
        window.frames["frame3"].focus();
        window.frames["frame3"].print();
        document.body.removeChild(frame1);
    }, 500);
    return false;
  }


  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }
}
