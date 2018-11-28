import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Details } from '../../../details/details';
import { DetailsService } from '../../../details/details.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-update-stock-model',
  templateUrl: './update-stock-model.component.html',
  styleUrls: ['./update-stock-model.component.scss']
})
export class UpdateStockModelComponent implements OnInit {

  subscription: Observable<Details>;
  details$: Observable<Details>;
  stockForm: FormGroup;
  units: string[] = ['unit','ltre','gms','kg'];
  constructor(private detailsService:DetailsService) {
   }

    ngOnInit() {
      this.subscription = this.details$ = this.detailsService.details$;
      this.details$ = this.detailsService.details$;
      this.details$.subscribe(res=>{
        const numberPatern = '^[0-9.,]+$';
          this.stockForm = new FormGroup({
            qty: new FormControl(res.sender_data?res.sender_data.available_stock_qty:1, [Validators.required, Validators.pattern(numberPatern)]),
            weight: new FormControl(res.sender_data?res.sender_data.weight:1, [Validators.required, Validators.pattern(numberPatern)]),
            unit_of_measure: new FormControl('gms', [Validators.required])
          });
       });
    }


  ///////////////////////////// Item
  get qty() {
    return this.stockForm.get("qty");
  }
  get weight() {
    return this.stockForm.get("weight");
  }
  get unit_of_measure() {
    return this.stockForm.get("unit_of_measure");
  }

  updateStock(){

  }

}
