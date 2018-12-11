import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model, ModelFactory } from 'ngx-model';
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
        modelSnapshot.forEach((el,index,object)=>{
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
            }else if(status=='discount'){
              console.log('elem',stateUpdates);
              el.total_discount=this.calculateDiscount(stateUpdates);
            }else if(status=='delete'){
                 modelSnapshot.splice(index, 1);

            }else if(status=='update-qty'){
              el.Qty=stateUpdates.Qty;
            }

              el.Total=el.currency+ ' '+ (el.Qty*el.price);
              el.total_tax=this.calcalTax(el);
              el.total_amount=(el.Qty*el.price);
              check_existing=true;
          }
        });

      if(!check_existing){
        modelSnapshot.push(stateUpdates);
      }

    this.model.set(modelSnapshot);

  }
  calculateDiscount(item:OrderItems){

    // Cost of one chocolate pack = $10

    // Cost of two chocolate pack = $10*2=$20

    // Discount (10%) on two packs= $20/100*10=$2

    // Discounted price of two chocolate packs=$20-$2=$18

    if(item.discount > 0){
      const cost_of_one=item.price;
      const total_cost_of_many=cost_of_one*item.Qty;
      const discount=(total_cost_of_many/100)*item.discount;
      return total_cost_of_many-discount;
    }else{
      return 0;
    }



  }
calcalTax(item:OrderItems){
 return ((item.Qty*item.price)*18)/100;
}

}
