import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Invoice } from '../../invoices/invoice';
import { OrderItems } from '../../pos/cart/order_items';

@Component({
  selector: 'app-print-invoice',
  templateUrl: './print-invoice.component.html',
  styleUrls: ['./print-invoice.component.scss']
})
export class PrintInvoiceComponent implements OnInit {
  @Input() public canPrintOut: boolean=false;
  @Output() valueChange = new EventEmitter<any>();
  @Input() public invoice:Invoice;
  orderItems: OrderItems[] = [];
  constructor() {

   }

  ngOnInit() {
    if(this.invoice){
       this.orderItems=this.invoice.orderItems.length > 0?this.invoice.orderItems:[];
    }
    if(this.canPrintOut){
      this.print();
      this.canPrintOut=false;
    }

  }

  total(prop) {
    var total = 0;
    if (this.orderItems.length > 0) {
      for (var i = 0, _len = this.orderItems.length; i < _len; i++) {
        total += this.orderItems[i][prop]
      }
    }
    const s=total.toString();
    return  parseFloat(s).toFixed(2);
  }

  print(){
    this.printHtml();
    this.printCartItem();
    var contents = document.getElementById("print-section").innerHTML;
    var frame1 = document.createElement('iframe');
    frame1.name = "frame3";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow ;
    //? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
    frameDoc.document.open();
    frameDoc.document.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Print Invoice</title></head> <style>.invoice-box { max-width: 800px;margin: auto;padding: 10px;font-size: 16px;line-height: 24px;color: #555}.invoice-box table {width: 100%; line-height: inherit; text-align: left;} .invoice-box table td {padding: 5px;vertical-align: top } .invoice-box tr,td,th {  border: 1px solid #000;} .th-border,.tr-border {border: none!important;} .invoice-box table tr td:nth-child(2) {text-align: right}.invoice-box table tr.top table td {padding-bottom: 20px}.invoice-box table tr.top table td.title {font-size: 45px;line-height: 45px;color: #333}.heading {background: #eee;border-bottom: 1px solid #ddd;font-weight: 700}.percentage_total {display: inline-flex;width: 100%;}.signature{width: 60%;}.table-none {width: 60%;color: #fff;}.table-percentage_total { width: 40%; }.no-bottom-border {border-bottom: 0;border-left: 0;}} </style>');
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

  printCartItem(){
    var html='';
    this.orderItems.forEach((element,i) => {

      html+=`<tr>
      <td>${i+1}</td>
      <td>${element['item_code']}</td>
      <td>${element['item']}</td>
      <td>---</td>
      <td>----</td>
      <th>${element.qty}</th>
      <th>${this.invoice?this.invoice.currency:''} ${element.price}</th>
      <th>${this.invoice?this.invoice.currency:''} ${element.total_amount}</th>
    </tr>`;
    });

  return document.getElementById("list_items").innerHTML=html;
  }
  printHtml () {

    var template=` <div style="min-width:600px;">
    <div class="invoice-box">
      <div class="printSection">
        <div style="min-width:600px;">
          <div>
            <div class="invoice-box">
              <table class="title">
                <tr class="tr-border">
                  <th class="th-border" style="width:15%">
                    <img src="assets/logo/mmi-logo.png" alt="" style="width:100%">
                  </th>
                  <th class="th-border" style="width:80%">
                    <span>MILITARY MEDICAL INSURANCE(MMI)</span><br />
                    <span>B.P.6319</span><br />
                    <span>KIGALI</span>
                  </th>
                  <th class="th-border" style="width:25%">
                    N°:${this.invoice?this.invoice.invoice_no:'.......'}<br />
                    Date:${this.invoice?this.invoice.invoice_date:'.......'}<br />
                  </th>
                </tr>
                <tr>
                  <th colspan="3" class="tr-border" style="text-align:center; text-decoration:underline">FEUILLE DE
                    PRISE EN CHARGE</th>
                </tr>
              </table>

              <table cellpadding="0" cellspacing="0" style="margin-top:8%">
                <tr class="tr-border">
                  <th class="th-border" colspan="4">
                    <h3>AFFILIE</h3>
                  </th>
                </tr>

                <tr>
                  <th class="th-border">
                    N° AFFILIATION:${this.invoice?this.invoice.customer?this.invoice.customer.customer_no:'.......':'.......'}
                  </th>
                  <th class="th-border">
                    NOM ET PRENOM ${this.invoice?this.invoice.customer?this.invoice.customer.full_name:'.......':'.......'}
                  </th>
                  <th class="th-border">
                    SEX ${this.invoice?this.invoice.customer?this.invoice.customer.gender:'.......':'.......'}
                  </th>
                  <th class="th-border">
                    AGE .......
                  </th>
                </tr>


              </table>


              <table cellpadding="6" cellspacing="0"
                style="margin-top:8%">

                <thead>
                  <tr valign="top" style="border:none!important">
                    <th style="border:none!important" colspan="8">MEDICAMENTS FOURNIS</th>
                  </tr>
                  <tr valign="top" class="heading">
                    <th>No</th>
                    <th>Code</th>
                    <th>No Produits Fournis</th>
                    <th>Forme</th>
                    <th>Dosage</th>
                    <th>QTE</th>
                    <th>Prix Unitaire</th>
                    <th>Prix Total</th>
                  </tr>
                </thead>
                <tbody id="list_items">

                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="7" class="no-bottom-border" style="text-align:right;font-weight: bold">TOTAL: </td>
                    <td style="border:1px solid #000;text-align:left;font-weight: bold">
                    ${this.invoice?this.invoice.currency:''} ${this.invoice?this.total('total_amount'):0.00} </td>
                  </tr>
                </tfoot>
              </table>
              <br />
              <div class="percentage_total">
                <div class="table-none">.</div>
                <div class="table-percentage_total">
                  <table cellpadding="2" cellspacing="0" border=1>
                    <tr>
                      <th style="width:65%">
                        <span style="float: left;font-weight: bold">TOTAL</span>
                        <span style="float: right;font-weight: bold">100%</span>
                      </th>
                      <th style="width:35%">${this.invoice?this.invoice.currency:''} ${this.invoice?this.total('total_amount'):0.00}
                      </th>

                    </tr>

                    <tr>
                      <th style="width:65%">
                        <span style="float: left;font-weight: bold">ADRHERENT</span>
                        <span
                          style="float: right;font-weight: bold">${this.invoice?this.invoice.customer_type_discount_value:0.00}%</span>
                      </th>
                      <th style="width:35%">${this.invoice?this.invoice.currency:''}
                      ${this.invoice?this.total('total_customer_type_amount_discount'):0.00}</th>

                    </tr>
                    <tr>
                      <th style="width:65%">
                        <span style="float: left;font-weight: bold">${this.invoice?this.invoice.customer_type.name:''}</span>
                        <span
                          style="float: right;font-weight: bold">${this.invoice?this.invoice.company_discount_value:0.00}%</span>
                      </th>
                      <th style="width:35%">${this.invoice?this.invoice.currency:null}
                      ${this.invoice?this.total('company_total_amount_discount'):0.00}</th>

                    </tr>

                  </table>
                </div>


              </div>

              <div class="percentage_total" style="margin-top:10%">
                <div class="signature">
                  <b>Fait à ...........................le ...........................</b>
                  <br />
                  <table>
                    <tr style="border:none!important">
                      <th style="border:none!important">Sign bénéficiaire
                        <br />ou du donnant droit
                      </th>
                      <th style="border:none!important"> Nom, Cashet Signature du prestataire</th>
                    </tr>
                  </table>

                </div>
                <div class="table-percentage_total">
                  <span style="float: left;font-weight: bold">Cachet de la FOSA</span>
                  <span style="float: right;font-weight: bold">VISA MMI</span>

                </div>
              </div>
            </div>

          </div>
        </div>
        <br />
        <div style="text-align:center;margin-top:30%">
          <b>&copy; Flipper Ltd</b>
        </div>
      </div>
    </div>
  </div>`;


    return  document.getElementById("print-section").innerHTML=template;
};

}
