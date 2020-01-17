import { Component, OnInit } from '@angular/core';
import { trigger, transition, useAnimation } from '@angular/animations';
import { fadeInAnimation } from '@enexus/flipper-components';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [
    trigger('insertSettings', [
      transition(':enter', useAnimation(fadeInAnimation, {params: {duration: '1s'}}))
    ]),
  ],
})
export class SettingsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
