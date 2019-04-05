import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BootstrapperSetUp } from './bootstrapper.service';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SetupComponent implements OnInit {


  links: any[] = [
    {
      menu:'Products',icon:'settings',path:'item',
    },
    {
      menu:'Categories',icon:'settings',path:'category',
    },
    {
      menu:'Brands',icon:'settings',path:'brand',
    },
    {
      menu:'Customer Types',icon:'settings',path:'customertype',
    },
    {
      menu:'Tax rates',icon:'settings',path:'tax-rate',
    },
    {
      menu:'Reasons',icon:'settings',path:'reason',
    },

    {
      menu:'Periods',icon:'settings',path:'expiration_setting',
    },

  ];

toggled=false;
isMobile=false;
leftColumnIsHidden=false;
constructor(private router: Router) {
}

  ngOnInit() {
  }

 
}
