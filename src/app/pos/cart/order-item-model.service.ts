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
    this.create([]);
    this.order_items$ = this.model.data$;
   }

   public create(order){
    this.model = this.modelFactory.create(order);
   }

   public get(){
       return this.model.get();
   }

   update(stateUpdates: any) {

    const modelSnapshot = this.model.get();
    let check_existing=false;
        modelSnapshot.forEach(el=>{
          if(el.id===stateUpdates.id){
            el.Qty+=1;
            el.Total=el.currency+ ' '+ (el.Qty*el.price);
            check_existing=true;
          }
        });

      if(!check_existing){
        modelSnapshot.push(stateUpdates);
      }

    this.model.set(modelSnapshot);

  }


}
