import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-stock-lower',
  templateUrl: './stock-lower.component.html',
  styleUrls: ['./stock-lower.component.scss']
})
export class StockLowerComponent implements OnInit {
  url="stock/"+parseInt(localStorage.getItem('active_branch'))+'/lowerstock';

  constructor() {

  }

  ngOnInit() {
  }

}
