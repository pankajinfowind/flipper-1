import { Injectable } from '@angular/core';
import { Model, ModelFactory } from 'ngx-model';
import { Observable } from 'rxjs';
import { CustomizeInvoice } from './customize-invoice';

@Injectable({
  providedIn: 'root'
})
export class CustomizeInvoicePreviewDataService {
  private model: Model<CustomizeInvoice>;
  invoice$: Observable<CustomizeInvoice>;

  constructor(private modelFactory: ModelFactory<CustomizeInvoice>) {
    this.create({});
    this.invoice$ = this.model.data$;

   }
   public create(stateCreation:CustomizeInvoice){
    this.model = this.modelFactory.create(stateCreation);

   }

   public get(){
       return this.model.get();
   }
   update(stateUpdates: any) {
     if(stateUpdates){
        this.model.set(stateUpdates);
     }else{
      this.model.set({});
     }

  }
  close(){
    this.update(null);
  }

}
