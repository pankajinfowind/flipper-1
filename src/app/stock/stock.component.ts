import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit {
  add_toggled=false;
  link: string = 'avalaible';
  title: string = 'Available stock';
  action:string ='';
  nav_position:string='start';
  links: any[] = [
  {value:'new' ,viewValue:"Add item in stock"},
  {value:'avalaible' ,viewValue:"Available stock"},
  {value:'sold' ,viewValue:"Sold out"},
  {value:'damaged' ,viewValue:"Stock Damaged"}
  ];
  constructor() { }

  ngOnInit() {
  }
  goTo(v: string,vv: string) {
    this.link = v;
    this.title=vv;
  }
}
