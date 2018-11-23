import { LocalStorage } from "../common/core/services/local-storage.service";
import { Router } from "@angular/router";
import { MasterStateModel } from "./models/master-state-model";
import { MASTER_STATE_MODEL_DEFAULTS } from "./models/master-state-model-defaults";
import { Store, State, Selector, Action, StateContext, NgxsOnInit } from "@ngxs/store";
import { LoadCategories, AddCategoryAction, LoadProgress, LoadingAction, ToggleDetailsSidebar, SetViewDetails } from "./actions/commands";
import { tap } from "rxjs/operators";
import { ApiCategoryService } from "../admin/master/categories/api/api.service";
import { Injector } from "@angular/core";

@State<MasterStateModel>({
  name: 'master',
  defaults: MASTER_STATE_MODEL_DEFAULTS
})
export class MasterState {
  private  api: ApiCategoryService;
  constructor(injector: Injector) {
    this.api = injector.get<ApiCategoryService>(ApiCategoryService);
}

  @Selector()
  static categories(state: MasterStateModel) {
      return state.categories;
  }

  @Selector()
  static items(state: MasterStateModel) {
      return state.items;
  }

  @Selector()
  static loading(state: MasterStateModel) {
      return state.loading;
  }
  @Selector()
    static details(state: MasterStateModel) {
        return state.details;
    }
    @Action(ToggleDetailsSidebar)
    toggleDetailsSidebar(ctx: StateContext<MasterStateModel>,action: SetViewDetails) {
      ctx.patchState({ details: action.details });
    }

  @Action(LoadCategories)
   loadCategories(ctx: StateContext<MasterStateModel>, action:AddCategoryAction) {
    const oldState = ctx.getState(),
    newState = { loading: true } as Partial<
    MasterStateModel
    >;
    ctx.patchState(newState);

      return  this.api.getCategories().pipe(
          tap(response => {
            const categories = action.categories ? oldState.categories : [];

            const state = {
                categories: categories.concat(response.data),
                loading: false
            } as Partial<MasterStateModel>;


          return ctx.patchState(state);
        },
        () => {
          return ctx.patchState({ loading: false });
        })
      );
  }

  @Action(LoadProgress)
  onLoadProgress({getState, patchState}: StateContext<MasterStateModel>, action:LoadingAction) {
    patchState({loading: action.loading});
  }
}
