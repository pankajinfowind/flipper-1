import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DetailsService } from '../../../details/details.service';
import { Details } from '../../../details/details';

@Component({
  selector: 'app-stock-model',
  templateUrl: './stock-model.component.html',
  styleUrls: ['./stock-model.component.scss']
})
export class StockModelComponent implements OnInit {

  subscription: Observable<Details>;
  details$: Observable<Details>;

  constructor(private detailsService:DetailsService) {
   }

    ngOnInit() {
      this.subscription = this.details$ = this.detailsService.details$;
    }

}
