import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'stock-no-entry-found',
  templateUrl: './no-entry-found.component.html',
  styleUrls: ['./no-entry-found.component.scss']
})
export class NoEntryFoundStockComponent implements OnInit {
  @Input() message:string;
  @Input() subMessage:string;
  constructor() { }

  ngOnInit() {
  }

}
