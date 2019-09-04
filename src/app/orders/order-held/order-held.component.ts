import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-held',
  templateUrl: './order-held.component.html',
  styleUrls: ['./order-held.component.scss']
})
export class OrderHeldComponent implements OnInit {

  url='';
  constructor() {
    this.url='orders/hold/'+parseInt(localStorage.getItem('active_branch'));
   }

  ngOnInit() {
       this.url='orders/hold/'+parseInt(localStorage.getItem('active_branch'));

  }
}
