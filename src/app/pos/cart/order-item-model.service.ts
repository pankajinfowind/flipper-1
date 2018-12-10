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

   update(stateUpdates: any,status='add-qty') {

    const modelSnapshot = this.model.get();
    let check_existing=false;
        modelSnapshot.forEach(el=>{
          if(el.id===stateUpdates.id){
            if(status=='add-qty'){
              el.Qty+=1;
              if(el.Qty > stateUpdates.available_qty){
                el.Qty-=1;
                alert('Quantity will create a negative stock level');
              }

            }else if(status=='remove-qty'){
              el.Qty-=1;
              if(el.Qty < 0){
                el.Qty+=1;
                alert('Quantity must be greater than 0');
              }
            }
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
