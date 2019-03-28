import { Injectable } from '@angular/core';
import { Model, ModelFactory } from 'ngx-model';
import { Observable } from 'rxjs';
export class SharedModel {
data?:any;
constructor(params: Object = {}) {
  for (let name in params) {
      this[name] = params[name];
  }
}
}
@Injectable({
  providedIn: 'root'
})
export class SharedModelService {
  private model: Model<SharedModel>;
  shared$: Observable<SharedModel>;

  constructor(private modelFactory: ModelFactory<SharedModel>) {
    this.create(null);
    this.shared$ = this.model.data$;
   }
   public create(data){
       const stateCreation:SharedModel={
           data:data
       }
    this.model = this.modelFactory.create(stateCreation);

   }

   public get(){
       return this.model.get();
   }
   update(data) {
        const stateUpdates:SharedModel={
           data:data
       }
      //  const modelSnapshot = this.model.get();

      //  // mutate model data
      //  const newModel = { ...modelSnapshot.data, ...stateUpdates.data };

       // set new model data (after mutation)
       this.model.set(stateUpdates);
  }
  remove(){
      const stateRemove:SharedModel={
           data:null
       }
    this.update(stateRemove);
  }

}
