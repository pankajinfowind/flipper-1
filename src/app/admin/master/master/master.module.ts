import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemsComponent } from "../items/items.component";
import { CategoriesComponent } from "../categories/categories.component";
import { MasterComponent } from "./master.component";
import { MaterialModule } from "../../../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UiModule } from "../../../common/core/ui/ui.module";
import { MasterRoutingModule } from "./master-routing.module";
import { ApiCategoryService } from '../categories/api/api.service';
import { ApiItemService } from '../items/api/api.service';
import { HttpModule } from '../../../common/core/http/http.module';
import {HttpClientModule} from '@angular/common/http';
import { BrandComponent } from '../brands/brand.component';
import { AddItemComponent } from '../items/add-item/add-item.component';
import { BranchComponent } from '../branch/branch.component';
import { ApiBranchService } from '../branch/api/api.service';
import { DataTableModule } from '../../../data-table/data-table/data-table.module';
import { CrupdateCategoryModalComponent } from '../categories/crupdate-category-modal/crupdate-category-modal.component';
import { CrupdateBrandModalComponent } from '../brands/crupdate-brand-modal/crupdate-brand-modal.component';
import { SelectCategoryModelComponent } from '../categories/select-category-model/select-category-model.component';
import { SelectBrandModalComponent } from '../brands/select-brand-modal/select-brand-modal.component';
import { CrupdateBranchModalComponent } from '../branch/crupdate-branch-modal/crupdate-branch-modal.component';
import { AssignStockToBranchComponent } from '../branch/assign-stock-to-branch/assign-stock-to-branch.component';
import { SetupModule } from '../../../setup/setup.module';

@NgModule({
  imports: [
    CommonModule,
    MasterRoutingModule,
    SetupModule,
     MaterialModule,
      FormsModule,
       UiModule,
        ReactiveFormsModule,
        HttpClientModule,
        HttpModule,
        DataTableModule],
  exports: [
    HttpClientModule,
    ItemsComponent,
    AddItemComponent,
    CategoriesComponent,
    BrandComponent,
    BranchComponent,
    MasterComponent,
    CrupdateCategoryModalComponent,
    CrupdateBrandModalComponent,
    SelectCategoryModelComponent,
    SelectBrandModalComponent,
    CrupdateBranchModalComponent
    ],
  declarations: [
    ItemsComponent,
    AddItemComponent,
    CategoriesComponent,
    BrandComponent,
    BranchComponent,
    MasterComponent,
    AssignStockToBranchComponent,
    CrupdateCategoryModalComponent,
    CrupdateBrandModalComponent,
    SelectCategoryModelComponent,
    SelectBrandModalComponent,
    CrupdateBranchModalComponent
  ],
  providers: [
    ApiItemService,
    ApiCategoryService,
    ApiBranchService
  ],
entryComponents: [CrupdateCategoryModalComponent,
  CrupdateBrandModalComponent,
  SelectCategoryModelComponent,
  AssignStockToBranchComponent,
  SelectBrandModalComponent,CrupdateBranchModalComponent,AddItemComponent]
})
export class MasterModule {

}
