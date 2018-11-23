import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Details } from '../../../details/details';
import { DetailsService } from '../../../details/details.service';

@Component({
  selector: 'app-master-model',
  templateUrl: './master-model.component.html',
  styleUrls: ['./master-model.component.scss']
})
export class MasterModelComponent implements OnInit {

  subscription: Observable<Details>;
  details$: Observable<Details>;
  constructor(private detailsService:DetailsService) {
   }

    ngOnInit() {
      this.subscription = this.details$ = this.detailsService.details$;
    }

}
