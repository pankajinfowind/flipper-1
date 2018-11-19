import { LocalStorage } from "../common/core/services/local-storage.service";
import { Router } from "@angular/router";
import { MasterStateModel } from "./models/master-state-model";
import { MASTER_STATE_MODEL_DEFAULTS } from "./models/master-state-model-defaults";
import { Store, State, Selector, Action, StateContext } from "@ngxs/store";
import { LoadCategories, AddCategories } from "./actions/commands";
import { tap } from "rxjs/operators";
import { ApiCategoryService } from "../admin/master/categories/api/api.service";

@State<MasterStateModel>({
  name: 'master',
  defaults: MASTER_STATE_MODEL_DEFAULTS
})
export class MasterState {
  constructor(
    private apiCat:ApiCategoryService,
      private router: Router,
      private store: Store,
      private localStore: LocalStorage
  ) {}

  @Selector()
  static categories(state: MasterStateModel) {
      return state.categories;
  }

  @Selector()
  static items(state: MasterStateModel) {
      return state.items;
  }

  @Action(LoadCategories)
  loadCategories(ctx: StateContext<MasterStateModel>) {
      return this.apiCat.get().pipe(
          tap(response => {

            console.log('am her', response);
              return ctx.dispatch(new AddCategories(response.categories));
          })
      );
  }
}
