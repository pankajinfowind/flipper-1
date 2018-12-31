import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Stock } from './api/stock';
import { Model, ModelFactory } from 'ngx-model';

@Injectable({
  providedIn: 'root'
})
export class StockModelService {

  stocks$: Observable<Stock[]>;
  private model: Model<Stock[]>;
  constructor(private modelFactory: ModelFactory<Stock[]>) {
    this.create([]);
    this.stocks$ = this.model.data$;
  }
  public create(stateCreation: Stock[]) {
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
