import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-stock-lower',
  templateUrl: './stock-lower.component.html',
  styleUrls: ['./stock-lower.component.scss']
})
export class StockLowerComponent implements OnInit {

  public loading = new BehaviorSubject(false);

  constructor() {

  }

  ngOnInit() {
  }

}
