import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.scss']
})
export class OrderCompleteComponent implements OnInit {

  url='';
  constructor() {
    this.url='orders/complete/'+parseInt(localStorage.getItem('active_branch'));
   }

  ngOnInit() {
       this.url='orders/complete/'+parseInt(localStorage.getItem('active_branch'));

  }
}
