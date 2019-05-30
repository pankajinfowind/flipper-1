import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomizeInvoice } from '../customize-invoice';
import { CustomizeInvoicePreviewDataService } from '../customize-invoice-preview-data.service';

@Component({
  selector: 'app-preview-invoice-customized',
  templateUrl: './preview-invoice-customized.component.html',
  styleUrls: ['./preview-invoice-customized.component.scss']
})
export class PreviewInvoiceCustomizedComponent implements OnInit {
  subscription: Observable<CustomizeInvoice>;
  invoice$: Observable<CustomizeInvoice>;

  constructor(private serviceModel:CustomizeInvoicePreviewDataService) { }

  ngOnInit() {
    this.subscription = this.invoice$ = this.serviceModel.invoice$;
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
  frameDoc.document.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Print Invoice</title> <style> @media print{body{color:#000;background-color:#fff}}.invoice-box{max-width:800px;margin:auto;padding:10px;font-size:16px;line-height:24px;color:#000}.invoice-box table{width:100%;line-height:inherit;text-align:left}.invoice-box table td{padding:5px;vertical-align:top}.invoice-box tr,td,th{border:1px solid #000}.th-border,.tr-border{border:none!important}.invoice-box table tr td:nth-child(2){text-align:right}.invoice-box table tr.top table td{padding-bottom:20px}.invoice-box table tr.top table td.title{font-size:45px;line-height:45px;color:#000}.heading{background:#eee;border-bottom:1px solid #ddd;font-weight:700}.percentage_total{display:inline-flex;width:100%}.signature{width:60%}.table-none{width:30%;color:#fff}.table-tax{width:50%;font-size:13px}.table-percentage_total{width:50%}.table-signature_done{width:60%;font-size:14pt}.table-reception{width:40%}.no-bottom-border{border-bottom:0;border-left:0}.border-none{padding:0!important;border:none!important}</style> ');
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

}
