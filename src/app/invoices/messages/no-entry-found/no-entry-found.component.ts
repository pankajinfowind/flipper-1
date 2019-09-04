import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'invoice-no-entry-found',
  templateUrl: './no-entry-found.component.html',
  styleUrls: ['./no-entry-found.component.scss']
})
export class NoEntryFoundMasterComponent implements OnInit {
  @Input() message:string;
  @Input() subMessage:string;
  constructor() { }

  ngOnInit() {
  }

}
