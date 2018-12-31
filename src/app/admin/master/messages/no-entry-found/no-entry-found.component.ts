import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'master-no-entry-found',
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
