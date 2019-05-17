import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  isMobile = false;
  leftColumnIsHidden = false;
  links: any[] = [
    {
      menu:'Company/Business',icon:'assignment',path:'set-company',
    },
    {
      menu:'Invoices Customization',icon:'assignment',path:'customize-invoice',
    }
  ];
  constructor() { }

  ngOnInit() {
  }

}
