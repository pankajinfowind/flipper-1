import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'setup-no-entry-found',
  templateUrl: './no-entry-found.component.html',
  styleUrls: ['./no-entry-found.component.scss']
})
export class NoEntryFoundSetUpComponent implements OnInit {
  @Input() message:string;
  @Input() subMessage:string;
  constructor() { }

  ngOnInit() {
  }

}
