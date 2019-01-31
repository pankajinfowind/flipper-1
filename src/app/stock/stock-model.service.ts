import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from './api/stock';
import { Model, ModelFactory } from 'ngx-model';
import { StockModel } from './stock-model';

@Injectable({
  providedIn: 'root'
})
export class StockModelService {

  stocks$: Observable<StockModel>;
  private model: Model<StockModel>;
  constructor(private modelFactory: ModelFactory<StockModel>) {
    this.create();
    this.stocks$ = this.model.data$;
  }
  public create(stateCreation: StockModel={loading:false,available:[],stockout:[],lowerstock:[]}) {
    this.model = this.modelFactory.create(stateCreation);
  }

  public get() {
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
