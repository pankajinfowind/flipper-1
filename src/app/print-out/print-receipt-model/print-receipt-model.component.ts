import { Component, OnInit, ViewEncapsulation, Inject } from '@angular/core';
import { Invoice } from '../../invoices/invoice';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CurrentUser } from '../../common/auth/current-user';
import { DomSanitizer } from '@angular/platform-browser';
import { OrderItems } from '../../pos/cart/order_items';

@Component({
  selector: 'app-print-receipt-model',
  templateUrl: './print-receipt-model.component.html',
  styleUrls: ['./print-receipt-model.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PrintReceiptModelComponent implements OnInit {
  currentStyles = null;
  logo: any;
  constructor(
    public current:CurrentUser,
    private sanitizer: DomSanitizer,
    private dialogRef: MatDialogRef<PrintReceiptModelComponent>,
    @Inject(MAT_DIALOG_DATA) public invoice: Invoice) { 
     this.currentStyles= {     
        'font-style':  this.current.getReceipt('font_style')  ? this.current.getReceipt('font-style') : 'normal',  
        'color':       this.current.getReceipt('color') ? this.current.getReceipt('color')   : 'black',     
        'font-size':   this.current.getReceipt('font_size') ? this.current.getReceipt('font_size')   : '12px',
        'font-family':   this.current.getReceipt('font_family') ? this.current.getReceipt('font_size')   : '12px',
        'font-weight':   this.current.getReceipt('font_weight') ? this.current.getReceipt('font_weight')   : 'normal',
        'letter-spacing':   this.current.getReceipt('letter_spacing') ? this.current.getReceipt('letter_spacing')   : '1.2px' 
    };
    this.logo=this.getSantizeUrl(this.current.getReceipt('company_logo'));
    }

  ngOnInit() {
  }

  public close(data?: any) {
    this.dialogRef.close(data);
}
public getSantizeUrl(url : string) {
  return this.sanitizer.bypassSecurityTrustUrl(url);
}

printReceipt(divName) {
  var contents = document.getElementById(divName).innerHTML;
  var frame1 = document.createElement('iframe');
  frame1.name = "frame3";
  frame1.style.position = "absolute";
  frame1.style.top = "-1000000px";
  document.body.appendChild(frame1);
  var frameDoc = frame1.contentWindow ;
  //? frame1.contentWindow : frame1.contentDocument.document ? frame1.contentDocument.document : frame1.contentDocument;
  frameDoc.document.open();
  let style_variant='font-style:'+this.current.getReceipt('font_style')+';color:'+this.current.getReceipt('color')+';font-weight:'+this.current.getReceipt('font_weight')+';font-family:'+this.current.getReceipt('font_family')+';font-size:'+this.current.getReceipt('font_size')+';letter-spacing:'+this.current.getReceipt('letter_spacing');
  frameDoc.document.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=70"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Print Receipt</title> <style>#receipt{padding:2mm;margin:0 auto;width:90mm;background:#fff;'+style_variant+'}#bot,#mid,#top{border-bottom:2px dotted #000;'+style_variant+'}#top{min-height:60px;text-align:center;'+style_variant+'}#mid{min-height:auto}#bot{min-height:50px}#top .logo{position: relative;height: 50px;width: 50px;top: 0%;left: 46.8%;border:solid 1px #ccc;border-radius:50px;'+style_variant+'}.clientlogo {height: 50px;width: 50px;border-radius: 50px;}.info{display:block;margin-left:0;'+style_variant+'}table{width:100%;border:none!important;line-height:1.1em;'+style_variant+'}td,tr{padding:0;margin:0;'+style_variant+'}.tabletitle{padding:0;margin:0;'+style_variant+'}.item{width:50mm;padding:0;'+style_variant+'}#legalcopy{margin-top:20mm;'+style_variant+'}.table-borderless>tbody>tr>td,.table-borderless>tbody>tr>th,.table-borderless>tfoot>tr>td,.table-borderless>tfoot>tr>th,.table-borderless>thead>tr>td,.table-borderless>thead>tr>th{border:none!important}.bottomBord{border-top:1px dotted #000}.topbord{border-bottom:1px dotted #000}</style> ');
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
total(array:Array<OrderItems>,prop) {
  var total = 0;
  if (array.length > 0) {
    for (var i = 0, _len = array.length; i < _len; i++) {
      total += array[i][prop]
    }
  }
  return total;

}
}
