import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { BootstrapperSetUp } from './bootstrapper.service';
import { Details } from '../details/details';
import { DetailsService } from '../details/details.service';
import { GlobalVariables } from '../common/core/global-variables';

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
details$: Observable<Details>;
constructor(private detailsService: DetailsService,public v: GlobalVariables) {
}

  ngOnInit() {
    this.details$ = this.detailsService.details$;
  }

  updateTitle(title){
    this.v.webTitle(title);
  }
}
