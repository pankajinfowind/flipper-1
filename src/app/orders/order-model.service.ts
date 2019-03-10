import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model, ModelFactory } from 'ngx-model';
import { Orders } from './orders';

@Injectable({
  providedIn: 'root'
})
export class OrderModelService {

  order$: Observable<Orders[]>;
  private model: Model<Orders[]>;
  constructor(private modelFactory: ModelFactory<Orders[]>) {
    this.create([]);
    this.order$ = this.model.data$;
  }

  public create(stateCreation: Orders[]) {
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
