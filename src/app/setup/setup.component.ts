import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailsService } from '../details/details.service';
import { Details } from '../details/details';
import { SetUpModelService } from './setup-model.service';
import { SetUp } from './setup';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SetupComponent implements OnInit, OnDestroy {


links: any[] = [
  {
menu:'Banking',icon:'assessment',
submenu:[
        {path:'tax-rate',label:'Tax rates'},
      ]
  },
  {
    menu:'Reasons',icon:'assessment',
    submenu:[
           {path:'reasons/stock_movements',label:'Stock Movement'},
            {path:'reasons/discount',label:'Discount'},
            {path:'reasons/refund',label:'Refund'},
          ]
      }
];

toggled=false;
isMobile=false;
leftColumnIsHidden=false;
subscription: Observable<Details>;
details$: Observable<Details>;
setup$: Observable<SetUp>;
constructor(private router: Router,private msterModelService:SetUpModelService,private detailsService:DetailsService) {
 }

  ngOnInit() {
    this.redirectLink();
    this.getMenuHighlighted();
    this.setup$ = this.msterModelService.setup$;
    this.subscription = this.details$ = this.detailsService.details$;
  }

  ngOnDestroy() {
    //this.subscription.next();
  }
  clickedOnLink(path){
    localStorage.setItem('setup-path',path);
  }
  redirectLink(){
    if(localStorage.getItem('setup-path') && !localStorage.getItem('setup-path')==null){
      return this.router.navigate([localStorage.getItem('setup-path')]);
    }
  }
  clickedMenu(menu){
    localStorage.setItem('setup-menu',menu);
  }
  getMenuHighlighted(){
    if(localStorage.getItem('setup-menu')==null){
      return 'Banking';
    }else{
      return localStorage.getItem('setup-menu');
    }

  }
}
