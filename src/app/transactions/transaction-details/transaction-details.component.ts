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
  @Output() closeOrderDetailsEmit = new EventEmitter<boolean>();

  @Input('order')
  set order(order: Order) {
    this.orderDetails = order;
  }

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

 
}
