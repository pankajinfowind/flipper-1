import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

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
  constructor(private router: Router) {
  }

    ngOnInit() {
    }


  }
