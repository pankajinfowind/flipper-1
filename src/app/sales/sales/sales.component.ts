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
      menu:'Invoices',icon:'assignment',
      submenu:[
        {path:'lists',label:'Invoice List'}
      ]
    },
    // {
    //   menu:'Customers',icon:'assignment_ind',
    //   submenu:[
    //     {path:'lists',label:'Customer List'},
    //   ]
    // }
  ];

  //customertype
  toggled=false;
  isMobile=false;
  leftColumnIsHidden=false;
  constructor(private router: Router) {
  }

    ngOnInit() {
      this.redirectLink();
      this.getMenuHighlighted();
    }

    ngOnDestroy() {
      //this.subscription.next();
    }
    clickedOnLink(path){
      localStorage.setItem('sales-path',path);
    }
    redirectLink(){
      if(localStorage.getItem('sales-path') && !localStorage.getItem('sales-path')==null){
        return this.router.navigate([localStorage.getItem('sales-path')]);
      }
    }
    clickedMenu(menu){
      localStorage.setItem('sales-menu',menu);
    }
    getMenuHighlighted(){
      if(localStorage.getItem('sales-menu')==null){
        return 'Invoices';
      }else{
        return localStorage.getItem('sales-menu');
      }

    }
  }
