import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'order-ordered',
  templateUrl: './order-ordered.component.html',
  styleUrls: ['./order-ordered.component.scss']
})
export class OrderOrderedComponent implements OnInit {
url='';
  constructor() {
    this.url='orders/pending/'+parseInt(localStorage.getItem('active_branch'));
   }

  ngOnInit() {
       this.url='orders/pending/'+parseInt(localStorage.getItem('active_branch'));

  }

}
