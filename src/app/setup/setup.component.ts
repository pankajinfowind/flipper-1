import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailsService } from '../details/details.service';
import { Details } from '../details/details';
import { SetUpModelService } from './setup-model.service';
import { SetUp } from './setup';

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
  }
];

toggled=false;
isMobile=false;
leftColumnIsHidden=false;
subscription: Observable<Details>;
details$: Observable<Details>;
setup$: Observable<SetUp>;
constructor(private msterModelService:SetUpModelService,private detailsService:DetailsService) {
 }

  ngOnInit() {
    this.setup$ = this.msterModelService.setup$;
    this.subscription = this.details$ = this.detailsService.details$;

  }

  ngOnDestroy() {
    //this.subscription.next();
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
