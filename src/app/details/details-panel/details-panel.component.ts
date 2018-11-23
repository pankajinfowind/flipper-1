import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Details } from '../details';
import { DetailsService } from '../details.service';

@Component({
  selector: 'app-details-panel',
  templateUrl: './details-panel.component.html',
  styleUrls: ['./details-panel.component.scss']
})
export class DetailsPanelComponent implements OnInit {

  subscription: Observable<Details>;
  details$: Observable<Details>;
  constructor(private detailsService:DetailsService) {
   }

  ngOnInit() {
    this.subscription = this.details$ = this.detailsService.details$;
  }

}
