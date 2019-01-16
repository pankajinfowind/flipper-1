import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Details } from '../../details/details';
import { DetailsService } from '../../details/details.service';

@Component({
  selector: 'app-setup-model',
  templateUrl: './setup-model.component.html',
  styleUrls: ['./setup-model.component.scss']
})
export class SetUpModelComponent implements OnInit {

  subscription: Observable<Details>;
  details$: Observable<Details>;
  constructor(private detailsService:DetailsService) {
   }

    ngOnInit() {
      this.subscription = this.details$ = this.detailsService.details$;
    }

}
