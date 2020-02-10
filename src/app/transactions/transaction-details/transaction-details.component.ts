import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { Order } from '@enexus/flipper-components';

@Component({
  selector: 'app-transaction-details',
  templateUrl: './transaction-details.component.html',
  styleUrls: ['./transaction-details.component.css']
})
export class TransactionDetailsComponent implements OnInit {
  orderDetails: Order | null;


  @Input() currency: string;
  @Input('order')
  set order(order: Order) {
    this.orderDetails = order;
  }
  @Output() closeOrderDetailsEmit = new EventEmitter<boolean>();
  get order(): Order {
    return this.orderDetails;
  }

  @ViewChild('printReceipt', { static: true }) myDiv: ElementRef;
  document = document;
  constructor(private ren: Renderer2) { }

  ngOnInit() {
  }

  closeOrderDetails() {
    this.closeOrderDetailsEmit.emit(false);
  }

  printOut() {
    var contents = this.myDiv.nativeElement.innerHTML;
    var frame1 = this.ren.createElement('iframe');
    frame1.name = "frame3";
    frame1.style.position = "absolute";
    frame1.style.top = "-1000000px";
    document.body.appendChild(frame1);
    var frameDoc = frame1.contentWindow;
    frameDoc.document.open();
    frameDoc.document.write('<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=70"><meta http-equiv="X-UA-Compatible" content="ie=edge"><title>Print Brcode Labels</title>');
    frameDoc.document.write('</head><body>');
    frameDoc.document.write(contents);
    frameDoc.document.write('</body></html>');
    frameDoc.document.close();
    setTimeout(() => {
      window.frames["frame3"].focus();
      window.frames["frame3"].print();
      document.body.removeChild(frame1);
    }, 500);
    return false;
  }
}
