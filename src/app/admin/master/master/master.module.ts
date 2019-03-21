import { NgModule, ModuleWithProviders, APP_INITIALIZER, ErrorHandler } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemsComponent, RemoveItemDialog } from "../items/items.component";
import { CategoriesComponent } from "../categories/categories.component";
import { MasterComponent } from "./master.component";
import { MaterialModule } from "../../../material/material.module";
import { ModalComponent } from "../modal/modal.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InsuranceComponent, RemoveInsuranceDialog } from "../insurance/insurance.component";
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
import { BrandComponent } from '../brands/brand.component';
import { AddItemComponent } from '../items/add-item/add-item.component';
import { BranchComponent, RemoveBranchDialog } from '../branch/branch.component';
import { ApiBranchService } from '../branch/api/api.service';
import { DataTableModule } from '../../../data-table/data-table/data-table.module';
import { CrupdateCategoryModalComponent } from '../categories/crupdate-category-modal/crupdate-category-modal.component';
import { CrupdateBrandModalComponent } from '../brands/crupdate-brand-modal/crupdate-brand-modal.component';

@NgModule({
  imports: [CommonModule,MasterRoutingModule,DetailsModule, MaterialModule, FormsModule, UiModule, ReactiveFormsModule,HttpClientModule,HttpModule,DataTableModule],
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
    RemoveInsuranceDialog,
    NoEntryFoundMasterComponent,
    RemoveBranchDialog,
    CrupdateCategoryModalComponent,
    CrupdateBrandModalComponent
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
    RemoveInsuranceDialog,
    NoEntryFoundMasterComponent,
    RemoveBranchDialog,
    CrupdateCategoryModalComponent,
    CrupdateBrandModalComponent
  ],
  providers: [
    ApiItemService,
    ApiCategoryService,
    ApiInsuranceService,
    ApiBranchService
  ],
entryComponents: [CrupdateCategoryModalComponent,CrupdateBrandModalComponent,RemoveItemDialog,RemoveBranchDialog,RemoveInsuranceDialog]
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
