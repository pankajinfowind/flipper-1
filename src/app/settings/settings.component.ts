import { Component, OnInit } from '@angular/core';
import { GlobalVariables } from '../common/core/global-variables';

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
    },
    {
      menu:'Branch',icon:'assignment',path:'branch',
    }
  ];
  constructor(public v: GlobalVariables) { }
//BranchComponent
  ngOnInit() {
  }
  updateTitle(title){
    this.v.webTitle(title);
  }
}
