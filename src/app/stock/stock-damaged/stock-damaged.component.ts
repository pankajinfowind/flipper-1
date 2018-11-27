import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-stock-damaged',
  templateUrl: './stock-damaged.component.html',
  styleUrls: ['./stock-damaged.component.scss']
})
export class StockDamagedComponent implements OnInit {

  public loading = new BehaviorSubject(false);

  constructor() {

  }

  ngOnInit() {
  }

}
