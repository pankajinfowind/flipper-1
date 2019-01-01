import { Injectable } from '@angular/core';
import { Model, ModelFactory } from 'ngx-model';
import { Observable } from 'rxjs';
import { Customer } from '../../customers/customer';

@Injectable({
  providedIn: 'root'
})
export class NgxService {
  private model: Model<any[]>;

  items$: Observable<any | Customer[]>;

  constructor(private modelFactory: ModelFactory<any[]>) {
    this.model = this.modelFactory.create([]); // create model and pass initial data
    this.items$ = this.model.data$; // expose model data as named public property
  }
  addItem(gitem: any | Customer) {
    // retrieve raw model data
    const items = this.model.get();
    // mutate model data
    items[0] = gitem;
    // set new model data (after mutation)
    this.model.set(items);
  }
}
