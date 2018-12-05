import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailsService } from '../details.service';
import { Details } from '../details';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  subscription: Observable<Details>;
  details$: Observable<Details>;
  constructor(private detailsService:DetailsService) {
   }

   close(){
    this.detailsService.update({title:null,receriver_data:null,sender_data:null,module:null,component:null,action:null,detailsVisible:false});
  }
  ngOnInit() {
    this.subscription = this.details$ = this.detailsService.details$;
  }

}
