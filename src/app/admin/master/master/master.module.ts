import { NgModule, ModuleWithProviders, APP_INITIALIZER, ErrorHandler } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemsComponent, RemoveItemDialog } from "../items/items.component";
import { CategoriesComponent, RemoveCategoryDialog } from "../categories/categories.component";
import { MasterComponent } from "./master.component";
import { MaterialModule } from "../../../material/material.module";
import { ModalComponent } from "../modal/modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InsuranceComponent, RemoveInsuranceDialog } from "../insurance/insurance.component";
import { MasterState } from "../../../state/master-state";
import { NgxsModule } from '@ngxs/store';
import { UiModule } from "../../../common/core/ui/ui.module";
import { MasterRoutingModule } from "./master-routing.module";
import { DetailsModule } from "../../../details/details.module";
import { NoEntryFoundMasterComponent } from "../messages/no-entry-found/no-entry-found.component";
import { CurrentUser } from '../../../common/auth/current-user';
import { BootstrapperMaster, init_app } from '../bootstrapper.service';
import { HttpErrorHandler } from '../../../common/core/http/errors/http-error-handler.service';
import { BackendHttpErrorHandler } from '../../../common/core/http/errors/backend-http-error-handler.service';
import { ravenErrorHandlerFactory } from '../../../common/core/errors/raven-error-handler';
import { ApiCategoryService } from '../categories/api/api.service';
import { ApiInsuranceService } from '../insurance/api/ap.service';
import { ApiItemService } from '../items/api/api.service';
import { HttpModule } from '../../../common/core/http/http.module';
import {HttpClientModule} from '@angular/common/http';
import { BrandComponent, RemoveBrandDialog } from '../brands/brand.component';
import { AddItemComponent } from '../items/add-item/add-item.component';
import { BranchComponent, RemoveBranchDialog } from '../branch/branch.component';
import { ApiBranchService } from '../branch/api/api.service';

@NgModule({
  imports: [CommonModule,MasterRoutingModule,DetailsModule, MaterialModule, FormsModule, UiModule, ReactiveFormsModule,HttpClientModule,HttpModule],
  exports: [
    HttpClientModule,
    ItemsComponent,
    AddItemComponent,
    CategoriesComponent,
    BrandComponent,
    BranchComponent,
    MasterComponent,
    ModalComponent,
    InsuranceComponent,
    RemoveItemDialog,
    RemoveCategoryDialog,
    RemoveInsuranceDialog,
    RemoveBrandDialog,
    NoEntryFoundMasterComponent,
    RemoveBranchDialog
  ],
  declarations: [
    ItemsComponent,
    AddItemComponent,
    CategoriesComponent,
    BrandComponent,
    BranchComponent,
    MasterComponent,
    ModalComponent,
    InsuranceComponent,
    RemoveItemDialog,
    RemoveCategoryDialog,
    RemoveInsuranceDialog,
    RemoveBrandDialog,
    NoEntryFoundMasterComponent,
    RemoveBranchDialog

  ],
  providers: [
    ApiItemService,
    ApiCategoryService,
    ApiInsuranceService,
    ApiBranchService
  ],
entryComponents: [RemoveItemDialog,RemoveBranchDialog,RemoveCategoryDialog,RemoveInsuranceDialog,RemoveBrandDialog]
})
export class MasterModule {
  static forRoot(): ModuleWithProviders {
    return {
        ngModule: MasterModule,
        providers: [
            CurrentUser,
            BootstrapperMaster,
            {
                provide: HttpErrorHandler,
                useClass: BackendHttpErrorHandler,
            },
            {
                provide: APP_INITIALIZER,
                useFactory: init_app,
                deps: [BootstrapperMaster,CurrentUser],
                multi: true,
            },
            {
                provide: ErrorHandler,
                useFactory: ravenErrorHandlerFactory,
                deps:
                [
                  ApiItemService,
                  ApiCategoryService,
                  ApiInsuranceService,
                  ApiBranchService,
                  CurrentUser
                ],
            },
        ]
    };
  }
}
