import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model, ModelFactory } from 'ngx-model';
import { Pos } from '../pos';
import { OrderItems } from './order_items';

@Injectable({
  providedIn: 'root'
})
export class OrderItemsModelService {

  order_items$: Observable<OrderItems[]>;
  private model: Model<OrderItems[]>;
  constructor(private modelFactory: ModelFactory<OrderItems[]>) {
    this.create({orders_items:[]});
    this.order_items$ = this.model.data$;
   }

   public create(order){
    this.model = this.modelFactory.create(order);
   }

   public get(){
       return this.model.get();
   }

   update(stateUpdates: any) {
    // retrieve raw model data
    const modelSnapshot = this.model.get();
    // mutate model data
    console.log('recently model',modelSnapshot);
    console.log('incaming model',stateUpdates);

    const newModel = {...modelSnapshot, ...stateUpdates };
    console.log('new model',newModel);
      this.model.set(newModel);

    // set new model data (after mutation)

    //console.log('am here booss',this.model.get());
  }


}
