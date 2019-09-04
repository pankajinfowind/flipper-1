import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model, ModelFactory } from 'ngx-model';
import { SetUp } from './setup';

@Injectable({
  providedIn: 'root'
})
export class SetUpModelService {

  setup$: Observable<SetUp>;
  private model: Model<SetUp>;
  constructor(private modelFactory: ModelFactory<SetUp>) {
    this.create();
    this.setup$ = this.model.data$;
   }
   public create(stateCreation:SetUp={loading:false,taxRates:[],reasons:[],customertypes:[],expirationSetting:[]}){
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


}
