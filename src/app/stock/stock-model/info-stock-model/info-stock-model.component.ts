import { Component, OnInit } from '@angular/core';
import { Details } from '../../../details/details';
import { Observable } from 'rxjs';
import { DetailsService } from '../../../details/details.service';

@Component({
  selector: 'app-info-stock-model',
  templateUrl: './info-stock-model.component.html',
  styleUrls: ['./info-stock-model.component.scss']
})

export class InfoStockModelComponent implements OnInit {
  warn = 'warn';
  accent='accent';
  primary='primary';
  mode = 'determinate';

  subscription: Observable<Details>;
  details$: Observable<Details>;
  info:any={};
  constructor(private detailsService:DetailsService) {
   }

    ngOnInit() {
      this.subscription = this.details$ = this.detailsService.details$;
      this.details$.subscribe(res=>{
        this.info=res.sender_data?res.sender_data:null;
      });
  }
  percentage(num,num1) {
    return Math.round(num *100)/num1;
}
}
