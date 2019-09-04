import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model, ModelFactory } from 'ngx-model';
import { Pay } from './pay';

@Injectable({
  providedIn: 'root'
})
export class PayModelService {

  pay$: Observable<Pay>;
private model: Model<Pay>;
  constructor(private modelFactory: ModelFactory<Pay>) {
    this.create({});
    this.pay$ = this.model.data$;
   }

   public create(stateCreation){
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
    //console.log('am here booss',this.model.get());
  }


}
