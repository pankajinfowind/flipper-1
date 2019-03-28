import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ItemsComponent } from "../items/items.component";
import { CategoriesComponent } from "../categories/categories.component";
import { MasterComponent } from "./master.component";
import { MaterialModule } from "../../../material/material.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UiModule } from "../../../common/core/ui/ui.module";
import { MasterRoutingModule } from "./master-routing.module";
import { DetailsModule } from "../../../details/details.module";
import { ApiCategoryService } from '../categories/api/api.service';
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
  imports: [
    CommonModule,
    MasterRoutingModule,
    DetailsModule,
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
    RemoveBranchDialog,
    CrupdateCategoryModalComponent,
    CrupdateBrandModalComponent
  ],
  providers: [
    ApiItemService,
    ApiCategoryService,
    ApiBranchService
  ],
entryComponents: [CrupdateCategoryModalComponent,CrupdateBrandModalComponent,RemoveBranchDialog]
})
export class MasterModule {

}
