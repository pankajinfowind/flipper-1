import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model, ModelFactory } from 'ngx-model';
import { OrderItems } from './order_items';
import { ApiPosService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class OrderItemsModelService {

  order_items$: Observable<OrderItems[]>;
  private model: Model<OrderItems[]>;
  constructor(private api:ApiPosService,private modelFactory: ModelFactory<OrderItems[]>) {
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

    if(status === 'all'){
      this.model.set(stateUpdates);
    }else{
    const modelSnapshot = this.model.get();
    let check_existing=false;

        modelSnapshot.forEach((el,index,object)=>{
          if(el.batch_no===stateUpdates.batch_no && el.order_id === stateUpdates.order_id && el.stock_id === stateUpdates.stock_id){
            if(status=='add-qty'){
              el.qty+=1;
              if(el.qty > stateUpdates.available_qty){
                el.qty-=1;
                alert('Quantity will create a negative stock level');
              }

            }else if(status=='remove-qty'){
              el.qty-=1;
              if(el.qty < 0){
                el.qty+=1;
                alert('Quantity must be greater than 0');
              }
            }else if(status=='discount'){
             // el.discount_value=this.calculateDiscount(stateUpdates);
            }else if(status=='note'){
              el.note=stateUpdates.note;
            }
            else if(status=='delete'){
                 modelSnapshot.splice(index, 1);

            }else if(status=='update-qty'){
              el.qty=stateUpdates.qty;
            }

              // el.total=el.currency+ ' '+ (el.qty*el.price);
              // el.total_tax=this.calcalTax(el);
              // el.total_amount=(el.qty*el.price);
              // check_existing=true;
          }
        });

      if(!check_existing){
        modelSnapshot.push(stateUpdates);
      }

    this.model.set(modelSnapshot);
    }
  }

  cartItemModified(){

  }
  calculateDiscount(item:OrderItems){

    // Cost of one chocolate pack = $10

    // Cost of two chocolate pack = $10*2=$20

    // Discount (10%) on two packs= $20/100*10=$2

    // Discounted price of two chocolate packs=$20-$2=$18

    // if(item.discount > 0){
    //   const cost_of_one=item.price;
    //   const total_cost_of_many=cost_of_one*item.qty;
    //   const discount=(total_cost_of_many/100)*item.discount;
    //   return total_cost_of_many-discount;
    // }else{
    //   return 0;
    // }
  }
calcalTax(item:OrderItems){
 return ((item.qty*item.price)*18)/100;
}



}
