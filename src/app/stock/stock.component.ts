import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  add_toggled=false;
  link: string = 'Items';
  action:string ='';
  nav_position:string='start';
  links: string[] = ['Stock', 'Available stock', 'Sold out'];
  constructor() { }

  ngOnInit() {
  }
  goTo(position: string) {
    this.link = position;
  }
}
