import { Injectable } from '@angular/core';
import { Model, ModelFactory } from 'ngx-model';
import { Details } from './details';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {
  private model: Model<Details>;
  details$: Observable<Details>;

  constructor(private modelFactory: ModelFactory<Details>) {
    this.create({title:null,receriver_data:null,sender_data:null,module:null,component:null,action:null,detailsVisible:false});
    this.details$ = this.model.data$;

   }
   public create(stateCreation:Details){
    this.model = this.modelFactory.create(stateCreation);

   }

   public get(){
       return this.model.get();
   }
   update(stateUpdates: any) {
    // retrieve raw model data
    const modelSnapshot = this.model.get();

    // mutate model data
    const newModel = { ...modelSnapshot, ...stateUpdates };

    // set new model data (after mutation)
    this.model.set(newModel);

  }
  close(){
    this.update({title:null,receriver_data:null,sender_data:null,module:null,component:null,action:null,detailsVisible:false});
  }
  receiverData(data,close=false){
    const g=this.get();
    g.receriver_data=data;
    if(close){
      g.detailsVisible=false;
    }
    return this.update(g);
  }
}
