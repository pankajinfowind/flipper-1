import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stock-sold-out',
  templateUrl: './stock-sold-out.component.html',
  styleUrls: ['./stock-sold-out.component.scss']
})
export class StockSoldOutComponent implements OnInit {
  url="stock/"+parseInt(localStorage.getItem('active_branch'))+'/stockout';
  constructor() {}

  ngOnInit() {
  }

}

