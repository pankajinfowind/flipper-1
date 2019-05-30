import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorage } from '../../common/core/services/local-storage.service';
import { GlobalVariables } from '../../common/core/global-variables';

@Component({
  selector: 'app-sale',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SalesComponent implements OnInit {


  links: any[] = [
    {
      menu:'Invoices',icon:'assignment',path:'invoices',
    },
    {
      menu:'Customers',icon:'assignment',path:'customers',
    }
  ];

  toggled=false;
  isMobile=false;
  leftColumnIsHidden=false;
  constructor(private localStorage: LocalStorage,public v: GlobalVariables) {
        this.localStorage.set('sales-path', 'invoices');
  }

    ngOnInit() {

    }
    updateTitle(title){
      this.v.webTitle(title);
    }

  }
