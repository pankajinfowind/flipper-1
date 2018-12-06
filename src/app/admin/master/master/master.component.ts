import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Select } from '@ngxs/store';
import { MasterState } from '../../../state/master-state';
import { Observable, Subscription } from 'rxjs';
import { DetailsService } from '../../../details/details.service';
import { Details } from '../../../details/details';
import { Master } from '../master';
import { MasterModelService } from '../master-model.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MasterComponent implements OnInit,OnDestroy {

links: any[] = [{path:'category',label:'Categories'},{path:'item',label:'Items'},{path:'insurance',label:'Insurances'} ];

@Select(MasterState.loading) loading$: Observable<boolean>;
isMobile=false;
leftColumnIsHidden=false;
subscription: Observable<Details>;
details$: Observable<Details>;
master$: Observable<Master>;
constructor(private msterModelService:MasterModelService,private detailsService:DetailsService) {
 }

  ngOnInit() {
    this.master$ = this.msterModelService.master$;
    this.subscription = this.details$ = this.detailsService.details$;
  }

  ngOnDestroy() {
    //this.subscription.next();
  }

}
